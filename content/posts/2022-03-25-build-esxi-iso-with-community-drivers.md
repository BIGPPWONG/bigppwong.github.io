---
title: "Build ESXi 7.0+ ISO with Community NIC Drivers"
excerpt: "Use VMware PowerCLI to inject community and USB NIC drivers into ESXi bundles."
categories:
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Use VMware PowerCLI to build custom ESXi ISO with community NIC drivers.

## Install VMware PowerCLI (offline)
1. Download offline package (includes dependencies):
   [VMware-PowerCLI-12.5.0-19195797.zip](https://vdc-download.vmware.com/vmwb-repository/dcr-public/fdf729aa-01f9-4129-87c7-1e7ce17c5e7b/1c6d21ef-d60e-472a-b2c2-ce8b83abe095/VMware-PowerCLI-12.5.0-19195797.zip)
2. Extract to:
   `C:\Program Files\WindowsPowerShell\Modules`
3. Open PowerShell in that directory, run:

```powershell
Get-ChildItem * -Recurse | Unblock-File
Set-ExecutionPolicy RemoteSigned
Import-Module VMware.ImageBuilder
```

PowerCLI and ESXi versions should match. See latest guidance: [PowerCLI installation guide](https://developer.vmware.com/powercli/installation-guide)

## Download required bundles
- ESXi Offline Bundle from VMware Customer Connect
- [Community Networking Driver for ESXi](https://flings.vmware.com/community-networking-driver-for-esxi#summary)
- [USB Network Native Driver for ESXi](https://flings.vmware.com/usb-network-native-driver-for-esxi)

## Build custom ISO
In the folder containing all downloaded ZIPs:

```powershell
Add-EsxSoftwareDepot .\VMware-ESXi-7.0U3c-19193900-depot.zip
Add-EsxSoftwareDepot .\Net-Community-Driver_1.2.7.0-1vmw.700.1.0.15843807_19480755.zip
Add-EsxSoftwareDepot .\ESXi703-VMKUSB-NIC-FLING-51233328-component-18902399.zip
Get-EsxImageProfile
New-EsxImageProfile -CloneProfile "ESXi-7.0U3c-19193900-standard" -name "ESXi-7.0U3c-19193900-bigppwong" -Vendor "bigppwong.github.io"
Add-EsxSoftwarePackage -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -SoftwarePackage "net-community"
Export-ESXImageProfile -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -ExportToISO -filepath ESXi-7.0U3c-19193900-bigppwong.iso
```

To delete a custom profile later:

```powershell
Remove-EsxImageProfile
```
