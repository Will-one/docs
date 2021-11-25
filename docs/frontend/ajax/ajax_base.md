---
title: 'ajax文档'
categories:
- frontend
tags:
- ajax
---

## 基础概念
### XML
* 可扩展标记语言
* 用来传输和储存数据

### JSON
[JS 笔记 JSON 章节](/frontend/javascript/)

### AJAX 优缺点
优点
> 无需刷新页面与服务器通信
>
> 允许根据用户事件来更新部分页面内容

缺点
> 没有浏览历史，不能回退
> 
> 存在跨域问题（同源）
> 
> SEO（search engine optimization搜索引擎优化）不友好

## HTTP
HTTP（hypertext transport protocol）协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间互相通信的规则

### 请求报文
重点是格式与参数
```
行(方法+URL+HTTP版本): POST /URL HTTP/1.1
头:  host: willone.com
     Cookie: name=willone
     Content-type: application/x-www-form-urlencoded
     User-agent: chrome 12
空行
请求体(GET体为空，POST可以不为空)： username=admin&password=admin
```

### 响应报文
```
行： HTTP/1.1 200 OK
头:  Content-Type: text/html;charset=uft-8
     Content-Type: 2048
     COntent-encoding: gzip

空行:
体: <html>
        <head>
        </head>
        <body>
            <h1>willone</h1>
        </body>
    </html>
```

## express响应服务
使用 express 快速搭建接口响应服务
[如何搭建](/backend/express)

## get请求
* html
```html
<button>点击发送</button>
<div id="result"></div>
```

* js
```js
//获取button元素
const btn = document.getElementsByTagName('button')[0]
const result = document.getElementById('result')
//绑定事件
btn.onclick = function(){
    /* 开始AJAX操作 */ 
    //1.创建对象
    const xhr = new XMLHttpRequest()
    
    //2.初始化，设置请求方法和url
    //注意，要设置参数的话，直接在url后面写 “?参数名=值” 多个参数之前用&符号分隔
    xhr.open('GET','http://127.0.0.1:8000/server?a=100&b=200&c=300')
    
    //3.发送
    xhr.send()
    
    //4.事件绑定 处理服务端返回的结果(一个完整的请求触发四次，状态改一次触发一次)
    //readystate:是xhr对象中的属性，表示状态0（最开始），1（open方法完毕），2（send方法完毕），3（返回部分结果），4（返回全部结果）
    xhr.onreadystatechange = function(){
        //判断(服务端返回了所有结果)
        if(xhr.readyState === 4){
            //判断响应的状态码 200 404 403 401 500
            //2xx 都是成功
            if(xhr.status >= 200 && xhr.status < 300){
                //处理响应的结果(行 头 空行 体)
                //响应行
                // console.log(xhr.status)//响应行里面的响应状态码
                // console.log(xhr.statusText)//响应状态字符串
                // console.log(xhr.getAllResponseHeaders())//所有响应头
                // console.log(xhr.response)//响应体
                
                //设置result的文本
                result.innerHTML = xhr.response
            }else{

            }
        }
    }
}
```

## post请求
* html
```html
<div id="res"></div>
```
* js
```js
//获取元素
const res = document.getElementById('res')
//绑定事件
res.addEventListener('mouseover',function(){
    //1.创建对象
    const xhr = new XMLHttpRequest()
    
    //2.初始化,设置操作类型和URL
    xhr.open('POST','http://127.0.0.1:8000/server')
    
    //2.5设置请求头，
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    //还可以自定义，会额外发一个OPTIONS请求检测头信息可不可用，serverjs里面改为all来接收
    xhr.setRequestHeader('name','willone')
    
    //3.发送
    //POST可以在send里面传入字符串参数，后端能够处理的任意格式任意格式（例如JSON）
    //xhr.send('a:100&b:200&c:300')
    xhr.send('a=100&b=200&c=300')
    
    //4.事件绑定，处理返回
    xhr.onreadystatechange = function(){
        //判断
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300){
                //处理服务端返回的结果
                res.innerHTML = xhr.response
            }
        }
    }
})
```

