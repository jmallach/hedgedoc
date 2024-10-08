# SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
# SPDX-License-Identifier: AGPL-3.0-only
#
# This Dockerfile uses features which are only available in BuildKit - see
# https://docs.docker.com/go/buildkit/ for more information.
#
# To build the image, run `docker build` command from the root of the
# repository:
#
#    DOCKER_BUILDKIT=1 docker build -f docker/Dockerfile .

## Stage 0: Base image with only yarn and package.json
FROM docker.io/node:19-alpine@sha256:155e324802ebfdd3f508340dcb0cd4a7510f8594802a2e53150f171ae8aa2462 as base
# Add tini to handle signals
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]

ENV YARN_CACHE_FOLDER=/tmp/.yarn

## Stage 1: Code with all dependencies
FROM base as code-with-deps
RUN apk add --no-cache libc6-compat

USER node
WORKDIR /usr/src/app

COPY --chown=node . .

# Install dependencies first to not invalidate the cache on every source change
RUN --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/tmp/.yarn \
    yarn install --immutable && yarn workspaces focus hedgedoc @hedgedoc/backend @hedgedoc/commons

## Stage 2a: Compile TypeScript
FROM code-with-deps as builder
USER node
WORKDIR /usr/src/app

ARG TURBO_TEAM
ARG TURBO_API
ARG TURBO_TOKEN

RUN yarn turbo run build --filter=backend --no-cache --no-daemon

## Stage 2b: Install only prod dependencies
FROM code-with-deps as prod-dependencies
USER node
WORKDIR /usr/src/app

RUN --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/tmp/.yarn \
    yarn workspaces focus --production @hedgedoc/backend

## Stage 3: Final image, only production dependencies
FROM base as prod

LABEL org.opencontainers.image.title='HedgeDoc production backend image'
LABEL org.opencontainers.image.url='https://hedgedoc.org'
LABEL org.opencontainers.image.source='https://github.com/hedgedoc/hedgedoc'
LABEL org.opencontainers.image.documentation='https://github.com/hedgedoc/hedgedoc/blob/develop/docs/content/dev/docker.md'
LABEL org.opencontainers.image.licenses='AGPL-3.0'

USER node
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --chown=node package.json package.json
COPY --chown=node --from=prod-dependencies /usr/src/app/node_modules ./node_modules

COPY --chown=node backend/package.json backend/package.json
COPY --chown=node --from=builder /usr/src/app/backend/dist backend/dist
COPY --chown=node backend/public backend/public

COPY --chown=node commons/package.json /usr/src/app/commons/package.json
COPY --chown=node --from=builder /usr/src/app/commons/dist commons/dist

WORKDIR /usr/src/app/backend
CMD  ["node", "dist/main.js"]
