---
title: '数值的扩展'
categories:
- frontend
tags:
- ES6
---

## P39 ES6数值的扩展
```js
//0. Number.EPSILON 是JavaScript表示的最小精度
//EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16
//注意：可以用在浮点数运算上面。浮点数运算是有误差的
function equal(a, b){
    if(Math.abs(a-b) < Number.EPSILON){
        return true
    }else{
        return false
    }
}
console.log(0.1 - 0.2 === 0.3)//false
console.log(equal(0.1+0.2, 0.3))//true

//1. 二进制和八进制
let b = 0b110//二进制
let o = 0o777//八进制

//2. Number.isFinite 检测一个数值是否为有限数
console.log('有限数：'+Number.isFinite(100))//true
console.log('有限数：'+Number.isFinite(Infinity))//false

//3. Number.isNaN 检测一个数值是否为NaN
console.log(Number.isNaN(10+undefined))

//4. Number.parseInt Number.parseFloat字符串转整数
let a = '100px'
console.log('parseInt 100px:'+Number.parseInt(a))

//5. Number.isInteger 判断一个数是否为整数
console.log(Number.isInteger(5))
console.log(Number.isInteger(2.5))
//6. Math.trunc 将数字的小数部分抹掉
console.log(Math.trunc(3.5))

//7. Math.sign 判断一个数到底为正数(返回1) 负数(返回-1) 还是零(返回0)
console.log(Math.sign(0))
```