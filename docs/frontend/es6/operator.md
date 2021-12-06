---
title: '运算符的扩展'
categories:
- frontend
tags:
- ES6
---

## P65 ES11 链判断运算符
:::tip ?.
可选链操作符是一个很方便使用的特性
* 针对对象类型的参数，要找里面的深层次的属性
* ?. 先判断有没有传入参数，如果传入了找到里面找
免去了我们需要用 短路与&& 层层判断的麻烦事
:::

```js
function main(config){
    const dbHost = config?.db?.host
    console.log(dbHost)
}

main({
    db:{
        host:'192.168.1.1',
        port:3306,
        username:'admin',
        password:'admin'
    },
    catch:{
        host:'192.168.1.10',
        port:9201,
        username:'admin',
        password:'admin'
    }
})
```