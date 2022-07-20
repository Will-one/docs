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
:::warning
注意：【transition】简写属性有要求，如果要设置延迟。那么**第一个时间是持续时间，第二个是延迟时间。**
:::
```css
.trans-box{
  transition: all 2s steps(2,start) 1s;
}
```


:::tip 全部属性包含:
* **transition-property**：指定要执行过渡的属性，例如height，width
  * 多个属性间使用 , 隔开
  * 如果所有属性都需要过渡，则使用 all 关键字
  * 注：大部分属性都支持过渡效果。必须从一个有效值【非auto】向另一个有效值过渡
* **transition-duration**：指定过渡的持续时间
  * 时间单位：s 和 ms 。1s = 1000ms

* **transition-timing-function**：指定过度的时序函数
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

* **transition-delay**：过渡效果的延迟
  * 等待延迟时间之后再执行
:::

## P117 animation 动画
动画和过渡类似，用于实现一些动态效果。  
不同点:  
* transition【过渡】需要在某个属性发生变化时才生效
* 动画可以自动触发动画效果

:::warning
注意：【animation】简写属性有要求，如果要设置延迟。那么第一个时间是持续时间，第二个是延迟时间。

注意外边距重叠导致子元素的动画效果影响到父元素
:::
```css
.box2{
    width: 100px;
    height: 100px;
    background-color: #bfa;
    animation: box2move 2s 3 linear alternate both;
}

@keyframes box2move{
    /* from表示动画的起始位置，也可以用 0% 表示 */
    from{
        margin-left: 0;
    }
    /* to表示动画的起始位置，也可以用 100% 表示 */
    to{
        margin-left: 700px;
    }
}
```

### 如何设置动画？
1. 设置动画效果，必须先要设置一个关键帧，关键帧中设置了动画执行的每一步骤
2. 为对应结构设置动画
::: tip animation属性
 * **animation-name**：指定当前动画要使用的关键帧名字
 * **animation-duration**：动画的执行时间
 * **animation-delay**：动画开始的延迟
 * **animation-timing-function**：动画的时序函数
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
 * **animation-iteration-count**：指定动画执行的次数
   * 可选值：
   * 默认1次，直接写数字
   * infinite 无限次

 * **animation-direction**：指定动画的方向
   * 可选值：
   * normal 从 from 到 to 执行
   * reverse 从 to 到 from 执行
   * alternate 从 from 到 to。重复执行时，反向执行
   * alternate-reverse 从 to 到 from。重复执行时，反向执行

 * **animation-play-state**：设置动画的执行状态【**可以通过这个属性对动画启停进行控制**】
   * 可选址：
   * running 动画执行，默认值
   * paused 动画停止

 * **animation-fill-mode**：设置动画的填充模式
   * 可选值：
   * none：动画执行完毕回到元素原本的位置
   * forwards：动画执行完毕元素会停止在动画结束的位置
   * backwards：动画设置了delay，在等待时，就执行开始的关键帧
   * both：结合了forwards和backwards
:::


## P120-P122 transform 变形平移旋转
transform 变形转变  
- 不影响页面的布局

:::tip
设置原点transform-origin
* 默认设置center
```css
transform-origin: center;
```
* 指定坐标点 x y
```css
transform-origin: 0 0;
```
:::

:::tip
1. 平移【百分比是相较于自身计算的】
* translate()：简写属性，内部可以写x，y，z的值
* translateX()：x-axis方向平移
* translateY()：Y-axis方向平移
* translateZ()：Z-axis方向平移
  * z轴平移属于立体效果，默认情况下网页没有透视效果
  * 需要设置网页的视距perspective,一般800-1200px
  * 兼容性问题，推荐这么写，perspective()要写在前面：
```css  
transform: perspective(800px) translateZ(100px);
```
1. 旋转【设置perspective的话，旋转会有立体效果】
* rotateX：x轴方向旋转
* rotateY：Y轴方向旋转
* rotateZ：Z轴方向旋转

注意：旋转时，各坐标轴的指向会相应改变。
可以实现很多用户体验良好的视觉效果
```css
transform: perspective(800px) rotateY(360deg) translateZ(200px);
```
:::

## P123-P124 景深和3D效果
给需要景深的元素的祖先元素设置perspective  
perspective 给 body设置是生效的

通常情况下一个元素transform时，即使设置了景深，也只是在2d的方位内显示

如果要实现一个旋转的立方体之类的3d效果。就需要给旋转的元素添加transform-style: preserve-3d;

:::danger
**transform-style: preserve-3d;** 与 **opcity** 写在同一个样式时  
**transform-style: preserve-3d;** 就失效了
:::

## P125 transform 缩放
transform:scale()对元素放大缩小  
属性值：
* scaleX()：水平方向
* scaleY()：垂直方向
* scale()：双方向
* scaleZ()：Z轴缩放（使用较少，需要设计为3d效果才能看出来）
```css
/* 水平垂直方向扩大为两倍 */
transform: scale(2);
```