---
title: "常用 Docker 命令速查"
excerpt: "我最常用的 Docker 命令汇总。"
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

以下是我在维护容器时最常用的 Docker 命令。

添加 hosts 记录
: ```shell
docker run --add-host="localA:127.0.0.1"
```

查看镜像列表
: ```shell
docker images
```

构建镜像
: ```shell
docker build -t docker-whale .
```
该命令使用当前目录中的 `Dockerfile` 构建名为 `docker-whale` 的镜像。

删除镜像
: ```shell
docker rmi
```

删除容器
: ```shell
docker rm
```

常用 `docker run` 参数
:
- `-t` 分配一个伪终端。
- `-i` 保持 STDIN 打开，用于交互。
- `-d` 后台运行。
- `-P` 将暴露的端口映射到宿主机。

为运行中的容器添加端口映射
: ```shell
docker port jolly_sinoussi 5000 0.0.0.0:80
```

查看运行中的容器
: ```shell
docker ps
```

查看所有容器
: ```shell
docker ps -a
```

重启容器
: ```shell
docker restart
```

查看容器日志（stdout/stderr）
: ```shell
docker logs
```

查看容器配置
: ```shell
docker inspect
```

将容器提交为镜像
: ```shell
docker commit containerid image_id
```

进入运行中的容器
: ```shell
docker exec -ti <docker_name> /bin/bash
```
或者
```
docker attach
```

导出镜像
: ```shell
docker save myimage:latest | gzip > myimage_latest.tar.gz
```

导入镜像
: ```shell
docker load -i myimage_latest.tar.gz
```
或者
```
docker load < myimage_latest.tar.gz
```

清理未使用的数据
: ```shell
docker system prune
```
这会删除已停止的容器、未使用的卷和网络，以及悬空的镜像。
```
docker system prune -a
```
`-a` 选项会删除所有未使用的镜像，包括有标签的。

导出所有带标签的镜像
: ```shell
docker save $(docker images --format '{{.Repository}}:{{.Tag}}') -o allinone.tar
```

挂载本地目录
: ```shell
-v /src/webapp:/dst/webapp
```

重启策略
: ```shell
--restart always/unless-stopped/no/on-failure
```

参考文档：[Docker 官方文档](https://docs.docker.com/engine/tutorials/usingdocker/)
