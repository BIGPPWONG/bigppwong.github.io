---
title: "pfSense 配置中容易忽略的坑"
excerpt: "这些容易被忽视的 pfSense 设置可能导致奇怪的网络问题。"
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

以下是容易被忽视的 pfSense 设置，如果没有正确配置，往往会导致各种奇怪的网络问题。

## MTU 设置
在 WAN 口需要手动设置 MTU。在 PPPoE 模式下，MTU 应该是 `最大 ping 包大小 + 28`（以太网头部）。MSS 设置为相同的值。

- 进入 **Interfaces > WAN**
- 在 **General Configuration** 中设置 **MTU** 和 **MSS**
- 点击 **Save**

![MTU](/post-images/pfsense-mtu.png)

可以在 Windows 中使用 `ping baidu.com -l 1464` 测试 MTU。如果能通，就增大包大小；如果不通，就减小，直到找到 **最大** 可用值。

## 禁用硬件校验和卸载
如果 pfSense 运行在虚拟机中，且网卡类型为 **VirtIO**（PVE 或群晖虚拟机），需要禁用 **硬件校验和卸载**。否则 pfSense 可能会错误地拦截正常流量。

- 进入 **System > Advanced > Networking**
- 在 **Networking Interfaces** 下勾选 **Disable hardware checksum offload**
- 点击 **Save**
- 重启 pfSense

![](https://docs.netgate.com/pfsense/en/latest/_images/screen_shot_2017-06-30_at_18.51.25.png)

你也可以尝试切换 **Disable hardware TCP segmentation offload** 和 **Disable hardware large receive offload**。硬件卸载可以降低 CPU 占用，所以只在遇到问题时才禁用。

## PPPoE IPv6 设置
### WAN
- 进入 **Interfaces > WAN**
- 在 **DHCP6 Client Configuration** 下勾选 **Use IPv4 connectivity as parent interface** 和 **Request only an IPv6 prefix**
- 将 **DHCPv6 Prefix Delegation size** 设为 60（或留空）
- 在 **Reserved Networks** 下取消勾选 **Block private networks and loopback addresses**
- 点击 **Save**

![WAN DHCP6](/post-images/wan-dhcp6.png)

### LAN
- 进入 **Interfaces > LAN**
- 在 **General Configuration** 中将 **IPv6 Configuration Type** 设为 **Track Interface**
- 在 **Track IPv6 Interface** 下选择 **WAN**
- 点击 **Save**

![LAN IPv6 1](/post-images/pfsense-lan-ipv6-1.png)
![LAN IPv6 2](/post-images/pfsense-lan-ipv6-2.png)

注意事项：
- 不勾选 **Use IPv4 connectivity as parent interface**，可能无法获取 IPv6。
- 不勾选 **Request only an IPv6 prefix**，LAN 的 IPv6 可能与路由器的公网 IPv6 冲突。
