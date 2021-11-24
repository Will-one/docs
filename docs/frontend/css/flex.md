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
```
当为父元素设为flex布局以后，子元素的float、clear和vertical-align属性将失效
```

## P4 flex布局父项常见属性
一下六个属性是对父元素蛇者的
* flex-direction : 设置主轴的方向
* justify-content : 设置主轴上的子元素排列方式
* flex-wrap : 设置子元素是否换行
* align-items : 设置侧轴上的子元素排列方式（单行）
* align-content : 设置侧轴上的子元素的排列方式（多行）
* flex-flow : 复合属性，相当于同事设置了flex-direction和flex-wrap

## P4e flex-direction属性
**flex-direction设置主轴的方向**
flex-direction属性决定主轴的方向（即项目的排列方向）
注意：主轴和侧轴是会变化的，就看flex-direction社会谁为主轴，剩下的就是侧轴。***子元素是跟着主轴来排列的***
| 属性值 | 说明 |
|:----:|:----|
|row|默认：从左到右|
|row-reverse|从右到左|
|column|从上到下|
|column-reverse|从下到上|

## P5 justify-content属性
justify-content设置主轴上的子元素的排列方式
**注意：使用这个属性之前一定要确定好主轴是哪个**
| 属性值 | 说明 |
|:----:|:----|
|flex-start|默认：从头部开始。如果主轴是x轴，则从左到右|
|flex-end|从尾部开始排列|
|center|在主轴居中对齐（如果主轴是x轴则水平居中）|
|space-around|平分剩余空间|
|space-between|先两边贴边，再平分剩余空间（重要）|

## P6 flex-warp属性
flex-warp设置子元素是否换行
默认情况下，子元素是排列在一条轴线上的。flex-wrap属性定义flex布局中默认是不换行的。
| 属性值 | 说明 |
|:----:|:----|
|nowrap|默认：不换行（会压缩子元素宽度）|
|wrap|换行|

## P7 align-items属性
align-items设置子元素在测轴上的排列方式，***在子元素为单项（单行）的时候使用***
| 属性值 | 说明 |
|:----:|:----|
|flex-start|默认：从上到下|
|flex-end|从下到上|
|center|在测轴居中|
|stretch|拉伸（子元素不要给高度，就能被拉伸到和填满父元素）|

## P8 align-content属性
align-content设置侧轴上的子元素的排列方式（多行）
设置子项在侧轴上的排列方式并且只能用于子项出现换行的情况（多行），在单行下是没有效果的。
| 属性值 | 说明 |
|:----:|:----|
|flex-start|默认：在侧轴的头部开始排列|
|flex-end|在侧轴尾部开始排列|
|center|在侧轴中间显示|
|space-around|子项在侧轴平分剩余空间|
|space-between|子项在侧轴先分布在两头，再平分剩余空间|
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
* flex子项目占的份数
* align-self控制子项自己在侧轴的排列方式
* order属性定义子项的排列顺序（前后顺序）

### flex属性
flex属性定义子项目分配剩余空间,用flex来表示占多少份数（注意：可以写百分比）。
```css
.item{
    flex:<number>; /* default 0 */
}
```
如果子项目没有宽度的话，那么父元素的整个内容区都是剩余空间。
如果子项目宽度的话，那么进行分配的是剩余空间。
```

（例如子元素有3个，flex设为1，那么子元素就是大小相同的三个）
（例如子元素有3个，flex设为1，其中一个flex设为2，那么剩余空间会分4份。flex为2的元素占两份）

```

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
