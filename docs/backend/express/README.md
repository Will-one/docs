---
title: '简介'
categoris:
- backend
tages:
- Express
---

## P38 express简介和基本使用
### Express简介
1. 什么是express
   * Express 是基于 Node.js ,的 web 开发框架
   * Express 的作用和 Node.js 内置的模块类似，是专门用来创建Web服务的。
   * Express 的本质就是一个npm上的第三方包，提供了快速创建Web服务器的便捷方法。

2. 进一步理解
   1. 问：不使用Express能否创建web服务器？
      答：能，使用 Node.js 提供的原生 http 模块即可。

   2. 问：有了http模块，为什么还要用 Express?
      答：http 内置模块用起来很复杂，开发效率低。Express 是基于内置 http 模块进一步封装出来的。
 
3. Express 能做什么
   对于前端来说，最常见的两种服务器，分别是：
   * Web 网站服务器：专门对外提供Web网页资源的服务器
   * API 接口服务器：专门对外提供API接口的服务器
   
   使用 Express，我们可以方便快捷的创建 Web 网站服务器或 API 接口服务器


### Express 基本使用
1. 安装
   ```
   npm i express@4
   ```

2. 创建基本的Web服务器
   ```js
   // 导入 express
   const express = require('express')

   // 创建 web 服务器
   const app = express()

   // 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
   app.listen(80,()=>{
      console.log('express server running at http://127.0.0.1')
   })
   ```