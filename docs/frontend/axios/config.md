---
title: 'axios 默认配置'
categories:
- frontend
tags:
- axios
---

## P8 axios 默认配置
```html
<div>
    <h2>axios默认配置</h2>
    <button>发送GET请求</button>
    <button>发送POST请求</button>
    <button>发送PUT请求</button>
    <button>发送DELETE请求</button>
</div>
```
```js
const btns = document.querySelectorAll('button')

        /* 
            可以对axios进行默认配置，减少重复代码
                * axios.default.method = 'GET'
                * 能设置的东西在github里面查看
         */
        axios.defaults.method = 'GET'
        axios.defaults.baseURL = 'http://localhost:3000'
        axios.defaults.param = {id:100}
        axios.defaults.timeout = 2000

        btns[0].onclick = function () {
            axios({
                url: '/posts'
            }).then(response => {
                console.log(response)
            })
        }
```

## P11 axios 取消请求
```html
<div>
    <h2>axios取消请求取消请求</h2>
    <button>发送请求</button>
    <button>取消请求</button>
</div>
```

```js
const btns = document.querySelectorAll('button')
//2.创建全局变量
let cancel = null

btns[0].onclick = function () {
    //3.检测上一次请求是否已经完成
    if(cancel !== null){
        cancel()
    }

    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        //1. 为配置对象添加属性Canceltoken
        cancelToken:new axios.CancelToken(function(c){
            cancel = c
        })
    }).then(response => {
        console.log(response.data)
        cancel = null
    })
}
btns[1].onclick = function(){
    cancel()
}
/* 
    为了方便测试可以为json-server加上一个响应延迟--delay或者-d
    json-server --watch db.json -d 2000
*/
```