# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# Set proper permissions
RUN chown -R bun:bun /usr/src/app
RUN chmod -R 755 /usr/src/app

# Verify node_modules contents (for debugging)
RUN ls -la /usr/src/app/node_modules

# Switch to non-root user
USER bun

EXPOSE 3000/tcp

# Run the app with production flag set to false to include dev dependencies
ENTRYPOINT [ "bun", "run", "--production=false", "dev" ]