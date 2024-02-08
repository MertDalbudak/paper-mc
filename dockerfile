FROM ubuntu
FROM node:lts-slim

RUN apt update && apt install openjdk-17-jre-headless zip -y

WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT [ "npm", "start" ]; exit 0