---
title: 'http模块'
categoris:
- backend
tages:
- nodejs
---

## P14 http模块介绍
http模块是nodejs官方提供的,用来创建web服务器的模块.通过http模块提供的 http.createServer()方法,就能创建web服务

在node.js中, 不需要使用 IIS 、Apache等这些第三方 web 服务器软件。 因为可以基于 Node.js 提供的http模块搭建。

## P16 如何创建基本的web服务 
1. 导入 http 模块
```js
const http = require('http')
```
2. 创建 web 服务器实例
```js
const server = http.createServer()
```
3. 为服务器实例绑定 request 事件，监听客户端的请求
```js
server.on('request', (req, res)=>{
   // 只要有客户端来请求，就会触发 request 事件，调用事件处理函数
   console.log('do something')
})
```
4. 通过 server.listen(端口号，回调) 启动服务器
```js
server.listen(80, ()=>{
   console.log('listening port 80')
})
```

### req 请求对象
只要服务器收到了了客户端的请求，就会调用 通过server.on() 为服务器绑定的 request事件处理函数

如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式
```js
server.on('request', (req)=>{
   // req是请求对象，它包含了与客户端相关的数据和属性，例如：
   // req.url 是客户端请求的 URL 地址
   // req.method 是客户端的 method 请求类型
   const str =  'your request url is ${req.url}, and request method is ${req.method}'
   console.log(str)
})
```
### res 响应对象
res.end() 向客户端响应内容,并结束这次请求的过程

## p17 根据不同的url响应不同的页面
实现步骤
1. 获取请求的url地址
2. 设置默认的响应内容为 404 Not found
3. 判断用户请求的是否为 / 或者 /index.html 首页
4. 判断用户请求的是否为 /about.html 关于页面
5. 设置 Content-Type 响应头, 防止中文乱码
6. 使用 res.end() 把内容响应给客户端
