FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# Serve using nginx
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
