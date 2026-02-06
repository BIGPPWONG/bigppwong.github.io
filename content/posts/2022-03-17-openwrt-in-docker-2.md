---
title: "将编译好的OpenWrt镜像转换为Docker镜像"
excerpt: "将openwrt-x86-64-generic-rootfs.tar.gz系统文件打包成Docker镜像，以便进行旁路由部署"
categories:
  - Docker
  - OpenWrt
author: 剧烈燃烧的CO2
coverImage: /pixai/unsplash.jpg
---

将openwrt-x86-64-generic-rootfs.tar.gz系统文件打包成Docker镜像，以便进行旁路由部署

1. **获取OpenWrt系统文件**
- 自己编译系统文件
- 从[OpenWrt官方下载](https://downloads.openwrt.org/releases/21.02.2/targets/x86/64/openwrt-21.02.2-x86-64-rootfs.tar.gz)预编译文件
2. **将下载下来的文件重命名为**`OpenWrt.tar.gz`
3. **将下面代码保存为Dockerfile文件**
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
理论上来说到这一步Docker镜像就已经制作完成了，但由于OP默认的防火墙和IP设置，直接运行镜像会导致网络崩溃，所以接下来还要修改一些配置
5. **将下面几个文件保存到Dockerfile同一目录**

    | 文件 | 用途 |
| ---- | ---- |
| [turboacc](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/turboacc) | 关闭flow offloading |
| [dhcp](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/dhcp) | 关闭dhcp |
| [firewall](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/firewall) | 配置旁路由所需规则 |
| [inittab](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/inittab) | 开机启动所需项目 |
| [network](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/network) | 配置容器IP、网关、DNS |
| [rc.local](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/rc.local) | 开机重写resolv.conf |
| [resolv.conf](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/resolv.conf) | 修改本机DNS |

    **注意事项:** 不同厂家硬路由防火墙对NAT实现方式不同，如遇到OP本身网络没问题，但下游设备无法上网，可在防火墙配置界面开启**IP伪装MASQUERADE**，如不设置也正常，则不建议开启
    {: .notice--info}

6. **使用下列代码替换Dockerfile文件**
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
8. **运行旁路由测试**
