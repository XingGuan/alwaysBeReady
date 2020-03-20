## 滑动列表
```css
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
```
## 设置价格中划线
```css
    text-decoration:line-throug;
```
### text-decoration属性
text-decoration 属性规定添加到文本的修饰，下划线、上划线、删除线等。
text-decoration 属性是以下三种属性的简写：
+ text-decoration-line
+ text-decoration-color
+ text-decoration-style

值 | 描述 
----|------
none | 默认。定义标准的文本。  
underline | 定义文本下的一条线。  
overline | 定义文本上的一条线。
line-through |  定义穿过文本的一条线。
blink | 定义闪烁的文本
inherit | 	规定应该从父元素继承 text-decoration 属性的值。

>`text-decoration`因为是三种属性的简写所以在写样式的时候线的位置，线的颜色,线的样式可以写在一起。线的样式有，虚线**dotted**，浪线**wavy**等。  
[相关属性参考](https://www.runoob.com/cssref/pr-text-text-decoration.html)

## 文本最多显示两行其余部分隐藏
### css3 text-overflow
> text-overflow属性指定当文本溢出包含它的元素的时候应该发生什么。  

语法：  
`text-overflow: clip|ellipsis|string;`
属性
值 | 描述 
----|------
clip | 修剪文本  
ellipsis | 显示省略号来表示被修剪的文本。  
string | 使用给定的字符来代表被修剪的文本。

### 单行文本显示超出一行隐藏
语法：
```css
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
```

### -webkit-line-clamp
定义：限制在一个块元素显示的文本的行数。
>-webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：

`display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
`-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
`text-overflow`,可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 
。  
[参考文档](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)

### 生成不同的高度
方法利用Math.radom()->0-1随机数*高度区间+最低图片高度
### 获取元素内部的高度
`element.clientHeight`
>这个属性是只读属性，对于没有定义CSS或者内联布局盒子的元素为0，否则，它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。

clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.  
语法:
var h = element.clientHeight;
返回整数 h，表示 element 的 clientHeight（单位像素）。
clientHeight 是只读的.





