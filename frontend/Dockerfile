# Use an official Node.js runtime as the base image
# Dockerfile for Frontend client

# Build react client
FROM node:20-alpine as builder

# Working directory be app
WORKDIR /app

COPY package.json ./

###  Installing dependencies
RUN npm install --silent --legacy-peer-deps

# copy local files to app folder
COPY . .

EXPOSE 3000

RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]