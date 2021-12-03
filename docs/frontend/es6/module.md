---
title: 'Module的语法'
categories:
- frontend
tags:
- ES6
---

## P41-P44 模块化介绍
:::tip
模块化
* 模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小的文件组合起来

模块化的好处
* 防止命名冲突
* 代码复用
* 高维护性

模块化规范产品

ES6之前的模块化规范有:
* CommonJS => NodeJS、Browserify
* AMD      => requireJS
* CMD      => seaJS

ES6的模块化语法 export和import
* export 命令用于规定模块的对外接口
* import 命令用于输入其他模块提供的功能
:::

```js
<script type="module">
    /*************2.引入模块*************/
    /* 2.1 通用引入形式：import * as 变量 from URL */
    
    // //暴露方式1：分别暴露
    // import * as p42 from '../js/P42.js'
    // console.log(p42)

    // //暴露方式2：统一暴露，引入P43的内容
    // import * as p43 from '../js/P43.js'
    // console.log(p43)

    // //暴露方式3：默认暴露，引入P43-2的内容
    // import * as p43_2 from '../js/P43-2.js'
    // console.log(p43_2)

    /* 2.2 结构赋值形式引入：import * as 变量 from URL */
    // import {school, teach} from '../js/P42.js'//应对分别暴露
    // import {school as ScName, teach as xuexi} from '../js/P43.js'//应对统一暴露，有重名可以用别名
    // import {default as m3} from '../js/P43-2.js'
    // console.log(ScName)
    // console.log(xuexi)
    // console.log(m3)

    /* 2.3 简便形式：只能针对默认暴露（常用，vue也常用） */
    import m3 from '../js/P43-2.js'
    console.log(m3)
</script>
``` 