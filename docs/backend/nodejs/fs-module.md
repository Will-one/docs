---
title: 'fs模块'
categoris:
- backend
tages:
- nodejs
---

## P6 fs - 读取文件内容

1. 什么是fs模块

​		fs模块是nodejs官方提供的，用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求

```
fs.readFile()方法，用来读取指定文件中的内容
fs.writeFile()方法，用来向指定的文件中写入内容
```



2. 在js代码中，想要使用fs模块来操作文件，则需要先导入

```js
const fs = require('fs')
```

```js
// 1. 导入fs模块,操作文件
const fs = require('fs')

// 2. 调用 fs.readFile() 方法读取文件
//    参数1: 读取文件的存放路径
//    参数2: 读取文件时候采用的编码格式 一般指定utf8
//    参数3: 回调函数, 拿到读取失败和成功的结果 err dataStr
fs.readFile('./text.txt','utf8',function(err,dataStr){
    // 2.1 打印失败的结果
    // 如果读取成功,则err的值为null
    // 如果读取失败,则err的值为错误对象,dataStr的值为 undefined
    console.log(err)
    console.log('----')
    // 2.2 打印成功的结果
    console.log(dataStr)
})
```



3. 判断文件是否读取成功

   可以判断err对象是否为null，从而判断文件的读取结果

```js
const fs = require('fs')

fs.readFile('./text.txt','utf8',function(err,dataStr){
		if(err){
			  return  console.log('文件读取失败' + err.message)
		}

    console.log('文件读取成功' + dataStr)
})
```

## P7 fs - 写入文件内容
1. fs.writeFile()的语法格式
使用fs.writeFile()方法,可以向指定的文件中写入内容,语法格式如下:
```js
fs.writeFile(file, data[, options], callback)
```
参数解读:
* 参数一: 必选参数,需要指定一个文件路径的字符串,表示文件的存放路径.
* 参数二: 必选参数,表示要写入的内容.
* 参数三: 可选参数,表示以什么格式写入文件内容,默认值是uft8
* 参数四: 必选参数,文件写入完成后的回调函数

注意:
   fs.writeFile() 只能用来创建文件,不能用来创建目录
   对于同一文件, fs.writeFile() 写入的新内容会覆盖旧内容.

## P9 fs - 路径动态拼接的问题
问题: 在使用fs模块操作文件的时候,如果提供的操作路径是以 ./ 或 ../开头的相对路径时,很容易出现路径动态拼接错误的问题

原因: 代码在运行的时候,会以执行node命令时所在的目录,动态拼接处被操作文件的完整路径

解决方式一: 可以直接提供一个完整的文件存放路径 [移植性差,不利于维护]
```js
const fs = require('fs')

fs.readFile('/Users/wangzixuan/workspace/nodejs_lesson/p06-p09_fs模块/1.txt','utf8',function(err,data){
    if(err){
        console.log('读取失败'+err.message)
    }
    console.log('完整路径读取成功'+data)
})
```

解决方式二: node提供了 __dirname 变量表示当前文件所在的目录
```js
const fs = require('fs')

fs.readFile(__dirname + '/1.txt','utf8',function(err,data){
    if(err){
        console.log('读取失败'+err.message)
    }
    console.log('完整路径读取成功'+data)
})
```
