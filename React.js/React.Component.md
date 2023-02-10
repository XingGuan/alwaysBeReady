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
```javascript
    componentDidUpdate(prevProps,prevState,snapshot);
```  
`componentDidUpdate()`会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对`DOM`进行操作。如果你对更新前后的`props`进行了比较，也可以选择在此处进行网络请求。  
```tsx
    componentDidUpdate(prevProps){
        if(this.props.userID !== prevProps.userID){
            this.fetchData(this.props.userID);
        }
    }
```  
你也可以在`componentDidUpdate()`中**直接调用 `setState`**,但是请注意**它必须被包裹在一个条件语句里**，正如上述的例子那样进行处理，否则会导致死循环。他还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将`props`"镜像"给`state`,请考虑直接使用`props`。  

> 如果组件实现了`getSnapshotBeforeUpdate()`生命周期,则它的返回值将作为`componentDidUpdate()`的第三个参数"snapshot"参数传递。否则此参数将为`undefined`。  

> **注意**  
> 如果 `shouldComponentUpdate()` 返回值为`false`,则不会调用`componentDidUpdate()`。

> 三、**卸载**。当组件从`DOM`中移除时会调用如下方法：  
+ `componentWillUnmount()`  
`componentWillUnmount()`会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除`timer`,取消网络请求或清除在`componentDidMount()`中创建的订阅等。  
`componentWillUnmount()`中**不应调用setState()**,因为该组件将永远不会重新渲染。组件实例卸载后，将永不会再挂载它。   

### 错误处理  
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：  
+ `static getDerivedStateFromError()`    
此生命周期会在后代组件抛出错误后被调用。它将抛出的错误作为参数，并返回一个值以更新`state`。  

> **注意**  
> `getDerivedStateFromError()`会在`渲染`阶段调用，因此不允许出现副作用。如遇此类情况请改用`componentDidCatch()`。  

+ `componentDidCatch()`  
`componentDidCatch(error,info)`  
此生命周期在后代组件抛出错误后被调用。它接收两个参数:  
1.`error`---抛出的错误。  
2.`info`---带有`componentStack`key的对象。   
`ComponentDidCatch()`会在"提交"阶段被调用，因此允许执行副作用。它应该用于记录错误之类的情况：  
`React`的开发和生产构建版本在`componentDidCatch()`的方式上有轻微差别。
在开发模式下，错误会冒泡至`window`,这意味着任何`window.error`或`window.addEventListener('error',callback)`会中断这些已经被`componentDidCatch()`捕获的错误。  
相反，在生产模式下，错误不会冒泡，这意味着任何根错误处理器只会接受那些没有显示地被`componentDidCatch()`捕获的错误。  

>如果发生错误，你可以通过调用 `setState` 使用 `componentDidCatch()` 渲染降级 `UI`，但在未来的版本中将不推荐这样做。 可以使用静态 `getDerivedStateFromError()` 来处理降级渲染。  

## 其他`APIs`  
组件还提供了一些额外的`API`：  
> + `setState()`  
```tsx  
setState(updater[,callback])
```  
`setState()` 将对组件的`state`的更改排入队列，并通知`React`需要使用更新后的`state`重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式。   

将`setState`视为请求而不是立即更新组件的命令。为了更好的感知性能，`React`会延迟调用它，然后通过一次传递更新多个组件。在罕见的情况下，你需要强制`DOM`更新同步应用，你可以使用`flushSync`来包装它，但这可能会损害性能。  

`setState()`并不总是立即更新组件。它会批量推迟更新。这使得在调用`setState()`后立即读取`this.state`成为了隐患。为了消除隐患，请使用`componentDidUpdate`或者`setState`的回调函数(`setState(updater,callback)`),这两种方式都可以保证在应用更新后触发。如需基于之前的`state`来设置当前的`state`,请阅读下述关于参数`updater`的内容。   

