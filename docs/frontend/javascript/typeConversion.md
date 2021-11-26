---
title: '类型转换'
categories:
- frontend
tags:
- javascript
---

## P10 Null 和 Undefined
* Null类型的值：null
* null值是用来表示一个空对象的
* 使用typeof检查一个null值的时候，返回的是object
```js
var a = null;
console.log(a);
console.log(typeof(a)); // object
```
* Undefined类型的值只有；undefined.
* 表示一个未初始化的值
* 使用typeof检查一个undefined
```js
var b;
console.log(b);
console.log(typeof(b)); // undefined
```

## P11 强制类型转换-String
1. 使用被转换变量的 toString() 方法
* toString 返回转换后的值，不修改原变量
* toString 不能作用于 null 和 undefined
```js
var a = 123;
a = a.toString();
console.log(typeof(a));//String

/* var b;
b = b.toString();
console.log(typeof(b));//Error */

var d = true;
d = d.toString();
console.log(d);//"true"
console.log(typeof d);//String
```

2. 使用 String() 函数进行转换
* 也不会改变原值，而是返回转换后的值
* 对于 Number 和 Boolean ，实际底层也是调用了 toString()
* 对于 null 和 undefined，直接把 null 变为了 “null” 
```js
var c = null;
c = String(c);
console.log(typeof(c)); // null
```

## P12 强制类型转换-Number

使用 Number() 函数
```js
Number(a);
```

* 字符串 => Number

|原类型|==》|结果|
|:----:|:----|:----|
|string 纯数字|-->|数字|
|有其他符号|-->|NaN|
|string为空 或 全是空格|-->|0|

* Boolean => Number

|原类型|==》|结果|
|:----:|:----|:----|
|true|-->|1|
|false|-->|0|

* Null => Number

|原类型|==》|结果|
|:----:|:----|:----|
|null|-->|0|

* Undefined => Number

|原类型|==》|结果|
|:----:|:----|:----|
|undefined|-->|NaN|

* 注意
:::tip
当字符串从css中获取到的，例如150px，只想转150为Number

可以用 parseInt() parseFloat(),向左识别到不是数字为止。
- '150px' --> 150
- '150px solid' --> 150
- '15a90px' --> 15
- 'a150px' --> NaN 
:::

## P13 其他进制的数字
* 16进制数字，以0x开头
```js
var a = 0x10;
```

* 8进制数字，以0开头
```js
var b = 070;
```

* 2进制数字，以0b开头
```js
var c = 0b1010;
```

* 注意
:::tip
一个字符串里面是8进制数字，如果将其转化为Number，不同浏览器可能做出不一样的解释

比如：var d = "070"；console.log(parseInt(b)); 有的浏览器就是十进制70，有的是八进制56
:::
```js
var d = "070";
console.log("String‘070’明确转化为十进制数字 = "+ parseInt(d,10)); // 再传入一个参数指定转换为10进制。
```

## P14 强制类型转换
*  Number 转换为 Bollean

```js
/*
将其他类型转换为 Boolean , 使用 Boolean()
1.Number 转换为 Bollean
    - 0 和 NaN --> false
    - 其余的正数、负数、Infinity（正无穷）或者 -Infinity（负无穷）--> true
*/
var a = -100;
Boolean(a);//true
```

* String 转换为 Boolean

```js
/*
2.String转换为Boolean
    - 空串 --> false
    - 其他包括空格 --> true
*/
var b = ' '; // 又一个空格
Boolean(b); // true
```

* Null 和 Undefined 转换为 Boolean
```js
/*
3.Null和Undefined转换为Boolean
    - null 和 undefined --> false 
*/
var c = null;
Boolean(c); //false
```

* 对象转换为 Boolean 均为 true

* 注意
:::tip
注意：有一种隐式类型转换方法,在任意类型前面加！！，相当于调用Boolean()
:::
```js
var a = "ll";
a = !!a; 
```