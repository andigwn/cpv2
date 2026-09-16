# syntax=docker/dockerfile:1
# =============================================================================
#  Qubu Resort — Company Profile Website
#  Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
#
#  Stages
#    base    Node.js runtime + the C library shim some prebuilt binaries need
#    deps    Deterministic `npm ci` from package-lock.json
#    builder `next build` with output: "standalone" (enabled by DOCKER_BUILD=1)
#    runner  Minimal, non-root runtime image that only ships the build output
#
#  Build : docker build --build-arg NEXT_PUBLIC_SITE_URL=https://www.example.com -t aurora-cove:latest .
#  Run   : docker run --rm -p 3000:3000 aurora-cove:latest
#  Compose: docker compose --env-file .env.production up -d --build
# =============================================================================

# -----------------------------------------------------------------------------
# base — shared foundation for every stage
# -----------------------------------------------------------------------------
FROM node:24-alpine AS base

# Patch the OS packages that ship inside the base image. Alpine back-ports security
# fixes as revision bumps (at the time of writing libcrypto3/libssl3 3.5.7-r0 ->
# 3.5.8-r0 and apk-tools 3.0.6-r0 -> 3.0.8-r0), so a floating node:24-alpine tag can
# lag behind the repository and trip vulnerability scanners. Upgrading here fixes it
# for every stage, because deps/builder/runner all inherit from this image.
#
# Note: libc6-compat (gcompat) is deliberately NOT installed. Next.js SWC and sharp
# both ship musl-native prebuilt binaries on Alpine, so no glibc shim is required.
# This is verified by the production smoke test, which exercises /_next/image AVIF
# encoding. Dropping it removes three packages from the attack surface.
RUN apk upgrade --no-cache

WORKDIR /app

# -----------------------------------------------------------------------------
# deps — install node_modules exactly as locked
# -----------------------------------------------------------------------------
FROM base AS deps

# NOTE: the repository `.npmrc` sets `ignore-scripts=true` for sandboxed local
# installs and is intentionally excluded via .dockerignore. Inside Docker, npm
# may run package install scripts normally, which is the expected behaviour for
# a real build machine.
COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund

# -----------------------------------------------------------------------------
# builder — compile the production bundle
# -----------------------------------------------------------------------------
FROM base AS builder

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so the
# public site URL must be known while `next build` runs. Passing it as a build
# arg (instead of shipping .env files into the context) keeps the image
# self-contained and free of local configuration.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    DOCKER_BUILD=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DOCKER_BUILD=1 makes next.config.ts emit a self-contained server bundle.
RUN npm run build

# -----------------------------------------------------------------------------
# runner — minimal production runtime
# -----------------------------------------------------------------------------
FROM base AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup -S -g 1001 nodejs \
 && adduser -S -u 1001 -G nodejs nextjs

# `output: "standalone"` traces the node_modules actually needed, but it does not
# copy these two folders — they have to be placed beside server.js by hand.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# /robots.txt is fully prerendered and tiny — a stable liveness probe.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/robots.txt || exit 1

# Next.js standalone entrypoint (reads PORT / HOSTNAME from the environment).
CMD ["node", "server.js"]
