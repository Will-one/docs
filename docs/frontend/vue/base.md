---
title: 'vue2基础'
categories:
- frontend
tags:
- vue
---

## 数据代理\数据劫持
[知乎 小蘑菇小哥](https://zhuanlan.zhihu.com/p/47041290)。
访问或修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果。

vue2中使用object.defineproperty在进行数据劫持数据代理
vue3中使用proxy，可以将其看做是object.defineproperty的增强版