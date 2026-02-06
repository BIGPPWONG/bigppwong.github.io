---
title: "Run OpenWrt in Docker (Bypass Router)"
excerpt: "Use Docker macvlan to run OpenWrt as a bypass router on your LAN."
categories:
  - OpenWrt
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

**Principle:** Use Docker macvlan to virtualize a Layer-2 NIC for the container, similar to a bridged NIC in a VM.

**Default credentials:** `root` / `password`

**Image:** [raymondwong/openwrt_r9](https://hub.docker.com/r/raymondwong/openwrt_r9)

### Option 1: Shell Command
```shell
ip link set [your NIC, e.g. eth0] promisc on
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=[same NIC as above] macnet
docker run --restart always -d --network macnet --privileged -v /lib/modules:/lib/modules raymondwong/openwrt_r9:autobuild-21.12.6-arm64
```
Wait until the container is `running`, then open [http://192.168.1.254](http://192.168.1.254) to verify.

### Option 2: Docker Compose
```shell
ip link set [your NIC, e.g. eth0] promisc on
mkdir openwrt && cd openwrt
# Save the YAML below as docker-compose.yaml, then edit driver_opts.parent to your NIC
# In the same folder, run:
docker-compose up -d
```
Wait until the container is `running`, then open [http://192.168.1.254](http://192.168.1.254) to verify.

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

**Note:** This is a single-NIC solution. If some plugins misbehave, try adding a second virtual NIC to simulate a real router.