## 处理 JSON 响应
* html
```html
<div id="res"></div>
```
* js
```js
const res = document.getElementById('res')
//绑定键盘按下事件
window.onkeydown = function (){
    //1.建对象
    const xhr = new XMLHttpRequest()
    //5.设置响应体数据类型
    xhr.responseType = 'json'
    //2.初始化
    xhr.open('GET','http://127.0.0.1:8000/json-server')
    //3.发送
    xhr.send()
    //4.处理返回
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300){
                //手动处理返回的json，还可以自动转换，见步骤5
                //let obj = JSON.parse(xhr.response)
                //res.innerHTML = obj.name +' '+obj.age+' '+obj.gender
                res.innerHTML = xhr.response.name +' '+xhr.response.age+' '+xhr.response.gender
            }
        }
    }
}
```

## IE 缓存问题
> IE缓存问题
>
> 描述：IE会对AJAX请求结果进行缓存。造成再次发送请求的时候使用的是本地的缓存而不是服务器最新的返回内容

解决方法,加时间戳：
在AJAX的请求行中也就是xhr.open函数的第二个形参URL中添加参数“...?t='Date.now()”

* html
```html
<button>点击发送请求</button>
<div id="result"></div>
```

* js
```js
const btn = document.getElementsByTagName('button')[0];
const result = document.querySelector('#result');

btn.addEventListener('click',function(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET','http://127.0.0.1:8000/ie?t='+Date.now())
    xhr.send()
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status >= 200 && xhr.status <= 300){
                result.innerHTML = xhr.response
            } 
        }
    }
})
```

## 响应超时设置
当响应超时或者网络异常时，需要进行AJAX超时设置，优化体验
* html
```html
<button>点击发送请求</button>
<div id="result"></div>
```
* js
```js
const btn = document.getElementsByTagName('button')[0]
const result = document.querySelector('#result')

btn.addEventListener('click', function(){
    const xhr = new XMLHttpRequest()
    //1.超时设置 2秒
    xhr.timeout = 2000
    //2.设置超时回调
    xhr.ontimeout = function(){
        alert('访问超时，请稍后重试')
    }
    //2.网络异常回调
    xhr.onerror = function(){
        alert('网络似乎出现了问题')
    }

    xhr.open('GET','http://127.0.0.1:8000/delay')
    xhr.send()
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status >=200 && xhr.status < 300){
                result.innerHTML = xhr.response
            }
        }
    }
})
```

## 取消ajax请求
* html
```html
<button>点击发送</button>
<button>点击取消</button>
```
* js
```js
//获取元素对象
const btns = document.getElementsByTagName('button')

let x = null
btns[0].onclick = function(){
    x = new XMLHttpRequest()
    x.open('GET','http://127.0.0.1:8000/delay')
    x.send()
    x.onreadystatechange = function(){
        if (x.readyState === 4){
            if (x.status >= 200 && x.status <= 300){
                //只是测试，不用对返回做什么处理
            }
        }
    }
}

btns[1].onclick = function(){
    //使用ajax的abort方法
    x && x.abort()
}
```

## 重复发送请求
如果重复点击发送请求而不做特殊处理，服务器将收到大量请求
* html
```html
<button>点击发送</button>
<button>点击取消</button>
```

* js
```js
//获取元素对象
const btns = document.getElementsByTagName('button')
let x = null
//设置标识，标识发送状态
let isSending = false

btns[0].onclick = function(){
    //判断标识变量
    if(isSending){
        x.abort()//如果正在发送，则取消该请求，创建新请求
    }

    x = new XMLHttpRequest()
    //已经在发送了
    isSending = true
    x.open('GET','http://127.0.0.1:8000/delay')
    x.send()
    x.onreadystatechange = function(){
        if (x.readyState === 4){
            //整个ajax已经完成了
            isSending = false;
            if (x.status >= 200 && x.status <= 300){

            }
        }
    }
}

btns[1].onclick = function(){
    //使用ajax的abort方法
    x && x.abort()
}
```

## axios
> 热门 ajax 工具库 axios
>
> 使用axios前需要对promise有所了解 [Promise文档](/frontend/promise)

axios官方多种引入方式
> * 1.npm install axios
> * 直接用\<script>标签引入外部文件

* html
```html
<button>GET</button>
<button>POST</button>
<button>AJAX</button>

<!-- 先直接CDN链接引入 -->
<script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
* js
```js
const btns = document.querySelectorAll('button')

//配置baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8000'

