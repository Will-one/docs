---
title: '基本使用说明'
categories:
- frontend
tags:
- promise
---

## P3-P4 Promise 异步编程
```html
<h2 class="page-header">Promise初体验</h2>
<button class="btn" id="btn">点击抽奖</button>
```
```js
//生成随机数
function rand(m, n) {
    return Math.round(Math.random() * (n - m) + m)
}

/*
    需求：点击按钮 2s 后提示是否中奖（30%概率）
        若中奖 “恭喜获得劳斯莱斯5元抵扣券”
        若未中奖 “谢谢参与”
*/

const btn = document.querySelector('#btn')

btn.addEventListener('click', function () {
    /**************传统方法实现**************/
    // setTimeout(() => {
    //     let n = rand(1, 100)
    //     if (n <= 30){
    //         alert('恭喜获得劳斯莱斯5元抵扣券')
    //     }else{
    //         alert('谢谢参与')
    //     }
    // }, 1000);

    /**************Promise实现**************/
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            let n = rand(1, 100)
            if (n <= 30) {
                resolve(n)//将Promise状态设置为【成功】
            } else {
                reject(n)
            }
        }, 1000);
    })

    p.then(value => {
        alert(`恭喜获得劳斯莱斯5元抵扣券，您的中奖号码为：${value}`)
    }, reason => {
        alert(`谢谢参与，您的号码为：${reason}`)
    })
})
```


## P5 fs 读取文件
../resource/P5.md 测试文件，内容随意

js文件，直接node运行
```js
//
//引入模块
const fs = require('fs')

//一般方式
// fs.readFile('../resource/P5.md', (err, data)=>{
//     //如果出错，抛出错误
//     if(err) throw err
//     //没错，输出文件内容
//     console.log(data.toString())
// })

//使用promise的方式进行封装
const p = new Promise((resolve,reject)=>{
    fs.readFile('../resource/P5.md', (err, data)=>{
        //如果出错，抛出错误
        if(err) reject(err)
        //没错，输出文件内容
        resolve(data)
    })
})
p.then(value =>{
    console.log(value.toString())
},reason=>{
    console.warn(reason)
})
```

## P6 封装 ajax 请求
```js
//模拟接口地址 https://api.apiopen.top/getJoke

const btn = document.getElementById('btn')
btn.onclick = ()=>{
    //创建Promise
    const p = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET','https://api.apiopen.top/getJoke')
        xhr.send()
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4){
                if(xhr.status >=200 && xhr.status<300){
                    resolve(xhr.response)
                }else{
                    reject(xhr.status)
                }
            }
        }
    })
    // 调用then方法处理结果
    p.then(value=>{
        console.log(value)
    },reason=>{
        console.log(reason)
    })
}
```

## P7 封装一个读取文件函数
```js
/*
 *  封装一个函数 mineReadFile 读取文件内容
 *  参数: path 路径
 *  返回: promise 对象
 */
function mineReadFile(path){
    return new Promise((resolve,reject)=>{
        //读取文件
        require('fs').readFile(path, (err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}
```
调用
```js
//调用函数
mineReadFile('../resource/P5.md').then(value=>{
    console.log(value.toString())
},reason=>{
    console.warn(reason)
})
```

## P8 node_util_promisify封装promise
```js
/* 
util.promisify 方法
    接受参数为错误优先的函数（err，data）
    返回一个返回值为pormise的函数
 */
//引入util模块
const util = require('util')
//引入fs模块
const fs = require('fs')
//返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

//可以对照P7来看
mineReadFile('../resource/P5.md').then(value => {
    console.log(value.toString())
})s
```

## P9 封装ajax发送函数
```js
/* 
    封装 sendAJAX 发送ajax请求
    参数 url
    返回 promise
    */
function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'json'
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
}
```
使用
```js
const btn = document.getElementById('btn')
btn.onclick = ()=>{
    sendAJAX('https://api.apiopen.top/getJoke').then(value=>{
        console.log(value)
    },reason=>{
        console.warn(reason)
    })
}
```