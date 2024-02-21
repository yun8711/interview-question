[TOC]



### display 的 block、inline 和 inline-block 的区别

（1）block：会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性； 

（2）inline：元素不会独占一行，设置 width、height 属性无效。 但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin； 

（3）inline-block：将对象设置为 inline 对象，但对象的内容作为 block 对象呈现，之后的内联对象会被排列在同一行内。 

对于行内元素和块级元素，其特点如下： 

（1）行内元素

- 设置宽高无效； 
- 可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin； 
- 不会自动换行； 

（2）块级元素 

- 可以设置宽高； 
- 设置 margin 和 padding 都有效； 
- 可以自动换行； 
- 多个块状，默认排列从上到下。



### 1 盒模型

本质上是一个盒子，封装周围的html元素，包括：margin、border、padding、content

- 标准盒模型：width/height只是内容尺寸，不包含padding、border，通过box-sizing:content-box设置，浏览器默认设置
- IE盒模型/怪异盒模型：width/height包含了padding、border，通过box-sizing:border-box设置



### 2 BFC/块级格式化上下文/脱离文档流

BFC是CSS布局的一个概念，是一块独立的渲染区域，用于决定块盒子的布局及浮动相互影响范围的一个区域。里面的元素不会影响到外部的元素。BFC中的父子元素、兄弟元素边距会重叠，并且取最大值，空元素的边距重叠是取margin与padding的最大值。

一个BFC的范围包含创建上下文元素的所有子元素，但不包括创建了新BFC的子元素的内部元素。也就是说一个元素不能同时存在于两个BFC中。

BFC触发方式：

- 根元素，即HTML标签、body
- 浮动元素：float值为除 none 以外的值，如left、right
- overflow值为auto、scroll、hidden
- display值为inline-block、 table-cell、 table-caption、 table、 inline-table、 flex、 inline-flex、 grid、 inline-grid
- position值为absolute、fixed

渲染规则或布局规则：

- 内部的box会在垂直方向，自顶而下放置
- box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会重叠
- 每个元素的margin-left与包含块的border-left相接触，即使浮动元素也是如此
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算

BFC的应用：

- 阻止元素被浮动元素覆盖：正常文档流的block元素可能被一个float元素覆盖，挤占正常文档流，可以设置一个元素的float、display、position值等方式触发BFC，以阻止被浮动例子覆盖。
- 可以包含浮动元素：通过改变包含浮动子元素的父盒子的属性值，触发 BFC，以此来包含子元素的浮动盒子。
- 阻止因浏览器四舍五入造成的多列布局换行
- 阻止相邻元素的margin合并：让两个相邻块级子元素分属不同的BFC可以阻止margin重叠



### 3 IFC/行内格式化上下文

由不包含块级盒的块容器建立，块容器盒中只有内联盒子。

布局规则：

- 在IFC里，盒子是水平一个接着一个排列
- 盒内元素的margin、border、padding都有效
- 垂直对齐方式：以它们的底部、顶部对象，或以它们里面的文本的基线对齐



### 4 伪类和伪元素

伪类：已有元素处于某种状态时，为其添加的样式，根据用户行为面动态变化，如:hover、:focus、:first-child

伪元素：dom树没有定义的虚拟的元素，用于创建不存在于dom树中的元素，并为其添加样式，如:before、:after