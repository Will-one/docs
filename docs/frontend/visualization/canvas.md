---
title: 'canvas'
categories:
- frontend
tags:
- 可视化
---

## canvas的基本使用
* canvas画布：是HTML5中新增的一个特性，双闭合标签
* canvas标签默认宽度与高度 300 * 150
* 浏览器认为canvas标签是一张图片
* 在canvas标签之前添加文本内容没有意义
* canvas标签的w|h 请务必通过canvas的width|height设置，不要通过样式去设置
```html
<canvas widht="600" height="400"></canvas>
```
```js
// canvas的各种操作务必通过js完成
// 首先要获取canvas的上下文对象
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// 绘制线段

// 绘制线段的起点的设置
ctx.moveTo(100,100);
// 其他点的设置：可以有多个
ctx.lineTo(100,200);
ctx.lineTo(200,100);

// 设置图形的填充颜色
ctx.fillStyle = "red";
ctx.fill();
// 设置线段的颜色与宽度
ctx.strokeStyle = "purple";
ctx.lineWidth = "10";

// 设置起点终点闭合
ctx.closePath();
// stroke方法绘制线段
ctx.stroke();
```

## canvas绘制矩形
使用canvas绘制一个矩形，两种方法
```js
let canvas = document.querySeletor("canvas");
let ctx = canvas.getContext("2d")

// 第一种方法：参数x、y、w、h
// 不能设置填充颜色
ctx.strokeRect(100,200,100,200);

// 第二种方法
// 填充颜色后制图
ctx.fillStyle = "skyblue";
ctx.fill();
ctx.fillRect(300,200,100,200);
```

## canvas绘制圆
* arc(x,y,radius,starAngle,endAngle,anticlockwise)
  * x , y : 圆心的 x , y 坐标
  * radius : 半径
  * starAngle : 开始角度
  * endAngle : 结束角度
  * anticlockwise : 是否为（true）为逆时针，（false）为顺时针
* 开始绘制前先调用beginPath()方法
```js
ctx.beginPath()
ctx.arc(100, 100, 50, 0, 2*Math.PI, true);
// 设置填充颜色
ctx.fillStyle = "red";
ctx.fill()
ctx.stroke()
```

## 清除画布&绘制文字
* 当在一个画布反复绘制图形，需要将上一次的图形清除
```js
// 清除画布x y w h
ctx.clearRect(0,0,300,150)
```
* 绘制文字
```js
ctx.font = "20px 微软雅黑";
// text，x， y
ctx.fillText("数据可视化",100,50);
```