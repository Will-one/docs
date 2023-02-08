---
title: 'Set 和 Map 数据结构'
categories:
- frontend
tags:
- ES6
---

## P30 Set 介绍与 API
:::tip
ES6提供了新的数据结构set（集合）,它的类型是object
* 类似于数组，但成员的值都是唯一的
* 实现了iterator接口，所以可以使用 【扩展运算符...】和【for...of】进行遍历
:::
```js
//特点：自动去重
let s = new Set(['1','2','3','3'])
console.log(s) // Set(3) { '1', '2', '3' }
//size,元素个数
console.log(s.size) // 3
//add，添加元素
s.add('4')
console.log(s) // Set(4) { '1', '2', '3', '4' }
//delete，删除元素
s.delete('1')
console.log(s) // Set(3) { '2', '3', '4' }
//has，检测数组中有没有某元素
console.log(`数组中有4吗：${s.has('4')}`) // 数组中有4吗：true
//clear，清空数组
// s.clear()
// console.log(s)

//for...of遍历结构
for(let v of s){
    console.log(v)
}
/*
2
3
4
*/
```

## P31 set实践
```js
let arr = [1,2,3,4,5,4,3,2,1]

//1.数组去重
let res = [...new Set(arr)];
console.log(res) // [1,2,3,4,5]
//2.交集
let arr2 = [4,5,6,4,5,6]
let res2 = [...new Set(arr)].filter(item => new Set(arr2).has(item))
console.log(res2) // [4,5]
//3.并集
let uni = [...new Set([...arr, ...arr2])]
console.log(uni) // [1,2,3,4,5,6]
//4.差集（交集取反）
let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)))
console.log(diff) // [1,2,3]
```

## P32 Map 介绍和API
:::tip
es6提供了map数据结构
* 类似于对象，也是键值对的集合
* 但是键的值不限于字符串，各种类型的值（包括对象）都可以当做键。
* Map也实现了iterator接口，可以使用【扩展运算符...】和【for。。of】进行遍历。
:::

:::tip
Map的属性和方法
* size 返回Map的元素的个数
* set 增加一个新元素，返回当前Map
* delete 传入一个键，返回
* get 返回键名对象的键值
* has 检测Map中是否包含某个元素，返回boolean值
* clear 清空集合，返回undefined
:::

:::tip
重要：map也可以接受一个数组作为参数，该数组成员是一个个表示键值对的数组
* 在ES8中为对象Object扩展了entries方法，可以将对象变为数组，成员为键值对数组
* 于是，可以为对象使用entries变为数组，然后作为map的参数，创建map
:::

```js
//声明Map
let m = new Map()

//添加属性（键可以是任何值）
m.set('name','willone')
m.set('change', ()=>{
    console.log('changechangechange')
})

let key = {
    suki:'game'
}
m.set(key, ['P5', 'Zelda', 'xb2'])
console.log(m)

//size
console.log(m.size)

//delete删除
m.delete('name')

//get获取
console.log(m.get(key))

//clear 清空
//m.clear()

//遍历
for(let v of m){
    console.log(v)
}
```