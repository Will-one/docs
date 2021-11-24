---
title: '浮动和高度塌陷'
categories:
- frontend
tags:
- css
---

## P60 浮动的特性
```css
box1{
    float:none;
    /*
    1.给一个元素设置浮动，它就完全脱离文档流了
    2.不会超出父元素的宽度，不会从父元素中移出（父元素高度塌陷后面再说）
    3.浮动元素不会超过它前面的未浮动 块兄弟元素
    4.浮动元素不会超过它前一个浮动元素。
    */
}
    
```

## P61 浮动的其他特性
```css
box{
    float:left;
    /*
    float原本是设计用来做文字环绕效果的。。
    设置浮动后，浮动元素不会盖住文字，文字会自动环绕在浮动元素的周围。
    */
}
```

```css
box1{
    float:right;
    /*
    元素浮动后脱离文档流，它的一些特性也会改变。
    
    块元素：
    1.浮动后，在默认情况下（不设置width和height）。元素宽高由内容撑开
    2.块元素不再独占一行
    
    行内元素：
    1.浮动后，可以为其设置width和height，变成了块元素
    
    so：浮动后天下大同，不用区分块元素和行内元素了。
    */
}
```

## P64 高度塌陷和BFC（重要）
例如：一个父元素没有设置高度，当他的子元素浮动后，它的高度就塌陷了。

这个时候引入一个知识
**BFC**（Block Fomatting Context）块级格式化环境
```
* BFC是 css 中一个隐含的属性，可以为一个元素开启BFC
1. 开启BFC 该元素会变成一个独立的布局区域。
```
```
* 元素开启BFC后的特点
1.不会被浮动元素所覆盖
2.子元素和父元素的外边距不会重叠
3.元素可以包含浮动的子元素（可以解决高度塌陷的问题了）
```

**怎么开启BFC**
```
1.设置元素浮动（宽度丢失，会挡住下面的非浮动元素）
2.设置元素为行内块元素（宽度丢失）
3.将元素的overflow设置为一个非visible的值
```
常用方法就是把元素的overflow设置为hidden以开启BFC
```css
.dkalf{
    overflow:hidden;
}
```

## P66 clear
比如从上到下有三个元素。其中前两个元素浮动了，第三个没有浮动，可以在第三个元素的css里面写clear属性，清除浮动带来的影响
```javascript
<div class="box1">1</div>
<div class="box2">2</div>
<div class="box3">3</div>
```
```css
.box1{
    width:100px;
    height:100px;
    background-color:#bfa;
    float:left;
}

.box2{
    width:300px;
    height:300px;
    background-color:#ff0;
    float:right;
}

.box3{
    width:150px;
    height:150px;
    background-color:#bfa;
    clear:both;
    /*
    我们不希望这个元素被前两个元素的浮动影响位置的话，就可以为它设置clear
    
    clear
        作用：清除浮动元素对当前元素造成的印象
        可选值：
            left：清除左浮动造成的影响
            right：清除右浮动造成的影响
            both：清除两侧中 最大影响的那个
            
        原理：
            设置清除浮动以后，浏览器会自动为元素添加一个上外边距以使其位置不受其他元素的影响。（比如box1，2浮动，box3就搞一个margin-top：300px这样的。保持自己的位置，但是开发工具看不出来，不显示的）
    */
}
```

## P67 伪类解决高度塌陷问题（重要）
father的高度是child撑开的,child设置了浮动后，father就高度塌陷了。
**伪类解决高度塌陷的原理相当于是，父元素中只有一个子元素，那么这个子元素浮动后，高度塌陷。如果父元素中不止有一个子元素，并且这个块子元素还有合适的高度，那么就解决了高度塌陷问题**
```css
father::after{
    content:'';
    display:block;
    clear:both;
}
```

## P68 终极版解决高度塌陷和外边距重叠
父子元素之间的外边距重叠，解决方式就是要把他们隔开
```css
/*
display设置为block隔不开，inline-block会多一行（把它想象为一个字），table正好用
*/
.box1::before{
    content:'';
    display:table;
}
```

终极版：
```css
/*
当有元素有高度塌陷或者是外边距重叠时，可以直接调用clearfix来解决
0.伪元素默认是行内元素，要变为块元素才行

1.外边距重叠：在元素的before添加了为dispaly：talbe样式，将元素隔开了。

2.高度塌陷：在元素after加上了空块元素并clear清除浮动影响，就可以撑开父元素。
*/

.clearfix::before,
.clearfix::after{
    content:'';
    display:table;
    clear:both;
}
```