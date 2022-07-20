---
title: 单位和文档流
categories:
- frontend
tags:
- css
---

## P40 像素和百分比
* 像素px：
  * 前端开发中像素分为两种情况讨论：css像素 和 物理像素
    * 浏览器在显示网页时，需要将css像素转换为物理像素，然后再呈现
    * 一个css像素最终由几个物理像素呈现，有浏览器决定
    * 默认情况下，一个css像素 = 一个物理像素
* 百分比：
  * 可以将其属性设置为相对于开启了定位的父元素的百分比
  * 设置百分比可以使子元素跟随父元素改变而改变

## P41 em和rem
em
```
em是相对于元素的字体大小来设计的
1em = 1font-size
em会根据字体大小的改变而改变
```
rem
```
r，root。rem根据根元素的字体大小来计算的
```

## P42 RGB值
语法1：rgb(红，绿，蓝)
```
background-color:rgb(255,0,0)
```

语法2：rgba(红，绿，蓝，0.5)
```
// 透明度
background-color:rgba(255,0,0,.5)
```

语法3：#红绿蓝
```
background-color:#ff0000
// 简写成为#f00
```

## P43 HSL值
工业设计里面经常使用
H（hue） 色相：（0-360）
S（saturation） 饱和度：（0-100）%
L（lightness） 亮度：（0-100）%
