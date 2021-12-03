---
title: '简单上手'
categories:
- frontend
tags:
- ajax
---

## P9-P11 get请求
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

## P12-P14 post请求
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

## P15 处理 JSON 响应
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

## P17 IE 缓存问题
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

## P18 响应超时设置
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

## P19 取消ajax请求
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

## P20 重复发送请求
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

## P23-P24 axios
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

## P25 fetch 函数发送 ajax
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