---
title: "HandyDiffu iOS 应用使用手册"
excerpt: "HandyDiffu 是 AUTOMATIC1111/stable-diffusion-webui 的第三方 iOS 客户端。"
categories:
  - HandyDiffu
  - iOS
author: BIGWONG Studio
coverImage: /pixai/unsplash.jpg
---

## HandyDiffu - Stable Diffusion 的 iOS 客户端
<a href="https://apps.apple.com/us/app/handydiffu/id6444753824?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/89/03/8d/89038df1-b49f-65e4-bca1-705f5bc3adde/AppIcon-1x_U007emarketing-0-10-0-85-220.png/540x540bb.jpg?h=656d6eb1ea5be1642ac7acaa6f72acf4" alt="HandyDiffu" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>

> HandyDiffu 是 [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 的第三方客户端，你需要先部署 **自己的 Stable Diffusion 服务器** 才能使用此应用。

## 下载
<a href="https://apps.apple.com/us/app/handydiffu/id6444753824?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1670457600?h=5f54c7eb62903eb727cd76f2a2e8a364" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

## 核心功能
- 文生图（Txt2Img）
- 图生图（Img2Img）
- 图片反推提示词
- **提示词自动翻译**（支持 50 多种语言，由 MLKit 提供支持）
- 一键发送图片到 PixAI 进行超分辨率处理（一款专注于端侧超分辨率的应用，支持 `realesrgan realcugan gfpgan` 等模型，已在 App Store 上架。）

## 截图
<img src="/handydiffu/0.png" width="250"><img src="/handydiffu/1.png" width="250"><img src="/handydiffu/2.png" width="250"><img src="/handydiffu/3.png" width="250">

## 服务器部署
### **使用此客户端前必须先搭建自己的服务器！**
- 服务器部署请参考 [Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Command-Line-Arguments-and-Settings) 和 [启用 API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)
- 启动服务器时需要添加参数 `"--api --listen"`。
- 如果需要远程连接到本地电脑，我个人推荐使用 tailscale 或 frp，以应对没有公网 IP 的情况。

## 使用方法
1. 在 `设置页` 填写你的服务器 API 地址，确保 `测试连接` 返回 `success`
2. 在 `设置页` 开启 `提示词翻译器`，确保 `下载翻译器` 返回 `success`
3. 现在你可以开始体验了。
