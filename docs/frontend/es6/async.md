---
title: 'Async函数'
categories:
- frontend
tags:
- ES6
---

## P49 async函数
:::tip
异步编程的解决方法
0. 回调地狱
1. 生成器函数
2. Promise
3. async和await
:::

```js
/*
    async 和 await
        * async 和 await两种语法结合可以让异步代码像同步代码一样

    async函数
        * async 函数的返回值为 promise 对象
        * promise 对象的结果由 async 函数执行的返回值决定
*/

//在函数前面加上async
async function fn(){
    /*
        函数执行的结果是一个Promise对象
            * 并且只要return的值不是一个Promise类型的对象，则函数的执行结果就是一个成功的Promise
    */

    //情况1，一般返回
    // return '返回一个字符创的话，函数执行结果PromiseStatus是成功的'

    //情况2，抛出错误
    // throw new Error('抛出一个错误的话，函数执行结果PromiseStatus是reject的')

    //情况3，返回一个promise对象（居多）
    return new Promise((resolve, reject)=>{
        //resolve('成功的数据')
        reject('失败')
    })
}
const res = fn()
// console.log(res)//返回的是一个Promise，PromiseStatus由函数返回的值决定
res.then(value=>{
    console.log(value)
}, reason=>{
    console.warn(reason)
})
```

## P50 await表达式
:::tip
* await 必须写在async函数中
* await 右侧的表达式一般为promise 对象
* await 返回的是promise成功的值
* await 的pormise失败了，就会抛出异常，需要通过 try...catch 捕获处理
:::

```js
//创建一个promise对象
const p = new Promise((resolve, reject)=>{
    //resolve('成功')
    reject('失败了')
})

async function fn(){
    try{
        let res = await p
        console.log(res)
    }catch(e){
        console.warn(e)
    }
}

fn()
```

## P51 async 和await 结合读文件
```js
//1. 引入 fs 模块
//如果单纯只用Promise，就要then好几次
const fs = require('fs')

function readtest(){
    return new Promise((resolve, reject)=>{
        fs.readFile('../resource/test.md', (err, data)=>{
            //如果失败
            if(err) reject(err)
            //如果成功
            resolve(data)
        })
    })
}

function readtest2(){
    return new Promise((resolve, reject)=>{
        fs.readFile('../resource/test2.md', (err, data)=>{
            //如果失败
            if(err) reject(err)
            //如果成功
            resolve(data)
        })
    })
}

function readtest3(){
    return new Promise((resolve, reject)=>{
        fs.readFile('../resource/test3.md', (err, data)=>{
            //如果失败
            if(err) reject(err)
            //如果成功
            resolve(data)
        })
    })
}

async function loadData(){
    let test = await readtest()
    let test2 = await readtest2()
    let test3 = await readtest3()

    console.log(test.toString())
    console.log(test2.toString())
    console.log(test3.toString())
}

loadData()
```

## P52 async和await发ajax请求
```js
// 发送ajax请求，返回的结果是 Promise 对象
function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //成功
                    resolve(xhr.response)
                } else {
                    //失败
                    reject(xhr.status)
                }
            }
        }
    })
}

//测试
/* 方式1：只使用promise then方法 */
// sendAJAX('https://api.apiopen.top/getJoke').then(value => {
//     console.log(value)
// }, reason => {
// })

/* 方式2：使用async和await结合promise */
async function main(){
    // 发送ajax请求
    let result = await sendAJAX('https://api.apiopen.top/getJoke')
    console.log(result)
}

main()
```