---
title: 'Promise 属性方法'
categories:
- frontend
tags:
- promise
---

## P10 Promise 对象状态属性
:::tip
promise的状态 是 实例对象中的一个属性【PromiseState】
* pending   未决定的
* resolved / fulfilled  成功
* reject    失败
:::
:::tip
状态改变
* pending => resolved
* pending => rejected
只有这两种改变形式，并且一个promise对象只能改变一次

无论变为成功还是失败，都会有一个结果数据，成功的一般称为value，失败一般称为reason
:::

## P11 Promise 对象结果属性
:::tip
promise的结果 是 实例对象中的一个属性【PromiseResult】
* 保存着异步任务【成功/失败】的结果
* resolve()和reject()可以修改PromiseResult
:::
:::tip
状态改变
* resolve()和reject()
:::


## P12 Promise 的基本流程
1. new Promise()
    * 对象pending状态
2. 执行异步操作
    * 成功：执行resolve()
        * 对象resolved状态，调then里面第一个回调（value）
            * 返回一个Promise
    * 失败
        * 对象rejected状态，调then里面第二个回调（reason）
            * 返回一个Promise

## P13 then 和 catch
:::tip
* Promise构造函数：Promise(excutor){}
    * executor函数：执行器(resolve,reject)=>{}
    * resolve函数：内部定义成功时我们调用 value => {}
    * reject函数：内部定义失败是我们调用 reason => {}
 
    说明：executor会在Promise内部立即同步调用(!!重要)，异步操作在执行器中执行
:::
:::tip
* Promise.prototype.then方法：(onResolved,onRejected)=>{}
    * onResolved函数：成功的回调函数 (value)=>{}
    * onRejected函数：失败的回调函数 (reason)=>{}
 
    说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调
    
    返回一个新的Promise对象
:::
:::tip
* Promise.prototype.catch方法：(onRejected)=>{}
    * onRejected函数：失败的回调函数 (reason)=>{}
:::

## P14 resolve 方法
:::tip
Promise.resolve
* 属于Promise构造函数，返回一个promise对象

参数：
* 如果传入的参数为 非Promise类型 ，则返回的结果为状态为成功的promise对象
* 如果传入的参数为 Promise类型，则参数执行的结果决定了 resolve的结果
:::
```js
let p1 = Promise.resolve('非Promise类型')
console.log(p1)

let p2 = Promise.resolve(new Promise((resolve, reject)=>{
    resolve('ok')
}))
console.log(p2)//内层的状态决定了外层的状态
```

## P15 reject 方法
:::tip
Promise.reject
* 属于Promise构造函数，返回一个失败的promise对象

参数：
* 无论传入什么类型，返回的都是一个失败的promise对象
:::
```js
let p1 = Promise.reject('非Promise类型')
console.log(p1)

let p2 = Promise.reject(new Promise((resolve, reject)=>{
    resolve('ok')
}))
console.log(p2)//内层的状态决定了外层的状态
```

## P16 all 方法
:::tip
Promise.all方法 (promises)=>{}
* promises: 包含n个promise的数组

说明：返回一个新的promise，只有所有的promise都成功才成功，只要有一个失败了就直接失败
* 失败的话，返回的结果字段为失败的那个Promise的结果
* 全部成功的话，返回的是一个数组，数组元素为每个promise参数的结果
:::
```js
let p1 = new Promise((resolve, reject) => {
    resolve('p1 ok')
})
let p2 = new Promise((resolve, reject) => {
    resolve('p2 ok')
})
let p3 = new Promise((resolve, reject) => {
    resolve('p3 ok')
})

const res = Promise.all([p1, p2, p3])
console.log(res)//只要有一个失败，就失败
```

## P17 race 方法
:::tip
Promise.race方法：(promises) => {}
* promises: 包含n个promise的数组

说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态
:::
```js
let p1 = new Promise((resolve, reject) => {
    resolve('p1 ok')
    //reject('p1失败')
})
let p2 = Promise.reject('p2失败')
let p3 = new Promise((resolve, reject) => {
    resolve('p3 ok')
})

const res = Promise.race([p1, p2, p3])//第一个完成的promise的状态就是最终的状态
console.log(res)
```