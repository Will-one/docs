---
title: '盒模型'
categories:
- frontend
tags:
- css
---

## P44 文档流
文档流（normal flow）
网页是一个多层的结构，一层叠着一层
最下面一层就是文档流

元素在文档流中的特点：
块元素
```
- 块元素会在页面中独占一行
- 默认宽度是父元素的全部（会把父元素撑满）
- 默认高度是被内容撑开（子元素）
```
行内元素
```
- 行内元素不会独占页面的一行，只占自身的大小
- 行内元素在页面中从左向右排列，一行容不下，换行
- 默认的宽高都是被内容撑开的
```

## P45 盒模型
一个盒子模型由一下几部分组成：
1.内容区content
2.内边距padding 
3.边框border
4.外边距magin

一个样式中的
width和heigh规定了内容区域的宽高。
整个盒子的大小是包含以上所有部分的。

## P46 盒模型-边框
Css中有三个属性来定义边框
border-width:10px;
border-color:red;
border-style:solid;

通过border简写属性可以直接定义三个属性，没有先后顺序。
```css
border：10px red solid；
```
然后可以根据border-top。。。。
来定义具体的上下左右的属性
//右边没有边框
border：10px red solid；
border-right：none；


## P49 水平方向的布局
子元素存在于父元素的内容区中，此时的子元素必须满足一个等式：
**margin-left + border-left + padding-left + width + padding-right +border-right + margin-right = 父元素的内容区的width**

当不满足这个等式的时候，会发生过渡约束，则等式会自动调整。
    -调整的情况
        -如果这 7 个值里面都没有 auto 的时候，则浏览器会自动调整 margin-right 值使等式成立
        -这 7 个值里面有三个值可以设置为auto
            -width
            -margin-left
            -margin-right
        -如果某个值为auto，则会调整auto的值
        -如果有多个值为auto，并且width也是auto的时候，width会调整为最大，设置为auto的margin值会为0
       
        -如果两个magin为0，则会使子元素在父元素内容区中垂直居中
```css
width：xxxpx；
magin：0 auto；
```


## P49 垂直方向的布局
如果没有设置height，那么垂直方向父元素的高度是由其内容区 子元素的高度撑开的。

例如父元素的样式为box-father，子元素的样式为box-child
```css
.box-father{
    width:200px;
    height:100px;
    /*
        子元素如果高度大于父元素，就会溢出
        在父元素设置overflow可以设置父元素处理溢出部分的方式
        
        可选值：
            visible：默认值，显示溢出部分，不做特殊处理。
            hidden：溢出的部分被裁减不显示
            scroll：生成两个滚动条
            auto：根据需要生成滚动条
    */
    overflow:auto;
}

.box-child{
    width:100px;
    height:400px;
background-color:green;
}
```

## P51 盒子模型-外边距的重叠
在布局中**垂直方向上**的两个外边距会发生折叠。

### 1.兄弟元素间的垂直外边距重叠
1.1 都为正值，两个相邻垂直外边距取大值
1.2 一正一负，取两个值的和
1.3 都为负值，取绝对值大的数
**注意**兄弟元素见的外边距重叠是方便我们开发的，不用特殊处理。

### 2.父子元素间的垂直外边距重叠
**子元素的外边距会传递给父元素，对布局是不利的。**
处理方法:总的来说就是就是让两个外边距相邻，或者以其他方式实现布局效果。
2.1 可以为父元素设置内边距来进行布局，但要注意这样会改变父元素的高度，要减去。
2.2 为父元素设置边框，这样也很麻烦。不建议
2.3
2.4


## P52 行内元素的盒模型

### 行内元素的一些特点
1.行内元素不支持设置宽高，都是用内容撑开的
2.可以设置padding border margin ，但是不会影响布局。

### 常用的一些css
```css
/*
    display 的可选值。
        inline：元素设置为行内元素
        block：块元素
        inline-block：行内块（用的少）
        none：元素不显示（不占位，直接不渲染）
*/
display:block;

/*
  visibility 的可选值
    visible：可见的
    hidden：隐藏（不可见，但是占位，渲染了）
*/
visibility:visible;
```
## P53 浏览器的默认样式
默认样式：通常情况下，浏览器会给元素设置默认样式。然而在开发中，我们不希望看到这样的情况，所以有以下有两个解决的办法。
1.小项目小网页中，直接找到对应的有默认样式的元素，单独去除。
```css
*{
    margin:0;
    padding:0;
}
```
2.大一些的项目中，直接引入**重置样式表**。可以去下载**https://meyerweb.com/eric/tools/css/reset/**
或者引入**https://github.com/necolas/normalize.css/blob/v1/normalize.css**
```javascript
<link rel="stylesheet" href="./css/reset.css">
<!-- <link rel="stylesheet" href="./css/normalizs.css"> -->
<!--
    重置样式表，专门对浏览器的样式进行重置
    reset.css 直接去除浏览器的默认样式
    normalize.css 对默认样式进行统一
-->
```


## P58 盒子的大小
```css
box1{
    width:100px;
    height:100px;
    padding:10px;
    border:5px red soild;
    
    /*
        默认情况下，盒子的可见框大小有内容区，内边距，边框决定。
        box-sizing 用来设置盒子尺寸的计算方式（设置width和height的作用位置）
            可选值：
            content-box：默认值，宽度和高度用来设置内容区的大小。
            border-box：宽度和高度设置 整个盒子可见框的大小。
    */
    box-sizing:border-box;
    
    /*
        因为设置可见框大小，设置border-box有个好处
        width和height设置多少，盒子的可见框就是多少
    */
}
```

## P59 轮廓阴影和圆角
**outline**用来设置元素的轮廓，用法和**border**一样。区别在于不影响布局
```css
box1{
    width:200px;
    height:200px;
    background-color:#bfa;
    outline:10px red solid;
}
```
**box-shadow**用来设置设置元素的阴影效果，不影响布局。
```css
box1{
    widht:200px;
    height:200px;
    background-color:#bfa;
    /*
        box-shadow：用来设置元素的阴影效果，不影响页面布局。
        第一个值：水平偏移量
        第二个值：垂直偏移量
        第三个值：模糊半径
        第四个值：颜色（一般使用rgba透明色）
    */
    box-shadow:10px 10px 20px rgba(0,0,0,.4);
}
```

**border-redius设置盒子**设置圆角，圆角设置的是圆的半径大小。
```css
box2{
    width:200px;
    height:200px;
    background-color:#bfa;
    /*
        border—redius:用来设置圆角
        
        border-top-left—redius
        border-top-right-redius
        border-bottom-right-redius
        水平半径和垂直半径，可以把那个角设置为椭圆的
        border-bottom-left-redius：20px 50px；
    */
    
    /*
        一个值：4个角
        两个值：左上&右下 右上&左下
        三个值：左上 右上&左下 右下
        四个值：左上 右上 左下 右下
    */
    border-redius:20px / 40px；
    /*
        要设置圆角，中间/分割，水平半径和垂直半径
    */
}
```