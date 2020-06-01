## canvas上文字不清晰  
**devicePixelRadio**  
该 Window 属性 devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率。此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小的比值。简单地说，这告诉浏览器应该使用多少个屏幕的实际像素来绘制单个 CSS 像素。    
**webkitBackingStorePixelRatio*(仅safari和chrome)**   
该属性的值决定了浏览器在渲染canvas之前会用几个像素来来存储画布信息。  
```javascript
var canvas = document.getElementById("canvas"), 
   context= canvas.getContext("2d");   
// 屏幕的设备像素比 
var devicePixelRatio = window.devicePixelRatio || 1; 
// 浏览器在渲染canvas之前存储画布信息的像素比 
var backingStoreRatio = context.webkitBackingStorePixelRatio || 
    context.mozBackingStorePixelRatio || 
    context.msBackingStorePixelRatio || 
    context.oBackingStorePixelRatio || 
    context.backingStorePixelRatio || 1; 
// canvas的实际渲染倍率 
var ratio = devicePixelRatio / backingStoreRatio;
canvas.style.width = canvas.width; 
canvas.style.height = canvas.height; 
canvas.width = canvas.width * ratio; 
canvas.height = canvas.height * ratio;
```



