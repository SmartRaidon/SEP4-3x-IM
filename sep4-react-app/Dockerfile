FROM node:20-alpine AS build

WORKDIR /app

# package files
COPY package*.json ./
RUN npm install

# whole project
COPY . .
RUN npm run build

# serve stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]