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