---
title: 'async 和 await'
categories:
- frontend
tags:
- promise
---

## P43 async 函数
:::tip
async函数
1. 函数的返回值promise对象
2. promise对象的结果由async函数执行的返回值决定
:::
```js
async function main(){
    //1. 如果返回值是一个非promise类型的数据
    return 111
    //2. 如果返回的是一个promise对象
    return new Promise((resolve,reject)=>{
        resolve('ok')
    })
}

let res = main()//main的结果是一个promise对象，这个promise的状态由返回值决定
```

## P44 await 表达式
:::tip
await表达式
1. await右侧的表达式一般为promise对象，但也可以是其他的值
2. 如果表达式是promise对象，await返回的是promise成功的值
3. 如果表达式是其他值，直接将此作为await的返回值

注意：
1. await必须写在async函数中，但async函数中可以没有await
2. 如果await的promise失败了，就会抛出异常，使用try catch捕获异常
:::
```js
async function getPage(){
    let p = new Promise((resolve,reject)=>{
        //resolve('ok')
        reject('error')
    })

    // //1. 右侧为promise的情况
    // let res = await p
    // console.log(res)//ok
    // //2. 右侧为其他类型的数据
    // let res2 = await 20
    // console.log(res)//20

    try{
        let res3 = await p
    }catch(e){
        console.log(e)
    }
}

getPage()
```

## P45 async 和 await 读取文件
```js
const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function readFile(){
    try{
        let data1 = await mineReadFile('../resource/P5.md')
        let data2 = await mineReadFile('../resource/P45.md')
        console.log(data1+data2)
    }catch(e){
        console.log(e.code)
    }
}

readFile()
```

## P46 async 和 await 发 AJAX
```js
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

const btn = document.getElementById('btn')
btn.onclick = async function(){
    try{
        let data = await sendAJAX('https://api.apiopen.top/getJokea')
        console.log(111)
        console.log(data)
    }catch(e){
        console.log(e)
    }
}
```