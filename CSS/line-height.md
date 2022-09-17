## line-height 
属性值
+ 1.`line-height:normal;`   
默认。设置合理的行间距。(跟着用户浏览器走，且与元素字体关联)。  
+ 2.`line-height:number;`  
设置数字，此数字会与当前的字体尺寸相乘来设置行间距。  
+ 3.`line-height:length;`  
设置固定的行间距。使用具体长度值作为行高值。  
+ 4.`line-height:%;`  
基于当前字体尺寸的百分比行间距。  
+ 5.`line-height:inherit;`  
规定应该从父元素继承`line-height`属性的值。  

### `line-height`百分比与数字的区别
+ 使用百分比时，会计算父元素的`line-height`值，然后将其继承给子元素；
+ 使用数字时，子元素先继承1.5这个系数，再计算对应的`line-height`像素值。                                          

