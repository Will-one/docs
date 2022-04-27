---
title: '实用笔记'
categories:
- frontend
tags:
- css
---

## 子绝父相

## h1标签中图片前文字隐藏
很多时候会把logo放到h1标签中,同时为了优化SEO，在h1中放入了文字。  
实际页面实现的时候不需要显示这些文字。  
可以使用首行缩进text-indent: -9999px; 来进行隐藏  
```html
<div>
    <h1 class="logo-area">
      某宝
      <a href='/'>
          <img src="./img/logo.png">
      </a>
    </h1>
</div>
```
```css
.logo-area{
    /* 隐藏logo中的文字 */
    text-indent: -9999px;
}
```

## 固定定位紧贴内容区，拉伸位置不变【常用】
网页右侧的竖直的导航栏，backToTOP等固定定位元素。  
要紧贴内容区并且不随视口的改变而改变相对位置
```css
/* 假定内容区宽度是1200 */
.back-top{
    width: 40px;
    height: 230px;
    background-color: #bfa;

    /* 1.开启固定定位 */
    position: fixed;
    /* 2.确定垂直位置 */
    bottom: 50px;
    /* 3.将right设置为50%，便于后面计算 */
    right: 50%;
    /* 
       4.运用过渡约束的相关知识可知【开启定位】【此处将border 和 padding不影响布局的先去掉】
            left + margin-left + width + margin-right + right = 父元素的内容区的width

            运用在这里就是：
            auto +      0      +  40px +     -640px   +  50%  = 视口宽度

            说明：
                - 设置 right为50% 后, 自身就处于视口的中间位置 + 向左自身的宽度
                - 设置 margin-right 为 内容区一半宽度+自身宽度。left是auto，会自动补全。
                - 注意，这里不设置 margin-left，与left都处于自身左侧，left 的 auto补全后，对位置不起作用。
    */
    margin-right: -640px;
}
```

## 解决外边距重叠问题