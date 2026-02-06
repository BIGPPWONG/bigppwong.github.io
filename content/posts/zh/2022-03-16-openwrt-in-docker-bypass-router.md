---
title: "在 Docker 中运行 OpenWrt（旁路由）"
excerpt: "使用 Docker macvlan 网络将 OpenWrt 作为旁路由部署到局域网中。"
categories:
  - OpenWrt
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

**原理：** 使用 Docker macvlan 虚拟化一个二层网卡给容器使用，类似于虚拟机的桥接网卡。

**默认账密：** `root` / `password`

**镜像：** [raymondwong/openwrt_r9](https://hub.docker.com/r/raymondwong/openwrt_r9)

### 方式一：Shell 命令

```shell
ip link set [你的网卡名，例如 eth0] promisc on
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=[同上网卡名] macnet
docker run --restart always -d --network macnet --privileged -v /lib/modules:/lib/modules raymondwong/openwrt_r9:autobuild-21.12.6-arm64
```
等待容器状态变为 `running`，然后打开 [http://192.168.1.254](http://192.168.1.254) 验证是否部署成功。

### 方式二：Docker Compose

```shell
ip link set [你的网卡名，例如 eth0] promisc on
mkdir openwrt && cd openwrt
# 将下方 YAML 内容保存为 docker-compose.yaml，然后修改 driver_opts.parent 为你的网卡名
# 在同一目录下运行：
docker-compose up -d
```
等待容器状态变为 `running`，然后打开 [http://192.168.1.254](http://192.168.1.254) 验证是否部署成功。

**docker-compose.yaml**
```yaml
version: '2'
services:
  openwrt:
    image: raymondwong/openwrt_r9:21.2.1-arm64
    container_name: openwrt_r9
    privileged: true
    restart: always
    networks:
      openwrt_macnet:
        ipv4_address: 192.168.1.254

networks:
  openwrt_macnet:
    driver: macvlan
    driver_opts:
      parent: en0
    ipam:
      config:
        - subnet: 192.168.1.0/24
          ip_range: 192.168.1.128/25
          gateway: 192.168.1.1
```

**注意：** 本方案为单网卡方案。如果部分插件工作异常，可以尝试添加第二张虚拟网卡来模拟真实路由器。
