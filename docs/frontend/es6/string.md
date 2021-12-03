---
title: '字符串的扩展'
categories:
- frontend
tags:
- ES6
---

## P7 模板字符串
```js
//ES6 引入了新的声明字符串的方式 ``  之前有'' ""

//声明
let str = `字符串`
console.log(str, typeof str)

//特性
//1.内容中可以直接出现换行符
let str2 = `<ul>
                <li>嗒</li>
                <li>嗒</li>
                <li>嗒</li>
            </ul>`
//2.直接进行变量拼接
let gameGad = 'Nintendo'
const QA = `${gameGad} is the master of the world`
console.log(QA)
```