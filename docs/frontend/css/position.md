---
title: '定位'
categories:
- frontend
tags:
- css
---

## P69 相对定位
position的可选值：
1.static 默认值，没有开启定位。
2.relative 相对定位
3.absolute 绝对定位
4.fixed 固定定位（重点看下）
5.sticky 粘滞定位

首先当position不为static时开启定位，可以设置偏移量offset
```css
.box1{
    width:100px;
    height:100px;
    background-color:#bfa;
    /*
    为relative时开启相对定位
    
    相对定位的特点：
    1.不设置偏移量时没变化，还在文档流中原来的位置。
    2.参照元素原来在文档流中的位置进行定位。
    3.提升了元素的层级，但不脱离文档流，原位置依然占位。
    4.不改变元素的属性。块还是块。。。
    */
    position:relative;
    top:100px;
    left:100px;
}
```
## P70 绝对定位（常用）
当position为absolute的时候开启绝对定位。**元素脱离文档流**
```css
/* box1是box2的父元素 */

.box1{
    width:100px;
    height:100px;
    background-color:#bfa;
    
    position:relative;
}
.box2{
    width:100px;
    height:100px;
    background-color:#bfa;
    
    /*
    开启了绝对定位之后
    1.脱离文档流
    2.改变元素的性质，行内会变成块。
    3.提升一个层级
    4.绝对定位元素相对于其他包含块进行定位的。（相对于离的最近的开启了定位的祖先元素进行定位）
    
    包含块（contining block）
    1.一般情况下，包含块就是离的最近的祖先块元素。
    2.绝对定位情况下，是离的最近的开启了定位的祖先元素
    3.html-初始包含块。
    */
    position:absolute;
    top:0;
    left:0;
}
```
## P71 固定定位（fixed）
将position设置为fixed之后开启固定定位

固定定位相当于也是一种绝对定位。特点和绝对定位几乎相同
不同点：固定定位永远参照于浏览器的**视口**（就是你的显示器显示的那部分网页）进行定位
```css
.box1{
    /* 固定定位相对于 浏览器视窗进行定位。 例如：页面滚动位置也不变的广告*/
    position:fixed；
}
```

## P72 粘滞定位（兼容性一般）
特点和相对定位类似。position为sticky是开启。
类似网站中竖直放置的导航条。
在触及给的偏移量前，随着窗口滚动。
```
（元素离顶部400px，开启粘滞定位然后top:100px，滚动条向下滚，只要元素离顶部多于100，元素随着页面滚动）
```
触及给的偏移量后，粘滞在页面中。不再随窗口滚动。
```
（当元素离顶部等于100px了，那么元素就不随页面滚动，而是保持在视口中。类似吸顶效果）
```

## P73 绝对定位元素的位置
绝对定位元素用的多，拿出来讲一讲。
**step1**:一个元素box2绝对定位absolute后，他父亲box1给一个相对定位relative。
**step2**:box2在box1中的位置，在水平方向和垂直方向上都要满足那个过渡约束公式,**加了offset那四个值**
```
left + margin-left + border-left +......+ right
top + margin-top + border-left +......+ bottom
```
**step3**:若 [margin]，[width]，[offset四个值]，[height]没有auto并不满足 上面的公式，就会优先调整右边和下边。
**step4**：可以利用这些特性搞水平垂直的双居中。
```css
.box2{
    width:100px;
    height:100px;
    
    margin:auto;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
```


## P74 元素的层级
对于**开启了定位**的元素，可以用z-index来提高元素的层级
```css
.box2{
    z-index:10;
}
```
Note：开启了定位的元素可以设置offset，可以用z-index

