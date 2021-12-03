---
title: '函数的扩展'
categories:
- frontend
tags:
- ES6
---

## P9 箭头函数
```js
// ES6 允许使用【箭头】  ()=> 定义函数
let fn1 = function(a){
    console.log(`es${a}版本的`)
}
let fn2 = (a)=>{
    console.log(`es${a}版本的`)
}
fn1(5)
fn2(6)
```

箭头函数特性
```js
//1.this是静态的，始终指向函数声明时所在作用域下的 this 的值
//设置this
window.name = '全局name'
const P = {
    name:'--对象name--'
}

//函数定义
function getName1(){
    console.log(this.name)
}
let getName2 = () => {
    console.log(this.name)
}

//直接调用
// getName1()//输出：全局name
// getName2()//输出：全局name

//使用call调用
getName1.call(P)//this指向P对象
getName2.call(P)//输出：全局name
```

```js
//2.不能作为构造函数实例化对象
// let Person = (name, age) => {
//     this.name = name
//     this.age = age
// }

// let me = new Person('willone',17)//直接报错
```

```js
//3.不能使用arguments变量
// let fn3 = () => {
//     console.log(arguments)
// }
// fn(1,2,3)//报错，没有arguments
```

```js
/*
* 4.箭头函数的简写
*   1)省略小括号，当形参有且只有一个的时候
*   
* 
* 
*/
//1)省略小括号，当形参有且只有一个的时候
let add = n => {
    return ++n
}
console.log(add(9))
//2)省略花括号，当代码体只有一条语句的时候, 此时return必须省略
let pow = n => n * n
console.log(pow(8))
```

## P10 箭头函数的实践与应用
```js
//需求1 点击div 2s 后变色
let box = document.getElementById('box1')
box.onclick = () => {
    setTimeout(() => {
        //* 这里利用了箭头函数的this是静态的，指向声明时作用域里面的this
        //* 不用箭头函数的话，这里的this指向window
        this.style.backgroundColor = 'pink'
    }, 2000);
}
```
```js
//需求2 从数组中返回偶数的元素
const arr = [1,6,9,10,100,25]
//方式1
// const result = arr.filter(function(item){
//     if(item % 2 === 0){
//         return true
//     }else{
//         return false
//     }
// })
// console.log(result)

//方式2
const result = arr.filter(item => item % 2 === 0)
console.log(result)
```

:::tip
1. 箭头函数适合 与this无关的回调。
* 定时器
* 数组方法回调
:::

:::tip
1. 箭头函数不适合 与this有关的回调。
* 事件回调
* 对象的方法
:::

## P11 函数参数的默认值
ES6 允许给函数参数赋值初始值
```js
//1.形参初始值，具有默认值的参数，一般位置要靠后（潜规则）
function add(a,b,c=10){
    return a+b+c
}
let result = add(1,2)
console.log(result)

//2.与解构赋值结合
function connect({host='127.0.0.1',username,password,port=3306}){
    console.log(host)
    console.log(username)
}
connect({
    host:'localhost',
    username:'root',
    password:'root',
    port:3306
})
```

## P12 rest参数
ES6 引入 rest 参数，用于获取函数的实参，用来代替 arguments
```js
//ES5 获取实参的方式arguments，是个对象
function getData1(){
    console.log(arguments)
}
getData1(100,[1,2,3])

//rest 参数
function getData2(...args){
    console.log(args)//args是一个数组，就可以使用filter，some，map等等数组的方法
}
getData2('天','下','有','敌')//输出是一个数组

/***********************要点************************/
//rest 参数必须要放到参数的最后
function fn(a, b, ...args){
    console.log(a)
    console.log(b)
    console.log(args)
}
fn(1,3,4,56,7,8)//1,2,[4,56,7,8]
```

## P54 ES9 rest参数新特性
rest参数在ES6中已经引入，但是在ES6中只针对数组。
```js
/**********多余的对象都会放到rest参数中,是一个对象**********/
function connect({ host, port, ...user }) {
    console.log(host)
    console.log(port)
    console.log(user)
}

connect({
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root'
})
```