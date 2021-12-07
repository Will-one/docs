---
title: '简单重写Promise（选看）'
categories:
- frontend
tags:
- promise
---

## P25-P43 Promise 自定义封装
```js
class Promise {
    constructor(executor) {
        //添加属性
        this.PromiseState = 'pending'
        this.PromiseRusult = null
        //声明一个属性保存then里面的回调函数
        this.callbacks = []

        //预先保留this的值
        const _this = this

        //声明resolve和reject
        function resolve(data) {
            //判读primisestate有没有被改过，确保只能改一次
            if (_this.PromiseState !== 'pending') return

            //1.修改对象的状态(promiseState)
            _this.PromiseState = 'fulfilled'
            //2.设置对象结果值(promiseResult)
            _this.PromiseRusult = data

            //异步任务时，执行保存下来的成功的回调
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onResolved(data)
                })
            });
        }

        function reject(data) {
            //判读primisestate有没有被改过，确保只能改一次
            if (_this.PromiseState !== 'pending') return

            //1.修改对象的状态(promiseState)
            _this.PromiseState = 'rejected'
            //2.设置对象结果值(promiseResult)
            _this.PromiseRusult = data

            //异步任务时，执行保存下来的失败的回调
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            });
        }

        //针对抛出异常时候的处理
        try {
            //同步调用执行器函数
            executor(resolve, reject)
        } catch (e) {
            //修改promise对象的装填为失败
            //只需要调用reject就可以了
            reject(e)
        }
    }

    //添加then方法
    then(onResolved, onRejected) {
        //给return里面有嵌套的函调函数用
        const that = this

        //判断回调函数参数，异常穿透
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        if (typeof onResolved !== 'function') {
            onRejected = value => value
        }

        //then的返回结构需要是一个promise对象
        return new Promise((resolve, reject) => {
            //封装函数
            function checkResult(type) {
                try {
                    //获取回调函数的执行结果
                    let result = type(that.PromiseRusult)
                    //判断返回的值是否是promise对象
                    if (result instanceof Promise) {
                        //如果是一个promise的对象
                        result.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        //结果对象的状态为成功
                        resolve(result)
                    }
                } catch (e) {
                    reject(e)
                }
            }

            //调用回调函数
            //执行的前提条件是状态要改变
            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    checkResult(onResolved)
                });
            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    checkResult(onRejected)
                });
            }

            //以为异步的时候，进到then里面时，promise的状态可能还没有改变
            //所以还要对pending状态进行处理
            if (this.PromiseState === 'pending') {
                //保存回调函数
                this.callbacks.push({
                    onResolved: function () {
                        checkResult(onResolved)
                    },
                    onRejected: function () {
                        checkResult(onRejected)
                    }
                })
            }
        })
    }

    //添加catch方法
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    //添加 resolve 方法
    static resolve(value) {
        //返回一个Promise对象
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                //状态设置为成功
                resolve(value)
            }
        })
    }

    //添加 reject 方法
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    //添加 all 方法，全部成功才成功，返回结果数组
    static all(promises) {
        return new Promise((resolve, reject) => {
            //声明计数变量
            let count = 0
            //声明结果数组
            let arr = []

            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    //每个promise对象都成功才执行resolve
                    count++
                    //将当前promise对象成功的结果，存入到数组中
                    arr[i] = v

                    if (count == promises.length) {
                        resolve(arr)
                    }
                }, r => {
                    reject(r)
                })
            }
        })
    }

    //添加 race 方法，谁先改变状态，整个的状态就是它的
    race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}
```