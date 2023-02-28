---
title: '待整理'
---

## 排序
```js
// 冒泡排序
function bubbleSort(arr){
    // 进行几轮对比，每轮对比都能将当前轮最大数放到最后
    for(let i = 0; i<arr.length; i++){
        // 不停地对比相邻两数
        for(let j = 0; j < arr.length - i -1; j++){
            if(arr[j] > arr[j+1]){
                let tmp = arr[j]
                arr[j] = arr [j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr
}
```

```js
// 插入排序
// 将每一个元素插入的前面已经排好序部分的合适位置
function insertSort(arr){
    let j,curr
    for(let i = 1; i<arr.length; i++){
        curr = arr[i] //当前要插入的元素

        // 
        for(let j=i-1; j>=0 && arr[j]>curr; j--){
            arr[j+1] = arr[j]
        }
        arr[j+1] = curr
    }
    return arr
}
```

```js
// 快排
function quickSort(arr,begin,end){
    if(begin < end){
        let i = begin
        let j = end
        // 每次递归设置基准值，可以设置arr[i]，相当于保存了一份这个位置的数据
        let pivot = arr[i]
        

        while(i < j){
            // 从后向前找小于基准值pivot的值，退出条件：找到小于基准值的值或者 j = i
            while(arr[j] > pivot && i < j){
                j --
            }
            // 将上面找到的小于基准的值赋值给arr[i]
            arr[i] = arr[j]

            // 从前向后找大于基准值pivot的值，退出条件：找到大于基准值的值或者 i = j
            while(arr[i] < pivot && i < j){
                i ++
            }
            // 将上面找到的大于基准的值赋值给arr[j]
            arr[j] = arr[i]

            // 外层的while循环退出时，肯定已经将arr变成了以pivot分隔的两部分
        }

        arr[i] = pivot
        quickSort(arr,begin,i-1)
        quickSort(arr,i+1,end)

    }else{
        return 
    }
}
```

## 排列
```js
// 全排列 回溯剪枝
const _permute = string => {
    // 补全代码
    const res = [];
    const backtrace = path => {
        if(path.length === string.length){
            res.push(path);
            return;
        }
        for(const item of string) {
            if(path.includes(item)) continue;
            backtrace(path + item);
        }
    };
    backtrace('');
    return res;
}
```

## 节流和防抖
```js
// 节流，一定时间内，即使函数多次触发，也只执行一次
function _throttle(func, delay){
    let lastTime = 0

    // 需要保留上一次的lastTime的值，也就是延长lastTime的生命周期，所以使用闭包
    return function(){
        let nowTime = Date.now()

        if(nowTime - lastTime > delay){
            func.call(this)
            lastTime = Date.now()
        }
    }
}
// 使用的时候 。。。。onclick = _throttle(func,1000)  这里onclick绑定的回调是节流函数return的那个函数，内部函数调用了lastTime形成闭包

// 防抖，即使触发多次，但对应的函数只在最后一次触发的一定时间后才执行
function _debounce(func, delay){
    let timer = null;

    return function(){
        clearInterval(timer)
        timer = setTimeout(function(){
            func.apply(this)
        },delay)
    }
}

``` 

## 数字处理

### 千分位处理
```js
function _comma(number) {
    // 补全代码
    let arr = number.toString().split('.')
    let nArr =  arr[0].split('').reverse()
    let res=[];
    for(let i=0;i<nArr.length;i++){
        if(i%3===0 && i!==0 && nArr[i] !== '-'){
            res.push(',')
        }
        res.push(nArr[i])
    }
    res.reverse()
    
    if(arr[1]){
        res = res.join('').concat("."+arr[1])
    }else{
        res = res.join('')
    }
    return res
}
```

## 日期处理
```js
// 计算一个日期是一年中的第几天,输入数据的形式为
function dayOfYear(str){
    if(!str) return
    // 获得date的数组
    let dateArr = str.split('-')
    
    let year = parseInt(dateArr[0]) 
    let mouth = parseInt(dateArr[1]) 
    let day = parseInt(dateArr[2])

    // 定义数组，包含每个月有几天，注意闰年2月
    let mapArr = [31,28,31,30,31,30,31,31,30,31,30,31]
    if(year % 4 === 0 && year % 100 !== 0 || year % 400 ===0){
        mapArr[1] = 29
    }

    let daySum = 0
    for (let i = 0; i < mouth - 1;i++){
        daySum += mapArr[i]
    }
    daySum += day

    return daySum
}
```

