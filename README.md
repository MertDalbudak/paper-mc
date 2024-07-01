# PAPER-MC

`mertdalbudak/paper-mc` will download the latest paper version from the official paper website. Once downloaded it will create a backup before installing and running the newer version.

Executable in server directory needs to be named `paper.jar`

This container requires 2 mountpoints.
1. Location of the server bind to `/app/server`
2. Location of backups bind to `/app/backups`

Uses `Java` version 21 (headless)

<b>Use `alpine` tag for `Java 21`</b>

<b>Do not use the `latest` tag because the highest Java version supported by Debian Bookworm is `Java 17`, while the latest Paper version requires at least `Java 21`</b>
<br>

services:
  app:
    image: mertdalbudak/paper-mc:alpine
    ports:
      - 25565:25565
    volumes:
      - /home/mert/server:/app/server
      - /home/mert/backup:/app/backups
    environment:
      - Xms=1G
      - Xmx=3G

View github repository: [MertDalbudak/paper-mc](https://github.com/MertDalbudak/paper-mc)