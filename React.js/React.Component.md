## `React.Component`  
`React`的组件可以定义为`class`或函数的形式。`class`组件目前提供了更多的功能。  
如需定义`class`组件，需要继承`React.Component`。 
在`React.component`的子类中有个必须定义的`Render()`函数。  
> 我们强烈建议你不要创建自己的组件基类。在`React`组件中，代码重用的主要方式是组合而不是继承。  

## 组件的生命周期   
每个组件都包含"生命周期方法"，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。  
[React.Component 生命周期](https://react.docschina.org/docs/react-component.html)

## 生命周期各个阶段   
> 一、**挂载**，当组件实例被创建并插入`DOM`中时,其生命周期调用顺序如下：  

###  1.`constructor`  

> `constructor(props)`  

> 如果不初始化`state`或不进行方法绑定，则不需要为`React`组件实现构造函数。  

在`React`组件挂载之前，会调用它的构造函数。在为`React.Component`子类实现构造函数时，应在其他语句之前调用`super(props)`。否则，`this.props`在构造函数中可能出现未定义的`bug`。   
>在`React`中，构造函数仅用于以下两种情况:  
1. 通过给`this.state`赋值对象来初始化内部`state`。  
2. 为事件处理函数绑定实例       

### 2.`static getDerivedStateFromProps()` 
> `derivedState` 派生状态。`getDerivedStateFromProps`会在调用`render`方法之前调用，并且在初始挂载及后续更新时都会被调用。它返回一个对象来更新`state`,如果返回`null`则不更新任何内容。`getDerivedStateFromProps`这个方法，不管什么原因，都会在每次渲染前触发此方法。这与`UNSAFE_componentWillReCeiveProps`形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用`setState`时。

### 3.`render()`  
> `render()`方法是`class`组件中唯一必须实现的方法。  
当`render()`被调用时，它会检查`this.props`和`this.state`的变化并返回以下类型之一:  
1. `React`元素。  
2. 数组或`fragments`   
3. `Portals`。可以渲染子节点到不同的`DOM`子树中。
4. **字符串或数值类型**。它们在`DOM`中会被渲染为文本节点。
5. **布尔类型或null**。什么都不渲染。  
> `render()`函数应该为纯函数，这意味着在不修改`state`的情况下，每次调用都返回相同的结果，并且它不会直接与浏览器交互。
如需与浏览器进行交互，请在`componentDidMount()`或其他生命周期方法中执行你的操作。保持`render()`为纯函数，可以使组件更容易思考。  
**如果`shouldComponentUpdate()`返回`false`,则不会调用`render()`。**

### 4.`componentDidMount()`  
`componentDidMount()`会在组件挂载后(插入`DOM`树中)立即调用。依赖于`DOM`节点的初始化应该放在这里。如果通过网络请求获取数据，此处是实例化请求的好地方。
这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在`componentWillUnmount()`里取消订阅。

你可以在 `componentDidMount()` 里直接调用 `setState()`。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 `constructor()` 中初始化 `state`。如果你的渲染依赖于 `DOM` 节点的大小或位置，比如实现 `modals` 和 `tooltips` 等情况下，你可以使用此方式处理。  

> 二、更新。当组件的`props`或`state`发生变化时会触发更新。组件更新的生命周期调用顺序如下：  
+ `static getDerivedStateFromProps()`   
会在调用`render`方法之前调用，并且在初始挂载及后续更新时都会被调用。它返回对象来更新`state`,如果返回`null`则不更新任何内容。
+ `shouldComponentUpdate()`    
```javascript
shouldComponentUpdate(nextProps,nextState);
```  
根据`shouldComponentUpdate()`的返回值，判断`React`组件的输出是否受当前`state`或`props`更改的影响。默认行为是`state`每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。  
>当`props`或`state`发生变化时，`shouldComponentUpdate()`会在渲染执行之前被调用。返回值默认为`true`。首次渲染或使用`forceUpdate()`时不会调用`shouldComponentUpdate`方法。  

> 请注意,返回`false`并不会阻止子组件在`state`更新时重新渲染。  

我们不建议在`shouldComponentUpdate()`中进行深层比较或使用`JSON.stringify()`。这样非常影响效率，且损害性能。  

+ **`render()`**  
`render()` 方法是 class 组件中唯一必须实现的方法。
`render()` 函数应该为纯函数，这意味着在不修改组件 `state` 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。  
当`render`被调用时，它会检查`this.props`和`this.state`的变化并返回以下类型之一：  
    1. `React`元素   
    2. 数组或`fragments`
    3. `Portals`  
    4. 字符串或数值类型
    5. 布尔类型或null  

+ `getSnapshotBeforeUpdate()`  
`snapshot`快照
在最近一次渲染输出(提交到`DOM`节点)之前调用。它使得组件能发生在更改之前从`DOM`中捕获一些信息(例如，滚动位置)。此生命周期方法的任何返回值将作为参数传递给`componentDidUpdate()`。  
应返回`snapshot`的值(或null)。

+ **`componentDidUpdate()`**



