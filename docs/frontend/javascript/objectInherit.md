---
title: '对象创建与继承模式'
categories:
- frontend
tags:
- javascript
- inherit
---

## P37 对象创建模式
:::tip 方式一：Object构造函数模式
* 方式：先创建空Object对象，再动态添加属性、方法
* 适用场景：起始时不确定对象内部数据
* 问题：语句太多
:::
```js
var p = new Object()
p.name = 'willone'
p.age = 3
```

:::tip 方式二：适用函数字面量创建
* 问题：创建多个对象，代码重复
:::
```js
var p2 = {
    name:'willone',
    age:3
}
```

:::tip 方式三：工厂模式创建对象
:::
```js
function Person(name, age ,gender){
    this.name = name
    this.age = age
    this.gender = gender
}
Person.prototype.setAge = function (age){
    this.age = age
}
var p3 = new Person('willone', 3 ,'男')
console.log(p3)
p3.showNation = function(){
    console.log("chinese")
}
```
---

## P38 原型链继承
:::tip 方法
1. 定义父类型构造函数
2. 给父类型的原型添加方法
3. 定义子类型的构造函数
4. 创建父类型的对象 赋值给 子类型的原型
5. 将子类型原型的构造属性设置为子类型
6. 给子类型原型添加方法
7. 创建子类型的对象：可以调用父类型的方法
:::

:::tip 关键
1. 子类型的原型为父类型的一个实例
:::

```js
/* 1.父类型 */
function Animal(name, age, moveType){
    this.name = name
    this.age = age
    this.moveType = moveType
}
/* 2.父类型方法 */
Animal.prototype.move = function(){
    console.log(this.name+" can "+this.moveType)
}

/* 3.子类型 */
function Dog(name, age, moveType){
    this.name = name
    this.age = age
    this.moveType = moveType
}

/* 4.子类型原型指向父类型的一个实例 */
Dog.prototype = new Animal()
/* 5.将重新指定后的子类型原型的constructor指向子类型 */
Dog.prototype.constructor = Dog
/* 6.子类型方法 */
Dog.prototype.smile = function(){
    console.log(this.name+" can smile")
}

var qt = new Dog("秋田", 2, "run")
qt.move()
qt.smile()
```

## P38 借用构造函数继承（伪）
:::tip 方法
1. 定义父类型的构造函数
2. 定义子类型的构造函数
3. 在子类型构造函数中调用父类型构造
:::
:::tip 关键
1. 在子类型构造函数中通过 call() 调用父类型构造函数
:::
```js
function Person(name, age){
    this.name = name
    this.age = age
}
function Student(name, age, score){
    Person.call(this, name, age)
    this.score = score
}
var s = new Student('willone', 3, 100)
console.log(s)
```
---

## P39 组合继承
:::tip 原型链+借用构造函数的组合继承
1. 利用原型链实现对父类型对象的方法继承
2. 利用call()借用父类型构造函数初始化相同的属性
:::
```js
function Person(name, age){
    this.name = name
    this.age = age
}
Person.prototype.setName = function (name){
    this.name = name
}
function Worker(name, age, time){
    Person.call(this, name, age) // 为了使用父类型的属性
    this.time = time
}
Worker.prototype = new Person() // 为了能看到父类型方法
Worker.prototype.constructor = Worker // 修正constructor属性
Worker.prototype.showMsg = function (time){
    if (!time){
        console.log('lying flat')
    }else{
        console.log('life good')
    }
    
}

var s = new Worker('willone',3,0)
s.setName('william')
s.showMsg(0)
console.log(s)
```