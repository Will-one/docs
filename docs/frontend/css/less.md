---
title: 'Less'
categories:
- frontend
tags:
- css less
---

## 为什么使用less
css新特性也能设置变量，但是兼容性不好
```css
html{
    /* css新特性也能设置变量，但是兼容性不好 */
    --myColor:#bfa;
    --myWidth:200px;
}

.box1{
    background-color: var(--myColor);
    width: var(--myWidth);
    height: 100px;
}

.box2{
    /* 通过var(变量名)使用变量 */
    border: 3px solid var(--myColor);
    width: var(--myWidth);
    height: 100px;
}
```
less是一门css的预处理语言
- less是css的增强版，通过less可以编写更少的代码实现更强大的样式
- 在less中添加了很多新特性，想对变量的支持，对mixin的支持···

浏览器无法直接执行less代码，不需先将less编译为css，然后再有浏览器执行

## p127-p130 less常见语法
### 注释
```less
/* 多行注释会保存到编译过后生成的css文件中 */
// 单行注释只会存在于less中，不会编译到css文件中
```

### 嵌套
less文件中的样式
```less
body{
    background-color: #bfa;
    
    // 后代选择器，直接嵌套写
    .box1{
        background-color: green;
        width: 100px;
        height: 100px;
    }

    // 子元素选择器，
    >.box5{
        color: aqua;
    }
}
```
保存编译后css的对应的样式(下面不再贴出来)
```css
body {
  background-color: #bfa;
}
body .box1 {
  background-color: green;
  width: 100px;
  height: 100px;
}
body > .box5 {
  color: aqua;
}
```

### 变量 变量属性(new)
在less可以定义变量，变量中存储一个任意的值

:::tip
* 定义变量的语法：
  * @变量名:变量值;

* 使用变量的语法：
  * 作为值的时候直接 @变量名
  * 作为类名或者字符串时 @{变量名}
:::
```less
// 变量，在变量中可以存储一个任意的值

// 变量的语法：@变量名
@a:100px;
// 变量也可以是任意值，可以当做类名使用
@cName:box3;

.box2{
    width: @a;
}

// 当使用变量作为类名时，需要 @{变量名} 的形式使用
.@{cName}{
    width: @a;
    // 或者作为图片路径的一部分是，也需要 @{变量名} 的形式使用
    background-image: url("@{cName}/test.png");
}
```
:::tip
属性变量，可以使用 $属性名 ，将同一个样式中的某个属性作为变量使用
:::
```less
.box4{
    color: #bfa;
    // 当在同一个样式中，一个属性的值和另一个一样，可以使用 $属性名 即可
    background-color: $color;
}
```

### &表示父级样式
```less
.box6{
    color: #bfa;

    // & 表示外层的父元素
    &:hover{
        color: red;
    }

    // 等同于 .box6-text
    &-text{
        text-align: center;
    }    
}
```

### 扩展 extend
```less
// extend 扩展
.p1{
    width: 100px;
    height: 100px;
}

// p2的宽高和p1一样，就可以使用extend。
// 最终编译完是选择器分组的形式
.p2:extend(.p1){
    color: aliceblue;
}

.pp{
    &:extend(.p1);
    border:1px solid #bfa;
}
```

### 混入 mixins
```less
// mixin 混入
// 能复制样式，最终编译完是多个样式，不是以选择器分组的形式呈现
.p3{
    width: 100px;
    height: 100px;
}

.p4{
    // 直接使用p3的样式，可以不加（）
    .p3();
}
// 样式名后面加一个括号，创建一个mixins，编译后不保存在css文件中
// 其他样式中可以使用
.tmp(){
    width: 200px;
    height: 200px;
}

.p5{
    // 直接使用tmp的样式，可以不加（）
    .tmp();
}
```
```less
// mixins函数，带参
.text(@w:100px, @h, @color){
    width: @w;
    height: @h;
    border: 1px solid @color;
}

.p6{
    // 使用mixins带参函数的时候，每个值都需要输入，有默认值的不一定
    // 不显式的指定时，参数的值和顺序要对应
    // .text(200px, 300px, #bfa);
    // 显式指定形参参数值
    .text(@h:300px, @color:#bfa);
}
```