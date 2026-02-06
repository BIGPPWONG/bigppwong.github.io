---
title: "Build an OpenWrt Side Router with Docker"
excerpt: "Use Docker macvlan mode to run OpenWrt as a side router."
categories:
  - Networking
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

**Principle:** This solution uses Docker `macvlan` to create a Layer-2 virtual NIC for the container, similar to bridge mode in a VM.

**Default credentials:** `root` / `password`

**Image:** [raymondwong/openwrt_r9](https://hub.docker.com/r/raymondwong/openwrt_r9)

### Option 1: CLI

```shell
ip link set [your local NIC, e.g. eth0] promisc on
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=[same NIC as above] macnet
docker run --restart always -d --network macnet --privileged -v /lib/modules:/lib/modules raymondwong/openwrt_r9:autobuild-21.12.6-arm64
```

After the container is running, open [http://192.168.1.254](http://192.168.1.254) to verify deployment.

### Option 2: Docker Compose

```shell
ip link set [your local NIC, e.g. eth0] promisc on
mkdir openwrt && cd openwrt
# create docker-compose.yaml from below, then run:
docker-compose up -d
```

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

> Note: This is a single-NIC virtual router setup. If some plugins do not work correctly, try adding a second virtual NIC.
