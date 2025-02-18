FROM node:lts-slim

ARG TARGETPLATFORM

RUN apt update && apt install wget zip -y
RUN if [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb && \
dpkg -i jdk-21_linux-x64_bin.deb && \
rm jdk-21_linux-x64_bin.deb; \
elif [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
wget https://download.oracle.com/java/21/latest/jdk-21_linux-aarch64_bin.tar.gz && \
tar -xzvf jdk-21_linux-aarch64_bin.tar.gz && \
rm jdk-21_linux-aarch64_bin.tar.gz && \
mkdir -p ~/.bin/java && \
mv jdk-21.0.6 ~/.bin/java && \
PATH="$HOME/.bin/java/jdk-21.0.6/bin:$PATH"; \
fi

WORKDIR /app

COPY . .

RUN npm i
RUN ["chmod", "+x", "./start.sh"]
ENTRYPOINT [ "npm", "start" ]; exit 0
