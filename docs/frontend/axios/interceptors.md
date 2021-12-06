---
title: 'axios 拦截器'
categories:
- frontend
tags:
- axios
---

## P10 axios 拦截器
:::tip
axios拦截器：本质上就是一些函数
* 请求拦截器
    在请求发送之前，借用一些回调函数对请求的参数和内容进行处理和检测
* 响应拦截器
    返回结果之后，在我们自己的回调处理结果之前，对返回的结果进行一些预处理。
:::
```js
//定义请求拦截器
//和Promise原理十分类似
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器成功')
    //在其中可以改变config的值
    config.param = { id: 100 }
    return config
}, function (error) {
    console.log('请求拦截器失败')
    return Promise.reject(error)
})

//定义响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器成功')
    //可以在响应拦截器中只返回数据而不是整个响应体，在then中就只需要处理data
    return response.data
}, function (error) {
    return Pormise.reject(error)
})

//发送请求
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(response => {
    console.log('自定义的响应处理函数')
    console.log(response)
})
```