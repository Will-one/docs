---
title: '基础概念'
categories:
- frontend
tags:
- ajax
---

## P3-P7 基础概念
### XML
* 可扩展标记语言
* 用来传输和储存数据

### JSON
[JS 笔记 JSON 章节](/frontend/javascript/)

### AJAX 优缺点
优点
> 无需刷新页面与服务器通信
>
> 允许根据用户事件来更新部分页面内容

缺点
> 没有浏览历史，不能回退
> 
> 存在跨域问题（同源）
> 
> SEO（search engine optimization搜索引擎优化）不友好

## HTTP
HTTP（hypertext transport protocol）协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间互相通信的规则

### 请求报文
重点是格式与参数
```
行(方法+URL+HTTP版本): POST /URL HTTP/1.1
头:  host: willone.com
     Cookie: name=willone
     Content-type: application/x-www-form-urlencoded
     User-agent: chrome 12
空行
请求体(GET体为空，POST可以不为空)： username=admin&password=admin
```

### 响应报文
```
行： HTTP/1.1 200 OK
头:  Content-Type: text/html;charset=uft-8
     Content-Type: 2048
     COntent-encoding: gzip

空行:
体: <html>
        <head>
        </head>
        <body>
            <h1>willone</h1>
        </body>
    </html>
```