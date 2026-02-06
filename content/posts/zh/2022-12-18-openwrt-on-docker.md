---
title: "在 Docker 中运行 OpenWrt"
excerpt: "使用 Docker 运行 OpenWrt 的教程。"
categories:
  - Openwrt
author: BIGWONG Studio
coverImage: /pixai/unsplash.jpg
---

### 本方案原理：
使用 Docker 的 macvlan 网络虚拟化一个二层网卡，作为容器的物理网卡使用。

**Docker 固件用户名/密码：** `root`/`password`

**固件链接：** [raymondwong/openwrt_r9](https://hub.docker.com/r/raymondwong/openwrt_r9)

### 重要！请确保你的局域网在 `192.168.1.0/24` 网段

### 方式一：Shell 命令
```shell
ip link set [你的网卡名，例如 eth0] promisc on
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=[你的网卡名] macnet
docker run --restart always -d --network macnet --privileged -v /lib/modules:/lib/modules raymondwong/openwrt_r9:autobuild-22.2.12-arm64
```
**注：** 如果运行在 X86 机器上，请切换为 `autobuild-22.2.12-x86_64`。
打开 [http://192.168.1.254](http://192.168.1.254)，测试是否部署成功。

### 方式二：Docker Compose
```shell
ip link set [你的网卡名，例如 eth0] promisc on
mkdir openwrt&&cd openwrt
# 将下方代码复制到 'docker-compose.yaml'，并修改 `driver_opts: parent` 值为你的网卡名
docker-compose up -d
```
**注：**
如果运行在 X86 机器上，请切换为 `autobuild-22.2.12-x86_64`。
打开 [http://192.168.1.254](http://192.168.1.254)，测试是否部署成功。

**docker-compose.yaml：**

```yaml
version: '2'
services:
  openwrt:
    image: raymondwong/openwrt_r9:autobuild-22.2.12-arm64
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

**注：** 本教程为单虚拟网卡方案。如果部分插件工作异常，可以尝试添加 2 张虚拟网卡来模拟真实路由。
