---
title: 常用选择器
---

## P28 CSS的编写位置
1.内联样式：**style="{color:red;}"**
2.内部样式表：**<style></style>**
3.外部样式表：**<link rel="stylesheet" href="外部样式表位置">**

## P30 常用选择器
1.元素选择器**p{} h1{}**
2.id选择器#id
3.类选择器.class
4.通配选择器选中页面中所有标签*{}


## P31 复合选择器
一.交集选择器
选中所有的p标签和class=banner的元素，有标签的时候标签在第一位
```css
p.banner{
    color: red;
}
```

二.选择器分组（并集选择器）
用逗号隔开
```css
.banner, p, .footer{
....
}
```
## P32 关系选择器
```html
<div>
    <p id="one">
        <span id="two"></span> 
    </p>
    <span id ="three"></span>
    <span id ="four"></span>
</div>
```
一.子元素选择器
```css
div > span {
/*选中id=three的span子元素*/
} 
div > p > span{
/*选中id = two的子元素*/ 
}
```

二.后代元素选择器
```css
div span {
    /* 选中div下的所有span */
   /* 选中了id为two和three和four的后代元素 */
}
```
三.兄弟选择器
```css
p + span {
    /* 选中紧挨p的第一个span兄弟元素 */
    /* 选中id = three的span元素 */
}

p ～ span {
    /* 选中p以下的所有span兄弟元素 */ 
    /* 选中id为three和four的span元素 */
}
```

## P33 属性选择器
当然它可以和各种选择器连接
[属性名]
[属性名=属性值]
[属性名^=属性值] //头匹配
[属性名$=属性值] //尾匹配
[属性名*=属性值] //全匹配
```html
<p id="a" title="abc"></p>
<p id="b" title="abcde"></p>
<p id="c" title="jkikabc"></p>
<p></p>
<p></p>
```
```css
p[title]{ 
    /* 有title属性的p元素被选中 */ 
}
```
## P34 伪类选择器
伪类选择器：一般用来描述第一个元素，最后一个，鼠标移入的元素
-通常情况都是使用：冒号开头
:first-child 第一个子元素
:last-child 最后一子个元素
:nth-child 选中n个子元素
特殊值：
n：0到无穷
- 2n或even：偶数
- 2n+1或odd：奇数
- (间隔值)n+(起始值)：以起始值开头间隔为n的数列
以上的都是所有子元素进行排列
```html
<ul>
    <span></span>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
```css
ul > li:first-child{
    /* 会选中span */
}
```

:first-of-type
:last-of-type
:nth-of-type
这个就是根据子元素类型排列
```css
ul > li:first-of-type{
    /* 会选中第一个li */
}
```


:not 否定伪类，将符合条件的元素从选择器中去除
```css
ul > li:not(:nth-of-type(3)){ 
    /* 除了最后一个li的其他li都能被选中 */
}
```


## P35 超链接的伪类
:link 用来表示没访问过的链接（a标签独有的）
**a:link**

:visited 用来表示访问过的链接（a标签独有的，少用）
由于隐私的原因，只能修改颜色
**a:visited**

:hover 用来表示鼠标移入的状态
**a:hover**

:active 用来表示鼠标点击的状态(点击不松手)
**a:active**


## P36 伪元素（重要）
伪元素表示页面中一些特殊的并不真实存在的元素
    ***伪元素使用 :: 开头***
    
**::first-letter** 表示第一个字母（比如英文报纸文章第一个字母会大写字体也不一样）
**::first-line** 第一行
**::selection** 选中的

**::before** 元素的开始（可以去解决高度塌陷的问题）
**::after** 元素的最后
    **before 和 after 必须结合 content 属性来使用**

```css
div::before {
    /*在元素的开头加上了abc*/
    content : ‘abc’;
}
```


## P38 继承
背景和布局相关的不会被继承，查看一个样式是否能被继承，可以去查css的文档

## P39 选择器权重
内联样式（1000）：1,0,0,0
id选择器（100）：0,1,0,0
类和伪类选择器（10）：0,0,1,0
元素选择器（1）：0,0,0,1
通配选择器*：0,0,0,0
继承的样式：没有优先级

比较优先级时，需要将所有的选择器的优先级相加计算，最后优先级越高，则越先显示（分组选择器是单独计算的）
```css
// 逗号隔开的分组选择器
div,p,span{    
}
```

选择器的累加不会越界（11个类选择器也不会高于1个id选择器）
```css
内联样式:      1,0,0,0
id选择器:      0,1,0,0
类和伪类选择器: 0,0,1,0
元素选择器:     0,0,0,1
```
