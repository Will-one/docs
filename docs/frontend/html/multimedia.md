---
title: '多媒体标签'
categories:
- frontend
tags:
- html
---

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