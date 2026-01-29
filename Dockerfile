# syntax=docker.io/docker/dockerfile:1

# -------------------- Base --------------------
FROM node:20-alpine AS base

# Alpine mirrors & npm registry
RUN echo -e "http://mirror-linux.runflare.com/alpine/v3.23/main\nhttp://mirror-linux.runflare.com/alpine/v3.23/community" > /etc/apk/repositories
RUN npm config set registry https://mirror-npm.runflare.com

# Required runtime deps for Prisma on Alpine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production \
    PRISMA_SKIP_POSTINSTALL_GENERATE=true \
    PRISMA_SCHEMA_ENGINE_BINARY=./prisma/engine/schema-engine \
    PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# -------------------- Dependencies --------------------
FROM base AS deps

COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --prefer-offline --no-audit

# -------------------- Builder --------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .


# ✅ UNZIP IT IN PLACE (nothing else touched)
RUN gunzip /app/prisma/engine/schema-engine.gz \
    && chmod +x /app/prisma/engine/schema-engine

RUN npm run build

# -------------------- Runner --------------------
FROM base AS runner

WORKDIR /app

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copy Prisma artifacts
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Offline-safe startup
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node server.js"]
