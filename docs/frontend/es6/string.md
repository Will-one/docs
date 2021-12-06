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

## P59 ES10 字符串扩展方法
在ES5就有trim方法用来清除字符串两端的空白
```js
let str = '  两端有空白  '
console.log(str)
console.log(str.trim())

/* trimStart和trimEnd用来指定清除左侧还是右侧的空白 */
console.log(str.trimStart())
console.log(str.trimEnd())
```

## P64 ES11 matchAll
:::tip
String.prototype.matchAll
* 获取正则批量匹配的结果（重要）
:::
```js
let str = `
<ul>
    <li>
        <a>星球大战</a>
        <p>上映日期：1987-01-01</p>
    </li>
</ul>
<ul>
    <li>
        <a>球球大战</a>
        <p>上映日期：2087-01-01</p>
    </li>
</ul>
`

//声明正则
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs

const res = str.matchAll(reg)//返回的一个可扩展对象，有next属性
//所以可以对其进行for。。of遍历或者使用扩展运算符进行展开

//1.用for。。of
// for(let item of res){
//     console.log(item)
// }

//2.用扩展运算符
const arr = [...res]
console.log(arr)
```
