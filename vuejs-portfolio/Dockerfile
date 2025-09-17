# Multi-stage build for Vue.js frontend
FROM node:18-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine as production-stage

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built assets from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy PWA manifest, icons, and CV
COPY public/manifest.json /usr/share/nginx/html/
COPY public/icons/ /usr/share/nginx/html/icons/
COPY public/cv/ /usr/share/nginx/html/cv/
COPY public/favicon.svg /usr/share/nginx/html/

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
