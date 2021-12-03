---
title: 'Promise'
categories:
- frontend
tags:
- Promise
---

## P24 Promise 简介
* Promise是ES6引入的异步编程的新解决方案
* 语法上Promise是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果
    - Promise构造函数：Promise（excutor）｛｝
    - Promise.protoType.then方法
    - Promise.protoType.catch方法
```js
//实例化Promise对象,构造函数接收一个函数类型的值
//约定俗成这个函数里面传入resolve和reject两个值
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //
        let data = '数据库中用户数据'
        let err = '数据库查询失败'
        let flag = true
        if(flag){
            resolve(data)
        }else{
            reject(err)
        }
    },1000)
})

//调用promise对象的then方法。
//如果上面触发的是resolve方法，调用then的第一个回调
//如果触发的是reject方法，则调用then的第二个回调
p.then(function(value){
    console.log(value)
},function(reason){
    console.error(reason)
})
```

## P25 读取文件实例
```js
//1.引入fs模块
const fs = require('fs')

//2.方式1-调用方法读取文件
// fs.readFile('../resource/test.md', (err, data)=>{
//     //如果失败，则抛出错误
//     if(err) throw err
//     //如果没有出错，则输出内容
//     console.log(data.toString())
// })

//3.方式2-使用promise
const p = new Promise((resolve, reject)=>{
    fs.readFile('../resource/test.mad', (err, data)=>{
        //如果失败，则调动reject
        if(err) reject(err)
        //如果成功，则调用resolve
        resolve(data)
    })
})

p.then((value)=>{
    console.log(value.toString())
}, (reason)=>{
    console.log('调用失败')
})
```

## P26 Promise 封装 ajax
```js
const p = new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.apiopen.top/getJoke')
    xhr.send()
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.response)
            }else{
                reject(xhr.status)
            }
        }
    }
})

p.then((value)=>{
    console.log(value)
}, (reason)=>{
    console.log(reason)
})
```

## P27 Promise 的 then 方法
```js
//创建一个Promise对象
const p = new Promise((resolve, reject)=>{
    //用一个延时调用模拟异步需求
    setTimeout(()=>{
        resolve('用户数据')
    },1000)
})

//调用 then 方法
/* 
then 方法的返回结果是一个 Promise 对象 
    * 这个Promise对象状态由回调函数的执行结果决定
        - 如果回调函数中返回的结果是一个非Promise类型的数据，状态为成功，返回值为对象的成功的值
*/

// const res = p.then(value => {
//     console.log(value)
//     return '返回值为成功值'
//     //throw '出错'
// }, reason => {
//     console.log(reason)
// })

// console.log(res)

//重点：then方法是可以链式调用的
p.then(value => {

}).then(value => {

})
```

## P28 Promise 实践
顺序读取三个文件，最后合并输出
```js
//引入fs模块
const fs = require("fs")

//使用Promise实现
const p = new Promise((resolve, reject) => {
    fs.readFile("../resource/test.md", (err, data)=>{
        resolve(data)
    })
})

p.then(value => {
    return new Promise((resolve, reject)=>{
        fs.readFile('../resource/test2.md',(err, data)=>{
            resolve([value,data])
        })
    })
}).then(value=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('../resource/test3.md',(err, data)=>{
            value.push(data)
            resolve(value)
        })
    })
}).then(value=>{
    console.log(value.join('\r\n'))
})
```

## P29 Promise 的 catch 方法
```js
const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //设置 p 对象的状态为失败，并设置失败的值
        reject('出错了')
    },1000)
})
p.then(value=>{
    console.log()
})

//可以用catch来指定失败的回调,让then处理更加简洁
p.catch((reason)=>{
    console.warn(reason)
})
```