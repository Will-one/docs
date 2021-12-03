---
title: '数组的扩展'
categories:
- frontend
tags:
- ES6
---

## P13 扩展运算符
... 扩展运算符能将 “数组” 转换为 逗号分隔的 “参数序列”
```js
//1.声明一个数组
const arr = ['Nintendo','SEGA','SE']

function show(){
    console.log(arguments)
}
show(...arr)//本来的数组变成了三个参数,要注意与rest参数进行区分
```

## P14 扩展运算符的应用
```js
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arrAll = [...arr1, ...arr2]
console.log(arrAll)

/* 2.数组的克隆 */
const originArr = ['a','b','c']
const copyArr = [...originArr]//如果有引用类型的数据的话，也是一个浅拷贝
console.log(copyArr)

/* 3.将伪数组转为真正的数组 */
const divs = document.querySelectorAll('div')//这样的DOM查询获得的是类数组对象
const divsArr = [...divs]//可以通过扩展运算符将其转化为真正的数组
```

## P48 数组 includes 方法
```js
/* 
1.数组的includes方法：Array.prototype.includes
    * includes方法用来检测数组中是否包含某个元素，返回布尔类型变量
*/
let arr = ['aaa','bbb','ccc']
console.log(arr.includes('aaa'))

/*
2.幂运算** 
*/
console.log(2**3)//和Math.pow(2,3)效果一直
```