## 图片预加载和懒加载
### 预加载
```js
 // 保存图片地址
let imagesArr = [
    '地址1',
    '地址2',
    '地址3'
]
// 1.定义计数器
let count = 0
// 2.遍历图片地主队列
for(let img of imagesArr){
    // 3. 生成一个图片对象
    let image = new Image()
    image.src = img
    console.log('加载中')

    // 给图片对象增加渲染完成事件，是异步的
    image.onload = ()=> {
        count ++
        if(imagesArr.length === count){ // 当渲染个数与图片相同时，所有图片加载完成
            console.log(count, '所有图片渲染完成')
        }
    }
}
```

### 懒加载
1. 使用 v-lazyload

2. 自定义一个v-lazy指令
```js
 export default {
    // el是绑定指令的DOM
    mounted(el){
        // 1. 先保存图片的src，并将其赋值为''
        const imgSrc = el.imgSrc
        el.src = ''

        //观察者 利用IntersectionObserver对DOM进行观察
        // 传入一个回调函数（这个回调在目标离开和进入视口时都会加载），回调函数里有参数entries, 里面isIntersecting在观察的目标进入视口时变为true
        const observe = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting){
                // 加载图片
                el.src = imgSrc
                // 加载完图片后就停止观察
                observe.unobserve(el)
            }
        })

        // 观察dom
        observe.observe(el)
    }
}
```

## 模式
### 发布订阅模式
```js
// 发布订阅模式
class EventEmitter {
    // 补全代码
    // 同一名称事件可能有不同的执行函数体，所以定义对象来存储
    constructor(){
        this.eventList = {} //保存订阅对象的列表
    }
    
    // on函数订阅事件，该名称事件不存在，则将其放入该名称的事件数组中
    on(key,callback){
        if(!this.eventList[key]){
            this.eventList[key] = [] // 
        }
        this.eventList[key].push(callback) //存放订阅事件的回调
    }
    
    // emit函数发布事件，取第一个参数为key，根据key带eventList中匹配函数。
    // 其他参数作为执行时的入参
    emit(){
        let key = [].shift.call(arguments)
        let efns = this.eventList[key]
        if(!efns || efns.length === 0)return
        efns.map((fn)=>{
            fn.apply(this, arguments) 
        })
    }
    
    off(key, callback){
        let efns = this.eventList[key]
        if(!efns)return // 事件数组不存在返回
        // 在事件数组中找到对应的事件（可能存在同名事件，所以需要匹配到函数体）
        for(let i = 0; i< efns.length; i++){
            if(efns[i] === callback){
                efns.splice(i,1)
                break
            }
        }
        // 事件数组长度为0，直接删除
        if(efns.length === 0) delete this.eventList[key]
    }
}

let pubsub = new EventEmitter()

function getMsgFn(msg){
    console.log(msg)
}
pubsub.on('getMsg', getMsgFn)

pubsub.emit('getMsg','willone')

pubsub.off('getMsg', getMsgFn)
```

### 观察者模式
```js
// 被观察者类
class Observerd {
    constructor(name){
        this.name = name
        this.state = '走路'
        this.observers = []
    }
    
    // 设置观察者
    setObserver(ob){
        this.observers.push(ob)
    }
    
    // 修改状态的时候同时修改绑定的观察者的update方法
    setState(state){
        this.state = state
        this.observers.forEach(ob => ob.update(this))
    }
}

// 观察着类
class Observer {
    constructor(){
        
    }

    update(observerd){
        console.log(observerd.name + "正在" + observerd.state)
    }
}

let ob1 = new Observer()
let ob2 = new Observer()

let obd = new Observerd('willone')
obd.setObserver(ob1)
obd.setObserver(ob2)

obd.setState('干饭')
obd.setState('走路')
```