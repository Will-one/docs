---
title: 'npm和包'
categoris:
- backend
tages:
- nodejs
---

## P26 npm 与 包
第三方开发的js模块,基于内置模块封装出来的,就是包

包的管理和下载服务:
* npm, Inc. 公司提供: https://www.npmjs.com/, 全球最大的包共享平台
* 同时提供了 https://registry.npmjs.org/, 对外共享包, 提供下载服务
* 当安装Node.js的时候, 同时也安装了npm(Node Package Manager)包管理工具, npm -v查看版本

## P28-P29 使用npm
### package.json 和 package-lock.json
package.json：
* 包管理配置文件
* 记录的是当前项目中下载了哪些包(即 npm install xx的包信息), 记录了下载的包信息(地址, 版本号等),不包含依赖包信息
* 配置哪些包只在开发期间会用到，哪些开发和部署的时候都需要
```
// 手动创建package.json
npm init -y
```

package-lock.json记录当前项目下载了哪些包以及这些包所依赖的包信息, 包括地址版本号、版本号等。主要作用有一下亮点：
* 当删除node_modules目录时，想通过npm install 恢复所有包时，提升下载速度。
* 锁定版本号，防止自动升级新版本

### 安装指定版本的包
默认安装包时，安装的都是最新版本。可以通过 @ 指定具体的版本
```
npm i moment@2.22.2
```

### 查看包的版本
查看包的所有可用版本
```
npm view 包名 versions
```
查看包最新的正式版本
```
npm view 包名 version
```

### 包的语意化版本规范
包的版本是以 ‘点分十进制’ 形式进行定义的，总共有三位数字，例如2.24.0

其中每一位数字所代表的语意含义如下：
* 第一位数字：大版本
* 第二位数字：功能版本
* 第三位数字：Bug修复版本

### npm 卸载包
```
npm uninstall 对应包
```

### devDependencies节点
如果某些包只在开发阶段用到，在项目上线后不用，则建议将包记录到devDependencies节点中

```
//安装指定的包，并记录到devDependencies 节点中
npm i 包名 -D
// 上面的命令是简写
npm install 包名 --save-dev
```

## P30 解决npm下包慢的问题
淘宝npm镜像服务器：
* 淘宝在国内搭建了一个服务器，将国外npm官方服务器的包同步到国内的服务器，在国内提供下载服务

如何使用淘宝镜像
```
// 查看当前的下包镜像源
npm config get registry

// 将下包的镜像源切换为淘宝镜像
npm config set registry=https://registry.npm.taobao.org/
```

### nrm工具
可以下载nrm工具，快速查看和切换下包额镜像源。
```
// 通过 npm 包管理器，将 nrm安装为全局可用的工具
npm i nrm -g
// 查看所有可用的镜像源
nrm ls
// 将下包镜像切换为taobao镜像
nrm use taobao
```

## P31 包的分类 & 规范包的结构
### 包的分类
1. 项目包
   哪些被安装到项目 node_modules 目录中的包，都是项目包

   项目包又分为两类，分别是：
   * 开发依赖包 （被记录到devDependencies节点中的包，只在开发期间会用到）
   ```
   npm i 包名 -D
   ```

   * 核心依赖包 （被记录到dependencies节点，开发上线都会使用）
   ```
   npm i 包名
   ```

2. 全局包
   在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包
   全局包会被安装到 c:\Users\用户目录\AppData\Roaming\npm\node_modules目录下
   ```
   npm i 包名 -g
   npm uninstall 包名 -g
   ```

3. 实用包推荐
   i5ting_toc : 是一个可以把md文档转为 html 页面的小工具，使用步骤如下
   ```
   npm install -g i5ting_toc

   // 调用，实现 md 转 html
   i5ting_toc -f md路径 -o
   ```

### 规范的包结构
一个规范的包，它的组成结构，必须符合以下3点要求
1. 包必须以单独的目录存在
2. 包的顶级目录下必须要包含 package.json 这个包管理配置文件
3. package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口

## p32 开发自己的包
1. 初始化包的基本结构
   1. 新建 willone-tools 包的文件夹，作为包的根目录
   2. 在 willone-tools 文件夹中，新建
      * package.json 包管理文件
      * index.js     包入口文件
      * README.md    包说明文件

2. 初始化 package.json
```
{
    "name": "willone-tools",
    "version": "1.0.0",
    "main": "index.js",
    "description": "格式化时间，htmlEscape功能",
    "keywords": ["willone", "dateFormat", "escape"],
    "license": "ISC"
}
```

3. 多个功能可以拆分到src目录下对应的js文件中
   1. 拆分功能并向外暴露
   2. 在index.js中导入，可以使用...扩展运算符将引入模块的对象合并为一个，再向外暴露

4. 编写包的说明文档
   包根目录中README.md文件，是包的实用说明文档。通过它，可以事先把包的使用说明，以markdown的格式写出来。

   README 文件中具体写什么内容，没有强制性的要求，只要能够清晰地把包的作用、用法、注意事项等描述清楚即可

## P36 发布npm包
1. 注册npm账号
2. 在终端中登录npm
   执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功
3. 把包发布到 npm 上
   将终端切换到包的根目录之后，运行 npm publish 命令，即可将包发布到npm上（注意：包名不能雷同）

4. 删除已发布的包
   运行 npm unpublish 包名 --force 命令，即可从npm删除已发布的包

   注意：
   1. npm unpublish 命令只能删除72小时以内发布的包
   2. npm unpublish 删除的包，在24小时内不允许重新发布
   3. 发布包的时候要慎重，尽量不要往 npm上发布没有意义的包
