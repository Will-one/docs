---
title: '线程与事件机制'
categories:
- frontend
tags:
- javascript
- browser core
- js thread
---

## P42 进程与线程
:::tip 进程：
* 程序的一次执行，它占有一片独有的内存空间
* 可以通过windows任务管理器查看进程
:::

:::tip 线程：
* 是进程内的一个独立执行单元
* 是程序执行的一个完成流程
* 是CPU的最小调度单元
:::

:::tip 相关知识:
* 应用程序必须运行在某个进程的某个线程上
* 一个进程中至少有一个运行的线程：主线程，进程启动后自动创建
* 一个进程中也可以同时运行多个线程，我们会说程序是多线程运行的
* 一个进程内的数据可以供其中的多个线程直接共享
* 多个进程之前的数据时不能直接共享的
* 线程池（thread pool）：保存多个线程对象的容器，实现线程对象的反复利用
:::

:::tip 多线程：
* 优点：
    1. 能有效提升CPU的利用率
* 缺点：
    1. 创建多线程开销
    2. 线程间切换开关
    3. 死锁与同步问题
:::

:::tip 单线程（JS单线程）：
* 优点：
    * 顺序编码简单
* 缺点：
    * 效率低
:::

## P43 浏览器内核
:::tip 不同浏览器内核
* Chrome，Safari：webkit
* firefox：Gecko
* IE：Trident
* 360，搜狗等国内浏览器：Trident + webkit
:::

:::tip 内核组成
内核由很多模块组成
1. 主线程
    * js引擎模块：负责js程序的编译与运行
	* html，css文档解析模块：负责页面文本的解析
	* DOM/CSS模块：负责dom/css在内存中的相关处理
	* 布局和渲染模块：负责页面的布局和效果的绘制（内存中的对象）
	* ******
2. 分线程
    * 定时器模块：负责定时器的管理
	* 时间响应模块：负责事件的管理
    * 网络请求模块：负责ajax请求
:::

## 定时器引发的思考
:::tip
1. 定时器真的是定时执行的吗？
    * 定时器并不能保证真正定时执行
    * 一般会延迟一丁点（可以接受），也有可能延迟很长时间（不能接受）
2. 定时器回调函数是在哪个线程执行的
    * 在主线程执行的，js是单线程的
3. 定时器是如何实现的!!!
    * 事件循环模型（后面看）
:::
```html
<head>
    <meta charset="utf-8">
    <title>定时器引发的思考</title>
</head>
<body>
    <button type="button" id="btn1">无延迟200</button>
    <button type="button" id="btn2">有延迟大于200很多</button>

    <script type="text/javascript">
        document.getElementById("btn1").onclick = function(){
            var start = Date.now()
            console.log("启动定时器前。。。")
            setTimeout(function(){
                console.log('定时器执行了', Date.now()-start)
            },200)
            console.log('启动定时器后')
        }
        
        document.getElementById("btn2").onclick = function(){
            var start = Date.now()
            console.log("启动定时器前。。。")
            setTimeout(function(){
                console.log('定时器执行了', Date.now()-start)
            },200)
            console.log('启动定时器后')
            
            for(var i = 0; i < 1000000000; i++){
            
            }
        }
    </script>
</body>
```

