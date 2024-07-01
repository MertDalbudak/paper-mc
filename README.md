# paper-mc

`mertdalbudak/paper-mc` will download the latest paper version from the official paper website. Once downloaded it will create a backup before installing and running the latest version.

Executable in server directory needs to be named `paper.jar`

#### This container requires 2 mountpoints
1. Location of the server bind to `/app/server`
2. Location of backups bind to `/app/backups`

### Important

Use `alpine` tag for `Java 21`

#### Do not use the `latest` tag because the highest Java version supported by Debian Bookworm is `Java 17`, while the latest Paper version requires at least `Java 21`

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

View github repository: [MertDalbudak/paper-mc](https://github.com/MertDalbudak/paper-mc)
