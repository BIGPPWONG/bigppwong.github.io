---
title: "Notes for Installing pfSense/OPNsense in Virtual Machines"
excerpt: "Common VM settings on ESXi/PVE/Hyper-V that prevent weird network issues."
categories:
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Commonly overlooked settings in ESXi, PVE, and Hyper-V.

## Minimum resources
Official recommendations (VM installs usually need more than bare metal):
- Memory: at least 1GB
- Disk: at least 8GB

## Disable NIC hardware offloading
Because of FreeBSD driver behavior, hardware offloading can sometimes lead to incorrect firewall blocking.

### pfSense
- Go to **System > Advanced > Networking**
- Enable **Disable hardware checksum offload**
- Save and reboot

![](https://docs.netgate.com/pfsense/en/latest/_images/screen_shot_2017-06-30_at_18.51.25.png)

### OPNsense
- Go to **Interfaces > Settings**
- Disable offloading options accordingly

![OPNsense disable offloading](https://docs.opnsense.org/_images/disableoffloading.png)

## ESXi-specific tips
- Follow VMware FreeBSD guest compatibility guide.
- `e1000` NIC type: best compatibility (especially for QoS scenarios).
- `vmx` NIC type: best performance.
- If disk issues occur, try `IDE` disk mode.
- Install:
  - pfSense: **Open-VM-Tools**
  - OPNsense: plugin **os-vmware**

These tools improve VM integration and allow better reboot/shutdown control from management interface.

## PVE (KVM)-specific tip
- `i440FX` chipset generally works well.
- `Q35` may have FreeBSD/KVM compatibility issues in some cases.
