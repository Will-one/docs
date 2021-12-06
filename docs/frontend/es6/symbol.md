---
title: 'Symbol'
categories:
- frontend
tags:
- ES6
---

## P15 关于Symbol
```js
/* 
* 创建Symbol
*/
let s1 = Symbol()
let s2 = Symbol('willone')

let s3 = Symbol.for('willone')

/* 特点 */
/* 1.不能与其他数据进行运算 */

/*
* 2.Symbol是js的第七种数据类型
*    * Number
*    * String
*    * Boolean
*    * Null
*    * Undefined
*    * Object
*    * Symbol
*/
```

## P16 Symbol的使用
Symbol 的使用。为对象添加属性和方法，表示是独一无二的
```js
/*************** 为对象添加Symbol类型属性方法一 ***************/
//1.原对象
let game = {
    up(){
        console.log('原生向上')
    },
    down(){
        console.log('原生向下')
    }
}

//2。新方法
let newMethods = {
    up:Symbol('新向上'),
    down:Symbol('新向下')
}

//3.为原对象添加新方法，即使重名也不影响
game[newMethods.up] = function(){
    console.log('新向上')
}
game[newMethods.down] = function(){
    console.log('新向上')
}
console.log(game)
game[newMethods.up]()//掉用Sybol的时候，添加的时候是什么名字，就需要写什么名字

/*************** 为对象添加Symbol类型属性方法二 ***************/
let sb1 = Symbol('rush')
let company = {
    name:'wo',
    [sb1]:function(){
        console.log('只是Symbol')
    },
    [Symbol('build')](){
        console.log(`Symbol+对象简化+模板字符传：公司名${this.name}`)
    }
}
console.log(company)
company[sb1]()//这样可以调用，但是sb1下面那个就不知道怎么调用了
```

## P17 Symbol的内置值
```js
/* 
Symbol的内置值相当于是Symbol这个类型的一些内置的方法吧，具体的找其他的教程看
    */

/* 
1.Symbol.hasInstance
    * 当其他对象使用instance运算符，判断是否为该对象的实例时，会调用这个方法
    */
class Person{
    static [Symbol.hasInstance](param){
        console.log(param)
        console.log('被自动用来检测类型了')
    }
}
let obj = {}
console.log(obj instanceof Person)

/* 2.还有很多，去其他地方找专业的教程研究 */
```

## P61 ES10 Symbol原型的描述
```js
// 创建一个symbol,传入一个字符串作为描述
let s = Symbol('willone')

//使用description，可以得到symbol里面的描述字符串
console.log(s.description)
```