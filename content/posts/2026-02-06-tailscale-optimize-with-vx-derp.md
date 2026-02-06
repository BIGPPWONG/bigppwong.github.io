---
title: "VSCode 远程开发偶尔卡：我怎么从 Tailscale 直连/DERP 把锅找出来"
excerpt: "Tailscale 真的省心，P2P 直连时几乎像在局域网；直连打不通的时候，国内 DERP 兜底（比如微林）能把体验从‘能用’拉回‘顺手’。"
categories:
  - Network
  - Tailscale
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

我平时用 VSCode Remote SSH 连一台异地的 Linux 开发机写代码。平常挺爽，直到它偶尔开始“发飘”：终端回显慢半拍、`git pull` 拖很久、`tail -f` 像断续的。

这种卡顿最烦的点在于，你会下意识先怀疑服务器负载、磁盘、甚至是 VSCode。其实我这次的锅不在这些地方，在链路。

## 先别猜，直接看它走没走直连

我后来养成了一个习惯：感觉不对劲，先跑 `tailscale ping`。

`tailscale ping` 的输出很诚实。

- 看到 `via x.x.x.x:41641`，大概率就是直连（P2P）
- 看到 `via DERP(…)`，就说明在走中继

今天（2026-02-06）我这边的样本长这样：

```text
$ tailscale ping -c 5 office-ubuntu-minimal
pong ... via 192.168.x.x:41641 in 6ms

$ tailscale ping -c 5 aws-lightsail-sg
pong ... via <public-ip>:41641 in 57ms
```

这两条是直连，体感也很对得上：终端输入基本跟手。

但我 ping 另外几台常用节点时，就开始出现这行：

```text
pong ... via DERP(cn98-2020) in 32-41ms
direct connection not established
```

看到 `direct connection not established` 基本就不用纠结了：直连没打通，已经在走 DERP。

## 国内网络的现实：直连不是每次都能成

Tailscale 的直连体验我是真的喜欢，能打通的时候太省事了。

问题是国内网络环境有时候不讲武德：跨运营商、公司网络、手机热点来回切，P2P 不一定每次都能穿过去。直连一旦失败，DERP 就决定了你“还能不能舒服地干活”。

我之前用官方 DERP 时，最难受的是两件事：

- 节点在国外，绕一圈之后抖动就明显
- 我这里还经常体感像被卡在 2Mbps 左右，叠加丢包之后，Linux 终端会卡到怀疑人生

能用，但会一直打断节奏。

## 为什么我最后选了微林 DERP

如果你能长期稳定直连，这一段其实可以跳过。DERP 对我来说就是兜底方案，我折腾它纯粹是因为直连不够稳定。

我用微林 DERP 的理由非常简单：有国内节点。

直连打不通的时候，至少别再出国兜一大圈。对我这种 VSCode 连 Linux 的日常开发来说，这个“兜底体验”比什么跑分都重要。

如果你还没注册微林，这里是注册地址（我自己用的就是这个入口）：[vx.link 注册页](https://www.vx.link/?tmpui_page=/signup.html)。

另外我这边用积分兑换了一些邀请码，顺手放出来（先到先得）：

| 邀请码 | 生成时间 |
| --- | --- |
| FJDOEDWWZH | 2026-02-06 13:00:12 |
| 5EWJ7NX6IP | 2026-02-06 13:00:18 |
| IGZTC4IJET | 2026-02-06 13:00:39 |
| 6OOPWB1O3E | 2026-02-06 13:00:40 |
| O233JU5EI1 | 2026-02-06 13:00:40 |

我这边跑了一次 `tailscale netcheck`，它也印证了现在的路径选择：

```text
Nearest DERP: cn
DERP latency:
  - cn98-2020: 25.2ms  (cn)
```

再结合上面 `tailscale ping` 的 `via DERP(cn98-2020)`，基本可以确认：我当前直连没打通的流量，主要是被国内 DERP 接住了。

## 我现在的排查顺序

我现在遇到卡顿就按这套来，不怎么走弯路：

- 先 `tailscale ping` 一下目标节点：看是直连还是 DERP
- 再 `tailscale netcheck`：看最近的 DERP 和延迟，确认是不是“绕远了”
- 如果一直 DERP 兜底：就别怪服务器了，先接受现实，然后把 DERP 体验尽量优化好

写给以后忘了的我，也给同样用 VSCode 远程开发的你。
