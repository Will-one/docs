---
title: '变量的解构赋值'
categories:
- frontend
tags:
- ES6
---

## P6 变量的解构赋值
```js
/*
ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值
    这被称为解构赋值 
*/

/* 
1.数组的解构赋值(用的不多)
*/
const GAME = ['ZELDA','MHR','P5']
let [yyds, tql, awsl] = GAME
console.log(yyds)

/*
2.对象的解构
*/
const P = {
    name:'willone',
    age:'17',
    gaming:function(){
        console.log('Nintendo is the master of the world')
    }
}
let{name, age, gaming} = P
gaming()
```

## P54 ES9 扩展运算符特性
rest参数与spread扩展运算符在ES6中已经引入，但是在ES6中只针对数组。

在ES9中为对象提供了像数组一样的rest参数和扩展运算符
```js
/************************扩展运算符************************/
const obj_part1 = {
    q: 'fire',
    w: 'air'
}
const obj_part2 = {
    e: 'water',
    r: 'earth'
}
//对象合并
const obj = { ...obj_part1, ...obj_part2 }
console.log(obj)
```