FROM node:20.17-alpine3.19 as builder

WORKDIR /app

RUN npm install -g @angular/cli
RUN apk add --no-cache bash

COPY . .

EXPOSE 3333
