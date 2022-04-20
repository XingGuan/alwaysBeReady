## 移动端 `H5` `click` 有`300ms`延迟，如何解决？  

背景：`double tap to zoom`

初期解决方案`FastClick`;  

>`FastClick`原理:  
+ 监听`touchend`事件(`touchstart`和`touchend`会先于`click`触发);  
+ 使用**自定义DOM事件**模拟一个`click`事件;  
+ 把默认的`click`事件(300ms之后触发)禁止掉。

[npm FastClick](https://www.npmjs.com/package/fastclick);

现代浏览器的改进  
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">  
```  
设置有这个标签的都不会有`300ms`的延迟。  
