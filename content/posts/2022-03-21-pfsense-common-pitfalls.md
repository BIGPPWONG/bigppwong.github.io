---
title: "pfSense Pitfalls and Important Settings"
excerpt: "Common configuration details that can cause strange network issues."
categories:
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

## MTU / MSS
In PPPoE environments, set WAN `MTU` to `max ping payload + 28`, and usually set `MSS` to the same value.

- **Interfaces > WAN**
- Adjust **MTU** and **MSS**

![](/post-images/pfsense-mtu.png)

On Windows, test max payload with:

```shell
ping baidu.com -l 1464
```

Increase/decrease to find the largest value that succeeds.

## Disable hardware checksum offload (VM case)
If pfSense runs in VM with VirtIO NIC, disable `Disable hardware checksum offload` to avoid incorrect firewall blocking.

- **System > Advanced > Networking**
- Enable **Disable hardware checksum offload**
- Save and reboot

![](https://docs.netgate.com/pfsense/en/latest/_images/screen_shot_2017-06-30_at_18.51.25.png)

You can also experiment with `TCP segmentation offload` and `large receive offload` based on observed issues.

## PPPoE IPv6 setup
### WAN
- **Interfaces > WAN**
- In **DHCP6 Client Configuration**, enable:
  - **Use IPv4 connectivity as parent interface**
  - **Request only an IPv6 prefix**
- Optional prefix delegation size: `60`
- Uncheck **Block private networks and loopback addresses**

![](/post-images/wan-dhcp6.png)

### LAN
- **Interfaces > LAN**
- Set **IPv6 Configuration Type** to **Track Interface**
- Set **IPv6 Interface** to **WAN**

![](/post-images/pfsense-lan-ipv6-1.png)
![](/post-images/pfsense-lan-ipv6-2.png)
