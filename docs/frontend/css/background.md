---
title: '背景'
categories:
- frontend
tags:
- css
---

## P88 背景part1
1. 设置背景颜色background-color
```css
.box1{
    background-color:#bfa;
}
```

2. 设置背景图片background-image
```css
.box1{
    background-image:url("./img/logo.png");
}
```
```css
/* 线性渐变和径向渐变 */
.box1{
    /* 默认情况从上到下 */
    background-image: linear-gradient(#e66465, #9198e5);
    /* 向右下角渐变 */
    background-image: linear-gradient(to bottom right, yellow, red);
    /* 设置渐变角度，0向上渐变，90deg向右渐变 */
    background-image: linear-gradient(90deg, skyblue, green);
    /* 多颜色，平均分布 */
    background-image: linear-gradient(rgba(85, 151, 237, .2),rgba(85, 151, 237,.8),rgba(85, 151, 237, .2));

    /* 重复线性渐变 */
    background-image: repeating-linear-gradient(#e66465 50px, #9198e5 100px);
}
```
```css
box1{
    /* 径向渐变 */
    /* 默认情况下，径向渐变的形状根据元素的形状计算的 */
    background-image: radial-gradient(yellow, skyblue, green);

    /* 指定渐变的范围 */
    background-image: radial-gradient(100px 100px, skyblue, green);
    /* 指定渐变的位置 */
    background-image: radial-gradient(100px 100px at 0 0, skyblue, green);
}

```

3. 设置图片的重复方式background-repeat
前言：图片比背景区域小的时候，就会平铺满。

可选值：

* **repeat** ：默认值沿着xy轴重复
* **repeat-x** ：x轴重复
* **repeat-y** ：y轴重复
* **no-repeat** ：不重复
```css
.box{
    background-repeat:no-repeat;
}
```

4. 设置背景图片的位置background-position
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
1.1 背景的范围
**background-clip**可选值

* **border-box** 默认值，图片会出现在边框的下边。
* **padding-box** 图片不在边框下出现，只出现在内边距和内容区。
* **content-box** 背景只出现在内容区。

1.2 背景图片偏移量计算的原点
**background-origin** 可选值

* **padding-box** 默认值 偏移量从内边距处开始计算。
* **border-box** 偏移量从边框处开始计算。
* **content-box** 偏移量从内容区开始计算。

2.1 设置背景图片的大小
**background-size**

* 第一个值宽度，第二个值高度
  如果只写一个值的话，第二个值默认是auto
* **cover**：图片比例不变，将元素铺满
* **contain**：图片比例不变，将图片在元素中完整显示