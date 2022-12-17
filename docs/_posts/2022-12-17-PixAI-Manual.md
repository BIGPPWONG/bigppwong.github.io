---
layout: single
author: BIGWONG Studio
title:  "PixAI iOS App User Manual"
comments: true
header:
  show_overlay_excerpt: false
  excerpt: PixAI is a software that focuses on using AI algorithm to improve image clarity.  
  # overlay_image: 
  overlay_color: "#333"
categories: 
 - PixAI
 - iOS
---   



## PixAI - An iOS app for Super Resolution
<a href="https://apps.apple.com/cn/app/pixai/id6443815029?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/1d/95/60/1d956018-56fd-9dbf-0dff-ebffebda763c/AppIcon-1x_U007emarketing-0-10-0-85-220.png/540x540bb.jpg?h=eae88dfee24ad2dc91b8a89caa201db7" alt="PixAI" style=" width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>
> PixAI is a software that focuses on using AI algorithm to improve image clarity.  

## Download
You can install it on **iPhone, iPad, and MacBook with Apple Silicon**.   



<a href="https://apps.apple.com/cn/app/pixai/id6443815029?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1671062400?h=1fa41db0a598d8f696424a0012ab4bd1" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>


## What is this app for ?
PixAI is a software built for iOS device that focuses on using AI algorithm to improve image definition. It can easily enlarge low resolution images by 16X.   

<img src="/assets/pixai/1.jpg" width="250"><img src="/assets/pixai/2.jpg" width="250"><img src="/assets/pixai/3.jpg" width="250"><img src="/assets/pixai/4.jpg" width="250">   






Minimum configuration requirements:   
1. Apple A12 chip
2. iOS 15.0 +   
Note: **On iOS15, model cannot be guaranteed to run on ANE. It may consume more power and memory, and reduce processing speed.**

Recommended configuration:   
1. iOS 16.0 +
2. Apple chip with faster Neural Engine   

<img src="/assets/pixai/ane.png" width="500">   
For reference, the ANE on chip A15 has the FP16 processing capacity of 15.8TFLOPS, which is the same level as RTX 3060Ti

## Key Features
- Photo Super Resolution
- Anime Super Resolution
- Face Super Resolution
- Old Photo Colorization
- Low Light Enhancement   



## Is my iPhone powerful enough for this AI models ?
Generally speaking, **YES**.   
I spent a lot of time to optimize the running speed of the model. On iOS16, except for the facial super resolution and coloring models, other models will run on the Apple Neural Engine. This will result in satisfactory performance.
## Is this app free or not ?
You can download and test any function of PixAI for free. But if you want to export the picture, there will be a one-time payment of $6.99.
## Awesome AI Models Behind the Scenes and their LICENSES
- Photo Super Resolution
  - [RealESRGAN](https://github.com/xinntao/Real-ESRGAN)
  - [A-ESRGAN](https://github.com/stroking-fishes-ml-corp/A-ESRGAN)
  - [MM-RealSR](https://github.com/TencentARC/MM-RealSR)
- Anime Super Resolution
  - [RealESRGAN-Anime](https://github.com/xinntao/Real-ESRGAN/blob/master/docs/model_zoo.md)
  - [RealCUGAN(Pro)](https://github.com/bilibili/ailab/tree/main/Real-CUGAN)
- Face Super Resolution
  - [GFPGAN](https://github.com/TencentARC/GFPGAN)
- Old Photo Colorization
  - [DeOldify](https://github.com/jantic/DeOldify)
- Low Light Enhancement
  - [ZeroDCE](https://keras.io/examples/vision/zero_dce/)
- Others
  - I used [john-rocky convert scripts](https://github.com/john-rocky/CoreML-Models#anime2sketch) for A-ESRGAN and MM-RealSR conversion.


