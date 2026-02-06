---
title: "Convert an IP List File into an IPSET"
excerpt: "Generate and import an IPSET from a CIDR list using Python."
categories:
  - Linux
  - Networking
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Many CIDR lists on GitHub can be converted into `ipset` with a simple script.

Sample input `sample-ips.txt`:

```text
1.0.1.0/24
1.0.2.0/23
1.0.8.0/21
1.0.32.0/19
192.168.1.0/24
```

Create `create-ipset.py`:

```python
with open('sample-ips.txt') as f:
    lines = f.readlines()

commands = ['ipset create myipset hash:net']
for l in lines:
    commands.append("ipset add myipset %s" % l.strip())

with open('create-ipset.sh', 'w') as out:
    for cmd in commands:
        out.write(f'{cmd}\n')
```

Generate shell script:

```shell
python3 create-ipset.py
```

Run it on Linux host:

```shell
bash create-ipset.sh
```

Test:

```shell
ipset test myipset 192.168.100.1
```

Optional traffic redirection:

```shell
iptables -A PREROUTING -t mangle -i eth0 -m set --match-set myipset dst -j MARK --set-mark 123
ip route add table 123 default via 192.168.1.254 dev eth0
ip rule add fwmark 123 table 123
```

Adjust interface, gateway, and set name to your environment.
