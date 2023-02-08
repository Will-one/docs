---
title: 'Flex 布局'
categories:
- frontend
tags:
- css
- flex
---

## P3 flex原理
flex是flexible Box的缩写，任何一个容器都可以指定为flex布局
* 是css中有一种布局手段，主要用来代替浮动来完成页面的布局
* flex可以使元素具有弹性，让元素可以跟随页面的大小的改变而改变
* 弹性容器
  * 要使用flex，必须先将一个元素设置为弹性容器
  * 通过display来设置弹性容器
    * display: flex; 设置为弹性容器
    * display: inline-flex; 设置为行内弹性容器
* 弹性元素
  * 弹性容器的子元素是弹性元素（弹性项目）
  * 一个元素可以同时是弹性容器和弹性元素
:::warning
当为父元素设为flex布局以后，子元素的**float**、**clear**和**vertical-align**属性将失效
:::

## P4 flex布局父项常见属性
以下六个属性是对父元素【弹性盒子】设置的
* **flex-direction** : 设置主轴的方向
* **justify-content** : 设置主轴上的子元素排列方式
* **flex-wrap** : 设置子元素是否换行
* **align-items** : 设置侧轴上的子元素排列方式（单行）
* **align-content** : 设置侧轴上的子元素的排列方式（多行）
* **flex-flow** : 复合属性，相当于同时设置了flex-direction和flex-wrap

## P4e flex-direction属性
**flex-direction设置主轴的方向**
* flex-direction属性决定主轴的方向（即弹性盒子中子元素的排列方向）

| 属性值 | 说明 |
|:----:|:----|
|row|默认：从左到右|
|row-reverse|从右到左|
|column|从上到下|
|column-reverse|从下到上|

## P5 justify-content属性
justify-content如何分配主轴上的空白空间（也就是决定了主轴元素的排列方式）

| 属性值 | 说明 |
|:----:|:----|
|flex-start|默认：从头部开始。如果主轴是x轴，则从左到右|
|flex-end|从尾部开始排列|
|center|在主轴居中对齐（如果主轴是x轴则水平居中）|
|space-around|平分剩余空间，分布到每个弹性元素的两侧，元素间的空间大一些|
|space-evenly|平分剩余空间，元素之间和容器两头的空白大小相同（兼容性问题，慎用）|
|space-between|先两边贴边，再平分剩余空间（重要）|

## P6 flex-warp属性
flex-warp设置弹性元素是否在弹性盒子中自动换行
默认情况下，子元素是排列在一条轴线上的。flex-wrap属性定义flex布局中默认是不换行的。
| 属性值 | 说明 |
|:----:|:----|
|nowrap|默认：不换行（会压缩子元素宽度）|
|wrap|向辅轴方向换行|
|wrap-reverse|向辅轴的反方向换行|

## P7 align-items属性
align-items设置子元素在辅轴上的排列方式，***在子元素为单项（单行）的时候使用***
| 属性值 | 说明 |
|:----:|:----|
|stretch|默认。拉伸（子元素不要给高度，就能被拉伸到和填满父元素）|
|flex-start|默认：从上到下|
|flex-end|从下到上|
|center|在辅轴居中|
|baseline|基线对齐|

## P8 align-content属性
align-content设置侧轴上的子元素的排列方式（多行）
设置子项在侧轴上的排列方式并且只能用于子项出现换行的情况（多行），在单行下是没有效果的。
| 属性值 | 说明 |
|:----:|:----|
|flex-start|默认：在侧轴的头部开始排列|
|flex-end|在侧轴尾部开始排列|
|center|在侧轴中间显示|
|space-around|子项在侧轴平分剩余空间|
|space-between|平分剩余空间，分布到每个弹性元素辅轴方向上的两侧，元素间的空间大一些|
|space-evenly|平分剩余空间，辅轴元素之间和容器上下的空白大小相同（兼容性问题，慎用）|
|stretch|设置子项元素高度平分父元素高度|

**align-content和align-items区别**
* align-items适用于单行情况下，只有上对齐、下对齐、居中和拉伸
* align-content适应于换行（多行）的情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值。
* 总结就是单行找align-items多行找align-content

## P9 flex-flow属性
flex-flow属性是flex-direction和flex-wrap属性的复合属性
```
flex-flow:row wrap;
```

---
## P10-P11 flex子项常见属性
* flex-grow 指定弹性元素的伸展的系数
  * 当父元素有多余的空间时，子元素如何伸展
  * 父元素的剩余空间，会按照比例进行分配
* flex-shrink 指定弹性元素的收缩系数
  * 当父元素的空间不足以容纳所有的子元素时候，如何对子元素进行收缩
  * 缩减是根据 **缩减系数** 和 **元素大小** 来计算的
* flex-basis 指定元素在主轴的基础长度
  * 主轴是横向的，则该值指定元素的宽度
  * 主轴是竖向的，则该值指定元素的高度
  * 默认值是auto，表示参考元素自身高度或宽度
  * 如果传递了一个具体的数值，则以该值为准
* flex 是flex-grow、 flex-shrink、 flex-basis的一个简写
* align-self控制子项自己在侧轴的排列方式
* order属性定义子项的排列顺序（前后顺序）

### flex属性
flex 可以设置flex-grow flex-shrink flex-basis三个属性。
* 语法：flex: 伸展系数 收缩系数 基础长度
* 提供的可选值
  * initial 【flex: 0 1 auto;】
  * auto 【flex:1 1 auto;】
  * none 【flex: 0 0 auto;】
```css
.item{
    flex:<number>; /* default 0 */
}
```
如果子项目没有宽度的话，那么父元素的整个内容区都是剩余空间。
如果子项目有宽度的话，那么进行分配的是剩余空间。
:::tip
（例如子元素有3个，flex设为1，那么子元素就是大小相同的三个）
（例如子元素有3个，flex设为1，其中一个flex设为2，那么剩余空间会分4份。flex为2的元素占两份）
:::

### align-self属性
align-self属性允许单个项目有与其他项目不一样的侧轴对齐方式，可覆盖align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```css
span:nth-child(2){
    /* 设置自己在侧轴上的排列方式 */
    align-self:flex-end;
}
```

### order定义项目的排列顺序
数值越小，排列越靠前，默认为0。
注意：和z-index不一样
