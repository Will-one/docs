---
title: '基础'
categories:
- frontend
tags:
- jQuery
---

1. CSS模块
   1. style样式
      1. css(styleName)：根据样式名得到对应的值
      2. css(styleName, value)：设置一个样式
      3. css({多个样式对})：设置多个样式
   2. 位置坐标
      1. offset()：读/写当前元素坐标（原点是页面左上角）$(xxx).offset().left
      2. position()：读当前元素坐标（原点是父元素左上角）
      3. scrollTop() / scrollLeft()：读/写元素页面滚动条坐标
   3. 尺寸
      1. width() / height()：width、height
      2. innerWidth() / innerHeight()：width + padding
      3. outerWidth() / outerHeight()：width + padding + border
2. 筛选模块
   1. 过滤：在jQuery对象内部的元素中找出部分匹配的元素，并封装成新的jQuery对象返回
      1. first()
      2. last()
      3. eq(index)
      4. filter(selector)：筛选出与指定表达式匹配的元素集合
      5. not(selector)：从匹配元素的集合中删除与指定表达式匹配的元素
      6. has(selector)：保留包含特定后代的元素，去掉那些不含有指定后代的元素
   2. 查找：查找jQuery对象内部的元素的子孙/兄弟/父母元素，并封装成新的jQuery对象返回
      1. children(selector)：子元素
      2. find(selector)：后代元素
      3. preAll(selector)：前面的所有兄弟元素
      4. siblings(selector)：所有兄弟
      5. parent()：父元素
3. 文档处理（CUD）模块
   1. 增加
      1. append() / appendTo()：插入后部
      2. preppend() / preppendTo()：插入前部
      3. before()：插到前面
      4. after()：插到后面
   2. 删除
      1. remove(): 将自己及内部的孩子都删除
      2. empty()：掏空（自己还在）
   3. 更新
      1. replaceWith()
4. 事件模块
   1. 绑定事件
      1. eventName(function(){})
      2. on('eventName',function(){})
      3. 常用：click, mouseenter/mouseleave mouseover/mouseout focus/blur
      4. hover(function(){}, function(){})
   2. 解绑事件
      1. off('eventName')
   3. 事件委托
      1. 理解：将子元素的时间委托给父辈祖先元素处理
         1. 事件监听绑定在父元素上，但时间发生在子元素上
         2. 事件会冒泡到父元素
         3. 单最终调用的事件回调函数的是子元素：event.target
      2. 好处：
         1. 新增的元素没有时间监听
         2. 减少监听的数量,多个子元素只需要在 父辈祖先元素 上绑一个事件监听就行
      3. 编码
         1. delegate(selector, 'eventName', function(){}) // 回调函数中的this是子元素 
         2. undelegate('eventName')
   4. 事件坐标
      1. event.offsetX：原点是当前元素左上角
      2. event.clientX：原点是窗口左上角
      3. event.pageX：原点是页面左上角
   5. 事件相关
      1. 停止事件冒泡：event.stopPropation()
      2. 阻止事件的默认行为：event.preventDefault()
5. 动画效果：在一定时间内，不断改变元素的样式
   1. slideDown()/slideUp()/slideToggle()
   2. fadeOut()/fadeIn()/fadeToggle()
   3. show()/hidden()/toggle()
   4. animate({结束时的样式}，time，fun)
   5. stop()
6. 插件机制
   1. 扩展jQuery函数对象的方法
```
$.extend({
   xxx:function(){} //this是jQuery对象
})
```
   2. 扩展jQuery对象的方法
```
$.fn.extend({
   xxx:function(){} //this是jQuery对象
})
$obj.xxx()
```
