---
title: "PixAI iOS 应用使用手册"
excerpt: "PixAI 是一款专注于使用 AI 算法提升图片清晰度的软件。"
categories:
  - PixAI
  - iOS
author: BIGWONG Studio
coverImage: /pixai/unsplash.jpg
---

## PixAI - 一款 iOS 超分辨率应用
<a href="https://apps.apple.com/cn/app/pixai/id6443815029?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/1d/95/60/1d956018-56fd-9dbf-0dff-ebffebda763c/AppIcon-1x_U007emarketing-0-10-0-85-220.png/540x540bb.jpg?h=eae88dfee24ad2dc91b8a89caa201db7" alt="PixAI" style=" width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>
> PixAI 是一款专注于使用 AI 算法提升图片清晰度的软件。

## 下载
可在 **iPhone、iPad 和搭载 Apple Silicon 的 MacBook** 上安装使用。

<a href="https://apps.apple.com/cn/app/pixai/id6443815029?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1671062400?h=1fa41db0a598d8f696424a0012ab4bd1" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

## 这个应用能做什么？
PixAI 是一款专为 iOS 设备打造的软件，利用 AI 算法提升图片清晰度。它可以轻松地将低分辨率图片放大至 16 倍。

<img src="/pixai/1.jpg" width="250"><img src="/pixai/2.jpg" width="250"><img src="/pixai/3.jpg" width="250"><img src="/pixai/4.jpg" width="250"><img src="/pixai/5.jpg" width="250">
<img src="/pixai/6.jpg" width="250">

最低配置要求：
1. Apple A12 芯片
2. iOS 15.0+
注意：**在 iOS 15 上，模型不保证能在 ANE 上运行，可能会消耗更多电量和内存，并降低处理速度。**

推荐配置：
1. iOS 16.0+
2. 搭载更快 Neural Engine 的 Apple 芯片

<img src="/pixai/ane.png" width="500">
作为参考，A15 芯片上的 ANE 具有 15.8TFLOPS 的 FP16 处理能力，与 RTX 3060Ti 同一水平。

## 核心功能
- 照片超分辨率
- 动漫超分辨率
- 人脸超分辨率
- 老照片上色
- 低光增强

## 我的 iPhone 能跑得动这些 AI 模型吗？
一般来说，**可以的**。
我花了大量时间来优化模型的运行速度。在 iOS 16 上，除了人脸超分辨率和上色模型外，其他模型都会在 Apple Neural Engine 上运行，性能表现令人满意。

## 这个应用收费吗？
你可以免费下载并测试 PixAI 的所有功能。但如果需要导出图片，需要一次性支付 $6.99。

## 背后的优秀 AI 模型及其开源协议
- 照片超分辨率
  - [RealESRGAN](https://github.com/xinntao/Real-ESRGAN)
  - [A-ESRGAN](https://github.com/stroking-fishes-ml-corp/A-ESRGAN)
  - [MM-RealSR](https://github.com/TencentARC/MM-RealSR)
- 动漫超分辨率
  - [RealESRGAN-Anime](https://github.com/xinntao/Real-ESRGAN/blob/master/docs/model_zoo.md)
  - [RealCUGAN(Pro)](https://github.com/bilibili/ailab/tree/main/Real-CUGAN)
- 人脸超分辨率
  - [GFPGAN](https://github.com/TencentARC/GFPGAN)
- 老照片上色
  - [DeOldify](https://github.com/jantic/DeOldify)
- 低光增强
  - [ZeroDCE](https://keras.io/examples/vision/zero_dce/)
- 其他
  - 我使用了 [john-rocky 的转换脚本](https://github.com/john-rocky/CoreML-Models#anime2sketch) 来转换 A-ESRGAN 和 MM-RealSR 模型。
