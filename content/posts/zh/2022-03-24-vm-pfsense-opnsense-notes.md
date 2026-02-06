---
title: "虚拟机中运行 pfSense / OPNsense 的注意事项"
excerpt: "ESXi、PVE、Hyper-V 中影响 pfSense/OPNsense 的常见虚拟机设置。"
categories:
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

在 ESXi、PVE 或 Hyper-V 中，如果忽略了一些虚拟机设置，pfSense/OPNsense 可能会出现各种奇怪的网络问题。

## 最低硬件要求
虚拟机安装比裸机需要稍多一些资源。官方推荐：
- 内存：至少 1 GB
- 硬盘：至少 8 GB

## 禁用网卡硬件卸载
由于 FreeBSD 驱动的原因，硬件卸载可能导致防火墙错误拦截正常流量。

**pfSense**
- 进入 **System > Advanced > Networking**
- 在 **Networking Interfaces** 下勾选 **Disable hardware checksum offload**
- 点击 **Save**
- 重启 pfSense

![](https://docs.netgate.com/pfsense/en/latest/_images/screen_shot_2017-06-30_at_18.51.25.png)

**OPNsense**
- 进入 **Interfaces > Settings**
- 按下图配置

![OPNsense 禁用卸载](https://docs.opnsense.org/_images/disableoffloading.png)

## ESXi 注意事项
- 参照 ESXi 官方 FreeBSD 安装指南：[VMware GOSIG](http://partnerweb.vmware.com/GOSIG/FreeBSD_11x.html)
- 使用 `e1000` 网卡以获得最佳兼容性（尤其是 QoS 场景）
- 使用 `vmx` 网卡以获得最佳性能
- 如果遇到磁盘问题，尝试将磁盘模式切换为 `IDE`
- 安装 **Open-VM-Tools**（pfSense：**System > Packages**）
- 安装 **os-vmware**（OPNsense：**System > Firmware > Plugins**）

安装 `Open-VM-Tools` 或 `os-vmware` 可以改善网络和磁盘性能。如果需要从 Web 管理界面重启或关闭虚拟机，必须安装这些工具。

## PVE (KVM) 注意事项
- `i440FX 芯片组` 兼容性好
- `Q35 芯片组` 不支持，因为 FreeBSD + KVM 驱动存在兼容性问题
