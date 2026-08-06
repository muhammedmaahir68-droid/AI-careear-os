# ==============================================================================
# Frontend Dockerfile - AI Career OS (Vite React SPA)
# Multi-stage production build serving static assets via Nginx
# ==============================================================================

# Stage 1: Build Vite React SPA application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve static files with Nginx Alpine
FROM nginx:alpine AS runner

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built SPA static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA routing & reverse proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check to ensure Nginx web server is responsive
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
