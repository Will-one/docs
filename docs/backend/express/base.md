---
title: '基本使用'
categoris:
- backend
tages:
- Express
---


## P39 监听get和post请求 并 处理参数
### 监听get和post请求
```js
// 参数1：客户端请求的 URL 地址
// 参数2：请求对应的处理函数
//      req：请求对象（包含了请求相关的属性与方法）
//      res：响应对象（包含了响应相关的属性与方法）
app.get('请求URL', (req, res)=>{
   res.send({...})
})

app.post('请求URL', (req, res)=>{
   res.send({...})
})
```

### 获取 URL 中携带的查询参数
通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务端的参数
```js
app.get('/free',(req,res)=>{
   // req.query 默认是一个空对象
   // 客户端使用 ？ name=willone&age=18 这种查询字符串形式，发送到服务器的参数
   // 通过 req.query 对象可以访问，例如：req.query.name  req.query.age
   console.log(req.query)
})
```

### 获取 URL 中携带的params参数
通过 req.params 对象，可以访问到客户端通过params的形式，发送到服务端的参数
```js
//路径里面用 :id 占位
app.get('/article/:id',(req,res)=>{
    // req.params 默认是一个空对象
    // 客户端使用 /article/5 
    // 通过 req.params 对象可以访问，例如：req.params.id
    res.send(`文章1,对应id是${req.params.id}`)
 })
```

## P40 静态资源处理
1. 托管静态资源
   1. express.static()
      * express 提供了一个非常好用的函数，express.static(), 通过它，可以非常方便的创建静态服务器。
      * app.use() 的作用就是注册全局中间件
      * 例如：通过如下代码就能将public 目录下的图片、css文件、JavaScript文件对外开放访问。
      ```js
      app.use(express.static('public'))
      ```

      注意：Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录并不会出现在URL中

2. 托管多个静态资源
   1. 如果要托管多个静态资源目录，多次调用express.static() 函数
      ```js
      app.use(express.static(path.join(__dirname ,'./clock')))
      app.use(express.static(path.join(__dirname ,'./clock2')))
      ```
      访问静态资源文件时，express.static()函数会更具目录的添加顺序查找所需的文件。

3. 挂载路径前缀
   1. 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式【可以防止他人知道目录结构】：
   ```js
   // http://localhost/public/
   app.use('/public', express.static(path.join(__dirname ,'./clock')))
   ```

## P41 使用nodemon
nodemon可以监听项目文件的变动，当代码被修改后，nodemon会自动重启项目，方便开发和调试
```
npm i nodemon -g
```

使用
```
nodemon webServer.js
```

## P42 express中的路由
### 简介
在 Express 中 路由指客户端请求与服务器处理函数之间的映射关系。
```
app.get('请求的URL地址',处理函数)
app.post('请求的URL地址',处理函数)
```

### 路由匹配过程
1. 按照定义的先后顺序进行匹配
2. 请求类型 和 URL 同时匹配成功，才会调用对应的处理函数

## P43 express 路由模块化
为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到app上，而是推荐将路由写成单独的模块
1. 创建路由模块对应的 .js 文件
2. 调用 express.Router() 函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用 module.exports 向外共享路由对象
5. 使用 app.use() 函数注册路由模块，它的作用就是注册全局中间件

### 为路由模块添加访问前缀
类似于 托管静态资源时，为静态资源统一挂载访问前缀一样。
```
// 导入路由模块
const userRouter = require('./router.js')

// 使用 app.use() 注册路由模块，并添加统一的访问前缀 /api
app.use('/api', userRouter)
```
