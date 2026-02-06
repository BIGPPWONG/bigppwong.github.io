---
title: "EdgeBox：给 AI Agent 一台本地电脑，代码执行和桌面操作全搞定"
excerpt: "想让 AI 帮你跑代码、开浏览器、操作桌面应用？EdgeBox 在本地用 Docker 起一个沙箱环境，通过 MCP 协议把'电脑使用'能力交给 LLM，隐私和延迟都不用担心。"
categories:
  - AI
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

我最近一直在折腾怎么让 AI Agent 真正"动手干活"，而不只是聊天。试了几个方案之后，发现一个痛点：**大部分 agent 工具要么只能跑代码，要么只能操作浏览器，很少有把桌面环境完整交给 AI 的方案，更别说跑在本地了。**

直到我上手了 [EdgeBox](https://github.com/BIGPPWONG/EdgeBox)。

## 它到底是啥

一句话：EdgeBox 是一个桌面应用，在你本机用 Docker 起一个完整的 Ubuntu 沙箱，然后通过 MCP（Model Context Protocol）把这个沙箱里的代码执行能力和桌面操作能力暴露给 LLM。

说人话就是：**你的 AI 不只是能"说"，它能真正坐到电脑前面，用鼠标、键盘、打开浏览器、跑脚本。**

而且整个过程跑在本地 Docker 容器里，你的数据不出本机。

## 两类核心能力

EdgeBox 提供的工具分两类：

### 代码执行（始终可用）

- 支持 Python、JavaScript、R、Java 多语言
- 完整的 bash shell，状态持久化
- 文件读写、目录列表、文件监听
- 容器隔离，不怕搞坏宿主机

### 桌面操作（启用后可用）

- 通过 VNC 远程桌面访问完整的 Ubuntu 环境
- 预装了 Chrome、VS Code 等常用应用
- AI 可以控制鼠标（点击、拖拽、滚轮）、键盘（输入文字、组合键）
- 截图 + 视觉感知，让 LLM 真正"看到"屏幕

这意味着你可以让 AI 做到这样的事情：

- "帮我打开 Chrome，搜索某个关键词，把前三条结果的标题存到文件里"
- "跑一下这段 Python 数据分析脚本，截个图给我看结果"
- "打开 VS Code，帮我改一下这个文件的第 10 行"

## 跟主流 AI 客户端无缝对接

EdgeBox 走的是 MCP HTTP 协议，所以它天然兼容支持 MCP 的客户端：

- **Claude Desktop** — Anthropic 官方桌面客户端
- **OpenWebUI** — 自建 LLM 界面
- **LobeChat** — 另一个流行的 LLM 前端

配置很简单，在对应客户端的 MCP 服务器设置里填上 EdgeBox 的地址就行。它还支持多会话管理（通过 session ID），可以同时跑多个沙箱互不干扰。

## 隐私和延迟是最大卖点

市面上也有一些云端 agent 沙箱服务，但我选择 EdgeBox 最核心的原因有两个：

- **100% 本地运行**：代码在你自己的 Docker 里跑，文件不出本机。对于公司内部代码、敏感数据，这一点没得谈。
- **几乎零延迟**：不用走公网，工具调用在本地回环，响应速度跟原生操作没区别。

另外容器隔离也让我比较放心 —— AI 在沙箱里折腾不会搞坏我的宿主系统，资源限制也可以配。

## 安装和使用

前提条件就一个：**Docker Desktop 得先装好并运行着**。

然后去 [Releases 页面](https://github.com/BIGPPWONG/EdgeBox/releases) 下载对应平台的安装包：

- Windows：`.exe`
- macOS：`.app`
- Linux：`.AppImage` / `.deb` / `.rpm`

装完打开，它会自动拉取 Docker 镜像，第一次启动稍微等一下就好。

## 什么人适合用

- 在搞 AI Agent 开发，需要一个安全的代码执行环境
- 想让 LLM 帮忙做一些重复性的桌面操作（爬数据、批量截图、自动化测试）
- 关注隐私，不想把代码和文件传到云端 agent 服务
- 用 Claude Desktop / OpenWebUI / LobeChat，想给它们加上"动手能力"

## 小结

EdgeBox 解决的问题很明确：**让 AI Agent 从"只能说"变成"能动手"，而且跑在你自己的机器上。**

MCP 协议 + Docker 沙箱 + 桌面操作 + 代码执行，这几块拼在一起，基本上就是一个完整的本地 AI Agent 工作台。

项目地址：[github.com/BIGPPWONG/EdgeBox](https://github.com/BIGPPWONG/EdgeBox)
