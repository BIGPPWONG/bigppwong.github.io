---
title: "SLAAC：IPv6 地址与 DNS 分配机制"
excerpt: "IPv6 地址和 DNS 在 SLAAC 和 DHCPv6 方案下的分配方式。"
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

IPv6 现在已经很普及了，但在搭建家庭网络时仍然容易踩坑。本文总结了关键概念和常见问题。

**IPv6 前缀**
由 ISP 分配的公网前缀。你可以通过 DHCP 或 SLAAC 将地址分配给下游设备。

**IPv6 地址的组成**
`IPv6 前缀` + `接口标识符`

**接口标识符的生成方式**
- **有状态**：由 `DHCPv6` 服务器分配地址。
- **无状态（SLAAC）**：客户端根据 MAC 地址通过 `EUI-64` 算法自动生成。

**EUI-64**
一种根据 MAC 地址生成接口标识符的方法。
![EUI-64](https://cdn.networkacademy.io/sites/default/files/inline-images/generating-link-local-address-example.png "EUI-64")

**SLAAC 流程**
1. 使用链路本地前缀 + EUI-64 生成链路本地地址（例如 `fe80::1`）。
2. 执行重复地址检测（DAD）确保地址不冲突。
3. 向组播地址 `FF02::2` 发送路由器请求（RS）。
4. 路由器回复路由器通告（RA），包含公网前缀和前缀长度（通常 <= 64）。
5. 客户端将公网前缀 + EUI-64 组合为全局 IPv6 地址。
6. DNS 仍然缺失，客户端通过 DHCP 获取 DNS。

**总结：** SLAAC 提供地址，但 DNS 仍然来自 DHCP。

**DHCPv6 流程**
与 DHCPv4 类似。

**RA 标志位（路由器通告）**
这些标志告诉客户端从哪里获取 IPv6 地址和 DNS。

| M 标志 | O 标志 | 结果 |
| ----- | ----- | ------ |
| 1 |  | 地址和 DNS 均通过 DHCPv6 获取 |
| 0 | 1 | 地址通过 SLAAC 获取，DNS 通过 DHCPv6 获取 |
| 0 | 0 | 无 DHCPv6 服务器 |

**Prf 标志**
路由器优先级：低（1）、中（0）、高（3）。如果存在多个路由器，客户端根据此值选择。

**参考资料**
- [networkacademy.io](https://www.networkacademy.io/ccna/ipv6/stateless-address-autoconfiguration-slaac)
- [IPv6（维基百科）](https://en.wikipedia.org/wiki/IPv6)
