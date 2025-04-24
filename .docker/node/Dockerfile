FROM node:20-alpine

RUN apk add --no-cache bash && corepack enable

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY . .

EXPOSE 3000
