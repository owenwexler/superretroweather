FROM oven/bun:alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# --- Framework Specific Configurations ---

# For Next.js / TanStack Start:
RUN rm -rf node_modules && bun install --frozen-lockfile && bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
