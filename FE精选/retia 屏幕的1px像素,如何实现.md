## `Retina`(视网膜)屏 1px像素问题，如何实现?   
>设备像素比`DPR`(devicePixelRatio)是默认缩放为100%的情况下，设备像素和`css`像素的比值。  `DPR=设备像素/css像素(某一方向上)`

### 普通的`1px`  
如果仅仅使用`css`的`1px`来设置`border`,那可能会出现比较粗的情况。  
因为，有些手机屏幕的 `DPR = 2` ，即 `1px` 它会用两个物理像素来显示，就粗了。  

ps:你不能直接写`0.5px`，浏览器兼容性不好，渲染出来可能还是`1px`的效果。  

### 解决方案
使用`transform`缩小，我们可以使用 `css 伪类 + transform `来优化这一问题。即把默认的 `1px` 宽度给压缩 `0.5` 倍。  
```css
#box {
    padding: 10px 0;
    position: relative;
}
#box::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #d9d9d9;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}
```
如果有`border-radius`怎么办  
可以使用`box-shadow`设置  
+ X 偏移量`0`  
+ Y 偏移量`0`  
+ 阴影模糊半径`0` 
+ 阴影扩散半径`0.5px`  
+ 阴影颜色  
  
```css
#box2 {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    /* border: 1px solid #d9d9d9; */
    box-shadow: 0 0 0 0.5px #d9d9d9;
}
```  