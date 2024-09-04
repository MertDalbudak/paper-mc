FROM node:lts-alpine

RUN apk update && apk add --no-cache openjdk21-jre zip

WORKDIR /app

COPY . .

RUN npm i
RUN ["chmod", "+x", "./start.sh"]
ENTRYPOINT [ "npm", "start" ]; exit 0
