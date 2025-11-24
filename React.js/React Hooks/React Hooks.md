## `React`函数式组件  
### `React Hooks`
#### 1.函数式组件是基础，`Hooks`是能力扩展
> `React Hooks`是`React`函数式组件的扩展能力。
+ **函数式组件** 是通过`JavaScript`函数定义的组件(接收 `props` 并返回 `JSX`)。  
+ `Hooks`是函数式组件的增强工具，允许在函数式组件中使用状态、生命周期等原本只有类组件才具备的能力。  
```jsx
// 函数式组件(无状态)  
function StaticComponent(props){
    return <div>{props.text}</div>
}
// 使用 `Hooks` 增强后的函数式组件(有状态)  
// Dynamic 动态
function DynamicComponent(){
    const [count,setCount] = useState(0); // 使用 useState Hook  
    return <button onclick="{()=>{setCount(count+1)}">Count:{count}</button>
}
```
#### 2.`Hooks`解决了函数式组件的局限性  
在`Hooks`出现之前，函数组件只能作为"无状态组件"使用，复杂逻辑需要依赖类组件。`Hooks`的引入让函数式组件能够：  
+ 管理状态(`useState`、`useReducer`)。  
+ 处理副作用(`useEffect`、`useLayoutEffect`)。  
+ 访问上下文(`useContext`)。  
+ 复用逻辑(自定义 `Hooks`)。  
3.`Hooks`是函数式组件的"灵魂"。   
+ 类组件的替代：`Hooks`提供了在函数式组件中实现类组件功能的方案（）。
+ 逻辑复用：通过自定义 `Hooks` (如 `useApi`) 抽象状态逻辑，替代类组件的`HOC` 或 `Render Props`模式。
```javascript
// 自定义 Hook 复用逻辑  
function useCounter(initialValue){
    const [count,setCount] = useState(initialValue);
    const increment = ()=> setCount(count+1)
    return {count,increment}
}
// 多个组件共享同一逻辑  
function ComponentA(){
    const { count,increment} = useCounter(0);
    return `<button onClick={increment}>A:{count}</button>`
}
```
```javascript
// 子组件使用 React.memo 包装，对props进行浅比较
const child = React.memo({value,onClick}=>{
    // 只有 props 真正变化时才打印
    console.log("Child 渲染了");
    return <button onClick={onClick}>{value}</button>;
});
function Parent(){
    const [count,setCount] = useState(0);
    const [text,setText] = useSate('');  
    // 不使用`useCallback`:每次`parent`渲染都创建新函数
    // const handelClick = ()=>{ console.log(count) }
    // 使用 useCallback 函数引用稳定  
    const handelClick = useCallback(()=>{
        console.log(count);
    },[count]);
    // 使用 useMemo:值引用稳定
    const memoizedValue = useMemo(()=>{
        ({data:text})
    },[text])    
    return({
        <div>
            <button onClick={()=>{setCount(c=>c+1)}}>Count:{count}</button>
            <input value={text} onChange={e=> setText(e.target.value)} />
            <Child value={memorizedValue} onClick={handleClick} />
        </div>
    })
}

```  
> 优化逻辑判断，引用相等性`(Referential Equality)`。  

> `Hooks`:钩子的意思。消息处理的一种方法，用来监视指定程序。函数中需要处理副作用，可以用钩子把外部代码"钩"进来。常用钩子：`useState`、`useEffect`、`useContext`、`useReducer`。  

#### 3.`Hooks`的本质  
+ 一类特殊的函数，为你的函数式组件（`function component()`）注入特殊的功能。
#### 4.`React`为什么要创造`Hooks`这个概念？  
+ 有些组件冗长而且复杂，难以复用。  
+ 解决方案：**无状态组件**与**HOC(高阶组件)**，但还是存在诸多问题。  
+ `Hooks`的目的是为了给函数式组件加上状态。  
+ 生命周期函数会同时处理多项任务：发起"`ajax`"、跟踪数据状态、绑定事件监听。
+ 函数式组件轻量化很多，使用`Hooks`钩子来钩入组件状态。    

`Hooks`代表了`React`框架的一次重大变革。  
+ 我们不再需要类组件了。 
+ 不会再有 `this`,不会再有`binding`、甚至有可能取代`Redux`。
+ 简化了代码，减少了模版，降低了学习难度。

#### 5.`Hooks`常见的钩子函数 
+ 状态钩子：`useState()`  
`const {count,setCount } = useState(0)`;
`React`自带的一个`hook`函数，声明组件状态。  
参数可以设置`state`的初始值`{initial state}`     
返回值是一个只有两个元素的数组：{状态，状态更新函数}
+ 副作用钩子：`useEffect()`  
`useEffect(()=>{
    document.title = `点击${count}次`;
},[count])`
+ 可以取代生命周期函数 `componentDidMount`、`ComponentDidUpdate` 和 `ComponentWillUnmount`。
+ 给函数式组件添加副作用 `{side effect}`  
#### 6.还有哪些自带的`Effect Hooks`?  
+ `useContext()` 处理跨组件的数据传递
+ `useReducer()` 用来管理全局状态 
+ `useCallback()` 用来处理回调的副作用  
+ `useRef()` 用来返回一个引用的对象  
+ `useLayoutEffect()` 处理副作用（在所有的`DOM`元素变更之后同步调用，读取`DOM`布局并同步触发重新渲染）。
+ `useDebugValue()` 可以在`React`开发者工具中显示自定义的`hook`标签。

### 文档 
[`Hooks`英文](https://reactjs.org/docs/hooks-reference.html)
[`Hooks`中文](https://zh-hans.reactjs.org/docs/hooks-reference.html)

### 函数副作用  
**函数副作用**指的是一个函数在执行过程中，除了返回一个值之外，还对函数**外部环境**产生了可观察的**影响**或**修改**。  
简单来说，如果一个函数做了"本职工作"(计算并返回结果)之外的任何事情，那么它就产生了副作用。    
**纯函数**指的是一个函数，在**相同输入**下，永远会得到**相同的输出**，并且**没有任何可观察的副作用**。  
这个定义包含两个关键点：   
1.相同输入=>相同输出  
2.无副作用   


