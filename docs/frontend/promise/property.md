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


## P13 Promise 的基本流程
1. new Promise()
    * 对象pending状态
2. 执行异步操作
    * 成功：执行resolve()
        * 对象resolved状态，调then里面第一个回调（value）
            * 返回一个Promise
    * 失败
        * 对象rejected状态，调then里面第二个回调（reason）
            * 返回一个Promise

## P14 then 和 catch
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