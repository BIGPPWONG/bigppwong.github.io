---
title: "将 OpenWrt Rootfs 打包为 Docker 镜像"
excerpt: "把 OpenWrt rootfs 压缩包打包成 Docker 镜像，用于旁路由部署。"
categories:
  - Docker
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

将 `openwrt-x86-64-generic-rootfs.tar.gz` 打包为 Docker 镜像，用于旁路由部署。

1. **获取 OpenWrt rootfs**
- 自行编译，或
- 从 [OpenWrt 官方下载](https://downloads.openwrt.org/releases/21.02.2/targets/x86/64/openwrt-21.02.2-x86-64-rootfs.tar.gz) 获取预编译的 rootfs

2. **重命名文件** 为 `OpenWrt.tar.gz`

3. **创建 `Dockerfile`**
```shell
FROM scratch
ADD OpenWrt.tar.gz /
EXPOSE 80 443 22
CMD ["/sbin/init"]
```

4. **构建镜像**
```shell
docker build -t myopenwrt .
```
此时镜像已经可用，但默认的防火墙和 IP 配置会导致网络不通。需要更新以下配置文件。

5. **将以下文件保存到 `Dockerfile` 同级目录**

| 文件 | 用途 |
| ---- | ------- |
| [turboacc](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/turboacc) | 关闭流量卸载 |
| [dhcp](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/dhcp) | 关闭 DHCP |
| [firewall](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/firewall) | 旁路由防火墙规则 |
| [inittab](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/inittab) | 启动服务 |
| [network](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/network) | 容器 IP、网关、DNS |
| [rc.local](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/rc.local) | 启动时重写 `resolv.conf` |
| [resolv.conf](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/resolv.conf) | DNS 配置 |

**注意：** 部分上级路由的 NAT 实现方式不同。如果 OpenWrt 本身正常但下游设备无法上网，请在 OpenWrt 防火墙设置中开启 **IP 伪装（MASQUERADE）**。如果不开启也能正常使用，则保持关闭。

6. **替换 `Dockerfile` 内容**
```shell
FROM scratch
ADD OpenWrt.tar.gz /
COPY turboacc /etc/config/turboacc
COPY dhcp /etc/config/dhcp
COPY firewall /etc/config/firewall
COPY network /etc/config/network
COPY resolv.conf /root/resolv.conf
COPY rc.local /etc/rc.local
COPY inittab /etc/inittab
EXPOSE 80 443 22
CMD ["/sbin/init"]
```

7. **重新构建镜像**
```shell
docker build -t myopenwrt .
```

8. **运行并测试旁路由**
