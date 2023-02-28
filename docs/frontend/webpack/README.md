---
title: 'webpack'
categories:
- frontend
tages:
- webpack
---

## P4 webpack初体验
以一个文件夹作为工程目录
1. npm init -y 初始化一下生成一个package.json文件
2. 全局安装npm i webpack webpack-cli -g  可以全局调用webpack命令
3. 本地安装npm i webpack webpack-cli -D  本地安装后在工程目录生成node_modules文件夹和package-lock.json
4. 自己新建src项目源代码目录和build打包输出的目录

最后 npx webpack 就可以打包资源了

## P5 webpack的五个核心概念
1. Entry：指示Webpack以哪个文件为入口起点开始打包，分析构建内部依赖图
2. Output：打包后的资源bundles输出到哪里去，以及如何命名
3. Loader：让webpack能够去处理非JavaScript文件（webpack本身只理解js）
4. Plugins：插件（Plugins）可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等
5. mode：指示webpack使用相应模式的配置（development or production）


## P7 开发模式简介
开发模式顾名思义就是开发代码时使用的模式。这个模式下主要做两件事
1. 编译代码。使浏览器能识别运行
    * 开发时我们有样式资源、字体图标、图片资源、html资源等。
    * webpack默认都不能处理这些资源，所以需要加载配置来编译这些资源
2. 代码检查，树立代码规范
    * 提前检查代码的一些隐患，让代码运行时更加健壮。
    * 提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观

## P8 - P11 处理css less sass stylus资源
webpack默认是不能处理css资源的
1. 查看webpack官网，要处理打包什么资源，就下载对应的loader
2. 在 webpack.config.js 中添加对应的配置

## P12 处理图片资源
* 在 Webpack4 时，我们处理图片资源通过 File-loader 和 url-loader 进行处理
* 现在 Webpack5 已经将两个Loader 功能内置到 Webpack里了。甚至不需要配置都能处理图片
* 我们可以做一些优化，减少请求数量。只需要简单配置即可将小图片转化为base64格式。
```js
{
    test: /\.(png|jpe?g|gif|webp)$/,
    type: "asset",
    parser: {
        dataUrlCondition: {
            //小于 10kb 的图片转base64
            //有点：减少请求数量 缺点：体积会变大
            maxSize: 10 * 1024,
        }
    }
}
```

## P13 修改输出文件目录
* 修改入口文件输出的名称 和 目录
    ```js
    output:{
        //入口文件输出的文件名
        filename:'static/js/index.js',

        // 输出的路径 path.resolve 返回绝对路径
        // __dirname是nodejs的变量，代表当前文件的目录
        path:resolve(__dirname,'dist')
    }
    ```

* 定义图片输出的名称 和 目录
    ```js
    {
        ......
        // 图片的输出
        generator: {
            // 输出图片的名称
            // [hash:10] hash太长的话，可以这么写，取前10位
            filename: "static/images/[hash:10][ext][query]"
        }
    }
    ```

## P14 自动清空上次打包内容
* 在 Webpack4 中需要配置 clean-webpack-plugin
* 在 Webpack5 中直接在output里面写配置clean就可以了
```js
output:{
    // ......
    // 自动清空上次打包结果
    clean: true
}
```

## P15 处理字体图标资源
1. 找图标通常可以从阿里的 iconfont 找。
2. 登录选完后，添加到项目。根据不同的用法选择引入不同的文件
3. 想要自定义引入的ttf，woff，woff2文件的打包位置，需要进行配置。
```js
// 处理字体图标的 详细配置
{
    test:/\.(ttf|woff2?)$/,
    type:"asset/resource",//不会转base64
    // 图标字体文件的输出
    generator: {
        // 输出的名称
        // [hash:10] hash太长的话，可以这么写，取前10位
        filename: "static/media/[hash:10][ext][query]"
    }
}
```

## P16 处理其他的资源
* 某些情况下，可能存在一些特殊的资源也需要打包，比如音频，视频等
* 此时，可以将其都使用 type:'asset/resource' 原封不动的打包到media目录下。
```js
{
    // 原本处理字体图标的 其他资源也可以在里面添加
    test:/\.(ttf|woff2?|mp3|mp4)$/,
    type:"asset/resource",//不会转base64
    // 图标字体文件的输出
    generator: {
        // 输出的名称
        // [hash:10] hash太长的话，可以这么写，取前10位
        filename: "static/media/[hash:10][ext][query]"
    }
}
```


