`css`绘制平行四边形方法：
+ 通过`clip-path`
+ 通过`skew`   

这种转换是一种剪切映射(横切)，它在水平和垂直方向上将单元内的每个点扭曲一定的角度。每个点的坐标根据指定的角度以及到原点的距离，进行成比例的值调整；因此，一个点离原点越远，其增加的值就越大。   

### 语法   
`skew()`函数指定一个或两个参数，它们表示在每个方向上应用的倾斜量。   
```javascript
`skew(ax)`
`skew(ax,ay)`
```   
参考值  
`ax`  
    `ax`是一个`<angle>`,表示用于沿横坐标扭曲元素的角度。   
`ay`   
    `ay`是一个`<angle>`,表示用于沿纵坐标扭曲元素的角度。如果未定义，则其默认值为0，导致纯水平倾斜。   


