---
title: 'html 常用标签'
categories:
- frontend
tags:
- html
---

## meta标签
用于设置网页原数据
```html
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

## 语义化标签
在网页中HTML负责网页的结构

在使用html标签时，应该关注的是标签的语义，而不是它的样式

### 常用标签
标题标签
```html
<!-- 
    标题标签：
        h1 - h6 ————一共六级标题
        从h1~h6 重要性递减，h1最重要，h6最不重要
        h1在网页中的重要性仅次于title标签（从SEO的角度看），一般情况一个页面一个h1
        标题标签是块元素

    在页面中独占一行的元素称为块元素（block element）
-->
<h1>大标题</h1>
<h2>次标题</h2>

<!-- 
    hgroup标签用来为标题分组，可以将一组相关的标题同事放入到hgroup中

    hgroup标签是块元素
-->
<hgroup>
    <h1>大标题</h1>
    <h2>副标题</h2>
</hgroup>
```

\<p\>标签
```html
<!-- 
    p标签表示页面中的一个段落

    P标签是块元素
-->
<p>在p标签中的内容表示段落</p>
```

\<em\>标签
```html
<!-- 
    em标签用来表示语音语调的一个加重

    在页面中不会独占一行的元素称为行内元素（inline element）
-->
<p>这个地方<em>是</em>重点，必考</p>
```

\<strong\>标签
```html
<!-- 
    strong表示强调重要内容 
-->
<p>这个地方是重点，<strong>必考</strong></p>
```

\<blockquote\>、\<q\>标签
```html
<!-- blockquote表示一个长应用，属于块元素独占一行 -->
鲁迅说：<blockquote>这话我可从来没说过！</blockquote>

<!-- q表示一个短引用，是行内元素 -->
子曰<q>干饭</q>

<br>换行符
```

### 布局标签
```html
<header>网页头部</header>
<main>页面主体（唯一）</main>
<footer>网页底部</footer>

<nav>网页中的导航</nav>
<aside>侧边栏</aside>
<article>独立的文章</article>

<section>其他</section>

<!-- 常用 -->
<div></div>
<span>一般用于在网页中选中文字</span>
```

## 列表
```html
<!-- 列表（列表之间可以互相嵌套） -->
<ol>
    <li>有序列表</li>
</ol>
<ul>
    <li>无序列表</li>
</ul>

<dl>
    <dt>结构</dt>
    <dd>内容</dd>
</dl>
```

## 超链接
```html
<!-- 使用a标签定义超链接(行内元素，特殊的是可以放块元素)，（a不能嵌套a） -->
<a href="www.baidu.com">百度</a>

<!-- target里面_blank为打开新页面，_self -->
<a href="www.baidu.com" target="_self">百度本页面</a>
<a href="www.baidu.com" target="_blank">百度新页面</a>

<div style="height: 1000px; background-color: aquamarine;width: 200px;"></div>

<!-- 跳转到页面顶部 -->
<a href="#">开发中回到顶部</a>
<!-- 显示还在开发中的超链接，不会跳转到顶部 -->
<a href="javaScript">开发中</a>

<!-- ***************************************************** -->
<!-- 
    ./ 表示当前路径
    ../ 表示上层目录
-->
```