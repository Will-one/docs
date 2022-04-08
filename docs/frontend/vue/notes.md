---
title: '知识点笔记'
categories:
- frontend
tags:
- vue
---

## 组件间通信
### 1. props
* 使用场景：父子组件通信
* 注意事项：如果父组件给子组件传递的函数类数据：子组件调用时本质是向父组件传递数据
* 书写方式：
```js
// 第一种
["todos"]

// 第二种
{
    todos:Array
}

// 第三种
{
    todos:{
        type:Array,
        required:true
    }
}
```
* 路由也可以传递props参数
在路由js文件的具体配置中书写
```js
// Boolean写法
// 会将路由的params参数作为props参数传递，在目标页面要对应引入props参数
{
    path:xxx,
    conponent:xxx,
    props:true
}

// 对象写法
// 在目标页面要对应引入props参数
{
    path:xxx,
    conponent:xxx,
    props:{
        a:1,
        b:2
    }
}

// 函数写法
// 可以将params参数、query参数，通过props传递给路由组件
{
    path:xxx,
    conponent:xxx,
    props:($route)=>{
        return {keyword:$route.params.keyword, k:$route.query.k}
    }
}
```

### 2. 自定义事件
* 使用场景：子组件给父组件传递数据
* $on 与 $emit

### 3. 全局事件总线
```js
Vue.prototype.$bus = this
......
this.$bus.$on('getMsg',this.getMsg)
this.$bus.$emit('getMsg')
this.$bus.$off('getMsg')
```

### 4. pubsub-js
* pubsub在React框架中使用多

### 5. vuex
常用
### 6. 插槽slot
* 默认插槽 具名插槽 作用域插槽

## v-model 深入
* v-model 实现原理
::: tip
v-model等价于：在表单类元素上通过 绑定value 和 事件input 实现
* v-on:value 或者 :value 数据绑定
* @input在每次输入改变时【不用失焦】调用

两者配合使用的效果和 **v-model** 一样
:::
```html
<input type="text" v-model="msg" />
<!-- 等价于 -->
<input
    :value="msg" 
    @input="msg = $event.target.value"
/>
```
* v-model 拓展运用到组件上
::: warning
由上可引出一种用法，在组件中也可以使用v-model
* 组件实例上的 :value 和 @input，不再是数据绑定和原生event，而是props参数和自定义事件
* 于是可以用v-model替代组件实例上的:value 和 @input，同样可以实现父子组件的数据同步
:::
``` html
<!-- 
使用: value 和 @input 
-->

<!-- 父组件中使用子组件 :value 和 @input 是 props参数 和 自定义事件 -->
<!-- $event接受子组件抛出的值 -->
<CustomerInput :value="msg" @input="msg = $event" />

<!-- 子组件中实现 接收了props参数value -->
<!-- 子组件中 $emit 的第二个参数可以将一个值抛出，在父组件中以 $event 或者方法中的形参接收 -->
<input :value="value" @input="$emit('input',$event.target.value)">
```
``` html
<!-- 
使用: v-model 
-->

<!-- 父组件中使用子组件 在组件上使用v-model，相当于使用了:value 和 @input -->
<CustomerInput v-model="msg" />

<!-- 子组件中实现 同样要接收props参数value -->
<input :value="value" @input="$emit('input',$event.target.value)">
```

## sync 属性修饰符
::: warning 说明
* 对于一个由父组件传递给子组件的值，子组件修改后，父组件也要变。类似于在组件上使用v-model，但是v-model一般运用在子组件也是表单元素的情况，它的回调是input。
* 这个时候就可以使用sync这个属性修饰符
:::
* 父组件中两种等价写法，子组件里面props $emit("update:num",num++)该咋写咋写

```html
{{num}}
<!--.........-->

<Child :num="num" @update:num="num = $event" /><!-- 对于props参数‘双向绑定’的自定义函数名称形式：update:attrName -->
<!-- 等价于 -->
<Child :num.sync="num"/>
```
::: danger :num.sync
* 第一：父组件给子组件传递 props num
* 第二：在子组件上绑定了一个自定义事件，而且事件名称(约定)即为 **update:num**
:::

## $attrs 和 $listeners
* $attrs是组件实例对象上的一个属性，可以获取到父组件传递过来的props数据
* 对于子组件来说，如果父组件给的props参数通过子组件的props配置接收了，那么在$attrs里面就没有了（此消彼长）
* $listeners也是组件实例对象上的一个属性，可以获取到父组件给子组件上绑定的自定义事件
```html
<!-- 以下写法绑定了所有的props参数和自定义事件。必须写v-bind和v-on (自定义事件有参时，还是使用$emit) -->
<el-button v-bind="$attrs" v-on="$listeners" />
```

