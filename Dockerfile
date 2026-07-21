# Lock to the final Zig-based stable release
FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# --- Framework Specific Configurations ---

# For Next.js / TanStack Start:
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
