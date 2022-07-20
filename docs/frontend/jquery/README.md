---
title: '前言'
categories:
- frontend
tags:
- jQuery
---

::: tip
jQuery文档
:::

1. 了解jQuery
   1. 是什么：
      1. 一个JS函数库：write less, do more
      2. 封装简化DOM操作（CRUD）、ajax
   2. 为什么用它：
      1. 强大的选择器：方便快速查找DOM元素
      2. 隐式遍历（迭代）：一次操作多个元素
      3. 读写合一：读数据、写数据用的是一个函数
      4. 事件处理
      5. 链式调用
      6. DOM操作（CUD）
      7. 样式操作
   3. 如何使用：
      1. 引入jQuery库
         1. 本地引入与CDN远程引入
         2. 测试版本与min生产版本
      2. 使用jQuery
         1. 使用jQuery函数：$/jQuery
         2. 使用jQuery对象：$xxx（执行$()得到的对象）
2. jQuery的2把利器
   1. jQuery函数：$/jQuery
      1. jQuery向外暴露的就是jQuery函数，也就是$，可以直接使用
      2. 当成一般函数使用：$(param)
         1. param是function：相当于window.onload = function（文档加载完成后的监听）
         2. param是选择器字符串：查找所有匹配的DOM元素，返回包含所有DOM元素的jQuery对象
         3. param是DOM元素：将DOM元素对象包装为jQuery对象返回 $(this)
         4. param是标签字符串：创建标签DOM对象并包装为jQuery对象返回，可以使用appendTo插入
      3. 当成对象使用：$.xxx()
         1. $.each(obj/arr, function(key, value){})
         2. $.trim(str)
   2. jQuery对象：执行$()返回的就是jQuery对象
      1. 基本行为：
         1. length/size()：得到DOM元素的个数
         2. [index]：得到指定下标对应的DOM元素
         3. each(fucntion(index, domEle){})：遍历所有DOM元素
         4. index()：得到当前DOM元素在所有兄弟元素中的下标
3. 选择器
   1. 介绍
      1. 有特定语法规则（css选择器）的字符创
      2. 用来查找某个/些DOM元素：$('selector')
   2. 分类
      1. 基本
         1. #id
         2. tagname 、*
         3. .class
         4. selector1,selector2,selector3：并集
         5. selector1selector2selector3：并集
      2. 层次
         1. selector1 > selector2：子元素
         2. selector1  selector2：后代元素
      3. 过滤：在原有匹配结构中筛选出来一些
         1. :first
         2. :last
         3. :eq(index)
         4. :lt
         5. :gt
         6. :odd
         7. :even
         8. :not('selector')
         9. :hidden
         10. :visible
         11. [attrName]
         12. [attrName=value]
      4. 表单
         1. :input
         2. :text
         3. :checkbox
         4. :radio
         5. :checked
         6. :selected
4. 属性：操作标签的属性，标签体文本
   1. attr(name) / attr(name, value)：读写非Boolean值的标签属性
   2. prop(name) / prop(name, value)：读写Boolean值的标签属性
   3. removeAttr(name) / removeProp(name)：删除属性
   4. addClass(classValue)：添加class
   5. removeClass(classValue)：移除指定的class
   6. val() / val(value)：读写标签的value
   7. html() / html(htmlString)：读写标签体文本