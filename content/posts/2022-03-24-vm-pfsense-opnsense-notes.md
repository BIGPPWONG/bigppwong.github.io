---
title: "VM Notes for pfSense / OPNsense"
excerpt: "Common VM settings in ESXi, PVE, and Hyper-V that affect pfSense/OPNsense."
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

In ESXi, PVE, or Hyper-V, pfSense/OPNsense can suffer from odd network issues if some VM settings are overlooked.

## Minimum hardware
VM installs need a bit more than bare metal. Official recommendations:
- Memory: at least 1 GB
- Disk: at least 8 GB

## Disable NIC hardware offload
Due to FreeBSD drivers, hardware offload can cause the firewall to block normal traffic.

**pfSense**
- Go to **System > Advanced > Networking**
- Under **Networking Interfaces**, enable **Disable hardware checksum offload**
- Click **Save**
- Reboot pfSense

![](https://docs.netgate.com/pfsense/en/latest/_images/screen_shot_2017-06-30_at_18.51.25.png)

**OPNsense**
- Go to **Interfaces > Settings**
- Configure as shown

![OPNsense disable off-loading](https://docs.opnsense.org/_images/disableoffloading.png)

## ESXi-specific notes
- Follow the official FreeBSD install guide for ESXi: [VMware GOSIG](http://partnerweb.vmware.com/GOSIG/FreeBSD_11x.html)
- Use `e1000` for best compatibility (especially with QoS)
- Use `vmx` for best performance
- If disk issues occur, try switching disk mode to `IDE`
- Install **Open-VM-Tools** (pfSense: **System > Packages**)
- Install **os-vmware** (OPNsense: **System > Firmware > Plugins**)

Installing `Open-VM-Tools` or `os-vmware` improves network and disk performance. They are required if you want to reboot or shutdown the VM from the web UI.

## PVE (KVM) notes
- `i440FX chipset` works well
- `Q35 chipset` is not supported due to FreeBSD + KVM driver issues
