---
title: "Add a procd Service in OpenWrt and Enable Auto-Start"
excerpt: "Use procd init script to run and auto-restart apps on boot."
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt uses `procd` for service management. This is suitable when you want **automatic restart** after crashes.

1. Assume your binary is `/usr/bin/samplebin`.
2. Create `/etc/init.d/samplebin`:

```shell
#!/bin/sh /etc/rc.common
USE_PROCD=1
START=95
STOP=01
start_service() {
    procd_open_instance samplebin
    procd_set_param command /usr/bin/samplebin
    procd_set_param respawn ${respawn_threshold:-3600} ${respawn_timeout:-5} ${respawn_retry:-0}
    procd_set_param stdout 1
    procd_set_param stderr 1
    procd_close_instance
}
```

3. Make executable:
```shell
chmod a+x /etc/init.d/samplebin
```

4. Enable at boot:
```shell
service samplebin enable
```

5. Start now:
```shell
service samplebin start
```

Reference: [OpenWrt procd init scripts](https://openwrt.org/docs/guide-developer/procd-init-scripts)
