---
title: "pfSense 为 Xbox 配置 Open NAT（双重 NAT 环境）"
excerpt: "在双重 NAT 移动宽带环境下配置 pfSense，实现 Xbox/PS 的 Open NAT。"
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

本文介绍如何在双重 NAT 移动宽带环境下，让 Xbox 在 pfSense 上获得 **Open NAT**。此方法同样适用于 PlayStation 和其他需要 Open NAT 的设备。

如果你对原理感兴趣，可以参考 [Easy NAT（端点无关 NAT 映射）](https://tailscale.com/blog/how-nat-traversal-works/)。

获得 Open NAT 需要两个条件：
1. NAT 映射
2. 开放防火墙端口

如果图片模糊，请在新标签页中打开查看。

## 修复 NAT 映射
默认情况下，pfSense 会随机化源端口，导致每次连接使用不同的端口。

- 进入 **Firewall > NAT > Outbound**
- 找到 **Outbound NAT Mode**，选择 **Hybrid Outbound NAT**
- 点击 **Save**

![Outbound NAT Mode](/post-images/pfsense-opennat-1.png)

- 在 **Mappings** 下添加一条规则
- 按下图配置。将 **Source** 设为 Xbox 的局域网 IP，掩码为 32。在 **Translation** 中勾选 **Static Port**。

![Static Port Rule](/post-images/pfsense-opennat-2.png)

- 点击 **Save**，如有提示则点击 **Apply Changes**

你也可以通过 `1:1 NAT` 实现，但这会带来不必要的暴露和流量。

## 启用自动端口开放（UPnP）
pfSense 内置的 miniupnp 在 WAN IP 为私有地址时（国内常见）会拒绝工作。可以用以下方法解决：

- 进入 **Services > UPnP & NAT-PMP**
- 按下图配置 **UPnP & NAT-PMP Settings**，将 **Override WAN address** 设为任意 **公网** IP

![UPnP Settings](/post-images/pfsense-upnp-1.png)

- **不要** 启用 STUN
- 在 **UPnP Access Control Lists** 中，设置 **ACL Entries** 为：
```
allow 1024-65535 192.168.1.151/32 1024-65535
```
将 `192.168.1.151` 替换为你的 Xbox IP。

![UPnP ACL](/post-images/pfsense-upnp-2.png)

- 点击 **Save**，如有提示则点击 **Apply Changes**
- 在 Xbox 上运行 NAT 测试，然后在 pfSense 的 **Status > UPnP & NAT-PMP** 中确认映射

这本质上是欺骗 miniupnp，让它以为你有公网 IP。实际上确实能让 Xbox 切换到 Open NAT，但它也会将假 IP 返回给客户端，具体影响尚不明确。
