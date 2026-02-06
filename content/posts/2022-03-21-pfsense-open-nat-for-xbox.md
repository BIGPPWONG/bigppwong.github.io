---
title: "Configure Open NAT on pfSense (Double NAT / Private WAN IP)"
excerpt: "A practical method to get Open NAT on Xbox under double NAT."
categories:
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

This method helps Xbox (and similar devices) achieve Open NAT when pfSense WAN itself is behind another NAT.

You need to solve two things:
1. NAT mapping behavior
2. Automatic firewall port opening

Reference reading: [What is Easy NAT?](https://tailscale.com/blog/how-nat-traversal-works/)

## 1) Fix NAT mapping
By default pfSense may randomize source ports.

- Go to **Firewall > NAT > Outbound**
- Set **Outbound NAT Mode** to **Hybrid Outbound NAT**
- Add a mapping for Xbox IP (mask `/32`)
- In **Translation**, enable **Static Port**

![](/post-images/pfsense-opennat-1.png)
![](/post-images/pfsense-opennat-2.png)

`1:1 NAT` can also work, but may increase unnecessary traffic and reduce security.

## 2) Enable automatic firewall port opening
Use UPnP. On pfSense, `miniupnpd` may refuse to work when WAN is private.

- Go to **Services > UPnP & NAT-PMP**
- Set **Override WAN address** to any public IP value
- Do **not** enable STUN
- In ACL entries, set (replace IP with Xbox IP):

```text
allow 1024-65535 192.168.1.151/32 1024-65535
```

![](/post-images/pfsense-upnp-1.png)
![](/post-images/pfsense-upnp-2.png)

Then test NAT on Xbox and verify mapping in **Status > UPnP & NAT-PMP**.
