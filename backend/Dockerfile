# ==============================================================================
# Backend Dockerfile - AI Career OS (Node.js / Express / TypeScript)
# Multi-stage production build with security hardening & health checks
# ==============================================================================

# Stage 1: Build TypeScript application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm ci

# Copy source code and build TypeScript
COPY . .
RUN npm run build

# Prune non-production dependencies to optimize image size
RUN npm prune --production

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production

# Copy package descriptors and built artifacts from builder stage
COPY package*.json ./
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

# Use non-root user for security best practices
USER node

# Expose backend application port
EXPOSE 5000

# Health check to monitor backend service availability
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start Node.js Express server
CMD ["node", "dist/server.js"]
