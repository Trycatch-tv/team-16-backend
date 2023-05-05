# Author: Jorge Garcia - George the Penguin <mr-george@georgethepenguin.dev>
# Creation date: 05-02-2023
# Description: Dockerfile for the NodeJS backend application

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010

CMD ["npm", "start"]


