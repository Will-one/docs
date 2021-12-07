---
title: 'html 基础概念'
categories:
- frontend
tags:
- html
---

## 实体
在浏览器中写过个空格，默认被浏览器解析为一个空格

在 HTML 中有些时候，我们不能直接书写一些特殊符号，需要使用 html 中的实体（转译字符）
```
&nbsp;  空格
&gt;    大于
&lt;    大于
&copy;  版权
```

## 块和行内元素
* 块元素（block element）

在网页中一般通过块元素来对页面进行布局

* 行内元素（inline element）

行内元素主要用来包裹文字


::: warning 注意：
一般情况下会在块元素中放行内元素，而不会在行内元素中放块元素

p元素中不能放任何的块元素
:::
浏览器在解析网页时，会自动对网页中不符合规范的内容进行修正，比如：
* 标签写在了根元素的外部
* p中嵌套了块元素
* 根元素中出现了head和body以外的子元素
* ......

## 内联框架
```html
<!-- 
    内联框架，在当前页面中引入一个其他页面
        src：指定要引入的页面的路径
        frameborder: 指定内联框架的边框
-->
<iframe src="http://www.baidu.com" width="800" height="600" frameborder="0"></iframe>
```