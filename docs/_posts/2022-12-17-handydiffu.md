---
layout: single
author: BIGWONG Studio
title:  "HandyDiffu iOS App User Manual"
comments: true
excerpt: "HandyDiffu is a third party client for AUTOMATIC1111/stable-diffusion-webui"
toc: true 
header:
  show_overlay_excerpt: true
  overlay_image: /assets/pixai/unsplash.jpg
  overlay_color: "#333"
  overlay_filter: 0.5
  caption: Photo by <a href="https://unsplash.com/@fabioha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">fabio</a> on <a href="https://unsplash.com/s/photos/tech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  actions:
    - label: "Download"
      url: "https://apps.apple.com/cn/app/handydiffu/id6444753824?itsct=apps_box_link&itscg=30200"
categories: 
 - HandyDiffu
 - iOS
---    

## HandyDiffu - An iOS client for stable diffusion
<a href="https://apps.apple.com/us/app/handydiffu/id6444753824?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/89/03/8d/89038df1-b49f-65e4-bca1-705f5bc3adde/AppIcon-1x_U007emarketing-0-10-0-85-220.png/540x540bb.jpg?h=656d6eb1ea5be1642ac7acaa6f72acf4" alt="HandyDiffu" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>

> HandyDiffu is a third party client for [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui), you must have deploy **your own stable diffusion server** to use this app.   

## Download
<a href="https://apps.apple.com/us/app/handydiffu/id6444753824?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1670457600?h=5f54c7eb62903eb727cd76f2a2e8a364" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>  

## Key Features：
- Txt2Img generation
- Img2img generation
- Img interrogate
- **Prompt automatic translation** ( more than 50 languages supported, powered by MLKit )
- Send pictures directly to PixAI for super-resolution （ An app that focus on device super-resolution. It support ```realesrgan realcugan gfpgan``` etc. Available on AppStore now. )  

## ScreenShot   
<img src="/assets/handydiffu/0.png" width="250"><img src="/assets/handydiffu/1.png" width="250"><img src="/assets/handydiffu/2.png" width="250"><img src="/assets/handydiffu/3.png" width="250">




## Server Deployment
### **You must having your own server to use this client!**
- For server deployment, please refer to [Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Command-Line-Arguments-and-Settings) and [Enable API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) 
- You need to lanuch server with args ```"--api --listen"```.   
- For remote connection to your local PC, I personllay recommend using tailscale or frp, in case no having a public IP.

## Usage
1. Set your server api on ```settings tab```, and make sure ```test connection``` return ```success```
2. Enable ```prompt translator ``` on ```settings tab```, and make sure ```translator download``` return ```success```
3. You can now enjoy your journey.




