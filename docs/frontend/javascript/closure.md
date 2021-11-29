---
title: '闭包'
categories:
- frontend
tags:
- javascript
- closure
---

## P29 引子：循环遍历监听
```html
<button type="button">按钮1</button>
<button type="button">按钮2</button>
<button type="button">按钮3</button>

<script type="text/javascript">
    // 获取按钮列表
    var btnlist = document.getElementsByTagName("button")
    // 伪数组长度每次都要计算，length = btnlist.length提高效率
    for(var i = 0,length = btnlist.length; i < length; i++){
        //闭包的应用
        (function(i){
            btnlist[i].onclick = function(){
                alert(btnlist[i].innerHTML)
            }
        })(i)
    }
</script>
```

## P30 理解闭包
:::tip
1. 如何产生闭包？
:::
* 当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量（函数）时，就产生了闭包
:::tip
2. 闭包到底是什么？
:::
* 使用 chrome 调试中打断点查看
* 理解一：闭包是嵌套的内部函数
* 理解二：包含被应用变量（函数）的对象
* 注意：闭包存在于被嵌套的内部函数中
:::tip
3. 产生闭包的条件
:::
* 函数嵌套
* 内部函数引用了外部函数的数据（变量/函数）
```js
function fn1(){
    var a = 2
    var b = "abc"
    function fn2(){ // 执行函数定义就会产生闭包
        console.log(a) // 调用了外部函数的属性，产生了闭包
    }
    fn2()
}
fn1()
```
---

## P31 常见的闭包
:::tip
1. 将函数作为另一个函数的返回值
:::
```js
function fn1(){
    var a = 2
    function fn2(){
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1()
f() // 3
f() // 4
```
:::tip
2. 将函数作为实参传递给另一个函数调用
:::
```js
function showDelay(msg, time){
    setTimeout(function(){
        alert(msg) // 内部匿名函数调用了外部函数的msg，形成了闭包
    },time)
}
showDelay('willone', 2000)
```
---

## P32 闭包的作用
1. 使函数内部的变量在函数执行完后，仍然存活在内存中（延长了局部变量的生命周期）
2. 让函数外部可以操作（读写）到函数内部的数据（变量/函数）
```js
/* 1.将函数作为另一个函数的返回值 */
function fn1(){
    var a = 2
    function fn2(){
        a++
        console.log(a)
    }
    return fn2
}

var f = fn1() // 执行完后，其实变量 fn2 已经被释放，只是因为 f 指向了堆中的函数对象，所以函数对象没有成为垃圾对象
f() // 3
f() // 4
```

> QA
> 1. 函数执行完后，函数内部声明的局部变量是否还存在？
> :::warning
> * 一般不存在，存在于闭包中的变量才可能存在
> :::
> 2. 在函数外部能直接访问函数内部的局部变量吗？
> :::warning
> * 不能，但可以通过闭包让外部操作
> :::
---

## P33 闭包的生命周期
1. 产生：在 嵌套内部函数定义 执行完时就产生了（不是在调用后才产生）
2. 死亡：在 嵌套的内部函数 成为垃圾对象时
```js
function fn1(){
    var a = 2
    function fn2(){
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1() // 一：产生。在调用fn1时产生，创建函数执行上下文时就产生了
f()//3
f()//4
f = null // 二：死亡。闭包死亡（包含闭包的函数对象成为垃圾对象的时候）
```
---

## P34 闭包应用-自定义 JS 模块
:::tip 自定义 JS 模块
* 具有特定功能的 JS 文件
* 将所有数据和功能都封装在一个函数内部（私有）
* 只向外暴露一个 包含 n 个方法的对象或函数
* 模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能
:::

:::tip
示例一
:::
```js
// myModule.js
// 方式一，使用时要先执行函数
function myPlan(){
	// 私有数据
	var msg = "Time to go"
	// 操作数据的函数
	function showMsg(){
		console.log("showMsg(): " + msg.toUpperCase()) // 利用到了闭包
	}
	function changePlan(){
		console.log("changPlan(): " + msg + " go go") // 利用到了闭包
	}
	
	// 向外暴露对象（给外部使用的方法）
	return {
		showMsg:showMsg,
		changPlan:changePlan
	}
}
```
```js
// 使用模块
// 方式一，先调用函数
var plan = myPlan()
plan.showMsg()
plan.changPlan()
```

:::tip
示例二
> IIFE 立即执行函数
:::
```js
// myModule2.js
// 方式二，使用IIFE
(function(window){ // 传入的实参window。用形参接收，利于形参实现代码压缩。
	// 私有数据
	var msg = "Time to go"
	// 操作数据的函数
	function showMsg(){
		console.log("showMsg2(): " + msg.toUpperCase()) // 利用到了闭包
	}
	function changePlan(){
		console.log("changPlan2(): " + msg + " go go") // 利用到了闭包
	}
	
	window.plan2 = {
		showMsg:showMsg,
		changPlan:changePlan
	}
})(window)
```
```js
// 使用模块
/* 方式二，使用IIFE，直接就可以使用 */
plan2.showMsg()
plan2.changPlan()
```