## P17 处理 js 资源
问：js资源 Webpack 已经处理了，为什么还要处理

答：
* Webpack 对 js 处理是有限的，只能编译js中的es模块化语法，不能编译其他语法 [诸如箭头函数依然存在]，导致 js 不能在 IE 等浏览器运行。
* 其次开发中，团队对代码格式是有严格要求的，需要使用工具检查代码。

故：
* 针对js兼容性处理，我们使用Babel
* 针对代码格式，我们使用Eslint
* 先使用Eslint，检查代码格式无误后，再由 Babel做代码兼容性处理

## P18 eslint 介绍
可组装的 JavaScript 和 jsx 检查工具。可组装意思是可以配置各项功能。

使用eslint，关键是写eslint配置文件，里面加上各种rules。

### 配置文件
配置文件有很多种写法，区别在于格式不同：
.eslintrc
.eslintrc.js
.eslintrc.json

以 .eslintrc.js 为例
```js
module.exports = {
    // 解析选项
    parserOptions:{},
    // 具体检查规则
    rules:{},
    extends:[],
    // ...
    // 其他规则详见：https://eslint.org/
}
```

1. parserOptions 解析选项
    ```js
    parserOptions:{
        ecmaVersion: 6, // es 语法版本
        sourceType:"module",// es 模块化
        ecmaFeatures:{// ES 其他特性
            jsx:true // 如果是react项目，就需要开启jsx语法
        }
    }
    ```

2. rules 具体规则
    * “off” 或 0 - 关闭规则
    * “warn” 或 1 - 开启规则，使用警告级别的错误: warn(不会导致程序退出)
    * “error” 或者 2 - 使用错误级别的错误：error（当被触发时，程序会退出）
    ```js
    rules:{
        semi:'error',// 禁止使用分号
        'array-callback-return':'warn', // 强制数组方法的回调函数中有return语句否则警告
        'default-case':[
            'warn', // 要求Switch语句中有default分支，否则警告
            { commentPattern:'^no default$' } // 允许在最后注释 no default，就不会有警告了
        ],
        eqeqeq:[
            'warn', // 强制使用 === 和 !==,否则警告
            'smart' // 少数情况下可以没有警告，比如 value == undefined【单纯看下值是不是未初始化】
        ]
    }
    ```

3. extends 继承
    开发中一点点写规则太费劲，所以有更好的办法，继承现有的规则。

    现有以下较为有名的规则：
    * Eslint 官方的规则：eslint:recommended
    * Vue cli 官方的规则：plugin:vue/essential
    * React cli 官方的规则：react-app
    ```js
    module.exports = {
        extends:["react-app"],
        rules:{
            //自己写的规则会覆盖掉上面react-app的规则
            //所以想要在他们的基础上修改规则直接修改就可以
            eqeqeq:["warn","smart"]
        }
    }
    ```

## P19 在 webpack 中使用 eslint 
1. 下载包
    ```
    npm i eslint-webpack-plugin eslint -D
    ```
2. 在webpack.config.js中require引入并进行配置
    * 插件使用时需要先引入，并new一个实例对象
    ```js
    plugins:[
        // eslint插件配置
        new EslintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname,"src")
        })
    ],
    ```
3. 定义 Eslint 配置文件
    ```js
    module.exports = {
        // 继承 Eslint 规则
        extends: ["eslint:recommended"],
        env:{
            node:true, // 启用node中全局变量
            browser:true // 启用浏览器中全局变量
        },
        parserOpteions:{
            ecmaVersion:6,
            sourceType:"module",
        },
        rules:{
            "no-var":2, // 不能使用 var 定义变量
        }
    }
    ```

4. 新增并配置 .eslintignore 文件
    * 如果在vscode里面安装了eslint插件，会帮你在开发中检查代码。
    * 但是不配置的话，它也会去检查dist下的文件，其实是没有必要的。所以新增.eslintignore文件
    ```
    // 文件中直接写dist已经其他需要忽略的文件和文件夹
    dist
    ```

## P20 babel介绍
* 主要将es6编写的代码转换为向后兼容的JavaScript语法，提高兼容性

### 配置文件
配置文件有很多种写法
* babel.config.* ：新建文件，位于项目跟目录
    * babel.config.js
    * babel.config.json
