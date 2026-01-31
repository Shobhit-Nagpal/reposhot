# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/reposhot /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
