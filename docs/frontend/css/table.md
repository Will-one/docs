---
title: 表格
categories:
  - frontend
tags:
  - css
---

## 表格样式
```css
table {
  width: 50%;
  border: 1px solid black;

  /* border-spacing 指定边框的距离 */
  /* border-spacing: 0px; */

  /* border-spacing 设置边框的合并 */
  /* 设置完边框间没有间隙，所以border-spacing就失效了 */
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  height: 50px;
  /* 默认情况下元素在td中是垂直居中的 */
  /* 可以通过vertical-align修改对齐方式 */
  vertical-align: bottom;
  text-align: center;
}
/* odd奇数 even偶数 */
tr:nth-child(2n) {
  background-color: #bfa;
}

/* 
  如果表格中没有使用tbody而是直接写tr
    那么浏览器会将所有tr放到一个自动创建的tbody中
*/
/* 这样是无法选中的，tr不是table的子元素 */
table > tr {
}
/* 正确的写法 */
tbody > tr {
}
```
## 表格样式的扩展运用
由于表格类元素在布局上的一些特性，我们可以将其运用在其他元素上
```html
<!-- 结构 -->
<div class="box1">
    <div class="box2"></div>
</div>
```
父元素设为单元格 **display:table-cell;** ，就可以对齐包含的子元素进行定位
```css
/* 样式 */
.box1 {
  width: 300px;
  height: 300px;
  background-color: #bfc;

  /* box2在box1中垂直居中，除了使用定位和边距，还可以把box1变为table-cell */
  display: table-cell;
  /* 然后设置对齐方式 */
  vertical-align: middle;
}
.box2 {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  margin: 0 auto;
}
```