* .babelrc.* ：新建文件，位于项目跟目录
    * .babelrc
    * .babelrc.js
    * .babelrc.json
* package.json 中 babel ：不需要创建文件，在原有基础上写

babel会自动查找并读取配置，以上的几种写法存在一种即可

### 具体配置
以 babel.config.js 为例
```js
module.exports = {
    // 预设
    preset:[],
}
```

1. 预设 preset
    简单理解，就是一组babel插件，扩展babel功能
    * @babel/preset-env ：一个智能预设，允许使用最新的JavaScript
    * @babel/preset-react ：一个用来编译React jsx语法的预设
    * @babel/preset-typescript ：一个用来编译 typescript 语法的预设

## P21 在 webpack 中使用 babel
1. 查看webpack文档，下载babel
```
npm install -D babel-loader @babel/core @babel/preset-env
```

2. 在 webpack.config.js 中配置 babel-loader
```js
// babel-loader 配置
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/, // 忽略 这些文件夹
    // 优化1：只执行一个loader，不需要use，直接写loader配置
    //use: {
        loader: 'babel-loader',
        // 优化2：options配置可以在这儿写，也可以单独创建babel配置文件，后者方便维护
        // options: {
        //     presets: ['@babel/preset-env']
        // }
    //}
}
```

## P22 处理 html 资源
* webpack默认是不对html进行打包的，html页面想要使用打包后的js，需要手动引入打包后路径【不合适】
* 在webpack中可以引入插件对html进行打包
    1. 去webpack官网有介绍使用，先下载
    ```
    npm install --save-dev html-webpack-plugin
    ```

    2. 在webpack.config.js中require引入 并在plugins中实例化
    ```js
    plugins:[
        // html 打包插件配置
        new HtmlWebpackPlugin({
            // 模板，以public/index.html为模板创建新的html文件
            // 新的html文件的特点，结构和原来一致，自动 以defer引入原来的资源
            template: resolve(__dirname,"public/index.html")
        })
    ],
    ```

## P23 开发服务器 & 自动化
每次写完代码都需要手动输入指令才能编译代码，麻烦，希望能自动化
1. 首先 下载对应的包
    ```
    npm i webpack-dev-server -D
    ```

2. 在 webpack.config.js 中进行配置
    ```js
    module.exports = {
        //...
        // 开发服务器配置，不会输出资源，在内存中编译打包
        devServer: { 
            host: "localhost",
            port: "3000",
            open: true
        },
    };
    ```
3. 启动服务
    ```
    npx webpack serve
    ```


## P25 生产模式准备工作
1. 在跟目录准备 config 文件夹，将webpack.config.js放进去并复制一份。
    * webpack.dev.js  ：内置服务器启动，打包到内存，所以不需要输出路径。多了一层config文件夹要修改绝对路径。
    * webpack.prod.js ：删除devserver配置，将模式改为production，多了一层config文件夹要修改绝对路径。

2. 手动指定指定配置文件打包，使用 --config 【都这么输入不方便，再进行3里面的额外配置】
```
npx webpack serve --config ./config/webpack.dev.js

npx webpack --config ./config/webpack.prod.js
```

3. 在 package.json 的 scripts 中配置脚本
```json
"scripts": {
    "start": "npm run dev",
    "dev": "webpack serve --config ./config/webpack.dev.js",
    "build": "webpack serve --config ./config/webpack.prod.js"
}
```
```
npm start 或者 npm run dev
npm run build
```

## P26 提取css成单独的文件
* css 文件目前被打包到js文件中，当js文件加载时，会创建一个 style标签来生成样式
* 这样对于网站来说，会出现闪屏现象，用户体验不好
* 所以需要打包为单独的css文件，通过link标签加载性能才好

1. 下载插件
```
npm install --save-dev mini-css-extract-plugin
```

