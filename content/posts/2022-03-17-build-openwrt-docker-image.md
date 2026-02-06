---
title: "Convert a Compiled OpenWrt RootFS into a Docker Image"
excerpt: "Package OpenWrt rootfs into Docker and adjust configs for side-router usage."
categories:
  - Docker
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

This guide packages `openwrt-x86-64-generic-rootfs.tar.gz` into a Docker image for side-router deployment.

1. Get the OpenWrt rootfs:
   - Build it yourself, or
   - Download from OpenWrt: [openwrt-21.02.2-x86-64-rootfs.tar.gz](https://downloads.openwrt.org/releases/21.02.2/targets/x86/64/openwrt-21.02.2-x86-64-rootfs.tar.gz)
2. Rename it to `OpenWrt.tar.gz`
3. Create a `Dockerfile`:

```dockerfile
FROM scratch
ADD OpenWrt.tar.gz /
EXPOSE 80 443 22
CMD ["/sbin/init"]
```

4. Build image:

```shell
docker build -t myopenwrt .
```

At this point the image is buildable, but default firewall and network settings can break your network. Continue with custom configs.

5. Save these files in the same directory as your `Dockerfile`:

| File | Purpose |
| ---- | ---- |
| [turboacc](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/turboacc) | Disable flow offloading |
| [dhcp](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/dhcp) | Disable DHCP |
| [firewall](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/firewall) | Side-router firewall rules |
| [inittab](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/inittab) | Boot startup items |
| [network](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/network) | Container IP / gateway / DNS |
| [rc.local](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/rc.local) | Rewrite `resolv.conf` at boot |
| [resolv.conf](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/resolv.conf) | Local DNS settings |

6. Replace the Dockerfile with:

```dockerfile
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

7. Rebuild:

```shell
docker build -t myopenwrt .
```

8. Run and validate as a side router.
