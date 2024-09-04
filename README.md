[![Docker Image CI](https://github.com/MertDalbudak/paper-mc/actions/workflows/docker-image.yml/badge.svg)](https://github.com/MertDalbudak/paper-mc/actions/workflows/docker-image.yml)


# paper-mc

`mertdalbudak/paper-mc` will download the latest paper version from the official paper website. Once downloaded it will create a backup before installing and running the latest version.

Executable in server directory is named `paper.jar`

#### This container requires 2 mountpoints
1. Location of the server bind to `/app/server`
2. Location of backups bind to `/app/backups`

#### Example compose.yaml:
```compose.yaml
services:
  app:
    image: mertdalbudak/paper-mc:alpine
    ports:
      - 25565:25565
    volumes:
      - /home/user/server:/app/server
      - /home/user/backup:/app/backups
    environment:
      - Xms=1G
      - Xmx=3G
```
###### [Oracle Java 21](https://www.oracle.com/de/java/technologies/downloads/#java21) used for the debian based (`latest`) image
###### [openjdk21-jre](https://pkgs.alpinelinux.org/packages?name=openjdk21-jre&branch=v3.20&repo=&arch=&maintainer=) used for the alpine based (`alpine`) image

View github repository: [MertDalbudak/paper-mc](https://github.com/MertDalbudak/paper-mc)
