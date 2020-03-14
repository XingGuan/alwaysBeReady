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