---
title: 'Class'
categories:
- frontend
tags:
- ES6
---

## P33 class介绍
ES6提供了Class 这个概念，作为对象模板。
* 通过class关键字，可以定义类。
* ES6的class可以看作只是一个语法糖。
```js
//固定语法
class Phone{
    constructor(brand, price){
        this.brand = brand
        this.price = price
    }
    //方法也是固定形式:方法名称(){}
    call(){
        console.log('充电五分钟，通话1分钟')
    }
}

let ip = new Phone('ip13',999)
console.log(ip)
ip.call()
```

## P34 static静态成员
```js
function Person(){}
Person.name = 'willone'//这个就属于构造函数的静态成员。创建的实例中不会包含

let p = new Person()
console.log(p)

/* 如果使用class的话，就可以使用static关键字来声明静态成员 */
class Ps{
    static type = 'human'//属于类的静态变量
} 
let p1 = new Ps()
console.log(p1)
```

## P35-P37 构造函数 和 class 继承
使用原型链实现继承
```js
function Tel(brand, price){
    this.brand = brand
    this.price = price
}
Tel.prototype.call = ()=>{
    console.log('通话')
}

function Iphone(brand, price){
    Tel.call(this, brand, price)
}

Iphone.prototype = new Tel()
Iphone.prototype.constructor = Iphone

const ip13 = new Iphone('ip13',9999)
console.log(ip13)
ip13.call()
```

使用class实现继承
```js
class SpaceStation{
    //构造方法
    constructor(name, nation){
        this.name = name
        this.nation = nation
    }
    
    //父类的成员属性
    move(){
        console.log(`${this.name} conquest is the Sea of Stars`)
    }

    fly(){
        cosole.log('父类方法')
    }
}
```

和java一样使用extends关键字继承父类
```js
class ChineseSpaceStation extends SpaceStation{
    //构造方法
    constructor(name, nation, age, size){
        //使用super调用父类的构造方法
        super(name, nation)
        this.age = age
        this.size = size
    }

    photo(){
        console.log('地球高清大头贴')
    }
    
    //只能直接重写父类的方法，根据原型链原则就近调用
    fly(){
        console.log('子类方法')
    }
}

const css = new ChineseSpaceStation('CSS', 'Chinese', 0, 'so big')
css.move()
css.photo()
css.fly()
console.log(css)
```

## P38 class 中的 getter 和 setter
```js
/* 
与ES5一样，在类的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
*/
//get和set
class Phone{
    get prop1(){
        return 'get和set在这儿有什么卵用？'
    }
    set prop1(value){
        console.log('setter '+value)
    }
}

const p = new Phone()
p.prop1 = 111
console.log(p.prop1)
```

## P62 ES11 私有属性
```js
class Person{
    //共有属性
    name
    //私有属性,前面要加#号
    #age
    #weight
    
    //构造方法
    constructor(name, age, weight){
        this.name = name
        this.age = age
        this.weight = weight
    }

    info(){
        console.log(this.age)
    }
}

const p = new Person('willone',17,'60kg')

// console.log(p.#age)//私有属性访问不了,报错
p.info()// 使用方法在内部访问
```