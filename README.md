# PAPER-MC

`mertdalbudak/paper-mc` will download the latest paper version from the official paper website. Once downloaded it will create a backup before installing and running the newer version.

Executable in server directory needs to be named `paper.jar`

This container requires 2 mountpoints.
1. Location of the server bind to `/app/server`
2. Location of backups bind to `/app/backups`

Uses `Java` version 17 (headless)
