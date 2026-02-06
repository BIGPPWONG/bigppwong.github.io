---
title: "Openwrt in Docker"
excerpt: "Here is a tutorial for running openwrt with docker"
categories:
  - Openwrt
author: BIGWONG Studio
coverImage: /pixai/unsplash.jpg
---

### Principle of this solution:
Use the macvlan network of docker to virtualize a layer 2 network card, as the physical network card of the container

**Docker Firmware Username/Password：**  `root`/`password`

**Firmware Link:** [raymondwong/openwrt_r9](https://hub.docker.com/r/raymondwong/openwrt_r9)

### IMPORTANT! Make sure your local network is on `192.168.1.0/24` subnet

### Option 1: Shell Command
```shell
ip link set [your network card, such as eth0] promisc on
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=[your network card] macnet
docker run --restart always -d --network macnet --privileged -v /lib/modules:/lib/modules raymondwong/openwrt_r9:autobuild-22.2.12-arm64
```
**PS:** Switch to `autobuild-22.2.12-x86_64` if running on X86 machine.
Open [http://192.168.1.254](http://192.168.1.254), test whether the deployment was successful

### Option 2: (Docker Compse):
```shell
ip link set [your network card, such as eth0] promisc on
mkdir openwrt&&cd openwrt
# copy below code to 'docker-compose.yaml', and modify `driver_opts: parent` value to your nic
docker-compose up -d
```
**PS:**
Switch to `autobuild-22.2.12-x86_64` if running on X86 machine.
Open [http://192.168.1.254](http://192.168.1.254), test whether the deployment was successful

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

**PS：** This tutorial solution is a single virtual network card solution. If some plug-ins are not working properly, you can try to add 2 virtual network cards to simulate real routing
