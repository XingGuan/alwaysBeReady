## `Vue`中的`Vnode`虚拟`Dom`一文详解   
[参考链接](https://blog.csdn.net/qq_45074341/article/details/136766875)  

### `VNode`是什么？   
`VNode`是`Virtual Node`的缩写，它是`Vue.js`中用来描述真实`DOM`节点的对象。在`Vue`中，每个组件都会被渲染成一个`VNode`树，然后由虚拟`DOM`算法(`Virtual DOM Algorithm`)将其转化为真实的`DOM`节点。   

`VNode`的优势在于，它比操作真实`DOM`节点要快得多，因为它只需要更新变化的部分，而不需要重新渲染整个组件。此外，`VNode`还可以在服务端渲染(`Server-side Rendering`)中使用，以提高页面的加载速度。   

### `VNode`的结构   
一个`VNode`对象包含以下几个属性：   
+ `tag`:一个字符串，表示节点的标签名，如`div`、`P`等。如果是组件，则为组件的名称。  
+ `data`:一个对象，包含节点的属性、事件、样式等信息
+ `children`:一个数组，包含节点的子节点。如果节点没有子节点，则为空数组。   
+ `text`:一个字符串，表示节点的文本内容。如果节点有子节点，则为空。   
+ `elm`:一个`DOM`元素，表示节点对应的真实`DOM`节点。  
+ `key`:一个字符串或数字，用于优化列表渲染时的`diff`算法。   

eg:`VNode`对象   
```javascript
const VNode = {
    tag:'div',
    data:{
        attrs:{
            id:'app',
            class:'container'
        },
        on:{
            click:function(){ console.log('clicked') };
        }
    },
    children:[
        {
            tag:'h1',
            text:'login'
        },
        {
            tag:'p',
            text:'This is a paragraph'
        }
    ],
    elm:null,
    key:null
}
```  
### `VNode`的创建  
`VNode`中提供了一个名为`createElement`的方法，用于创建`VNode`对象。该方法接收三个参数：   
+ `tag`:一个字符串，表示节点的标签名。  
+ `data`:一个对象，包含节点的属性、事件、样式等信息。   
+ `children`:一个数组，包含节点的子节点。如果节点没有子节点，则为空数组。
```javascript
const VNode = createElement(
    'div',
    {
        attrs:{
            id:'app',
        }
    },
    [
        createElement('h1','login'),
        createElement('p','this is a paragraph')
    ]
);
```  
### `VNode`的渲染    
```javascript
const VNode = createElement(
    'div',
    {
        attrs:{
            id:'app',
        }
    },
    [
        createElement('h1','login'),
        createElement('p','this is a paragraph')
    ]
)  

const app = document.getElementById('app');
render(VNode,app);
```    
在这个示例中，我们创建了一个`VNode`对象，并将其渲染成真实的`DOM`节点，然后将其插入到`id`为`app`的`DOM`元素中。   

### `VNode`的`diff`算法   
> `Vue`中的虚拟`DOM`算法使用了一种名为`diff`算法的高效算法，用于比较两个`VNode`树的差异，以最小化`DOM`操作次数。   

#### `diff`算法的核心思想  
`diff`算法的核心思想是，通过比较新旧两颗`VNode`树的结构，找出它们之间的差异，然后只更新变化的部分。具体来说，`diff`算法包括以下几个步骤：  
1.比较根节点是否相同。如果不同，则替换整棵树。   
2.比较两棵树的子节点。如果子节点数量不同，则更新整个子树。
3.如果子节点数量相同，则按照以下规则比较每个子节点：  
+ 如果子节点的`key`不同，则认为是不同的节点，替换整个子树。   
+ 如果子节点的`tag`不同，则认为是不同的节点，替换整个子树。  
+ 如果子节点的`tag`和`key`都相同，则比较它们的`data`和`children`属性，找出它们之间的差异，然后更新变化的部分。   

`diff`算法的时间复杂度是`O(n)`，其中`n`是树中节点数量。这意味着`diff`算法的效率非常高，可以快速地比较两棵树的差异。   

在`Vue`里虚拟`DOM`的数据更新机制采用的是异步更新队列，就是把变更后的数据变装入一个数据更新的异步队列，就是`patch`，用它来做新老`vnode`对比。   

#### 认识`Diff`算法   
`Diff`算法,在`Vue`里面就是叫做`patch`,它的核心就是参考[snabbdom](https://github.com/snabbdom/snabbdom),通过新旧虚拟`DOM`对比(即`patch`过程)，找出最小变化的地方转为进行`DOM`操作。  

> 扩展   
> 在`Vue1`里是没有`patch`的，每个依赖都有单独的`Watcher`负责更新，当项目规模变大的时候性能就跟不上了，所以在`Vue2`里为了提升性能，改为每个组件只有一个`Watcher`，那我们需要更新的时候，怎么才能精确找到组件里发生变化的位置呢？所以`patch`它来了。     

#### 那么它是在什么时候执行的呢？
在页面`首次渲染`的时候会调用一次`patch`并创建新的`vnode`，不会进行更深层次的比较。


```javascript
const oldNode = createElement(
    
)
```

```javascript
const babylon = require('babylon');  
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types"); 
``` 



