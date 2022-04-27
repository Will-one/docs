---
title: '表格和表单'
categories:
- frontend
tags:
- html
---

## 表单
### 文本框
```html
    <!-- 
        表单中必须存在的一个属性
        action属性：指定表单提交的一个地址
     -->
    <form action="./p100.html">
      <!-- 
            文本框
            注意：数据要提交到服务器，需要指定
            name：被作为query参数提交eg：...?userName=123

            value：文本框默认值，Vue双向绑定之类的
            autocomplete：自动补全，autocomplete="off"关闭自动补全
            readonly：只读
            disable：禁用
            autofocus：设置表单项自动获取焦点
         -->
      文本框<input type="text" name="userName" autocomplete="off"/>

      <!-- 
            密码密文显示
         -->
      密码<input type="password" name="password" id="" />
``` 
### 单选多选
```html
      <!-- 
            单选按钮
             name属性：相同name属性的单选框作为一组
             value属性：选中的单选项的值
             checked属性：默认选中
       -->
      性别： 男<input type="radio" name="gender" value="male" checked />
      女<input type="radio" name="gender" value="female" />
      <br />

      <!-- 多选框 -->
      多选框： 篮球<input type="checkbox" name="Hobby" id="" value="bb" />
      足球<input type="checkbox" name="Hobby" id="" value="fb" /> 游戏<input
        type="checkbox"
        name="Hobby"
        id=""
        value="gm"
        checked
      />
      影视<input type="checkbox" name="Hobby" id="" value="mv" />
```
### 下拉列表
```html
      <!-- 
           下拉列表 
           selected属性：默认选中 
        -->
      城市：
      <select name="city" id="">
        <option value="beijing">北京</option>
        <option value="beijing">上海</option>
        <option value="beijing" selected>广州</option>
      </select>
      <br />
```
### 按钮
```html
      <!-- input的其他类型 -->
      <!-- type为reset，点击后重置表单【常用button标签】 -->
      <input type="reset">
      <button type="reset">重置</button>
      <!-- 无默认功能，可自定义【常用button标签】 -->
      <input type="button" value="自定义功能">
      <button>自定义功能</button>

      <!-- 提交按钮【常用button标签】 -->
      <input type="submit" value="提交" />
      <button type="submit">提交</button>
    </form>
```