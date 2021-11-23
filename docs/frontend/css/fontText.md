---
title: '字体和文本'
---

## P76 字体族
font-family
大致分为衬线字体和非衬线字体
```css
.fontClass{
    /*
    字体相关的样式：
        color：用来设置字体的颜色
        font-size：设置字体大小
            font-size相关的单位
            em：当前元素的font-size
            rem：相对于根元素的font-size
        font-family：字体族
            可选值（这三个指定字体的类别，浏览器会自动使用该类别下的字体）：
                - serif：衬线字体（字体笔画结尾处有多余的笔画进行修饰）
                - sans-serif：非衬线字体
                - monospace：等宽字体（比如H和l可以同宽）
            font-family可以指定多个字体，字体之间用逗号隔开，字体生效时优先使用第一个，第一个无法使用则使用第二个,最后指定一个非衬线字体（常见）
            Microsoft YaHei,heiti sc,sans-serif
    */
    color:#bfa;
    font-size:1em;
    font-family:Microsoft YaHei,heiti sc,sans-serif;
}
```

或者也可以指定用什么字体加载页面
但是要注意：
1.网速不好的情况字体可能后加载好，文字会闪一下
2.版权问题
3.可能有奇葩浏览器不支持ttf格式的字体
```css
/* 可以将服务器中的字体直接提供给用户使用 */
@font-face{
    /* 指定字体的名字（自己取名） */
    font-name:'wzxFont';
    /* 服务器中字体的路径 */
    src:url('./font/Yuanyuan.ttf');
}
```

## P77 图标字体简介
把图标设计成字体，就能够使用字体的样式了还是矢量的
fontawesome使用步骤
    1.下载：https://www.fontawesome.com
    2.解压
    3.将css和webfonts拷贝到项目中
    4.将all.css引入网页

```html
<!-- 引入图标字体css -->
<head>
    <link rel="stylesheet" href="./fa/css/all.css">
</head>
```

5.使用图标字体
        class="fas fa-ball"
        class="fab fa-accessible"

```html
<i class="fas fa-bell" style="font-size:80px; color:red;"><i>
```

## P78 图标字体的另外两种使用方式
使用场景1:比如需要在很多元素前加图标
```css
li::before{
    /*
        1.在content中设置图标字体的编码
        2.用font-family指定你使用的字体
        3.font-weight的话具体看fontawesome的那个字体需不需要，直接看你导入的字体文件。
    */
    content:'\f1b0';
    font-family:'Font Awesome 5 free';
    font-weight:900;
}
```

使用场景2:直接通过实体在使用图标字体
&#x图标字体的编码;
```html
<span class="fas">&#xf0f3;</span>
```

## P79 iconfont
这个是国内ali的一个图标字体库。（注意版权问题）
1.先登录
2.创建项目
3.选想要的图标，加入购物车
4.点开购物车，添加进项目中
5.下载到本地，可以将除了demo的文件全部放到项目中。
6.导入项目和使用（可fontawesome差不多）

## P80 行高
行高line-height
```css
/* 
文字占据的高度 ，单位px，em
也可以直接指定一个整数，这个时候行高是字体的整数倍

行高比字体大的部分在字体的上下均匀分布
*/
.box1{
    line-height:100px;
}
```

## P81 字体的简写属性
```css
/*
    注意：字体大小和字体放在最后两个
    1.30px/2这个表示两倍行高
    2.其他位置的属性顺序随意。
*/
.box1{
    font:30px/2 Microsoft YaHei,heiti sc,sans-serif;
}

.box2{
    /* 前一个是字体加粗，第二个是斜体 */
    font:bold italic 30px/2 Microsoft YaHei,heiti sc,sans-serif;
    
    /*
    加粗单独写的话font-weight
    可选值：
        normal：默认
        bold：加粗
        100-900九个级别（没什么用）
    
    */
    font-weight:bold;
    
    /*
    斜体的话用font-style
    可选值：
        normal
        italic
    */
    font-style:italic;
}
```


## P82 文本的水平和垂直对齐
1。文本有左右对齐方式用text-align来设置
```css
.text1{
/*
    text-align可选值
        left
        right
        center
        justify：两端对齐
*/
text-align:justify;
}
```

2.一句话文字不同大小，可能涉及垂直对齐vertical-align
**它还有一个作用，当使用类似图片这样的替换元素的时候，如果是基线对齐，那么会有一个小空隙。这是将vertival-align设置为baseline之外的值就可以解决这个问题**
```css
.text1{
/*
    vertical-align可选值
        baseline：默认值，基线对齐
        top
        bottom
        middle：居中对齐
*/
text-align:top;
```

## P83 其他文本样式
1.一个用来给文本设置下划线（上划线或删除线）text-decoration
```css
.box1{
    /*
    这个class作用来文本上
    text-decoration可选值：
        none：无
        underline：下划线
        line-through：删除线
        overline：上划线
    */
    text-decoration:underline;
}
```

2.另一组用来设置 **文本后面的三个小点** 缺一不可
```css
.box2{
    /*
    1.需要width设置宽度，不然下面的不换行，overflow就没什么作用了。
    2.要设置white-space为nowrap不换行。
        可选值有：
            normal：正常
            nowrap：不换行
            pre：保留空白（写成什么样，就怎么显示）
    3.设置overflow为hidden，超出宽度隐藏，不要出现滑动条
    4.设置text-overflow为ellipsis，设置超出的文本为省略号。
    */
    width:100px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
```