btns[0].onclick = function(){
    //GET 请求
    //axios.get(url,{config})
    axios.get('/axios-server',{
        //url参数
        params:{ id:100, vip:7 },
        //请求头信息
        headers:{ name:'willone', age:17 }
    }).then(value => {//返回值这一块是基于promise设计的
        console.log(value)
    })
}

btns[1].onclick = function(){
    //POST 请求
    //axios.get(url,data,{config})
    axios.post('/axios-server',{
        //请求体
        username:'will',
        password:'123'
    },{
        //url参数
        params:{ id:100, vip:7 },
        //请求头
        headers:{ name:'willone', age:17 }
    }).then(value => {
        console.log(value)
    })
}

btns[2].onclick = function(){
    //使用axios自己的方法去发送请求
    axios({
        //请求方法
        method:'POST',

        //url
        url:'/axios-server',
        
        //url参数
        params:{ id:100, vip:7 },
        
        //头信息参数
        headers:{name:'willone', age:17 },

        //请求体参数
        data:{ username:'will', password:'123' }
    }).then(response=>{
        console.log(response)
    })
}
```
## fetch 函数发送 ajax
* html
```html
<button>fetch发ajax</button>
```
* js
```js
const btn = document.querySelector('button')
btn.onclick = function(){
    //fetch(url,{})
    fetch('http://127.0.0.1:8000/fetch-server',{
        //请求方法
        method:'POST',
        //请求头
        headers:{
            name:'willone'
        },
        //请求体,可以接收几种对象和字符串
        body:'username=admin&password=admin'
    }).then(response=>{
        return response.json()
    }).then(response=>{
        console.log(response)
    })
}
```

## 同源政策和跨域
同源策略（Same-Origin Policy）最早由Netscape公司提出，是浏览器的一种安全策略
* 同源：协议，域名，端口号必须完全相同
* 违背同源策略就是跨域

如果要请求的资源满足同源策略，那么url不用写全，可以简写

## JSONP
JSONP是什么？
* JSONP（JSON with Padding），是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来的，只支持get请求

JSONP怎么工作的？
* 在网页有一些标签天生具有跨域能力，比如：img link iframe script
* JSONP就是利用script标签的跨域能力来发送请求的

JSONP的使用
1. 动态的创建一个script标签
```js
var script = document.createElement('script')
```
2. 设置script的src，设置回调函数
```js
script.src = "http://localhost:3000/testAJAX?callback=abc";
function abc(data){
    ...
}
```
3. 服务端返回的是一个函数调用，参数也写在服务端
[JSONP Serve](/frontend/express)

### 示例
```html
<div id="result"></div>
<script>
// b.设置函数
    function handle(data){
        const result = document.getElementById('result')
        result.innerHTML = data.name
    }
</script>
<!-- a.创建script标签 -->
<script src="http://127.0.0.1:8000/jsonp-server"></script>
```

### 示例2
用原生JSONP来实现用户名输入框，失去焦点后发送请求判断用户名重复
```html
用户名：<input type="text" id="username">
<p></p>
<script>
    //获取 input 元素
    const input = document.querySelector('input')
    const p = document.querySelector('p')
    //声明一个handle函数，因为后端返回了这个函数的调用
    function handle(data){
        if(data.exist === 1){
            input.style.border = 'solid 1px #f00'
            p.innerHTML = data.msg
        }
    }

    //绑定事件
    input.onblur = function(){
        //获取用户的输入值
        let username = this.value
        
        /* 向服务端发送请求 */
        //1.创建一个script标签
        const script = document.createElement('script')
        //2.设置标签的src属性
        script.src = 'http:127.0.0.1:8000/check-username'
        //3.将script插入到文档中
        document.body.appendChild(script)
    }
</script>
```

## CORS
什么是CORS
* CORS（Cross-Origin Resource Sharing），跨域资源共享。是官方的跨域解决方案，它的特点是不需要客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post。
* CORS标准新增了一组HTTP首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源

如何工作
* CORS 是设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行
---
* html
```html
<button>发送请求</button>
<div id="result"></div>
```
* js

响应头在服务端，点击链接查看 [响应服务中的CORS配置](/frontend/express)
```js
const btn = document.querySelector('button')
const result = document.getElementById('result')

btn.onclick = function(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET','http://127.0.0.1:8000/cors-server')
    xhr.send()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300){
                result.innerHTML = xhr.response
            }
        }
    }
}
```
