---
title: "OpenWrt Hotplug 脚本：监听接口事件"
excerpt: "当网络接口状态变化时自动执行脚本。"
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt 支持接口热插拔事件，你可以在接口上线或下线时自动运行脚本。

简单的启动任务可以写在 `/etc/rc.local` 中，但如果需要在 **网络状态变化** 时执行操作，hotplug 脚本更合适。

1. 将以下文件保存到 `/etc/hotplug.d/iface/95-sample-hotplug`
```shell
#!/bin/sh
# 将此文件放在 /etc/hotplug.d/iface 目录下
if [ "$ACTION" == "ifup" -a "$INTERFACE" == "eth0" ]
then
# 在此处编写你的脚本(1) #
fi
if [ "$ACTION" == "ifdown" -a "$INTERFACE" == "eth0" ]
then
# 在此处编写你的脚本(2) #
fi
```
将 **eth0** 替换为你要监听的接口名（例如 `br-lan`）。

第一个代码块在接口 **上线** 时执行，第二个在接口 **下线** 时执行。

2. 添加执行权限
```shell
chmod a+x /etc/hotplug.d/iface/95-sample-hotplug
```

3. 在 Web 管理界面中切换接口状态，然后通过 `logread` 和 `dmesg` 查看日志。

参考文档：[OpenWrt hotplug](https://openwrt.org/docs/guide-user/base-system/hotplug)
