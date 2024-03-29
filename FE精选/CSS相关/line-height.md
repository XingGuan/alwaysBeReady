### `line-height`不同单位之间的区别   
[line-height不同单位之间的区别](https://www.cnblogs.com/dupd/p/6143874.html)  

`line-height`用来设置元素的行高。    
该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最下距离而不是最大距离。   
`line-height`和`font-size`的计算值之差(在`css`中成为"行间距")分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。   

`line-height`可能的值类型有三种：   
+ 1.一种带有`css`单位`px`,`em`,`rem`。  
+ 2.一种为百分比`150%`。   
+ 3.还有一种为纯数值，如`1.5`。   
  
### 带有`css`单位   
`line-height`如果设置为`px`。那么其直接显示，且子元素直接继承。  
如果`line-height`设置为`em`或`rem`。那么其根据其`font-size`大小转换成`px`，再显示，然后子元素再继承。   

### 百分比`%`  
`line-height`如果设置为`%`。那么根据其`font-size`大小转换成`px`,再显示，然后子元素再继承。   

### 数值  
`line-height`如果为数值，那么先继承，再转换成`px`。   
子元素继承父元素的数字，然后再*当前字体尺寸，来确定行间距的值。