---
title: "Port Forwarding with Dynamic IPv6 Prefix"
excerpt: "How to write ip6tables rules when your ISP prefix changes."
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

ISPs usually assign a **dynamic** IPv6 prefix, which means your internal host addresses change with the prefix. Here is how to write ip6tables rules for this case.

**IPv4 mask**
The mask is a number of continuous 1-bits from the start.
```
192.168.0.0/16
```
A `/16` means the first two octets are fixed.

**IPv6 mask**
In IPv6, a key difference is that the mask can start with **0** bits. To match internal hosts while ignoring the ISP prefix, you can use a mask that starts with 16 zeros.

Example public prefix: `2a01:4f8:1c1c:4c96`
```
ip6tables -I FORWARD -d 2a01:4f8:1c1c:4c96:aaaa:bbbb:cccc:dddd/0000:0000:0000:0000:ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```
Or use `::` to shorten the prefix part:
```
ip6tables -I FORWARD -d ::aaaa:bbbb:cccc:dddd/::ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```
These two rules are equivalent.
