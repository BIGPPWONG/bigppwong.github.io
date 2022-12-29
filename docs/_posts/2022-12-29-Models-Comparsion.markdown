---
layout: single
author: BIGWONG Studio
title:  "PixAI Models Comparision"
comments: true
excerpt: "Comparison of advantages and disadvantages of PixAI model."
toc: true 
header:
  show_overlay_excerpt: true
  overlay_image: /assets/pixai/unsplash.jpg
  overlay_color: "#333"
  overlay_filter: 0.5
  caption: Photo by <a href="https://unsplash.com/@fabioha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">fabio</a> on <a href="https://unsplash.com/s/photos/tech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  actions:
    - label: "Download"
      url: "https://apps.apple.com/cn/app/pixai/id6443815029?itsct=apps_box_link&itscg=30200"
categories: 
 - PixAI
 - iOS
---   

## Comparison of advantages and disadvantages of PixAI models.
<a href="https://apps.apple.com/cn/app/pixai/id6443815029?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/1d/95/60/1d956018-56fd-9dbf-0dff-ebffebda763c/AppIcon-1x_U007emarketing-0-10-0-85-220.png/540x540bb.jpg?h=eae88dfee24ad2dc91b8a89caa201db7" alt="PixAI" style=" width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>
> PixAI is a software that focuses on using AI algorithm to improve image definition. 

### Generic Models Comparision

**Higher means Stronger Effect**

|  Models  | A-ESRGAN | RealESRGAN | MM-RealSR | 
|  ----  | ----  | ---- | ---- |
| Sharpness  | 3 | 2.5 | 1.5 |
| Denoise  | 2 | 2 | 3 |
| Universal | 2 | 3 | 1 |

#### TIPS:   

- **For ordinary users**：   
	Just use `RealESRGAN`

- **If you are seeking for better results**：   
	1. Try `A-ESRGAN`first, which may produce better results in some case.
	2. If the output is weird, fallback to `Real-ESRGAN` which is more universal and can produce similar results.
	3. Only use `MM-RealSR` if you need very strong noise reduction.   



### Anime Models Comparision
**Higher means Stronger Effect**

|  Models  | RealESRGAN-Anime | RealCUGAN | RealCUGAN-Pro | 
|  ----  | ----  | ---- | ---- |
| Sharpness  | 3 | 2.5 | 2.5 |
| Denoise  | 3 | 1.5 | 1.5 |
| Details Preserved | 1.5 | 2.5 | 3 |

> `RealCUGAN-Pro` produces **3x** images and then resized to 4x, which is different to other models.

#### TIPS:
- **If you are seeking for best sharpness and don't mind losing some details of the original picture.**  
	Use `RealESRGAN`

- **If you want a balance between sharpness and details preservation.**   
	Use `RealCUGAN`

- **If you are seeking for best details preservation.**   
	Use `RealCUGAN-Pro`




