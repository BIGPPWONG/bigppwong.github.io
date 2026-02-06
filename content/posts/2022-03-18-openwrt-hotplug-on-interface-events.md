---
title: "Run Scripts on OpenWrt Interface Hotplug Events"
excerpt: "Execute custom scripts when specific interfaces go up or down."
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt supports hotplug event scripts for interfaces. Use this when actions should run on **network state changes**.

1. Create `/etc/hotplug.d/iface/95-sample-hotplug`:

```shell
#!/bin/sh
if [ "$ACTION" == "ifup" -a "$INTERFACE" == "eth0" ]
then
# your scripts here(1) #
fi
if [ "$ACTION" == "ifdown" -a "$INTERFACE" == "eth0" ]
then
# your scripts here(2) #
fi
```

Replace `eth0` with your target interface (e.g. `br-lan`).

2. Make executable:
```shell
chmod a+x /etc/hotplug.d/iface/95-sample-hotplug
```

3. Toggle the interface in web UI and inspect logs with:
```shell
logread
dmesg
```

Reference: [OpenWrt hotplug docs](https://openwrt.org/docs/guide-user/base-system/hotplug)
