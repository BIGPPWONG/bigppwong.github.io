---
title: "Convert an IP List to IPSET"
excerpt: "Use a small Python script to turn IP ranges into an ipset."
categories:
  - Linux
  - Network
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

There are many public IP range lists on GitHub. This shows how to convert one into an IPSET using Python.

1. Download an IP list
`sample-ips.txt`
```
1.0.1.0/24
1.0.2.0/23
1.0.8.0/21
1.0.32.0/19
192.168.1.0/24
```

2. Save this script as `create-ipset.py`
```python
# Update the filename to match your list
with open('sample-ips.txt') as f:
    lines = f.readlines()
commands = ['ipset create myipset hash:net']
for l in lines:
    commands.append("ipset add myipset %s" % l.strip())
with open('create-ipset.sh', 'w') as my_list_file:
    for element in commands:
        my_list_file.write('%s\n' % element)
```

3. Run the script to generate a shell script
```shell
python3 create-ipset.py
```
You should see a new `create-ipset.sh` file.

4. Upload and run the shell script on your Linux host
```shell
bash create-ipset.sh
```
Depending on host performance and list size, this may take some time.

5. Test IPSET
```
root@OpenWrt:~# ipset test myipset 192.168.100.1
192.168.100.1 is NOT in set myipset.
```

6. Redirect traffic that matches the IPSET
```shell
iptables -A PREROUTING -t mangle -i eth0 -m set --match-set myipset dst -j MARK --set-mark 123
ip route add table 123 default via 192.168.1.254 dev eth0
ip rule add fwmark 123 table 123
```
This redirects traffic whose destination is in `myipset` to the gateway `192.168.1.254`. Adjust the **interface**, **gateway**, and **ipset name** to match your setup.
