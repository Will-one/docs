---
title: '同源与跨域'
categories:
- frontend
tags:
- ajax
- JSONP
- CORS
---

## P26 同源政策和跨域
同源策略（Same-Origin Policy）最早由Netscape公司提出，是浏览器的一种安全策略
* 同源：协议，域名，端口号必须完全相同
* 违背同源策略就是跨域

如果要请求的资源满足同源策略，那么url不用写全，可以简写

## P27-P28 JSONP
JSONP是什么？
* JSONP（JSON with Padding），是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来的，只支持get请求

JSONP怎么工作的？
* 在网页有一些标签天生具有跨域能力，比如：img link iframe script
* JSONP就是利用script标签的跨域能力来发送请求的

JSONP的使用
1. 动态的创建一个script标签
```js
var script = document.createElement('script')
```
2. 设置script的src，设置回调函数
```js
script.src = "http://localhost:3000/testAJAX?callback=abc";
function abc(data){
    ...
}
```
3. 服务端返回的是一个函数调用，参数也写在服务端
[JSONP Serve](/frontend/express)

### 示例
```html
<div id="result"></div>
<script>
// b.设置函数
    function handle(data){
        const result = document.getElementById('result')
        result.innerHTML = data.name
    }
</script>
<!-- a.创建script标签 -->
<script src="http://127.0.0.1:8000/jsonp-server"></script>
```

### 示例2
用原生JSONP来实现用户名输入框，失去焦点后发送请求判断用户名重复
```html
用户名：<input type="text" id="username">
<p></p>
<script>
    //获取 input 元素
    const input = document.querySelector('input')
    const p = document.querySelector('p')
    //声明一个handle函数，因为后端返回了这个函数的调用
    function handle(data){
        if(data.exist === 1){
            input.style.border = 'solid 1px #f00'
            p.innerHTML = data.msg
        }
    }

    //绑定事件
    input.onblur = function(){
        //获取用户的输入值
        let username = this.value
        
        /* 向服务端发送请求 */
        //1.创建一个script标签
        const script = document.createElement('script')
        //2.设置标签的src属性
        script.src = 'http:127.0.0.1:8000/check-username'
        //3.将script插入到文档中
        document.body.appendChild(script)
    }
</script>
```

## P30 CORS
什么是CORS
* CORS（Cross-Origin Resource Sharing），跨域资源共享。是官方的跨域解决方案，它的特点是不需要客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post。
* CORS标准新增了一组HTTP首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源

如何工作
* CORS 是设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行
---
* html
```html
<button>发送请求</button>
<div id="result"></div>
```
* js

响应头在服务端，点击链接查看 [响应服务中的CORS配置](/frontend/express)
```js
const btn = document.querySelector('button')
const result = document.getElementById('result')

btn.onclick = function(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET','http://127.0.0.1:8000/cors-server')
    xhr.send()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300){
                result.innerHTML = xhr.response
            }
        }
    }
}
```