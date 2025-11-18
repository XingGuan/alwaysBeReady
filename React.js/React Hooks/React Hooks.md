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

