---
title: "Useful Docker Commands"
excerpt: "A short list of Docker commands I use most often."
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Here are Docker commands I use frequently while maintaining containers.

Add a host entry
: ```shell
docker run --add-host="localA:127.0.0.1"
```

List images
: ```shell
docker images
```

Build an image
: ```shell
docker build -t docker-whale .
```
The command uses the `Dockerfile` in the current directory and builds an image named `docker-whale`.

Remove an image
: ```shell
docker rmi
```

Remove a container
: ```shell
docker rm
```

Common `docker run` flags
: 
- `-t` assigns a pseudo-tty.
- `-i` keeps STDIN open for interactive use.
- `-d` runs in the background.
- `-P` maps exposed ports to the host.

Add port mapping to a running container
: ```shell
docker port jolly_sinoussi 5000 0.0.0.0:80
```

List running containers
: ```shell
docker ps
```

List all containers
: ```shell
docker ps -a
```

Restart a container
: ```shell
docker restart
```

View container logs (stdout/stderr)
: ```shell
docker logs
```

Inspect container configuration
: ```shell
docker inspect
```

Commit a container to an image
: ```shell
docker commit containerid image_id
```

Exec into a running container
: ```shell
docker exec -ti <docker_name> /bin/bash
```
Or
```
docker attach
```

Export an image
: ```shell
docker save myimage:latest | gzip > myimage_latest.tar.gz
```

Import an image
: ```shell
docker load -i myimage_latest.tar.gz
```
Or
```
docker load < myimage_latest.tar.gz
```

Prune unused data
: ```shell
docker system prune
```
This removes stopped containers, unused volumes and networks, and dangling images.
```
docker system prune -a
```
The `-a` option removes all unused images, even those with tags.

Export all tagged images
: ```shell
docker save $(docker images --format '{{.Repository}}:{{.Tag}}') -o allinone.tar
```

Mount a local folder
: ```shell
-v /src/webapp:/dst/webapp
```

Restart policy
: ```shell
--restart always/unless-stopped/no/on-failure
```

Reference: [Docker documentation](https://docs.docker.com/engine/tutorials/usingdocker/)
