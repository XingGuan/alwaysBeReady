### `CSS Margin`重叠解析    
#### 什么是`Margin`重叠？   
`Margin`重叠（也叫外边距折叠）是`CSS`中一个常见的行为，当两个垂直相邻的元素的`margin`相遇时。它们会合并成一个margin，其大小取两者中的较大值。  
#### 发生`Margin`重叠的情况  
    1.相邻兄弟元素（相邻两个兄弟元素之间的垂直`margin`会重叠）  
    2.父元素与首个子元素（父元素的`margin-top`与第一个子元素的`margin-top`会重叠）  
    ——实际效果：父元素好像有了`30px`的`margin-top`  

#### `Margin`重叠的原因   
> 排版设计考虑   
> `Margin`重叠最初是为了更好地处理文本文档的排版。在连续段落之间，如果`margin`不重叠，那么段落之间的间距将会是单个段落`margin`的两倍，这可能不是设计者想要的效果。    

> CSS规范定义   
> 根据`css`规范，相邻垂直的`margin`会合并成一个`margin`。这种设计使得开发者可以更简单地设置元素的间距，而不必担心累加效应。   

> 块级格式化上下文(BFC)  
> `Margin`重叠只发生在同一个块级格式化上下文(`BFC`)中。创建新的`BFC`可以防止`margin`重叠。   

#### 如何防止`Margin`重叠？   
> 使用`Padding`代替  
> 在某些情况下可以使用`padding`来代替`margin`,因为`padding`不会重叠。   

> 使用`Border`或`Padding`隔离  
> 在父元素上添加`border`和`padding`可以防止父元素与子元素的`margin`重叠。

> 创建`BFC`  
> 通过添加以下属性创建新的`BFC`可以防止`margin`重叠   
> `overflow:hidden`,`overflow:auto`  
> `display:flow-root`  
> `float:left/right` 
> `position:absolute/fixed`  

> 使用`Flexbox`或`Grid`布局   
> 这些现代布局技术创建了独立的布局上下文，可以避免`margin`重叠问题。





