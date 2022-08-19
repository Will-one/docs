---
title: 'Express 处理跨域'
categoris:
- backend
tages:
- Express
---

## P53-P56 解决跨域问题
   1. 配置响应头
      ```js
      // P53 配置响应头解决跨域
      res.setHeader('Access-Control-Allow-Origin','*')
      ```
   2. 直接使用中间件 cors
      先npm i cors
      ```js
      const cors = require('cors')
      app.usr(cors())
      ```
   3. jsonp 用的少

## CORS响应头
   1. 响应头部中可以携带一个 Access-Control-Allow-Origin
      * 语法：
      ```
      Access-Control-Allow-Origin : <origin> | *
      ```
      * 示例：
      ```js
      res.setHeader('Access-Control-Allow-Origin','*')
      // 注意：当使用post方式发送请求带json时，请求头中会有 Content-Type = application/json 属性
      // CORS 默认不支持【详情见2】，所以需要显示的指定
      res.setHeader('Access-Control-Allow-Headers','Content-Type')
      ```

      ```js
      // 其中，origin参数的值指定了允许访问该资源的外域URL。
      // 例如，下面的字段值将只允许来自 http://itcast.cn的请求
      res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')
      ```

   2. Access-Control-Allow-Headers
      * 默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头：
         Accept、Accept-Language、Content-Language、DPR、DownLink、Save-Data、Viewport-Width、Width、
         Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded三者之一）
      * 如果客户端向服务器发送额外的请求头信息，则需要再服务器端，通过Access-Control-Allow-Headers 对额外请求头进行声明。
      ```js
      // 允许客户端额外向服务端发送 Content-Type 请求头 和 X-Custom-Header 请求头
      // 注意：多个请求头之间用逗号分隔
      res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Custom-Header')
      ```

   3. Access-Control-Allow-Methods
      * 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD请求。
      * 如果想通过 PUT、DELETE 等方式请求服务器的资源，则需要再服务器端，通过Access-Control-Allow-Methods来指明
      ```js
      // 允许 POST, GET, DELETE, HEAD
      res.setHeader('Access-Control-Allow-Methods','POST, GET, DELETE, HEAD')
      // 允许 所有HTTP请求方式
      res.setHeader('Access-Control-Allow-Methods','*')
      ```

## P55 cors的简单请求与预检请求
   1. 简单请求
      * 同时满足以下两大条件的请求，就属于简单请求：
         1. 请求方式：GET、POST、HEAD
         2. HTTP的头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、DownLink、Save-Data、Viewport-Width、Width、
         Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded三者之一）

   2. 预检请求
      * 只要符合以下任何一个条件的请求，都需要进行预检请求：
         1. 请求方式：GET、POST、HEAD之外的请求
         2. 请求头中包含自定义头部字段
         3. 向服务器发送了 application/json格式的数据

      * 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求。
      * 所以这一次的OPTION请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并携带真实数据。