## $children 和 $parent
* 在Vue组件中可以通过ref属性获取子组件，因此就可以操作子组件的数据与方法
* $children可以获得当前组件上的所有子组件（是个数组，但是不要$children[0]这么用），可以使用forEach操作每一个子组件实例对象
* $parent可以获取到组件的父组件，可以操作父组件的数据与方法
  
## 混入mixin
* 项目中出现很多结构类似功能，组件复用
* 如果是很多组件中的js逻辑类似，mixin【复用多个组件中js重复的部分】

## 作用域插槽 scope-slot
1. 待处理展示的数据最终体验在子组件【不管是子组件自己请求的或者父组件先传给了子组件】
2. 子组件不决定数据的展示结构，只在对应位置放置插槽
```html
<!-- 该写法将数据回传给父组件 -->
<slot :参数名="数据源"></slot>
```
3. 父组件接收到数据，并决定具体结构 
```html
<子组件>
    <template scope="数据">
        **具体结构**
    </template>
</子组件>
```

## 注意对象之间赋值的问题
* 对象直接赋值给另一个参数，那么两个参数就指向同一个地址，此时通过其中一个参数进行的修改，将会影响到使用这个对象的所有地方
* 此时可以用对象扩展解构后再赋值，避免这个问题 
```js
// (浅拷贝)
let obj2={...obj1}
```

* 对于数据比较复杂的情况，比如对象里面又有对象，有数组对象等等，浅拷贝就不行了，要用深拷贝(用lodash)。

手写浅拷贝和深拷贝
```js
let obj = {a:1,b:2}
let newobj = JSON.parse(JSON.stringify(obj))
```
```js
// 循环遍历
export const deepCopy = (obj)=>{
    if(typeof obj != 'object'){
        return obj
    }

    var newObj = {}
    obj.forEach(item=>{
        newObj[item] = deepCopy(obj[item])
    })

    return newObj
}
```

## 字符串方法trim
* string.trim() 移除字符串守卫空白

## 数组遍历some()
* 遍历的数组元素中，至少有一个满足回调函数就返回true

## 为响应式数据添加新字段的时候注意确保他是响应式的
* 可以使用Vue.set()
* 对于数组元素的话，push设计好可以被检测到的修改

## 父组件调用子组件
* 可以在调用子组件处绑定 ref属性
* this.$refs.子组件 就可以获取到子组件的实例对象。
* 通过获取子组件的实例对象，就能访问和调用子组件的数据和方法
::: tip 实际运用
需要点击父组件中的按钮，触发子组件的接口调用。
此时将接口调用写在子组件的mounted是错误的，可以在父组件中通过ref属性获取子组件实例来调用封装请求的函数
:::

## 数组的map方法
map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。


## vue清理数据技巧
```js
// 清理数据【小技巧】
// Object.assign 是ES6中新增的方法，可以合并对象
// 组件实例this._data 可以操作data中的响应式数据
// 而this.$options可以获取组件的配置对象，this.$options.data()就调用了data配置对象【本来就return一个对象】
// 用this.$options.data()返回的配置对象合并了
Object.assign(this._data,this.$options.data())
Object.assign(this._data,this.$options.data.call(this))
```

## reduce
reduce函数可以接收一个回调函数作为累加器,第二个参数接受初始值
```js
// 空数组就是prev的初始值。
// 回调的第一个参数prev是初始值获取计算后的返回值
let TEMArr = arr.reduce((prev,item)=>{
    item.id...
    ...
    prev.push(...)
    
    return prev
},[])
```

## 深度选择器
### 先说下scope的作用
* 对于某一个组件，如果style添加上scoped属性，会给当前组件的结构都添加上一个 data-v-xxx的自定义样式。
* 审查元素的时候可以看到vue是通过属性选择器 例如 h3[data-v-xxx] 来给组件中的元素添加上样式的。
* 子组件的根节点（也拥有父组件中因为scoped而添加上的自定义属性）。如果子组件的根节点标签和父组件中样式相同，也会添加上相应样式。
```js
// 父组件
<template>
    <div>
        <h3>父组件</h3>
        <child/>
    </div>
</template>
<style scoped>
h3{
    color:red;
}
</style>
```
```js
// 子组件在这种情况下也会体现h3的样式
<template>
    <h3>子组件</h3>
</template>
```

* 如果父组件的样式scoped，想要彻底能够影响到子组件。这种情况我们可以使用深度选择器
::: tip 
* 原生css >>>
* less /deep/
* scss ::v-deep
:::
