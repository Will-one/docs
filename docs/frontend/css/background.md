---
title: '背景'
categories:
- frontend
tags:
- css
---

## P88 背景part1
1.设置背景颜色background-color
```css
.box1{
    background-color:#bfa;
}
```

2.设置背景图片background-image
```css
.box1{
    background-image:url("./img/logo.png");
}
```

3.设置图片的重复方式background-repeat
前言：图片比背景区域小的时候，就会平铺满。

可选值：

* repeat：默认值沿着xy轴重复
* repeat-x：x轴重复
* repeat-y：y轴重复
* no-repeat：不重复
```css
.box{
    background-repeat:no-repeat;
}
```

4.设置背景图片的位置background-position
设置方式：

* 通过top，bottom，right，left，center来设置，必须设置两个值（只写一个的话，另一个值默认是center）
* 通过偏移量来设置(可以设置负值-常用)
```css
.box1{
    /*background-position:center;*/
    background-position:-50px 100px;
}
```

## P89 背景part2
1.1背景的范围
background-clip可选值

* border-box 默认值，图片会出现在边框的下边。
* padding-box 图片不在边框下出现，只出现在内边距和内容区。
* content-box 背景只出现在内容区。

1.2背景图片偏移量计算的原点
background-origin可选值

* padding-box 默认值 偏移量从内边距处开始计算。
* border-box 偏移量从边框处开始计算。
* content-box 偏移量从内容区开始计算。

2.1设置背景图片的大小
background-size

* 第一个值宽度，第二个值高度
  如果只写一个值的话，第二个值默认是auto
* cover：图片比例不变，将元素铺满
* contain：图片比例不变，将图片在元素中完整显示