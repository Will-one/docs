---
title: 过渡与动画
categories:
  - frontend
tags:
  - css
---

## P115 过渡 transition
过渡 【transition】  
* 通过过渡可以指定一个属性发生变化的切换方式
* 可以提升用户体验

全部属性包含:
1. transition-property 指定要执行过渡的属性，例如height，width
:::tip
  * 多个属性间使用 , 隔开
  * 如果所有属性都需要过渡，则使用 all 关键字
  * 注：大部分属性都支持过渡效果。必须从一个有效值【非auto】向另一个有效值过渡
:::
2. transition-duration 指定过渡的持续时间
:::tip 
  * 时间单位：s 和 ms 。1s = 1000ms
:::


3. transition-timing-function 指定过度的时序函数
:::tip
  * 可选值 【快慢都基于linear匀速而言】
  * ease (默认值)：中间快，两头慢
  * linear：匀速运动
  * ease-in：由慢变快，加速运动
  * ease-out：由快变慢，减速运动
  * ease-in-out：中间快一滴滴，两头慢一滴滴
  * cubic-bezier(0.42,0,1,1)：贝塞尔曲线自定义时序【https://cubic-bezier.com】
  * steps()：分步执行。两个值steps(2,start)或者steps(2,end)。
    * 第一个参数：动画分为几段。
    * 第二个参数：start，表示从**每段耗时的时间起点**执行动画。
    * 第二个参数：end，表示从**每段耗时的时间终点**执行动画。
:::

4. transition-delay 过渡效果的延迟
:::tip
  * 等待延迟时间之后再执行
:::

注意：【transition】简写属性有一个要求，如果要设置延迟。那么**第一个时间是持续时间，第二个是延迟时间。**
```css
.trans-box{
  transition: all 2s steps(2,start) 1s;
}
```