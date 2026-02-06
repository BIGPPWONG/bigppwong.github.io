---
title: "Convert an OpenWrt Rootfs to a Docker Image"
excerpt: "Package an OpenWrt rootfs tarball into a Docker image for bypass-router deployments."
categories:
  - Docker
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Package `openwrt-x86-64-generic-rootfs.tar.gz` into a Docker image for a bypass-router setup.

1. **Get the OpenWrt rootfs**
- Build it yourself, or
- Download a prebuilt rootfs from [OpenWrt releases](https://downloads.openwrt.org/releases/21.02.2/targets/x86/64/openwrt-21.02.2-x86-64-rootfs.tar.gz)

2. **Rename the file** to `OpenWrt.tar.gz`

3. **Create a `Dockerfile`**
```shell
FROM scratch
ADD OpenWrt.tar.gz /
EXPOSE 80 443 22
CMD ["/sbin/init"]
```

4. **Build the image**
```shell
docker build -t myopenwrt .
```
At this point the image is ready, but the default firewall and IP settings will break the network when you run it. Update configs below.

5. **Save the following files** in the same folder as the `Dockerfile`

| File | Purpose |
| ---- | ------- |
| [turboacc](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/turboacc) | Disable flow offloading |
| [dhcp](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/dhcp) | Disable DHCP |
| [firewall](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/firewall) | Bypass-router firewall rules |
| [inittab](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/inittab) | Startup services |
| [network](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/network) | Container IP, gateway, DNS |
| [rc.local](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/rc.local) | Rewrite `resolv.conf` on boot |
| [resolv.conf](https://raw.githubusercontent.com/bigppwong/test_build/main/docker/resolv.conf) | DNS config |

**Note:** Some upstream routers implement NAT differently. If OpenWrt itself works but downstream devices cannot access the internet, enable **IP masquerade (MASQUERADE)** in OpenWrt firewall settings. If it already works without it, keep it off.

6. **Replace `Dockerfile` content**
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

7. **Rebuild the image**
```shell
docker build -t myopenwrt .
```

8. **Run and test your bypass router**
