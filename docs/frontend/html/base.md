---
title: '文档'
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

## img标签和格式
```html
<!-- 
    img是自结束标签，它属于替换元素，介于块元素和行内元素之间
    <img src="图片路径" alt="图片描述"> 搜索引擎SEO根据alt来识别

    width 设置宽
    height 设置高
-->
<img src="../img/images.jpg" alt="巨石阵">
```

## 内联框架
```
<!-- 
    内联框架，在当前页面中引入一个其他页面
        src：指定要引入的页面的路径
        frameborder: 指定内联框架的边框
-->
<iframe src="http://www.baidu.com" width="800" height="600" frameborder="0"></iframe>
```

## 音视频播放
### \<audio>音频标签
```html
<!-- 
    audio标签用来引入音频
        controls：用来在页面中显示操作界面
        autopaly：用在自动播放，大部分浏览器都不自动播放
        loop：循环播放
-->
<audio src="" controls autoplay loop></audio>

<!-- 
    可以通过source指定资源，只要加载成功一个就不会加载下面的（可以解决兼容性问题）
-->
<audio controls>
    <source src="mp4的视频"></source>
    <source src="avi的视频"></source>
    <!-- embed可以兼容IE8以下的浏览器 -->
    <embed src="" type="audio/mp3" width="" height=""></embed>
</audio>
```

### \<video>音频标签
```html
<!-- 用法和音频差不多 -->
<!-- 
    也可以通过source指定资源，只要加载成功一个就不会加载下面的（可以解决兼容性问题）
    -->
<video src="">
    <source src="mp4的视频"></source>
    <source src="avi的视频"></source>
    <!-- embed可以兼容IE8以下的浏览器 -->
    <embed src="" type="audio/mp4" width="" height=""></embed>
</video>
```