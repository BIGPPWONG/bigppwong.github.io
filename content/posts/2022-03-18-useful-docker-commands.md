---
title: "Useful Docker Commands"
excerpt: "Frequently used Docker commands for day-to-day maintenance."
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

A practical quick list of useful Docker commands.

```shell
docker run --add-host="localA:127.0.0.1"
docker images
docker build -t docker-whale .
docker rmi
docker rm
docker ps
docker ps -a
docker restart
docker logs
docker inspect
docker commit <container_id> <image_id>
docker exec -ti <docker_name> /bin/bash
docker attach
```

Export/import images:

```shell
docker save myimage:latest | gzip > myimage_latest.tar.gz
docker load -i myimage_latest.tar.gz
docker load < myimage_latest.tar.gz
```

Cleanup:

```shell
docker system prune
docker system prune -a
```

Export all tagged local images:

```shell
docker save $(docker images --format '{{.Repository}}:{{.Tag}}') -o allinone.tar
```

Other common options:
- `-t` allocate pseudo-TTY
- `-i` keep STDIN interactive
- `-d` run in background
- `-P` publish exposed ports

Reference: [Docker docs](https://docs.docker.com/engine/tutorials/usingdocker/)
