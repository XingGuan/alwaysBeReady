### 设计实现一个H5图片懒加载SDK   
#### 问题分析  
+ 定义数据模型   
```javascript
<img src="loading.png" data-src="xxx.png" />
```   
初始的时候,图片真实地址`src`设置为默认图或占位图`loading.png`,而真正要加载的地址图片`xxx.png`写在`data-src`属性中。 
+ 页面滚动，图片露出时(判断当前图片是否在可视区域内)，将`data-src`赋值给`src`。   
+ 滚动要节流。   
+ 获取图片定位     
+ 元素的位置`element.getBoundingClientRect()`   
+ 图片`top`和`window.innerHeight`   

> `window.innerHeight`是一个只读属性，用于获取浏览器窗口的内部高度(以像素为单位)，不包括浏览器的工具栏和滚动条。   

> 滚动加载要考虑到节流。   





##### 使用数据属性   
`HTML`是具有扩展性的设计，它初衷是数据应与特定的元素相关联，但不不要任何定义。`data-*属性`允许我们在标准、语义化的`HTML`元素中存储额外的信息，而不需要使用类似于非标准属性或者`DOM`额外属性之类的技巧。   

`HTML`语法   
语法非常简单。所有元素上以`data-`开头的属性为数据属性。比如说你有一篇文章，而你又想要**存储一些不需要显示在浏览器上的额外信息**。请使用**data**属性：   
```javascript
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
  ...
</article>

```  

##### JavaScript 访问   
在外部使用`JavaScript`去访问这些属性的值同样非常简单。你可以使用`getAttribute()`配合它们完整的`HTML`名称去读取它们，但标准定义了一个更简单的的方法:`DOMStringMap`你可以使用`dataset`读取到数据。   

> 为了使用`dataset`对象去获取到数据属性，需要获取属性名中`data-`之后的部分(要注意的是破折号连接的名称需要改写为骆驼拼写法(如"index-number"转换为"indexNumber"))。    

```javascript
var article = document.querySelector("#electriccars");
article.dataset.columns;//"3"  
article.dataset.indexNumber;//"1234"  
article.dataset.parent;//"cars"
```  
> 每一个属性都是一个可读写的字符串。   

##### CSS访问   
注意，`data`设定为`HTML`属性，他们同样能被`CSS`访问。比如你可以通过`generated content`使用函数`attr()`来显示`data-parent`的内容：   
```css
article::before{
    content:attr(data-parent);
}
```  
同样也可以在`CSS`中使用`属性选择器`根据`data`来改变样式：   
```css
    article[data-columns="3"]{
        width:400px;
    }
    article[data-columns="4"]{
        width:600px;
    }
```  
数据值是字符串，必须在选择器中引用数值才能使样式生效。  



##### `IntersectionObserver API`使用教程   
`IntersectionObserver`这里`Intersection`的中文意思是路口，`Observer`的意思是观察者。   

网页开发时，常常需要了解某个元素是否进入了"视口"(`viewport`),即用户能不能看到它。    

> 传统的实现方法是，监听到`scroll`事件后，调用目标元素(绿色方框)的`getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于`scroll`事件密集发生，计算量很大，容易造成性能问题。    

目前有一个新的`IntersectionObserver API`,可以自动"观察"元素是否可见，`Chrome 51+`已经支持。
> 由于可见(`visible`)的本质是,目标元素与视口产生一个交叉区，所以这个API叫做"交叉观察器"。   

##### 一、API  
它的用法非常简单。   
```javascript
var io = new IntersectionObserver(callback,option);   
```  
上面代码中，`IntersectionObserver`是浏览器原生提供的构造函数，接受两个参数；`callback`是可见性变化时的回调函数，`option`是配置对象(该参数可选)。   
构造函数的返回值是一个观察器实例。实例的`observe`方法可以指定观察哪个`DOM`节点。   
```javascript
// 开始观察   
io.observe(document.getElementById('example'));
// 停止观察  
io.unobserve(element);   
// 关闭观察器   
io.disconnect();
```  
上面代码中，`observe`的参数是一个`DOM`节点对象。如果要观察多个节点，就要多次调用这个方法。   
```javascript
io.observe(elementA);
io.observe(elementB);
```  
二、callback参数   
目标元素的可见性变化时，就会调用观察器的回调函数`callback`。   
`callback`一般会触发两次。一次是目标元素刚刚进入视口(开始可见)，另一次是完全离开视口(开始不可见)。   
```javascript
var io = new IntersectionObserve(
    entries=>{
        console.log(entries);
    }
)
```  
上面代码中，回调函数采用的是**箭头函数**的写法。`callback`函数的参数(`entries`)是一个数组，每个成员都是一个`IntersectionObserverEntry`对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，`entries`数组就会有两个成员。    

三、`IntersectionObserverEntry` 对象   
`IntersectionObserverEntry`对象提供目标元素的信息，一共有六个属性。   
```javascript
{
    time:交集变化发生的时间，单位为毫秒。
    target:被观察的元素。   
    isIntersection:布尔值，表示目标元素是否与祖先元素或视口相交。   
    intersectionRadio:目标元素与祖先元素或视口的交集比例，范围从0到1。   
    intersectionRect:一个`DOMRectReadOnly`对象，表示目标元素与祖先元素或视口的交集区域。
    boundingClientRect:一个`DOMRectReadOnly`对象，表示目标元素的边界矩形。   
    rootBounds:一个`DOMRectReadOnly`对象，表示祖先元素或视口的边界矩形。
}
```    
##### `eg:`  
```javascript
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('Entry details:', entry);
    console.log('Target element:', entry.target);
    console.log('Is intersecting:', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
    console.log('Intersection rectangle:', entry.intersectionRect);
    console.log('Bounding client rectangle:', entry.boundingClientRect);
    console.log('Root bounds:', entry.rootBounds);

    if (entry.isIntersecting) {
      // 元素进入视口
      console.log('Element is visible:', entry.target);
      // 可以在这里加载图片或其他操作
      observer.unobserve(entry.target); // 停止观察该元素
    }
  });
}, {
  root: null, // 观察的根元素，默认为视口
  rootMargin: '0px', // 根元素的边距
  threshold: 0.1 // 交集比例阈值，0.1 表示 10% 的交集
});

// 开始观察某个元素
const element = document.querySelector('.lazy-image');
observer.observe(element);
```  


##### `getBoundingClientRect()`  
`Element.getBoundingClientRect()`方法返回一个`DOMRect`对象，其提供了元素的大小及相对于**视口**的位置。   

> 如果你需要获得边界矩形相对于整个网页左上角的位置，则可以将当前的滚动位置(可通过`window.scrollX`和`window.scrollY`获得)添加到`top`和`left`属性上。获得的边界矩形与当前的滚动位置无关。   







    









