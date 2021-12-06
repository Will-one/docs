---
title: 'axios 对象'
categories:
- frontend
tags:
- axios
---

## P9 axios 实例对象
```html
<div>
    <h2>axios实例对象</h2>
    <button>发送GET请求</button>
    <button>发送POST请求</button>
</div>
```
```js
const btns = document.querySelectorAll('button')

//创建实例对象
//实例对象joke与axios本身几近相同，有一点差别
const joke = axios.create({
    baseURL: 'https://api.apiopen.top',
    //timeout: 5000
})

btns[0].onclick = function () {
    joke.get('/getJoke').then(response => {
        console.log(response.data)
    })
}

/* 
    注意：
        创建实例对象的好处
            * 我们的请求可能发往不同的服务器，例如服务器A，B，C
            * 这个时候axios.defaults就难以满足不同服务器的默认配置
            * 于是可以创建axios实例的实例，在实例中保存不同的默认配置
*/
```