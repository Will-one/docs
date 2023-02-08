---
title: '执行上下文'
categories:
- frontend
tags:
- javascript
- execution contexts
---

## P22 变量提升和函数提升
:::tip
1. 变量声明提升
* 通过 var 定义（声明）的变量，在定义语句之前就可以访问到
* 值：undefined
:::

:::tip
2. 函数声明提升
* 通过 function 声明的函数，在之前就可以直接调用
* 值：函数定义（对象）
:::

```js
/* 变量提升小测试 */
var a = 3
function fn(){
    console.log(a)
    var a = 4
}
fn() // undefined
```
---

## P23 执行上下文
:::tip 1. 代码分类
* 全局代码
* 局部（函数）代码
:::

:::tip 2. 全局执行上下文
* 在执行全局代码前，将window确定为全局执行上下文
* 对全局数据进行预处理：
    * var 定义的全局变量 ==> undefined，添加为 window 的属性 
    * function 声明的全局函数 ==> 赋值（fun），添加为 window 的方法 
    * this ==> 赋值（window）
:::

:::tip 3. 函数执行上下文
* 在调用函数，准备执行函数之前，创建对应的函数执行上下文对象（虚拟的，存在于栈中）
* 对局部数据进行预处理：
    * 形参变量==>赋值（实参），添加为执行上下文的属性
    * arguments伪数组==>赋值（实参列表），添加为执行上下文的属性
    * var定义的局部变量==>undefined，添加为执行上下文的属性
    * function声明的函数==>赋值（fun）,添加为执行上下文的方法
    * this==>赋值（调用函数的对象）
* 开始执行函数体代码
:::
---

## P24 执行上下文栈
:::tip
1. 在全局代码执行前，JS引擎就会创建一个栈来存储管理所有的执行上下文对象
2. 在全局执行上下文（window）确定后，将其添加到栈中（压栈）
3. 在函数执行上下文创建后，将其添加到栈中（压栈）
4. 在当前函数执行完后，将栈顶的对象移除（出栈）
5. 当所有的代码执行完后，栈中只剩下window
:::
```js
var a = 10
var bar = function(x){
    var b = 5
    foo(x + b)
}

var foo = function(y){
    var c = 5
    console.log(a+c+y)
}
bar(10) // 30
```

## P25 执行上下文小测试
:::tip
测试题1
:::
```js
console.log('global bagin:' + i)
var i = 1
foo(1);
function foo(i){
    if (i == 4){
        return
    }
    console.log('foo() begin:' + i)
    foo(i + 1) // 递归调用
    console.log('foo() end:' + i)
}
console.log('global end:' + i)
```
<details>
<summary>查看解析</summary>
<pre>
<code>
// 依次输出
global bagin:undefined
foo() begin:1
foo() begin:2
foo() begin:3
foo() end:3
foo() end:2
foo() end:1
global end:1
// 整个过程产生了几个执行上下文（N+1）
5个
</code>
</pre>
</details>

:::tip
测试题2
:::
```js
/* 测试题2: 先执行变量提升，再执行函数提升*/
function a(){}
var a;
console.log(typeof a) // function
```

:::tip
测试题3
:::
```js
/* 测试题3: */
if(!(b in window)){
    var b = 1
}
console.log(b) // 输出什么？
```
<details>
<summary>查看解析</summary>
<pre>
<code>
变量提升后相当于：
var b
if(!(b in window)){
    b = 1
}
console.log(b) // undefined
</code>
</pre>
</details>

:::tip
测试题4
:::
```js
var c = 1
function c(c){
    console.log(c)
}
c(2) // 输出什么？
```
<details>
<summary>查看解析</summary>
<pre>
<code>
变量提升后相当于：
var c
function c(c){
    console.log(c)
}
c = 1
c(2) // c is not a function
</code>
</pre>
</details>