除非`shouldComponentUpdate()`返回`false`,否则`setState()`将始终执行重新渲染操作。如果可变对象被使用，且无法在`shouldComponentUpdate()`中实现条件渲染，那么仅在新旧状态不一致时调用`setState()`可以避免不必要的重新渲染。  

参数一为带有形式参数的`updater`函数：  
```tsx  
(state,props) => stateChange 
``` 
`state`是对应用变化时组件状态的引用。当然，它不应该直接被修改。你应该使用基于`state`和`props`构建的新对象来表示变化。例如，假设我们想根据`props.step`来增加`state`:  
```javascript
this.setState((state,props)=>{
    return {counter: state.counter + props.step};
});
```  
`updater`函数中接收的`state`和`props`都保证为最新。`updater`的返回值会与`state`进行浅合并。  
`setState()`的第二个参数为可选的回调函数，它将在`setState`完成合并并重新渲染组件后执行。通常，我们建议使用`componentDidUpdate()`来代替此方式。  
`setState()`的第一个参数除了接受函数外，还可以接受对象类型：  
```javascript
setState(stateChange[,callback])  
```    
`stateChange`会将传入的对象浅层合并到新的`state`中，例如，调整购物车商品数：  
```javascript
this.setState({quantity:2});
```  
这种形式的`setState()`也是异步的，并且在同一个周期内会对多个`setState`进行批处理。例如，如果在同一周期内多次设置商品数量增加，则相当于：
```javascript
Object.assign(
    previousState,
    {quantity: state.quantity + 1},
    {quantity: state.quantity + 1},
    ……
)
```  
后调用的`setState()`将覆盖同一周期内先调用`setState()`的值，因此商品数仅增加一次。如果后续状态取决于当前状态，我们建议使用`updater`函数的形式代替:   
```javascript
this.setState((state)=>{
    return {quantity:state.quantity + 1};
}
```
> `forceUpdate()`  
```javascript
component.forceUpdate(callback);
```  
默认情况下，组件的`state`或`props`发生变化时，组件将重新渲染。如果`render()`方法依赖于其他数据，则可以调用`forceUpdate()`强制让组件重新渲染。  
调用`forceUpdate()`将致使组件调用`render()`方法，此操作会跳过该组件的`shouldComponentUpdate()`。但其子组件会触发正常的生命周期方法，包括`shouldComponentUpdate()`方法。如果标记发生变化，`React`仍将只更新DOM。   
通常你应该避免使用`forceUpdate()`，尽量在`render()`中使用`this.props`和`this.state`。    

## `class`属性
一、`defaultProps`可以为`Class`组件添加默认`props`。这一般用于`props`未赋值，但又不能为`null`的情况。例如:  
```tsx
class CustomButton extends React.Component{
    //……
}
CustomButton.defaultProps = {
    color : 'blue'
}
```
如果未提供`props.color`，则默认设置为`blue`。  
```javascript
render(){
    return <CustomButton />;//props.color 将设置为'blue'
}
```  
如果`props.color`被设置为`null`,则它保持为`null`。  
```javascript
render(){
    return <CustomButton color={null}/> //props.color 将保持是null
}
``` 
二、`displayName`字符串多用于调试信息。通常，你不需要设置它，因为它可以根据函数组件或`class`组件的名称推断出来。  


## **实例属性**  
> 一、`props`  
  
`this.props`包括被该组件调用者定义的`props`。   
`this.props.children`是一个特殊的`prop`,通常由`JSX`表达式中的子组件组成，而非组件本身定义。

> 二、`state` 组件中的`state`包含了随时可能发生变化的数据。`state`由用户自定义。它是一个普通`JavaScript`对象。   
> 如果某些值未用于渲染或数据流，则不必将其设置为`state`。此类值可以在组件实例上定义。

> **永远不要直接改变`this.state`**,因为后续调用的`setState()`可能会替换掉你的改变。请把`this.state`看作是不可变的。   


