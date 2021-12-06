---
title: 'axios 基础使用'
categories:
- frontend
tags:
- axios
---

## P3-P4 axios 引入和基本使用
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
```html
<div>
        <h2>axios基本使用</h2>
        <button>发送GET请求</button>
        <button>发送POST请求</button>
        <button>发送PUT请求</button>
        <button>发送DELETE请求</button>
</div>
```
```js
//获取按钮
const btns = document.querySelectorAll('button')

//发送get请求，请求数据
btns[0].onclick = function(){
    //发送ajax请求
    axios({
        //请求类型
        method:'GET',
        //URL
        url:'http://localhost:3000/posts/2',
    }).then(response => {
        console.log(response)
    })
}

//发送post请求，添加数据
btns[1].onclick = function(){
    //发送ajax请求
    axios({
        //请求类型
        method:'POST',
        //URL
        url:'http://localhost:3000/posts',
        //设置请求体
        data:{
            title:'干饭人',
            author:'willone'
        }
    }).then(response => {
        console.log(response)
    })
}

//发送put请求，更新数据
btns[2].onclick = function(){
    //发送ajax请求
    axios({
        //请求类型
        method:'PUT',
        //URL
        url:'http://localhost:3000/posts/3',
        //设置请求体
        data:{
            title:'干饭魂',
            author:'干饭人'
        }
    }).then(response => {
        console.log(response)
    })
}

//发送delete请求，更新数据
btns[3].onclick = function(){
    //发送ajax请求
    axios({
        //请求类型
        method:'DELETE',
        //URL
        url:'http://localhost:3000/posts/3',
    }).then(response => {
        console.log(response)
    })
}
```

## P5-P7 其它发送方式和响应内容
```html
<div>
    <h2>axios其他方式发送请求</h2>
    <button>发送GET请求</button>
    <button>发送POST请求</button>
    <button>发送PUT请求</button>
    <button>发送DELETE请求</button>
</div>
```
```js
//获取按钮
const btns = document.querySelectorAll('button')

// [1] axios.request()发送get请求
btns[0].onclick = function () {
    axios.request({
        method: 'GET',
        url: 'http://localhost:3000/posts/1'
    }).then(response => {
        console.log(response)
    })
}

// [1] axios.request()发送post请求
btns[1].onclick = function () {
    axios.post(
        'http://localhost:3000/comments',
        {
            "body": "新加评论",
            "postId": 2
        }).then(response => {
            console.log(response)
        })
}

// 其他发送方式，那些methods，可以去axios的github上查阅

/***************************************************************/
/* 
    axios的请求返回的数据是一个对象包含
        * config 就是配置对象，包含请求类型，url，请求体等等
        * data 响应体的内容。axios自动对返回结果进行了json解析，转换为了对象
        * headers 响应头信息
        * request 原生的AJAX对象XMLHttpRequest实例对象
        * status 响应状态吗
        * statusText 响应字符串
    */

/* 
注意：config里面可以配置的内容，去axios的github上查阅
    */
```