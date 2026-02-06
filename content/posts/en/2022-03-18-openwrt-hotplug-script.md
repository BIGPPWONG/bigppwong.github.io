---
title: "OpenWrt Hotplug Scripts on Interface Events"
excerpt: "Run scripts automatically when an interface goes up or down."
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt supports interface hotplug events. You can run scripts when an interface goes up or down.

Simple startup tasks can go into `/etc/rc.local`, but hotplug scripts are best when you need actions on **network state changes**.

1. Save this file to `/etc/hotplug.d/iface/95-sample-hotplug`
```shell
#!/bin/sh
# put this in /etc/hotplug.d/iface
if [ "$ACTION" == "ifup" -a "$INTERFACE" == "eth0" ]
then
# your scripts here(1) #
fi
if [ "$ACTION" == "ifdown" -a "$INTERFACE" == "eth0" ]
then
# your scripts here(2) #
fi
```
Replace **eth0** with the interface you want to monitor (e.g. `br-lan`).

The first block runs when the interface **comes up**; the second runs when the interface **goes down**.

2. Make it executable
```shell
chmod a+x /etc/hotplug.d/iface/95-sample-hotplug
```

3. Toggle the interface in the web UI and inspect logs with `logread` and `dmesg`.

Reference: [OpenWrt hotplug](https://openwrt.org/docs/guide-user/base-system/hotplug)
