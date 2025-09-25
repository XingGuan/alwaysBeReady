[scrollIntoView](https:developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#scrollintoviewoptions)  

> `Element`接口的`scrollIntoView()`方法会滚动元素的父容器，使被调用`scrollIntoView()`的元素对用户可见。   

### 语法  
```javascript
    scrollIntoView()  
    scrollIntoView(alignToTop)  
    scrollIntoView(scrollIntoViewOptions)
```
#### 参数
1.`alignToTop: true | false`;   
如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐 
这是这个参数的默认值 
```javascript
    scrollIntoViewOptions:{
        block:'start',
        inline:'nearest',
    }
```    
如果为false,元素的底部将和其所在滚动区的可视区域的底端对齐。
```javascript
    scrollIntoViewOptions:{
        block:'end',
        inline:'nearest'
    }
```
2.`scrollIntoViewOptions`  
一个包含下列属性的对象  
`scrollIntoViewOptions:{}`  
+ `behavior`  
定义滚动是立即的还是平滑的动画。该选项是一个字符串，必须采用以下值之一：  
  + `smooth`: 滚动应该是平滑的动画  
  + `instant`: 滚动应该是通过一次跳跃立刻发生  
  + `auto`：滚动行为由`scroll-behavior`的计算值决定   
+ `block`  
定义垂直方向的对齐 
 `start`、`center`、`end`、`nearest`。默认为`start`
+ `inline`  
定义水平方向的对齐
`start`、`center`、`end`、`nearest`。默认为`nearest`.
#### 返回值  
无 `(undefined)`

#### 扩展  
> `scrollIntoViewOptions`中的`inline`属性控制元素在水平方向上的滚动行为  
> `inline`:'nearest' 表示浏览器会根据元素对于滚动容器的当前位置，以最小的滚动距离将元素滚动到视口中   
 
 + 如果元素已经在视口内，则不发生滚动  
 + 如果元素在视口左侧，则向右滚动直到元素可见  
 + 如果元素在视口右侧，则向左滚动直到元素可见
