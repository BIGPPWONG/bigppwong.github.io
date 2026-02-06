---
title: "ESXi 7.0：添加社区网卡驱动"
excerpt: "使用 VMware PowerCLI 将社区网卡和 USB 网卡驱动注入 ESXi ISO。"
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

使用 VMware PowerCLI 将社区板载网卡和 USB 网卡驱动添加到 ESXi 7.0+ 官方安装镜像中。

## 安装 VMware PowerCLI
- 下载 [PowerCLI 离线安装包](https://vdc-download.vmware.com/vmwb-repository/dcr-public/fdf729aa-01f9-4129-87c7-1e7ce17c5e7b/1c6d21ef-d60e-472a-b2c2-ce8b83abe095/VMware-PowerCLI-12.5.0-19195797.zip)（包含依赖项）
- 解压到 `C:\Program Files\WindowsPowerShell\Modules`
- 在该目录中 `Shift + 右键` 打开 PowerShell
- 运行以下命令解除文件锁定：
```
Get-ChildItem * -Recurse | Unblock-File
```
- 以管理员身份运行 PowerShell，然后执行：
```
Set-ExecutionPolicy RemoteSigned
```
- 验证安装：
```
Import-Module VMware.ImageBuilder
```
如果没有报错，说明 PowerCLI 已安装成功。

ESXi 和 PowerCLI 更新频繁。构建 ISO 时两者版本必须匹配。最新 PowerCLI 离线包可在此查找：[PowerCLI 安装指南](https://developer.vmware.com/powercli/installation-guide)。

## 下载 ESXi 和社区驱动
- 注册 VMware 账号
- 前往 [产品下载页面](https://customerconnect.vmware.com/en/downloads/#all_products)
- 找到 `VMware vSphere Hypervisor (ESXi)` 并点击 **Download Trial**
- 下载 **VMware vSphere Hypervisor (ESXi) Offline Bundle**（不是 ISO）
- 下载 [ESXi 社区网卡驱动](https://flings.vmware.com/community-networking-driver-for-esxi#summary)
- 下载 [ESXi USB 网卡原生驱动](https://flings.vmware.com/usb-network-native-driver-for-esxi)
- 将所有文件放在同一目录下

## 构建 ISO
- 在下载文件所在目录中打开 PowerShell
- 运行以下命令（请替换为你实际下载的文件名）：
```
Add-EsxSoftwareDepot .\VMware-ESXi-7.0U3c-19193900-depot.zip
Add-EsxSoftwareDepot .\Net-Community-Driver_1.2.7.0-1vmw.700.1.0.15843807_19480755.zip
Add-EsxSoftwareDepot .\ESXi703-VMKUSB-NIC-FLING-51233328-component-18902399.zip
```
- 查找基础配置文件：
```
Get-EsxImageProfile
```
- 复制包含 `standard` 的配置文件名，例如 **ESXi-7.0U3c-19193900-standard**
- 创建自定义配置文件（替换配置文件名）：
```
New-EsxImageProfile -CloneProfile "ESXi-7.0U3c-19193900-standard" -name "ESXi-7.0U3c-19193900-bigppwong" -Vendor "bigppwong.github.io"
```
- 添加社区驱动包：
```
Add-EsxSoftwarePackage -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -SoftwarePackage "net-community"
```
- 导出 ISO：
```
Export-ESXImageProfile -ImageProfile "ESXi-7.0U3c-19193900-bigppwong" -ExportToISO -filepath ESXi-7.0U3c-19193900-bigppwong.iso
```

删除配置文件可使用 `Remove-EsxImageProfile`。
