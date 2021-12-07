---
title: 'Promise 关键问题'
categories:
- frontend
tags:
- promise
---

## P18 修改Promise对象装填的方法
总结：有几种方法可以改变Promise对象的状态
```js
let p = new Promise((resolve,reject)=>{
    //1.resolve 函数
    //resolve('ok')//pending => fulfilled(resolved)

    //2.reject函数
    reject('error')//pending => rejected

    //3.抛出错误
    throw '出错了'
})
```


## P19 能否执行多个回调
能执行多个then方法回调
```js
let p = new Promise((resolve,reject)=>{
    resolve('成功')
})
/* 当状态改变后，都会调用 */
//第一个
p.then(value => {
    console.log('指定的第一个回调')
})
//第二个
p.then(value => {
    console.log('第二个回调')
})
```

## P20 改变状态与执行回调的顺序
:::tip 改变promise状态和指定回调函数谁先谁后
* 都有可能，正常情况下先指定回调（then）再改变状态（三种方法），但也可以先改状态再指定回调
* 如何先改状态再指定回调？
    * (同步调用改状态的函数)在执行器(resolve,reject)=>{}中直接调用resolve()/reject()
    * 延迟调用then()
* 什么时候才能得到数据
    * 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
    * 如果先改变的状态，那当指定回到时，回调函数就会调用，得到数据
:::

```js
/* 
    开始for循环
    代码执行结束
    执行then函数
    代码开始执行
*/
setTimeout(() => console.log('代码开始执行'), 0)
new Promise((resolve, reject) => {
    console.log('开始for循环');
    for (let i = 0; i < 10000; i++) {
        i == 99 && resolve()
    }
}).then(() => console.log('执行then函数'))
console.log('代码执行结束')
```

## P21 then 方法返回结果特点
:::tip
Promise.then()返回的新promise的结果状态由什么决定
  * 简单表述：由then()指定的回调函数执行的结果决定
  * 详细表述:
      1. 如果抛出异常，新promise变为rejected，reason为抛出的异常
      2. 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
      3. 如果返回的是另一个新promise，此promise的结果就会使用新promise的结果
:::
```js
let p = new Promise((resolve,reject)=>{
    resolve('ok')
})
//执行then方法
//注意，then的返回值也是一个promise对象
let res = p.then(value=>{
    //1.抛出错误
    // throw '出错'

    //2.返回非promise对象
    // return '字符串'

    //返回一个promise对象
    return new Promise((resolve,reject)=>{
        resolve('成功')
    })
},reason=>{

})

console.log(res)
```

## P22 Promise 串联多个操作任务
因为then方法返回的也是一个pomise，就可以实现链式调用
```js
const p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok')
    }, 2000);
})

p.then(value=>{
    console.log(value)//ok
    return new Promise((resolve,reject)=>{
        resolve('success')
    })
}).then(value=>{
    console.log(value)//success
}).then(value=>{
    consoel.log(value)//undefined,上一个then没有return，所以它返回的promise对象的值就是undefined
})
```

## P23 异常穿透
:::tip
Promise的异常穿透
* 当使用promise的then链式调用时，可以在最后指定失败的回调
* 前面任何操作出了异常，都会传到最后失败的回调中处理
:::
```js
const p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok')
    }, 2000);
})

p.then(value=>{
    console.log(value)//ok
    return new Promise((resolve,reject)=>{
        resolve('success')
    })
}).then(value=>{
    throw '中间失败's
    //console.log(value)//success
}).then(value=>{
    console.log(value)//undefined
}).catch(reason=>{
    console.log(reason)//在链式调用的最后加上对失败的处理即可，用then和catch都可以。无论前面那步出错，都会传递到最后
})
```

## P24 中断 Promise 链
```js
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000);
})

//要是想要中断Promise链，有且只有一种方式：返回一个pending装填的promise对象
p.then(value => {
    console.log('111')
    //只能返回一个pending状态的promise对象,因为promise状态不改变，下面也就不会执行
    return new Promise(() => {})
}).then(value => {
    console.log('222')
}).then(value => {
    console.log('333')
}).catch(reason => {
    console.warn(reason)
})
```