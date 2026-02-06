---
title: "在 OpenWrt 上添加 procd 服务"
excerpt: "使用 procd 注册守护进程并设置开机自启。"
categories:
  - OpenWrt
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

OpenWrt 使用 `procd` 进行服务管理。你可以添加自定义守护进程并设置开机自启。

简单的启动命令可以写在 `/etc/rc.local` 中，但如果需要应用 **崩溃后自动重启**，使用 `procd` 更合适。

1. 安装你的应用并找到其绝对路径。例如：`/usr/bin/samplebin`。

2. 将以下文件保存到 `/etc/init.d/samplebin`
```shell
#!/bin/sh /etc/rc.common
# 将此文件放在 /etc/init.d/ 目录下
USE_PROCD=1
START=95
STOP=01
start_service() {
    procd_open_instance samplebin
    procd_set_param command /usr/bin/samplebin # 运行应用的命令
    procd_set_param respawn ${respawn_threshold:-3600} ${respawn_timeout:-5} ${respawn_retry:-0} # 无限次重启
    procd_set_param stdout 1 # 将命令的 stdout 转发到 logd
    procd_set_param stderr 1 # stderr 同上
    procd_close_instance
}
```
这会在启动顺序 95 处启动 `samplebin`（数值越大越晚启动）。如果应用崩溃，将无限次自动重启。

3. 添加执行权限
```shell
chmod a+x /etc/init.d/samplebin
```

4. 设置开机自启
```shell
service samplebin enable
```

5. 立即启动
```shell
service samplebin start
```

参考文档：[OpenWrt 开发者指南](https://openwrt.org/docs/guide-developer/procd-init-scripts)
