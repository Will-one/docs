---
title: '前言'
categories:
- frontend
tags:
- ajax
---

## AJAX简介
* AJAX全称为 Asynchronous JavaScript And XML，通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据
* AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方法

## 文档实例涉及的后端服务
使用 express 快速搭建接口响应服务
```
启动服务
node server.js
```
```js
// server.js
//1.引入express
const express = require('express')

//2.创建应用对象
const app = express()

//3.创建路由规则
//request是对请求报文的一个封装
//response是对响应报文的一个封装
app.get('/server',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('HELLO AJAX GET')
})

//all表示所有类型的请求都接收
app.all('/server',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //eg：对于自定义请求头，需要定义特殊的响应头（由后端处理）
    response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应体
    response.send('HELLO AJAX POST')
})

app.get('/json-server',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    const my = {
        name:"willone",
        age:"17",
        gender:"男"
    }
    //send里面老版本只能放字符串和buffer，新版本我直接放对象进去是可以的
    //不行的话转换一下let str = JSON.stringify(my)
    response.send(my)
})

//针对P17，IE缓存的一个规则
app.get('/ie',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('HELLO P17 IE')
})

//针对P18,p19，设置一个延时响应
app.get('/delay',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    
    //设置延时响应体
    setTimeout(function(){
        response.send('延时响应')
    },3000) 
})

//针对P23，使用axios发送ajax请求
app.all('/axios-server',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //eg：对于自定义请求头，需要定义特殊的响应头（由后端处理）
    response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应体
    response.send('HELLO axios')
})

//针对P25，使用fetch发送ajax请求
app.all('/fetch-server',(request, response)=>{
    //设置响应头(设置允许跨域)
    response.setHeader('Access-Control-Allow-Origin','*')
    //eg：对于自定义请求头，需要定义特殊的响应头（由后端处理）
    response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应体
    const data = {name:'willone'}
    response.send(JSON.stringify(data))
})

//针对P27，使用JSONP实现跨域
app.all('/jsonp-server',(request, response)=>{
    //eg：对于自定义请求头，需要定义特殊的响应头（由后端处理）
    response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应体
    const data = {
        name:'willone'
    }
    let str = JSON.stringify(data)
    // c.服务端返回一个函数调用
    response.send(`handle(${str})`)
})

//针对P28，使用JSONP检查用户名
app.all('/check-username',(request, response)=>{
    //设置响应体
    const data = {
        exist:1,
        msg:'用户名已经存在'
    }
    let str = JSON.stringify(data)
    // c.服务端返回一个函数调用
    response.send(`handle(${str})`)
})

//针对P30，CORS跨域设置响应头
app.all('/cors-server',(request, response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*')//*号匹配所有的url
    //response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')//*号匹配所有的url
    response.send('HELLO CORS')
})

//4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中...')
})
```