2. 在webpack的配置文件中引入并配置插件
```js
// 1. 导入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 2. 实例化
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 3. 本来 "style-loader" 的地方替换为 MiniCssExtractPlugin.loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

## P27 CSS 的 兼容性处理
* 前面已经使用了babel对js进行了兼容性处理
* CSS同样存在兼容性问题，这里使用 postcss 对css进行兼容性处理

1. 下载对应的loader
    ```
    npm i postcss-loader postcss postcss-preset-env -D
    ```
2. 在webpack.prod.js中进行配置
    * postcss-loader的书写位置在 css-loader的下面 和 less-loader或者sass-loader前面
    ```js
    "css-loader",
    {
        loader:"postcss-loader",
        options:{
            postcssOptions:{
                plugins:[
                    "postcss-preset-env", //能解决大多数样式兼容性问题
                ]
            }
        }
    },
    "less-loader"
    ```
3. 对于css的兼容性做到什么程度，需要再package.json中配置
    ```json
    "browserslist":[
        "ie >= 8"
    ]
    ```

    * 但目前实际开发中一般不用兼容到ie8，一般用以下配置
    ```json
    "browserslist":[
        "last 2 version",
        "> 1%",
        "not dead"
    ]
    ```

## P28 封装样式 loader 函数
* 在webpack的配置文件中，关于样式的loader有很大一部分是重复的。
* 因此可以将重复的部分封装为一个函数
    ```js
    function getStyleLoader(pre){
        return [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader:"postcss-loader",
                options:{
                    postcssOptions:{
                        plugins:[
                            "postcss-preset-env", //能解决大多数样式兼容性问题
                        ]
                    }
                }
            },
            pre
        ].filter(Boolean) //pre在只针对css未传参的情况下是undefined，用filter(Boolean)筛选掉undefined
    }
    ```
* 在对应配置的位置调用函数即可
    ```js
    // sass loader详细配置
    {
        test:/\.s[ac]ss$/,
        use:['style-loader', 'css-loader', 'sass-loader']
    },
    ```

提交：为了修改前后的对比，便于review。此处只修改了webpack.prod.js


##  P29 CSS 压缩
* 下载插件
    ```
    npm i css-minimizer-webpack-plugin -D
    ```

* 在webpack.prod.js中 require引入并 配置插件
    ```js
    module.exports = {
    // css 压缩插件配置
    plugins: [new CssMinimizerPlugin()],
    };
    ```

##  P29 JavaScript 和 html 压缩
* 配置了生产模式后，默认已经进行了压缩【打包后在同一行】
    ```js
    module.exports = {
        // ...

        // 5. 模式(development/production)
        mode:'production',
    }
    ```

# webpack 高级 优化

## P32 webpack优化介绍
从以下角度进行优化：
1. 提升开发体验
2. 提升打包构建速度
3. 减少代码体积
4. 优化代码运行性能

## P33 高级-提升开发体验-SourceMap
1. 为什么用 SourceMap
    * 开发中，运行代码后，如果报错，报错的位置是编译后代码的位置，十分不方便查看。

2. 什么是 SourceMap
    * 是一个用来生成源代码与构建后代码一一映射的文件的方案
    * 它会生成一个 xxx.map 文件，里面包含源代码和构建后代码的每一行、每一列的映射关系。
    * 当构建后代码出错，会通过 xxx.map 找到源代码的出错位置。方便定位和修改 

3. 怎么使用
    ```js
    module.exports = {
        // ...
        devtool: "xxx"
    }
    ```
    通过查看 Webpack DevTool可知，SourceMap 的值有很多情况

    实际开发中只关注两种情况即可：

    * 开发模式：cheap-module-source-map
        * 优点：打包编译速度快，只包含行映射
        * 缺点：没有列映射
    ```js
    module.exports = {
        // 其它省略
        mode: "development",
        devtool: "cheap-module-source-map"
    }
    ```

    * 生产模式：source-map
        * 优点：包含行/列映射
        * 缺点：打包编译速度更慢
    ```js
    module.exports = {
        // 其它省略
        mode: "production",
        devtool: "source-map"
    }
    ```

## P34 高级-提升打包速度-HotModuleReplacement
1. 为什么提升打包速度
    * 开发是修改了一个模块的代码，webpack默认会将所有模块重新打包编译，速度很慢
    * 所以需要做到修改某个模块的代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就很快

2. HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

3. 怎么使用
    * 前提是需要 webpack-dev-server 的开发服务器。请见P23
    ```js
    module.exports = {
        // 其他省略
        devServer : {
            host:"localhost", // 启动服务器域名
            port:"3000", // 启动服务器端口号
            open:true, // 是否打开浏览器
            hot:true // 开启HMR功能（只需要用于开发环境）
        }
    }
    ```

    * 对于css，style-loader默认是支持HMR的
    * 但是js默认不支持，如果vue项目或者react不用担心，有vue-loader和react-hot-loader做处理了
    * 对于其他项目的js，支持HMR，可能需要写下面这样的代码
    ```js
    if(module.hot) {
        module.hot.accept('./js/count.js', function(count){
            //.... 回调可以不写
        })
    }
    ```


## P35 高级-oneOf
1. 为什么
    * 如果不配置oneOf，打包时，每个文件都会经过所有loader处理。
    * 虽然 test 并没有匹配上，但都要过一遍，效率慢。

2. 是什么
    oneOf 顾名思义就是值匹配一个loader，其他不匹配了。

3. 怎么用
    ```js
    module.exports = {
        // 省略
        rules:[
            // 将原有的loader配置包裹在 一个对象里面的 oneOf 数组中
            {
                oneOf:[
                    // 原有的loader配置
                ]
            }
        ]
    }
    ```


## P36 高级 include 和 exclude
* 开发中，需要使用到很多三方的包，下载到了node_modules中，这些文件是不需要我们编译的。
* 所以我们在对js文件处理时，要排除node_modules下的文件
* 一般正对 babel 和 eslint 做配置即可
```js
module.export = {
    // 省略
    rules:[
        {
            oneOf:[
                // 省略

                // babel-loader 配置
                {
                    test: /\.js$/,
                    exclude: /node_modules/, //忽略 这些文件夹
                    // include: path.resolve(__dirname, '../src'), // 只处理src
                    loader: 'babel-loader',
                }
            ]
        }
    ],

    plugins:[
        // eslint插件配置
        new EslintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname,"../src")
            // exclude: /node_modules/ //上面规定了检测哪些文件，这里不写也行吧
        })
    ]
}
```

## P37 高级 Eslint 和 Babel的缓存
* 每次打包时，js文件都要经过Eslint检查和Babel编译，速度比较慢。
* 我们可以缓存之前的Eslint检查和Babel编译结果。这样第二次打包的速度就会更快

* 如何配置
    * 配置babel，位于webpack.config.js的rules
        ```js
        // babel-loader 配置
        {
            test: /\.js$/,
            exclude: /node_modules/, //忽略 这些文件夹
            loader: 'babel-loader',
            options:{
                // 以下两个配置好像不能直接往babel.config.js中写？
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false, // 关闭缓存文件压缩【缓存位于node_modules。dev在内存中，生产也不打包它。没必要】
            }
        }
        ```

    * 配置Eslint，位于webpack.config.js的plugins
        ```js
        new EslintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname,"../src"),
            
            cache:true, //开启缓存
            cacheLocation: path.resolve(__dirname,"../node_modules/.cache/eslintcache"), //缓存保存位置
        }),
        ```


## P38 高级 多进程打包-Thread
* 问题：
    * 项目庞大的时候，打包会很慢。提升打包速度主要是提升js的打包速度。
    * 处理js文件的主要是eslint、babel、Terser三个工具，所有我们要提升它们的运行速度

* 解决方案
    * 可以开启多进程同时处理js文件
    * 注意：仅在特别耗时的操作中使用，因为每个进程启动就有大约600ms的开销

* 配置
  启动的进程数量就是CPU的核心数
    1. 获取CPU的核心数，因为每个电脑都不一样
        ```js
        // nodejs核心模块
        const os = require("os")
        // cpu核数
        const threads = os.cpus().length
        ```

    2. 下载包
        ```
        npm i thread-loader -D
        ```

    3. 使用
        * babel设置，位于rules
        ```js
        // babel-loader 配置
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use:[
                // 写在 babel-loader的前面
                {
                    loader:'thread-loader',
                    options:{
                        workers:threads //开启的进程数量
                    }
                },
                {
                    loader: 'babel-loader',
                    options:{
                        cacheDirectory: true,
                        cacheCompression: false,
                    }
                }
            ]
            
        }

        ```

        * Eslint设置，位于plugins中
        ```js
        new EslintPlugin({
            // 前面省略
            threads, // 开启多进程和设置进程数量【键值一致】
        }),
        ```

        * Terser配置，依照webpack5，压缩配置全部写在optimization中
        ```js 
        optimization:{
            minimizer:[
                // css 压缩插件配置
                new CssMinimizerPlugin(),
                // js 压缩
                new TerserWebpackPlugin({
                    parallel: threads, // 开启多进程和设置进程数量
                })
            ]
        },
        ```

## P39 高级 减小打包体积 Tree-Shaking
* 问题：
    * 开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。
    * 不做特殊处理【按需引入的话】。我们打包回引入整个库，实际可能我们只需要很少的一部分。

* 解决：
    * Tree Shaking是一个术语，通常用于描述一处JavaScript中没有使用上的代码
    * 注意：它依赖 ES Module

* 使用：
    webpack已经默认开启了这个功能，无需其他配置

## P40 高级 减少Babel生成文件的体积
* 问题：
    * babel 为编辑的每个文件都插入了辅助代码，使代码体积过大
    * babel对一些公共方法使用了非常小的辅助代码，比如 _extend 默认情况下会被添加到每一个需要他的文件中。

* 解决：
    * 可以将这些辅助代码作为一个独立模块，来避免重复引入。
    * @babel/plugin-transform-runtime：禁用了Babel自动对每个文件的runtime注入，而是引入
    * @babel/plugin-transform-runtime：并且使所有辅助代码都从这里引入

* 使用：
    * 下载包：
    ```
    npm i @babel/plugin-transform-runtime -D
    ```

    * 配置：在babel中配置
    ```js
    {
        loader: 'babel-loader',
        options:{
            cacheDirectory: true, // P37
            cacheCompression: false, // P37
            plugins:['@babel/plugin-transform-runtime'], //减少代码体积
        }
    }
    ```


## P41 高级 压缩图片
* 问题：
    * 如果开发中引用了较多的图片，那么图片体积会比较大，将来请求速度比较慢。
    * 可以对图片进行压缩，家烧图片体积
    * 注意：如果项目中的图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。

* 解决
    * 下载用于压缩图片的插件 image-minimizer-webpack-plugin
    ```
    npm i image-minimizer-webpack-plugin imagemin -D
    ```

    * 还有剩下的包需要下载，有两种模式
        无损压缩
        ```
        npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
        ```
        有损压缩
        ```
        npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
        ```

    ```js
    // 图片压缩插件配置 【报错，找不到imagemin-gifsicle】
    // new ImageMinimizerPlugin({
    //     minimizer: {
    //         implementation: ImageMinimizerPlugin.imageminGenerate,
    //         options:{
    //             plugins: [
    //                 ["gifsicle", { interlaced: true }],
    //                 ["jpegtran", { progressive: true }],
    //                 ["optipng", { optimizationLevel: 5 }],
    //                 [
    //                     "svgo",
    //                     {
    //                         plugins: [
    //                             "preset-default",
    //                             "prefixIds",
    //                             {
    //                                 name: "sortAttrs",
    //                                 params: {
    //                                     xmlnsOrder: "alphabetical",
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             ],
    //         }

    //     },
    // }),
    ```


## P42-CodeSplit-多入口
* 问题：
    * 打包代码的时候会将所有的js文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的js文件，其他文件不应该加载
    * 所以需要将打包的文件进行代码分割，生成多个js文件，渲染哪个页面就只加载某个js文件。

* 解决
    代码分割（code split）主要做了两件事
    1. 分割文件：将打包生成的文件进行分割，生成多个js文件夹。
    2. 按需加载：需要哪个文件就加载哪个文件。

## P48-高级 - Preload 和 Prefetch
* 问题：
    * 如果做了代码分割，同时使用懒加载。在需要加载时的分割出来的块过大，网速又一般，会有卡顿。
    * 为了解决以上的问题，希望在浏览器空闲时间，加载后续需要使用的资源。Preload或者PreFetch

* Preload 和 PreFetch
    * Preload：告诉浏览器立即加载资源
    * Prefetch：告诉浏览器在空闲时才开始加载资源。

    1. 它们的共同点：
        * 都只会加载资源，并不执行。
        * 都有缓存
    
    2. 它们的区别：
        * Preload加载优先级高，Prefetch加载优先级低。
        * Preload只能加载当前页面需要使用的资源。Prefetch可以加载当前页面资源，也可以加载一下页面需要使用的资源

    3. 总结：
        * 当前页面优先级高的资源用 Preload 加载
        * 下一个页面需要使用的资源用 Prefetch 加载
    
    4. 他们存在的问题：兼容性差
        * 可以去 can i use 查询 API的兼容问题
        * Preload 兼容性相对好一点

* 使用
    1. 下载插件【vue的preload插件还能使用】
        ```
            npm install --save-dev @vue/preload-webpack-plugin
        ```

    2. require引入，并在webpack.config.js的plugins中配置
        ```js
            new PreloadWebpackPlugin({
                // 1. 使用preload
                // rel: "preload",
                // as: "script"

                // 2. 使用prefetch
                rel："prefetch"
            })
        ```




## P49-高级-Network Cache
* 在开发时，可以对静态资源使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，提高速度。
* 问题： 
    * 但是，在默认情况下，前后端输出的文件名是一样的，比如都叫做main.js。
    * 一旦有新版本，因为文件名没变导致浏览器直接读取缓存去了，不会加载新内容，项目也无法更新。
    * 所以需要从文件名入手
* 解决：
    文件名配置中的一下属性，都会生成一个唯一的hash值

    * fullhash（webpack4 是 hash）

        每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。
    
    * chunkhash

        根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值

    * contenthash

        根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

* 使用：
    ```js
    // 2. 输出
    output:{
        //入口文件输出的文件名
        filename:'static/js/[name].[contenthash:10].js',
        // p47 输出文件统一命名
        chunkFilename:'[name].chunk.[contenthash:10].js',
        assetModuleFilename:'media/[contenthash:10][ext][query]',

        // 输出的路径 path.resolve 返回绝对路径
        // __dirname是nodejs的变量，代表当前文件的目录
        path:path.resolve(__dirname,'../dist'),
        
        // 自动清空上次打包结果
        clean: true
    },
    ```

    ```js
    // css 单独打包插件配置
    new MiniCssExtractPlugin({
        // 不定义名称路径的话，默认打包到dist下的main.js
        filename: "static/css/[name].[contenthash:10].css",
        // 5. 动态导入的资源如果有js还有css的话，css单独打包了就有对应chunk后缀的文件
        chunkFilename:"css/[name].chunk.[contenthash:10].css"
    }),
    ```

* 单纯使用contenthash引入问题
    * 修改文件A，如果A被文件B引用。打包后，A的hash变了，导致B的内容改变，B的hash也会变

* 解决引入的问题
    * 配置创建一个runtime文件
    * runtime文件保存 文件的hash值 和 他们与文件的关系
    * 改变A，只有A和runtime文件改变，B不变

    ```js
    optimization:{
        // 省略

        // p49 生成runtime文件，统一处理引用部分的代码。
        // 源文件A引用B，打包后A通过runtime引用B。如果B变了，再打包，只会影响到runtime和B
        runtimeChunk:{
            name:entrypoint => `runtime~${entrypoint.name}.js`
        }
    },
    ```

## P50-高级-解决js兼容性问题 CoreJS
* 引出问题：
    * 过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。
    * 它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。

    * 所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

* 解决
    * core-js 是专门用来做 ES6 以及以上 API 的 polyfill。
    * polyfill翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。


* 使用 core-js
    1. 下载
        ```
        npm i core-js
        ```

    2. 全部引入、按需引入 或 自动引入
        ```js
            // 1. 全部引入
            import 'core-js'
            // 2. 按需引入
            import "core-js/es/promise";
        ```
        ```js
            // 3. 自动引入，要配置babel
            module.exports = {
                // 智能预设：能够编译ES6语法
                presets: [
                    // 需要给只能预设配置选项
                    [
                        "@babel/preset-env",
                        // 按需加载core-js的polyfill【补丁】
                        { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
                    ],
                ],
            };
        ```

* 最终打包完成后，会生成对应的补丁js文件


## P51 高级-PWA-提供离线访问
* 问题：
    * 在离线的情况下不要直接访问失败，页面还是能显示并使用一些基本功能。

* 解决
    * 渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。

    * 其中最重要的是，在 离线(offline) 时应用程序能够继续运行功能。

    * 内部通过 Service Workers 技术实现的

* 使用：
    1. 下载包
        ```
        npm i workbox-webpack-plugin -D
        ```

    2. 修改webpack.config.js
        ```js
        plugins:[
            // workbox插件配置
            new WorkboxPlugin.GenerateSW({
                // 这些选项帮助快速启用 ServiceWorkers
                // 不允许遗留任何“旧的” ServiceWorkers
                clientsClaim: true,
                skipWaiting: true,
            }),
        ]
        ```

    3. 项目入口文件出注册workbox
    ```js
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                .register("/service-worker.js")
                .then((registration) => {
                    console.log("SW registered: ", registration);
                })
                .catch((registrationError) => {
                    console.log("SW registration failed: ", registrationError);
                });
            });
        }
    ```
