---
title: '实用npm包'
categories:
- backend
tages:
- nodejs
---

## nodemon 自动重启js文件
1. 安装
```
npm install -g nodemon
```

2. 使用
```
nodemon server.js
```

## 使用json-server搭建一个后端服务
1. 安装json server
```
npm install -g json-server
```

2. 创建一个db.json文件，并写一些data
本代码创建在了server文件夹下
```
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
}
```

3. 启动服务（在db.json目录下启动json-server服务，服务指向db.json文件）
```
json-server --watch db.json
```

## mockjs mock一个请求
1. 安装
```
npm install mockjs --save-dev
```

2. 使用
```js
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```

1. 首先在src创建mock文件夹
2. 数据写成JSON的格式
3. 把mock数据中需要的图片放到public文件夹中
4. 创建mockServe.js
5. 在main.js中引入mockServe.js