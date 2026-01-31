# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/reposhot /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
