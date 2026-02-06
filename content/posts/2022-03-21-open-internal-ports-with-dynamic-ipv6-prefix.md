---
title: "Open Internal Ports with a Dynamic IPv6 Prefix"
excerpt: "Write ip6tables rules that ignore changing ISP IPv6 prefixes."
categories:
  - Linux
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

ISP IPv6 prefixes are usually dynamic. This changes LAN host global IPv6 addresses as well.

### IPv4 mask (classic)
A continuous number of leading `1` bits, e.g.:

```text
192.168.0.0/16
```

### IPv6 mask trick for dynamic prefixes
In IPv6, you can mask the prefix out by starting with zeros in the mask part.

If your full destination is `2a01:4f8:1c1c:4c96:aaaa:bbbb:cccc:dddd`, and you want to ignore the first 64 bits:

```shell
ip6tables -I FORWARD -d 2a01:4f8:1c1c:4c96:aaaa:bbbb:cccc:dddd/0000:0000:0000:0000:ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```

Equivalent short form:

```shell
ip6tables -I FORWARD -d ::aaaa:bbbb:cccc:dddd/::ffff:ffff:ffff:ffff -p tcp --dport 22 -j ACCEPT
```

Both commands are functionally the same.
