---
title: '对象的扩展'
categories:
- frontend
tags:
- ES6
---

## P8 简化对象写法
```js
//ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法
//这样的书写更加简洁
let name = 'willone'
let change = function(){
    console.log('可以放在对象外面')
}

const obj = {
    name,
    change,
    improve(){
        console.log('对象内部创建方法简化')
    }
}

obj.change()
obj.improve()
```

## P40 对象方法扩展
```js
//1. Object.is 判断两个值是否完全相等
console.log(Object.is(120, 120))//功能类似于===
console.log(Object.is(NaN, NaN))//true。可以判断NaN

//2. Object.assign  对象的合并（可以用在配置文件合并上）
const target = {
    host:'localhost',
    port:3306,
    name:'root',
    pwd:'root',
    cfg1:111
}
const source = {
    host:'http://willone.com',
    port:4480,
    name:'admin',
    pwd:'admin',
    cfg2:222
}
console.log(Object.assign(target, source))//对于相同高配置，使用源的配置覆盖目标的配置。不同配置无影响,多出来的配置自动添加

//3. Object.setPrototypeof设置原型对象 Object.getPrototypeof
const school = {
    name:'霍格沃兹'
}
const part = {
    xueyuan:['格兰芬多','斯莱特林','拉文克劳','赫奇帕奇']
}
Object.setPrototypeOf(part, school)
console.log(Object.getPrototypeOf(part))
console.log(part)
```

## P53 对象方法扩展
:::tip
Object.values 和 Object.entries
* Object.values()方法返回一个给定对象的所有可枚举属性值的数组
* Object.entries()方法返回了一个给定对象自身可遍历属性[key,value]的数组

Object.getOwnPropertyDescriptors
* 该方法返回指定对象所有自身属性的描述对象
:::
```js
// 声明对象
const person = {
    name:'willone',
    hobby:['game','movie','photo'],
    city:['KM','XA','PP']
}

//keys 获取所有的键
console.log(Object.keys(person))
//values 获取对象所有的值
console.log(Object.values(person))

//entries 返回的值是一个数组，数组的值是由键值组成的数组（数组包数组）。方便去创建一个map
console.log(Object.entries(person))
const m = new Map(Object.entries(person))
console.log(m)

//Object.getOwnPropertyDescriptors 返回对象属性的描述对象（下面有演示。会显示在使用Object.create创建对象的时候可以设置的一些属性）
console.log(Object.getOwnPropertyDescriptors(person))
//参照一下create创建对象，第一个参数是原型对象，第一个参数是一个描述对象
const obj = Object.create(null,{
    //设置的name，必须是一个对象
    name:{
        //设置值
        value:'willone',
        //属性特性
        writble:true,//是否可写
        configurable:true,//是否可删除
        enumerable:true//是否可以枚举
    }
})
```

## P58 ES10 对象方法扩展
回顾：在ES8中新加入了Object.entries,可以把对象转化为二维数组

这里的Object.fromEntries又把二维数组(或者传入map)转化为对象
```js
const obj = {
    name:'willone',
    hobby:['game','movie','photo'],
    city:['KM','XA','PP']
}
let arr = Object.entries(obj)
console.log(arr)

let tranObj = Object.fromEntries(arr)
console.log(tranObj)
```