---
title: '迭代器'
categories:
- frontend
tags:
- ES6
---

## P18 迭代器介绍
迭代器介绍
* iterator是一种接口，为不同的数据结构提供统一的访问机制
* 任何数据结构，只要部署iterator，都可以完成遍历操作
对于js的ES6而言
* ES6创造了一种新的遍历命令for...of循环，iterator主要供for...of消费
* 原生具备iterator接口的数据有（可以使用for...of遍历）
    
    a. Array

    b. Arguments

    c. Set

    d. Map

    e. String

    f. TypedArray

    g. NodeList

## P19 迭代器实例
使用 in 遍历

数组使用foreach遍历

通过symbol.iterator使用for of
```js
/* 
需求描述
    一个对象中包含某个属性需要遍历。并且不能用点运算符单独提出来遍历(不符合面向对象的思想)
*/

let obj = {
    name: 'willone',
    fav:[
        'game',
        'sleep',
        'movie',
        'study'
    ],
    //1. 对象中创建一个Symbol.iterator属性
    [Symbol.iterator](){
        let index = 0
        let _this = this
        //2.返回一个指针对象，包含next方法
        /*
        每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
        */
        return {
            next(){
                if(index < _this.fav.length){
                    const result = {value:_this.fav[index],done:false}
                    index++
                    return result  
                }else{
                    return {value:undefined,done:true}
                }
            }
        }
    }
}
for(let item of obj){//当对这个对象使用of的时候，自动就去使用我们自定义的Symbol.interator了
    console.log(item)
}
```
