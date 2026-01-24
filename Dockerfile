# syntax=docker.io/docker/dockerfile:1

# -------------------- Base --------------------
FROM node:20-alpine AS base

# Add Alpine mirrors & dependencies
RUN echo -e "https://mirror.arvancloud.ir/alpine/v3.23/main\nhttps://mirror.arvancloud.ir/alpine/v3.23/community" > /etc/apk/repositories
RUN npm config set registry https://mirror-npm.runflare.com
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production \
    PRISMA_SKIP_POSTINSTALL_GENERATE=true

# -------------------- Dependencies --------------------
FROM base AS deps

COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --prefer-offline --no-audit

# -------------------- Builder --------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ❌ Do NOT run prisma generate or migrate here
RUN npm run build

# -------------------- Runner --------------------
FROM base AS runner

WORKDIR /app

# Add non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copy Prisma client + migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma/generated ./prisma/generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma/migrations ./prisma/migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ✅ Run migrations and start server (offline-safe)
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node server.js"]
