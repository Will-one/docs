---
title: 'path模块'
categoris:
- backend
tages:
- nodejs
---

## P10 path路径模块
1. path简介
   path模块是Node.js官方提供的, 用来处理路径的模块.它提供了一系列的方法和属性,用来满足用户对路径的处理需求

   例如:
   * path.join()方法, 用来将多个路径片段拼接成一个完整的路径字符串
   * path.basename()方法,用来从路径字符串中,将文件名解析出来

   如果要在JavaScript代码中,使用path模块来处理路径,则需要使用如下的方式先导入它
   ```js
   const path = require('path')
   ```

2. path.join()路径拼接
   使用path.join()方法,可以把多个路径片段拼接为完整的路径字符串,语法格式如下:
   ```js
   path.join([...paths])
   ```
   参数解读:
   * ...paths 多个路径片段,String类型
   * 返回值: String
   ```js
   // 路径 c 被后面的 ../ 抵消
   const pathStr = path.join('/a','/b/c','../','d/,'e')
   console.log(pathStr) // 输出 \a\b\d\e
   
   const pathStr2 = path.join(__dirname, '/1.txt')
   ```

   注意: 今后凡是涉及到路径拼接的操作, 都要使用path.join() 方法进行处理.不要直接使用 + 进行字符串的拼接

3. path.basename() 获取路径中文件名
   使用path.basename()方法, 可以获取路径中的最后一部分,通常通过这个方法获取对应路径下的文件名
   ```js
   path.base(path[,ext])
   ```
   参数解读:
   * path <string> 必选参数,表示一个路径的字符串
   * ext <string> 可选参数, 文件的扩展名
   * 返回 <string> 路径中的最后一部分

   代码示例
   ```js
   const fpath = 'a/b/c/index.html' //文件存放路径
   
   var fullName = path.basename(fpath)
   console.log(fullName)// 输出 index.html
   
   // 不希望返回扩展名,可以传入第二个参数扩展名
   var nameWithoutExt = path.basename(fpath, '.html')
   console.log(nameWithoutExt) //输出 index
   ```

4. path.extname() 获取路径中的文件扩展名
使用 path.extname()方法,可以获取路径中的扩展名部分,语法格式如下:
```js
path.extname(path)
```
参数解读:
* path <string> 必选参数,表示一个路径的字符串
* 返回: <string> 返回得到的扩展名字符串

   代码示例
   ```js
   const fpath = 'a/b/c/index.html' //文件存放路径
   
   var fext = path.extname(fpath)
   console.log(fext)// 输出 .html
   ```

