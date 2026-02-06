---
title: "ESXi 7.0: Add Community NIC Drivers"
excerpt: "Use VMware PowerCLI to inject community NIC and USB NIC drivers into ESXi ISO."
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Use VMware PowerCLI to add community on-board NIC and USB NIC drivers into the official ESXi 7.0+ installer.

## Install VMware PowerCLI
- Download the [PowerCLI offline bundle](https://vdc-download.vmware.com/vmwb-repository/dcr-public/fdf729aa-01f9-4129-87c7-1e7ce17c5e7b/1c6d21ef-d60e-472a-b2c2-ce8b83abe095/VMware-PowerCLI-12.5.0-19195797.zip) (includes dependencies)
- Extract to `C:\Program Files\WindowsPowerShell\Modules`
- In that folder, `Shift + right click` and open PowerShell
- Run this to unblock files:
```
Get-ChildItem * -Recurse | Unblock-File
```
- Run PowerShell as Administrator, then:
```
Set-ExecutionPolicy RemoteSigned
```
- Verify install:
```
Import-Module VMware.ImageBuilder
```
If there is no error, PowerCLI is installed.

ESXi and PowerCLI are updated often. During ISO building, their versions must match. You can find the latest PowerCLI offline bundle here: [PowerCLI installation guide](https://developer.vmware.com/powercli/installation-guide).

## Download ESXi and community drivers
- Register a VMware account
- Go to the [product downloads page](https://customerconnect.vmware.com/en/downloads/#all_products)
- Find `VMware vSphere Hypervisor (ESXi)` and click **Download Trial**
- Download **VMware vSphere Hypervisor (ESXi) Offline Bundle** (not the ISO)
- Download [Community Networking Driver for ESXi](https://flings.vmware.com/community-networking-driver-for-esxi#summary)
- Download [USB Network Native Driver for ESXi](https://flings.vmware.com/usb-network-native-driver-for-esxi)
- Put all files in the same folder

## Build the ISO
- Open PowerShell in the folder with the downloads
- Run the following. Replace filenames to match your downloads:
```
Add-EsxSoftwareDepot .\VMware-ESXi-7.0U3c-19193900-depot.zip
Add-EsxSoftwareDepot .\Net-Community-Driver_1.2.7.0-1vmw.700.1.0.15843807_19480755.zip
Add-EsxSoftwareDepot .\ESXi703-VMKUSB-NIC-FLING-51233328-component-18902399.zip
```
- Find the base profile:
```
Get-EsxImageProfile
```
- Copy the profile that includes `standard`, e.g. **ESXi-7.0U3c-19193900-standard**
- Create a custom profile (replace the profile name):
```
New-EsxImageProfile -CloneProfile "ESXi-7.0U3c-19193900-standard" -name "ESXi-7.0U3c-19193900-bigppwong" -Vendor "bigppwong.github.io"
```
- Add the community driver package:
```
Add-EsxSoftwarePackage -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -SoftwarePackage "net-community"
```
- Export the ISO:
```
Export-ESXImageProfile -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -ExportToISO -filepath ESXi-7.0U3c-19193900-bigppwong.iso
```

To delete a profile, use `Remove-EsxImageProfile`.
