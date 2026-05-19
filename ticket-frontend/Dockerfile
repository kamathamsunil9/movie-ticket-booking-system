# 1. You MUST have 'as build' here so the next stage knows what 'build' is
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:alpine
# Copy from the 'build' stage defined above
COPY --from=build /app/build /usr/share/nginx/html 

# Copy your new config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]