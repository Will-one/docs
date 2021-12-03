---
title: 'let 和 const'
categories:
- frontend
tags:
- ES6
---

## P3 let
```js
//声明变量
let a
let b = 10, c = []

/* 1：变量不能重复声明 */
let name = 'willone'
//let name = 'one'//浏览器报错

/* 2.块级作用域 es5里面有三张作用域全局，函数，eval（需要开启严格模式）*/
{
    let age = 17//只在大括号内有效
}

/* 3.let不存在变量提升 */
{
    console.log(gender)
    //let gender = '男'//报错
    var gender = '男'//undefined
}

/* 4.let不影响作用域链，正常查找 */
{
    let time = 'dont have'
    function showTime(){
        console.log(time)//在作用域链中查找
    }
    showTime()
}
```

## P4 let 应用
```html
<div class="container">
    <h2 class="page-header">点击切换颜色</h2>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
```
```js
let items = document.getElementsByClassName('item')

//遍历并绑定事件
//方式1，使用this
// for(var i = 0; i < items.length; i++){
//     items[i].onclick = function(){
//         //修改当前元素的颜色
//         //方式1，使用this
//         this.style.background = 'pink'
//     }
// }

//方式2，使用闭包
// for(var i = 0; i < items.length; i++){
//     (function(i){
//         items[i].onclick = function(){
//             //修改当前元素的颜色
//             //方式2，使用闭包
//             items[i].style.background = 'pink'    
//         }
//     })(i)
// }

//方式3，在for循环使用let，它在for循环内有块基本作用域。
for(let i = 0; i < items.length; i++){
    items[i].onclick = function(){
        //修改当前元素的颜色
        //方式1，使用this
        items[i].style.background = 'pink'
    }
}
```
## P5 const
```js
const PID = '007'

/* 注意事项 */
//1.一定要赋初始值
// const A//报错

//2.常量一般使用大写（小写也不是不行，大写是约定俗成的）

//3.常量值不能修改

//4.const也是块级作用域
// {
//     const PLAYER = 'PS5'
// }
// console.log(PLAYER)//报错

//5.对于以const定义的数组和对象中的元素进行修改，不会报错（因为常量保存的内存地址没有发生改变）
const TEAM = ['spMan','sdMan','IRMan']
TEAM.push('SeaMan')
console.log(TEAM)
```