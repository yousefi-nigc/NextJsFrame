# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# Internal Internet situation apline mirror
RUN echo -e "https://mirror.arvancloud.ir/alpine/v3.23/main\nhttps://mirror.arvancloud.ir/alpine/v3.23/community" > /etc/apk/repositories
RUN npm config set registry https://mirror-npm.runflare.com

RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Harden npm network settings for slow/blocked registries
ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_REGISTRY=https://mirror-npm.runflare.com

# Install dependencies with npm (expects package-lock.json)
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --prefer-offline --no-audit

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1
# Internal Internet Situation alpine mirrors again
#RUN echo -e "https://mirror.arvancloud.ir/alpine/v3.23/main\nhttps://mirror.arvancloud.ir/alpine/v3.23/community" > /etc/apk/repositories

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install wget for healthchecks
#RUN apk add --no-cache openssl wget

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files for migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/generated ./prisma/generated
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
# Copy prisma CLI from deps so npx prisma works (standalone doesn't include dev dependencies)
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node server.js"]

