---
title: '生成器'
categories:
- frontend
tags:
- ES6
---

## P20 生成器函数的声明与调用
:::tip
生成器本质是一个特殊的函数
* 通常在js中要实现异步编程，我们都在使用回调函数。形成了回调地狱
* 生成器用在异步编程上
* 使用function * 函数名(){}创建，返回一个迭代器对象
* 在生成器函数中可以加入yield，可以看做是函数代码的分隔符
:::

```js
function * gen(){
    yield 'zhe shi sm'
    yield 'jiang de bx'
    yield 'haide kanshu'
}

let iterator = gen()
//既然返回值是一个迭代器，可以通过调用next属性进行调用
// iterator.next()
// iterator.next()
// iterator.next()
// iterator.next()

//也可以通过for of循环来遍历
for(let v of iterator){
    console.log(v)
}
```
## P21 生成器函数参数与实例
```js
function * gen(a){
    console.log(a)
    let b = yield 111
    console.log(b)//bbb
    let c = yield 222
    console.log(c)//ccc
    let d = yield 333
    console.log(d)//ddd
}

//获取迭代器对象
//注意，迭代器整体可以传参
let iterator = gen('aaa')
//每个next也可以传参数，作为上一个yi值
console.log(iterator.next())//第一个也白传，它没有上一个yield
console.log(iterator.next('bbb'))
console.log(iterator.next('ccc'))
console.log(iterator.next('ddd'))
```

## P22 生成器实例1
```js
/* 一个实例:1秒输出111，再2s后输出222，再3秒后输出333 */
function one(){
    setTimeout(()=>{
        console.log(111)
        ite.next()//在对应的函数里面也调用next
    },1000)
}
function two(){
    setTimeout(()=>{
        console.log(222)
        ite.next()
    },2000)
}
function three(){
    setTimeout(()=>{
        console.log(333)
        ite.next()
    },3000)
}

//创建生成器函数
function * genImpl(){
    yield one()
    yield two()
    yield three()
}

// 调用生成器函数
let ite = genImpl()
ite.next()
```

## P23 生成器实例2
```js
// 模拟获取 用户数据 订单数据 商品数据
function getUser(){
    setTimeout(()=>{
        let data = '用户数据'
        //调用 next 方法，并且将数据出传入
        iterator.next(data)
    },1000)
}
function getOrders(){
    setTimeout(()=>{
        let data = '订单数据'
        //调用 next 方法，并且将数据出传入
        iterator.next(data)
    },1000)
}
function getGoods(){
    setTimeout(()=>{
        let data = '商品数据'
        //调用 next 方法，并且将数据出传入
        iterator.next(data)
    },1000)
}

//创建生成器函数
function * gen(){
    let user = yield getUser()
    console.log(user)
    let order = yield getOrders()
    console.log(order)
    let goods = yield getGoods()
    console.log(goods)
}

//第一次调用迭代器
let iterator = gen()
iterator.next()
```