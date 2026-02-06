---
title: "Add a procd Service on OpenWrt"
excerpt: "Register a daemon with procd and enable auto-start on boot."
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt uses `procd` for service management. You can add a custom daemon and enable it at boot.

Simple commands can go into `/etc/rc.local` for startup, but `procd` is better for apps that must **auto-restart** after crashes.

1. Install your app and find its absolute path. Example: `/usr/bin/samplebin`.

2. Save this file to `/etc/init.d/samplebin`
```shell
#!/bin/sh /etc/rc.common
# put this file in /etc/init.d/
USE_PROCD=1
START=95
STOP=01
start_service() {
    procd_open_instance samplebin
    procd_set_param command /usr/bin/samplebin # command for running app
    procd_set_param respawn ${respawn_threshold:-3600} ${respawn_timeout:-5} ${respawn_retry:-0} # restart app for unlimited times
    procd_set_param stdout 1 # forward stdout of the command to logd
    procd_set_param stderr 1 # same for stderr
    procd_close_instance
}
```
This starts `samplebin` at order 95 (higher means later). If the app crashes, it will be restarted indefinitely.

3. Make it executable
```shell
chmod a+x /etc/init.d/samplebin
```

4. Enable at boot
```shell
service samplebin enable
```

5. Start it immediately
```shell
service samplebin start
```

Reference: [OpenWrt developer guide](https://openwrt.org/docs/guide-developer/procd-init-scripts)
