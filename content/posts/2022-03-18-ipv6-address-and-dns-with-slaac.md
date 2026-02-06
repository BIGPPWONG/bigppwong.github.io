---
title: "IPv6 Addressing and DNS Distribution Under SLAAC"
excerpt: "A practical note on SLAAC, DHCPv6, and RA flags."
categories:
  - Linux
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

IPv6 is common now, but details can still be confusing. Here are practical notes.

### IPv6 Prefix
A public prefix delegated by your ISP. You can assign concrete addresses to downstream devices using DHCPv6 or SLAAC.

### Device IPv6 Address
`IPv6 Prefix` + local interface identifier.

### Local identifier generation
- **Stateful**: via `DHCPv6`, centrally managed by DHCP server.
- **Stateless**: via `SLAAC`, generated from MAC using `EUI-64`.

### EUI-64
A method to generate interface identifiers from hardware MAC.

![EUI-64](https://cdn.networkacademy.io/sites/default/files/inline-images/generating-link-local-address-example.png)

### SLAAC flow
1. Build a link-local address (e.g. `fe80::...`) from link-local prefix + EUI-64.
2. Run Duplicate Address Detection (DAD).
3. Send Router Solicitation (RS) to multicast `FF02::2`.
4. Router replies with Router Advertisement (RA), including public prefix and prefix length (typically <= 64).
5. Host combines public prefix + interface identifier to form global IPv6 address.
6. DNS still needs DHCPv6 request in many setups.

**Summary:** SLAAC configures addresses without DHCP, but DNS is often still provided through DHCPv6.

### RA flags
| M-flag | O-flag | Result |
| --- | --- | --- |
| 1 | - | Address + DNS from DHCPv6 |
| 0 | 1 | Address via SLAAC, DNS via DHCPv6 |
| 0 | 0 | No DHCPv6 server available |

### Prf flag
Route preference: Low (1), Medium (0), High (3). Hosts use this when multiple gateways exist.

References: [networkacademy.io](https://www.networkacademy.io/ccna/ipv6/stateless-address-autoconfiguration-slaac), [Wikipedia IPv6](https://en.wikipedia.org/wiki/IPv6)
