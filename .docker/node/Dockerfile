FROM node:20-alpine

RUN apk add --no-cache bash && corepack enable

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "start:dev"]
