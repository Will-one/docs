---
title: '中间件'
categoris:
- backend
tages:
- Express
---

## P44 中间件的概念与格式
* 什么是中间件（Middleware），特指业务流程的中间处理环节。

* express 的中间件，本质上就是一个function处理函数，Express 中间件的格式如下。
   ```js
   app.get('/', function(req, res, next){
      next()
   })
   ```
* 注意：中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req和res

### next函数的作用
next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由

## P45 中间件的作用
多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或者方法，
供下游的中间件或者路由进行使用。

### 多个全局中间件
多个全局中间件，按定义的顺序，顺序调用

## P46 局部生效的中间件
不使用 app.use() 定义的中间件，叫做局部生效的中间件，实例代码如下：
```js
// 1. 定义局部中间件
const mw1 = (req, res, next)=>{
   console.log('局部中间件')
   next()
}

// 2. 使用局部中间件
app.get('/', mw1, (req, res)=>{
   res.send('Home Page')
})
```

## P46 定义多个局部中间件
可以在路由中，通过如下两种等价的方式，使用多个局部中间件
```js
// 以下两种写法是“等价”的，任意使用
app.get('/', mw1, mw2, (req, res)=>{})
app.get('/',[mw1, mw2], (req, res)=>{}))
```

## P47 中间件使用的5个注意事项
1. 一定要在 路由之前 去注册中间件。
2. 客户端发过来的请求，可以连续调用多个中间件进行处理
3. 执行完中间件的业务代码之后，不要忘记调用 next() 函数
4. 为了防止代码逻辑混乱，调用next() 函数之后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

## P48 中间件的分类
Express 官方把常见中间件用法，分成了5大类
1. 应用级别的中间件
   * 通过 app.use((req,res,next)={}) 或者 app.get('/',mw,(req,res)=>{}) 或 app.post('/',mw,(req,res)=>{}), 绑定到app实例上的中间件，叫做应用级别的中间件

2. 路由级别的中间件
   * 绑定到express.Router()实例上的中间件，它的用法和应用级别中间件没有任何区别。
   * 只不过，应用级别是绑定到app实例上，路由级别绑定到 router实例上
   ```js
   const router = express.Router()

   // 路由全局中间件【直接帮到router上】
   router.use((req, res, next)=>{
      console.log('路由全局中间件')
      next()
   })

   // 路由局部中间件【绑定到router.get上】
   const mw1 = (req,res,next)=>{
      console.log('路由局部中间件')
   }

   router.get('/', mw1, (req, res)=>{ res.send('get 请求') })
   ```

3. 错误级别的中间件
   * 错误级别的中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目一场崩溃的问题。
   * 格式：错误级别中间件的function处理函数中，必须要与4个形参，(err, req, res, next)
   * 注意：错误级别的中间件必须注册在所有路由**之后**
   ```js
   app.use((err, req, res, next)=>{
      console.log(err.message)
      res.send('发生了错误')
   })
   ```

4. Express内置的中间件
   自 Express 4.16.0 版本开始，Express内置了3个常用的中间件。
   1. express.static - 快速托管静态资源的内置中间件，例如：HTML文件、图片、CSS样式等（无兼容性要求）
   2. express.json - 解析JSON格式的请求体数据（有兼容性要求，仅4.16.0+ 版本中可用）
   3. express.urlencoded - 解析URL-encoded格式的请求体数据（有兼容性要求，仅4.16.0+ 版本中可用）
   ```js
   app.use(express.static('前缀',资源路径))
   // 配置解析 application/json 格式数据的内置中间件
   app.use(express.json())
   // 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
   app.use(express.urlencoded({extended:false}))
   ```

5. 第三方中间件
   * 非 Express 官方内置，由第三方开发的中间件。项目中，可以按需下载并配置。
   * 例如：在 Express@4.16.0 之前，经常使用 body-parser 来解析请求体数据。步骤如下。
      1. npm i body-parser 安装中间件
      2. 使用 require 导入中间件
      3. 掉用 app.use() 注册并使用中间件
      注意：Express 内置的 express.urlencoded 中间件，就是基于body-parser封装的

## P49 自定义中间件
需求描述与实现步骤

* 自定义一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据
* 实现步骤
   1. 定义中间件
   2. 监听req的 data 事件, 来获取客户端发送到服务端的数据
   3. 监听req的 end 事件
   4. 使用querystring 模块解析请求体数据
   5. 将解析出来的数据兑现挂载为 req.body
   6. 将自定义中间件封装为模块

### 2. 监听 req 的 data 事件
* 监听req的 data 事件, 来获取客户端发送到服务端的数据。
* 如果数据量大，则客户端会将数据切片，分批发送给服务器，所以data事件可能触发多次。需要手动拼接收到的数据。
```js
// 定义变量，用来存储客户端发送的数据
let str = ''

// 监听 req 对象的 data 事件
req.on('data', (chunk)=>{
   // 拼接请求体数据
   str += chunk
})
```

### 3. 监听 req 的 end 事件
* 当请求体数据接收完毕后，会自动触发req的end事件。
* 因此，我们可以在req的end事件中，拿到并处理完整的请求体数据。实例代码如下：
```js
// 监听 req 对象的end事件
req.on('end', ()=>{
   console.log(str)
   //TODO：把字符串格式的请求体数据，解析成对象格式
})
```

### 4. 使用querystring 模块解析请求体数据
* Node.js 内置了一个 querystring【弃用】模块（可以直接用qs），专门用来处理查询字符串。
* 通过这个模块的 parse() 函数，可以把查询字符串，解析成对象的格式。
```js
// 导入 querystring 的 Node.js 内置模块
const qs = require('qs')

// 调用 qs.parse() 方法，把查询字符串解析为对象
const body = qs.parse(str)
```

### 5. 将解析出来的数据对象挂载为 req.body
* 上游的中间件和下游的中间件及路由之间，共享同一份 req 和 res。
* 因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 req.body，供下游使用。示例如下：
```js
req.on('end',()=>{
   const body = qs.parse(str)
   req.body = body
   next()
})
```
