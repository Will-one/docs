---
title: HTML
---

[MDN HTML 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

## 实体
在浏览器中写过个空格，默认被浏览器解析为一个空格

在 HTML 中有些时候，我们不能直接书写一些特殊符号，需要使用 html 中的实体（转译字符）
```
&nbsp;  空格
&gt;    大于
&lt;    大于
&copy;  版权
```

## meta标签
用于设置网页原数据
```
<!-- html
meta主要用于设置网页中的一些元数据，元数据不是给用户看
    charset 指定网页的字符集
    name  指定元数据的名称
    content 指定数据的内容

    实例1：keywords：表示网站的关键字，多个关键字间用逗号隔开
    name:"keywords" content="html5,搜索引擎关键字"
-->
<meta charset="UTF-8">
<!-- 实例1：keywords 表示网站的关键字，多个关键字间用逗号隔开 -->
<meta name="keywords" content="html5,willone">
<!-- 实例2：description 指定网站的描述，会显示在搜索结果中，链接右下方的描述 -->
<meta name="description" content="这是一个不知名的，但是用户黏着度很高的网站">
<!-- 实例3：3秒后重定向到另一个链接 -->
<!-- <meta http-equiv="refresh" content="3;url=https://www.baidu.com"> -->
```