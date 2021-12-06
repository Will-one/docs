---
title: '前言'
categories:
- frontend
tags:
- axios
---

::: tip
以下笔记主要由个人整理自 [尚硅谷 JavaScript 基础教程](https://www.bilibili.com/video/BV1wr4y1K7tq) 、 和 [axios github地址](https://github.com/axios/axios) 。
:::

## 提前了解

### 前置知识
* Promise
* AJAX

### 使用 json-server 搭建一个后端服务
1. 安装json server
```
npm install -g json-server
```

2.  创建一个db.json文件，并写一些data
本代码创建在了server文件夹下

3. 启动服务（在db.json目录下启动json-server服务，服务指向db.json文件）
```
json-server --watch db.json
``` 

db.json示例,随意添加
```js
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    },
    {
      "id": 2,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    },
    {
      "body": "新加评论",
      "postId": 2,
      "id": 2
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

### 引入 axios
去github里面看