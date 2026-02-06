---
title: "动态 IPv6 前缀下的端口转发"
excerpt: "ISP 前缀变化时如何编写 ip6tables 规则。"
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

ISP 通常分配 **动态** IPv6 前缀，这意味着内网主机的地址会随前缀变化。以下介绍如何针对这种情况编写 ip6tables 规则。

**IPv4 掩码**
掩码是从高位开始连续的 1。
```
192.168.0.0/16
```
`/16` 表示前两个字节固定。

**IPv6 掩码**
IPv6 的一个关键区别是掩码可以从 **0** 开始。要匹配内网主机但忽略 ISP 前缀，可以使用一个以 16 个零开头的掩码。

示例公网前缀：`2a01:4f8:1c1c:4c96`
```
ip6tables -I FORWARD -d 2a01:4f8:1c1c:4c96:aaaa:bbbb:cccc:dddd/0000:0000:0000:0000:ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```
或者使用 `::` 缩写前缀部分：
```
ip6tables -I FORWARD -d ::aaaa:bbbb:cccc:dddd/::ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```
这两条规则是等价的。
