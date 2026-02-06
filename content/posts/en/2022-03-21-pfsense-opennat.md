---
title: "pfSense Open NAT for Xbox (Double NAT)"
excerpt: "Configure pfSense to get Open NAT for Xbox/PS in a double-NAT mobile broadband setup."
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

This shows how to make Xbox get **Open NAT** on pfSense in a double-NAT mobile broadband setup. It also applies to PlayStation and other devices that require open NAT.

If you're curious, see [Easy NAT (Endpoint-Independent NAT mapping)](https://tailscale.com/blog/how-nat-traversal-works/).

To get Open NAT you need two things:
1. NAT mapping
2. Open firewall ports

If the images are blurry, open them in a new tab.

## Fix NAT mapping
By default, pfSense randomizes the source port, so each connection uses a different port.

- Go to **Firewall > NAT > Outbound**
- Find **Outbound NAT Mode** and select **Hybrid Outbound NAT**
- Click **Save**

![Outbound NAT Mode](/post-images/pfsense-opennat-1.png)

- Under **Mappings**, add a rule
- Configure as shown below. Set **Source** to the Xbox LAN IP with mask 32. In **Translation**, check **Static Port**.

![Static Port Rule](/post-images/pfsense-opennat-2.png)

- Click **Save**, then **Apply Changes** if prompted

You can also achieve this with `1:1 NAT`, but it adds unnecessary exposure and traffic.

## Enable automatic port opening (UPnP)
pfSense's built-in miniupnp refuses to work when the WAN IP is private (common in China). Use this workaround:

- Go to **Services > UPnP & NAT-PMP**
- Configure **UPnP & NAT-PMP Settings** as shown, and set **Override WAN address** to any **public** IP

![UPnP Settings](/post-images/pfsense-upnp-1.png)

- **Do not** enable STUN
- In **UPnP Access Control Lists**, set **ACL Entries** to:
```
allow 1024-65535 192.168.1.151/32 1024-65535
```
Replace `192.168.1.151` with your Xbox IP.

![UPnP ACL](/post-images/pfsense-upnp-2.png)

- Click **Save**, then **Apply Changes** if prompted
- Run NAT test on Xbox, then check **Status > UPnP & NAT-PMP** on pfSense to confirm mappings

This essentially tricks miniupnp to think you have a public IP. In practice it does switch Xbox to Open NAT, but it will also return the fake IP to clients, and the impact is unclear.
