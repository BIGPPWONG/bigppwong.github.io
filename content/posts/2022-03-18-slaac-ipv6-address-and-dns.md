---
title: "SLAAC: IPv6 Address and DNS Distribution"
excerpt: "How IPv6 addresses and DNS are assigned in SLAAC and DHCPv6 setups."
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

IPv6 is common now, but it can still be confusing when building a home network. This post summarizes the key concepts and a few pitfalls.

**IPv6 Prefix**
A public prefix delegated by your ISP. You can assign addresses to downstream devices via DHCP or SLAAC.

**An IPv6 address is composed of**
`IPv6 Prefix` + `Interface Identifier`

**Interface Identifier generation**
- **Stateful**: `DHCPv6` assigns addresses from a server.
- **Stateless (SLAAC)**: the client derives its address from its MAC using `EUI-64`.

**EUI-64**
A method to generate the interface identifier from a MAC address.
![EUI-64](https://cdn.networkacademy.io/sites/default/files/inline-images/generating-link-local-address-example.png "EUI-64")

**SLAAC flow**
1. Build a link-local address using the link-local prefix + EUI-64 (e.g. `fe80::1`).
2. Run Duplicate Address Detection (DAD) to ensure no conflict.
3. Send Router Solicitation (RS) to multicast `FF02::2`.
4. Router responds with Router Advertisement (RA), including public prefix and prefix length (usually <= 64).
5. Client combines the public prefix + EUI-64 to form a global IPv6 address.
6. DNS is still missing; the client requests DNS via DHCP.

**Summary:** SLAAC provides the address, but DNS still comes from DHCP.

**DHCPv6 flow**
Similar to DHCPv4.

**RA Flags (Router Advertisement)**
These tell clients where to get IPv6 address and DNS.

| M-flag | O-flag | Result |
| ----- | ----- | ------ |
| 1 |  | Address and DNS via DHCPv6 |
| 0 | 1 | Address via SLAAC, DNS via DHCPv6 |
| 0 | 0 | No DHCPv6 server |

**Prf-flag**
Router preference: Low (1), Medium (0), High (3). If multiple routers exist, the client chooses based on this value.

**References**
- [networkacademy.io](https://www.networkacademy.io/ccna/ipv6/stateless-address-autoconfiguration-slaac)
- [IPv6 (Wikipedia)](https://en.wikipedia.org/wiki/IPv6)
