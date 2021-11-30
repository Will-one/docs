---
title: '原型与原型链'
categories:
- frontend
tags:
- javascript
- prototype
---

## P15 函数的 prototype
:::tip
函数的prototype属性
:::
* 每个函数都有一个prototype属性，它默认指向一个Object空对象（即称为：原型对象）
* 原型对象中有一个属性constructor，他指向函数对象
```js
function Fun(){}
console.log(Fun.prototype) // 默认指向一个空对象，可以向其添加属性
Fun.prototype.test = function(){
    console.log("向原型对象添加的方法")
}
console.log(Fun.prototype.constructor === Fun) // true,原型对象中的constructor指向函数对象
```

:::tip
给原型函数添加属性（一般是方法）
:::
* 作用：函数所有的实例对象自动拥有原型中的属性（方法）
```js
function Fun2(){}
Fun2.prototype.test2 = function(){
    console.log("原型中的方法")
}
var fun2 = new Fun2()
fun2.test2() // 可以调用到原型中的方法
```
---

## P16 显式原型和隐式原型
* 每个函数都有一个prototype，称为显式原型
* 每个实例对象都有__proto__，称为隐式原型
* “实例对象”的__proto__的值为其对应“构造函数”的prototype的值
```js
function Fn(){} // 内部语句：this.prototype = {}
var fn = new Fn() // 内部语句：this.__proto__ = Fn.prototype

/* “实例对象”的__proto__的值为其对应“构造函数”的prototype的值 */
console.log(Fn.prototype === fn.__proto__)//true
```
:::tip 总结
* 函数prototype属性，在定义函数时自动添加，默认值是一个空Object对象
* 对象__proto__属性，创建对象是自动添加的，默认值是构造函数的prototype属性值
* 程序员能直接操作显示原型，但不能直接操作隐式原型（ES6之前）
:::

## P17-18 原型链
### 原型链关系（看图）：
访问一个对象的属性时
* a.先在自身属性中查找，找到返回
* b.如果自身没有，再沿着__proto__这条链向上查找，找到返回
* c.如果最终都没有找到，返回undefined
:::tip
别名：隐式原型链

作用：查找对象的属性（方法）
:::
<img class="zoom-img" :src="$withBase('/assets/frontend/prototypeChain_1.png')" alt="proto1">

```js
function Fn(){
    this.test1 = function () {
        console.log('test1()')
    }
}

Fn.prototype.test2 = function () {
    console.log('test2()')
}
var fn = new Fn();
/* 实例对象的隐式原型 和 其构造函数的显式原型指 */
console.log(Fn.prototype)
console.log(fn.__proto__)
console.log(Fn.prototype === fn.__proto__) // true

fn.test1() // test1
fn.test2() // test2
console.log(fn.toString())
//fn.test3() // is not a function
```
---

### 构造函数/原型/实例对象的关系：
<img class="zoom-img" :src="$withBase('/assets/frontend/prototypeChain_2.png')" alt="proto2">

---

### 构造函数/原型/实例对象的关系2：
<img class="zoom-img" :src="$withBase('/assets/frontend/prototypeChain_3.png')" alt="proto3">

1. 函数的prototype指向的对象默认是“空Object实例对象”（但Object不满足）
```js
console.log(Fn.prototype instanceof Object) // true
console.log(Object.prototype instanceof Object) // false
console.log(Function.prototype instanceof Object) // true
```
2. 所有函数都是Function的实例(包含Function)
```js
console.log(Function.__proto__===Function.prototype) // true

```
3. Object的属性prototype指向的原型实例是原型链的尽头（__proto__为null）
```js
console.log(Object.prototype.__proto__) // null
```
---

## P19 原型链属性问题
* 读取对象的属性时，自动在原型链中找
* 设置对象的属性值时，不会查找原型链。本身没有，直接就在自己里面添加
* 方法一般定义在原型中，属性一般通过构造函数定义在对象本身
```js
function Fn(){}
Fn.prototype.a = 'xxx'

var fn1 = new Fn()
console.log(fn1.a,fn1) // 找到原型

var fn2 = new Fn()
fn2.a = "yyy" // 在自己里面创建，不会修改原型的属性
console.log(fn1.a,fn2.a,fn2) // xxx,yyy
```
---

## P20 学习instanceof
:::tip
1. instanceof 是如何判断的？
:::
* 表达式 A instanceof B
* (A走隐式原型链，B走显式原型链，看有没有交叉)
* 如果B函数的显式原型对象在A对象的隐式原型链上，返回 true。否则返回 false
:::tip
2. Function 是通过 new 自己产生的实例
:::
```js
console.log(Object instanceof Function) // true
console.log(Object instanceof Object) // true
console.log(Function instanceof Function) // true
console.log(Function instanceof Object) // true

function Foo(){}
// 隐式：Object -> Function.prototype -> Object原型对象（原型链终点）
// 显式：Foo -> Object空对象 
console.log(Object instanceof Foo) // false
```

## P21 原型小测试
:::tip
测试题1：
:::
```js
var A = function(){}
A.prototype.n = 1

var b = new A()

// 说明1
A.prototype = { n:2, m:3 }

var c = new A()
// 输出1
console.log(b.n, b.m, c.n, c.m)
```

<details>
<summary>查看解析</summary>
<pre>
<code>
// 说明1：这一步，A的显式原型指向了一个新的Object对象，而上面b的隐式原型还是指向原来的Object
A.prototype = { n:2, m:3 }
...
// 输出1：
console.log(b.n, b.m, c.n, c.m) // 1,undefined,2,3
</code>
</pre>
</details>

---

:::tip
测试题2：
:::

```js
var F = function(){}
Object.prototype.a = function(){
    console.log("a()")
}
Function.prototype.b = function(){
    console.log("b()")
}
var f = new F()
// 输出1
F.a()
F.b()
f.a()
f.b()
```

<details>
<summary>查看解析</summary>
<pre>
<code>
// 作为对象调用的时候，都是通过__proto__查找
// 输出1：
F.a() // a()
F.b() // b()
f.a() // a()
f.b() // is not a function
</code>
</pre>
</details>