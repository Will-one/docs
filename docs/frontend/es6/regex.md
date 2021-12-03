---
title: '正则的扩展'
categories:
- frontend
tags:
- ES6
---

## P55 命名捕获分组
```js
/* 1.没有分组之前的处理方法 */
// // 声明一个字符串
// let str = '<a href="http://www.willone.com">willone</a>'

// //需求，提取url和标签文本
// const reg = /<a href="(.*)">(.*)<\/a>/ 

// const result = reg.exec(str)
// console.log(result[1])
// console.log(result[2])

/* 2.有分组之后的处理方法 */
let str = '<a href="http://www.willone.com">willone</a>'
const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
```

## P56 反向断言
```js
//演示正向断言
let str = '3232dakf555af'
// const reg = /\d+(?=a)/
// const result = reg.exec(str)

//反向断言
const reg = /(?<=f)\d+/
const result = reg.exec(str)
console.log(result)
```

## P57 dotAll模式
```js
//dot 表示 . 是正则中的一个元字符。表示出换行符以外的任意单个字符
//他使得正则多了一个匹配模式s。在这个模式下 . 
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
const reg= /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs

let result
let data = []
while(result = reg.exec(str)){
    console.log(result)
    data.push({title: result[1],time:result[2]})
}
console.log(data)
```

