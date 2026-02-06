---
title: "将 IP 列表转换为 IPSET"
excerpt: "使用 Python 脚本将 IP 段列表转换为 ipset。"
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

GitHub 上有很多公开的 IP 段列表，下面介绍如何用 Python 将其转换为 IPSET。

1. 下载一个 IP 列表
`sample-ips.txt`
```
1.0.1.0/24
1.0.2.0/23
1.0.8.0/21
1.0.32.0/19
192.168.1.0/24
```

2. 将以下脚本保存为 `create-ipset.py`
```python
# 修改文件名以匹配你的列表
with open('sample-ips.txt') as f:
    lines = f.readlines()
commands = ['ipset create myipset hash:net']
for l in lines:
    commands.append("ipset add myipset %s" % l.strip())
with open('create-ipset.sh', 'w') as my_list_file:
    for element in commands:
        my_list_file.write('%s\n' % element)
```

3. 运行脚本生成 shell 脚本
```shell
python3 create-ipset.py
```
运行后会生成 `create-ipset.sh` 文件。

4. 上传并在 Linux 主机上运行
```shell
bash create-ipset.sh
```
根据主机性能和列表大小，执行可能需要一些时间。

5. 测试 IPSET
```
root@OpenWrt:~# ipset test myipset 192.168.100.1
192.168.100.1 is NOT in set myipset.
```

6. 将匹配 IPSET 的流量进行转发
```shell
iptables -A PREROUTING -t mangle -i eth0 -m set --match-set myipset dst -j MARK --set-mark 123
ip route add table 123 default via 192.168.1.254 dev eth0
ip rule add fwmark 123 table 123
```
这会将目的地在 `myipset` 中的流量转发到网关 `192.168.1.254`。请根据你的实际环境修改 **接口名**、**网关地址** 和 **ipset 名称**。
