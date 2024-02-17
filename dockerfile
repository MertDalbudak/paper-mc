FROM alpine:latest

RUN apk update && apk add --no-cache openjdk17-jre-headless nodejs npm zip

WORKDIR /app

COPY . .

RUN npm i
RUN ["chmod", "+x", "./start.sh"]
ENTRYPOINT [ "npm", "start" ]; exit 0