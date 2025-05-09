<!--
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2024-12-07 11:53:26
-->
### `React Hooks`相关问题思考  
#### 1.什么是`Hooks`?   
`React Hooks`是`React 16.8`版本引入的一种新功能，允许你在不编写类组件的情况下使用状态和其他`React`特性。   
主要特点  
1. 状态管理：   
  `useState`:用于在函数组件中添加状态。  
2. 副作用处理   
`useEffect`:用于处理副作用，如数据获取、订阅或手动更改`DOM`。  

3. 性能优化  
+ `useMemo`:用于缓存计算结果，避免不必要的计算。  
+ `useCallback`: 用于缓存函数，避免不必要的函数重新创建。  

4.上下文管理  
+ `useContext`:用于访问`React`上下文，减少`prop drilling`。   

5.自定义`Hooks`  
+ 可以创建自定义`Hooks`来封装和复用逻辑，提高代码的可维护性和可读性。   

### `Hooks`规则   
1.只能在顶层调用`Hooks`:  
+ 不能在循环、条件或嵌套函数中调用`Hooks`。   
2.只能在`React`函数组件或自定义`Hooks`中调用`Hooks`。   
+ 不能在普通`JavaScript`函数中调用`Hooks`。   

通过使用`Hooks`,你可以更轻松地管理和复用组件的状态和生命周期逻辑，从而使代码更加简洁和易读。    

#### 2.什么是纯函数？
纯函数是函数式编程中的一个重要概念，具有以下两个核心特点：   
1.相同的输入永远会得到相同的输出：   
+ 无论何时调用纯函数，只要输入参数相同，返回的结果总是相同的。这使得纯函数的行为可预测且易于测试。   
2.没有任何可观察的副作用：  
+ 纯函数不会修改任何外部状态或变量，也不会进行任何`I/O`操作(如网络请求、文件读写等)。它只依赖于输入函数，并且只返回计算结果。   

纯函数的优点
1.可预测性：  
+ 纯函数的行为完全由输入决定，使得函数的行为可预测，更容易理解和调试。   
+ 2.可测试性：  
+ 由于纯函数没有副作用，测试纯函数只需要关注输入和输出，无需考虑外部状态的变化，使得测试更加简单。   
+ 3.可并发性：  
+ 纯函数不依赖于外部状态，可以在多线程环境中安全地并发执行，不会出现竞态条件等问题。   
4.可组合性：   
+ 纯函数可以很容易地组合在一起，形成更复杂的函数，从而构建出强大的应用程序。    

#### 在`React`中的应用   
在`React`中，纯函数的概念也非常重要。`React`的`useState`和`useReducer`钩子鼓励使用纯函数来管理状态，这样可以确保状态的更新是可预测的。      

#### 3.什么是副作用   
在编程中，**副作用**(`Side Effect`)是指函数在执行过程中除了返回值之外，还对程序状态进行了其他更改或产生了外部影响。这些更改或影响通常是不可预测的，可能会导致代码的可读性和可维护性降低。   
##### 常见的副作用类型   
1.修改全局变量    
+ 函数修改了全局变量或外部作用域中的变量。    
2.网络请求  
+ 函数发送网络请求，这通常涉及`I/O`操作。    
3.`DOM`操作：   
+ 函数直接操作`DOM`元素，这会影响页面的渲染。   

4.日志记录：   
+ 函数记录日志，虽然通常不会影响程序状态，但仍然是一种副作用。    
+ 5.时间相关的操作：  
+ 函数使用`setTimeout`或`setInterval`进行异步操作。    

6.文件读写：   
+ 函数读取或写入文件系统。   

为什么副作用重要？   
1.可预测性：   
+ 无副作用的函数（即纯函数）行为可预测，更容易理解和调试。   
2.可测试性：   
+ 纯函数的测试更简单，因为只需要关注输入和输出，不需要考虑外部状态的变化。   
3.并发安全性：   
+ 无副作用的函数可以在多线程环境中安全地并发执行，不会出现竞态条件等问题。   
4.代码可维护性：   
+ 减少副作用可以使代码更加模块化和解耦，提高代码的可维护性。    

在`React`中的副作用  
在`React`中，`useEffect`钩子用于处理副作用。`useEffect`可以在组件挂载、更新和卸载时执行副作用操作，如数据获取、订阅事件或手动更改`DOM`。   

##### 有状态组件和无状态组件的区别  
在`React`中，组件可以分为两类：有状态组件(`Stateful Components`)和无状态组件(`Stateless Components`)。这两类组件在功能和使用场景上有一些重要的区别。   
1.有状态组件(`Stateful Components`)
定义：   
+ 有状态组件是可以拥有内部状态`state`的组件。这些状态可以在组件的生命周期内发生变化，并且这些变化会触发组件的重新渲染。   

特点：   
1.拥有状态：  
+ 使用`useState`钩子(在函数组件中)或`this.state`(在类组件中)来管理内部状态。   

2.生命周期方法：   
+ 类组件可以使用生命周期方法(如`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等)来处理组件的生命周期事件。   

3.复杂逻辑  
+ 有状态的组件通常用于处理复杂的业务逻辑，如表单处理、数据获取等。   
  
2.无状态组件(`stateless Components`)    
定义：  
+ 无状态组件是没有内部状态的组件。它们只负责根据传入的`props`渲染`UI`,不会管理任何状态。   

特点：   
1.没有状态：   
+ 不使用`useState`或`this.state`来管理状态。   
2.纯函数   
+ 无状态组件通常是一个纯函数，只依赖于输入的`props`来返回`UI`。   
3.性能优化：  
+ 由于无状态组件不涉及状态管理，`React`可以更高效地对其进行优化，如使用`React.mome`来避免不必要的重新渲染。    

4.简单逻辑：   
+ 无状态组件通常用于简单的`UI`展示，如按钮、标签等。   

3.选择合适的组件类型  
+ **有状态组件**适用于需要管理内部状态和处理复杂业务逻辑的场景。   
+ **有状态组件**适用于简单的`UI`展示和不需要管理状态的场景。    

4.`React Hooks`的影响   
随着`React Hooks`的引入，函数组件也可以拥有状态和生命周期方法，这使得函数组价和类组件之间的界限变得模糊。现在,你可以使用函数组件来实现以前只能用类组件实现的功能。     

#### 5.如何跨组件传递数据   
1.通过`Props`传递数据   
父组件向子组件传递数据：   
+ 使用`props`将数据从父组件传递给子组件。    
  
子组件向父组件传递数据：   
+ 通过回调函数将数据从子组件传递给父组件。   

2.使用`Context API`:   
创建和使用`Context`:   
+ 使用`React.createContext()`创建一个`Context`对象。   
+ 使用`Provider`组件传递数据   
+ 使用`useContext`钩子或`Consumer`组件消费数据。   

```jsx   
import React,{createContext,useContext,useState} from 'react';   
// 创建Context   
const Mycontext = createContext();   
// Provider 组件   
function Provider({children}){
    const [data,setData] = useState("Shared Data");
    return (
        <MyContext.Provider value={{data,setData}}>
            {children}
        </MyContext.Provider>
    )
}
// 消费Context 组件   
function ChildComponent(){
    const {data,setData} = useContext(MyContext);  
    return (
        <div>
            <p>{data}</p>
            <button onClick={
                ()=>setData("updated Data")
            }>Update Data</button>
        </div>
    )
}
// 根组件   
function App(){
    return （
        <MyProvider>
            <ChildComponent/>
        </MyProvider>
    ）
}
```     
3. 使用`Redux`  
`Redux`是一个全局状态管理库：  
+ 适用于大型应用，需要集中管理状态的情况。   
安装`Redux`:   
```bash
npm install redux react-redux   
```   
**创建`Store`**:   
```jsx   
import {createStore} from 'redux';
// 定义 reducer   
function rootReducer(state = { data: "Initial Data" }, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
// 创建 store   
const store = createStore(rootReducer);
```  
**提供Store**：   
```jsx  
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```  
连接组件到`Store:`   
```jsx   
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```   
**连接组件到Store**
```jsx   
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ChildComponent() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const updateData = () => {
    dispatch({ type: 'UPDATE_DATA', payload: 'Updated Data' });
  };

  return (
    <div>
      <p>{data}</p>
      <button onClick={updateData}>Update Data</button>
    </div>
  );
}
```  
4.使用自定义`Hooks`   
创建自定义`Hook`:   
+ 封装状态逻辑，使其可以在多个组件之间服用。   

```jsx  
import { useState } from 'react';

function useSharedState(initialValue) {
  const [value, setValue] = useState(initialValue);

  return [value, setValue];
}

// 组件 A
function ComponentA() {
  const [sharedValue, setSharedValue] = useSharedState("Initial Value");

  return (
    <div>
      <p>Component A: {sharedValue}</p>
      <button onClick={() => setSharedValue("Updated from A")}>
        Update from A
      </button>
    </div>
  );
}

// 组件 B
function ComponentB() {
  const [sharedValue, setSharedValue] = useSharedState("Initial Value");

  return (
    <div>
      <p>Component B: {sharedValue}</p>
      <button onClick={() => setSharedValue("Updated from B")}>
        Update from B
      </button>
    </div>
  );
}
```   
5.使用事件总线  
创建事件总线：  
+ 使用第三方库(如`eventemitter3`)或组定义事件总线来传递数据。    
```bash   
npm install eventemitter3
```  
创建事件总线：   
```jsx   
import EventEmitter from 'eventemitter3';

export const eventBus = new EventEmitter();
```   
发布事件：   
```jsx   
import { eventBus } from './eventBus';

function ComponentA() {
  const sendData = () => {
    eventBus.emit('dataEvent', 'Data from A');
  };

  return (
    <button onClick={sendData}>Send Data</button>
  );
}
```   
监听事件：   
```jsx  
import { eventBus } from './eventBus';

function ComponentB() {
  useEffect(() => {
    const handler = (data) => {
      console.log('Received data:', data);
    };

    eventBus.on('dataEvent', handler);

    return () => {
      eventBus.off('dataEvent', handler);
    };
  }, []);

  return <div>Component B</div>;
}
```  
总结：   
+ `Props`:适用于父子组件之间的简单数据传递。  

+ `Context API`：适用于需要在多个层级组件之间共享数据的情况。 

+ `Redux`：适用于大型应用，需要集中管理状态的情况。
自定义 Hooks：适用于封装状态逻辑，使其可以在多个组件之间复用。  

+ **事件总线**：适用于需要在非父子组件之间传递数据的情况。

选择合适的方法取决于应用的规模和复杂性。对于小型应用，使用 `Props` 和 `Context API` 通常已经足够；对于大型应用，可能需要考虑使用 Redux 或其他状态管理库。  

#### 6.`HOC`是什么意思   
+ 1，定义   
`HOC(Higher-Order Component)` 是`React`中的一种高级组件模式，用于复用组件逻辑。`HOC`是一个函数，它接收一个组件作为参数，并返回一个新的组件。    

2.用途
**逻辑复用**：`HOC`可以让你在多个组件之间复用逻辑，而不需要重复编写相同的代码。   
**代码组织**：通过将逻辑抽象到`HOC`中，可以使组件的代码更加简洁和易于维护。   
**增强功能**：`HOC`可以为组件添加额外的`props`、状态管理、生命周期方法等。   
3.基本结构   
```jsx   
function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }

    componentWillUnmount() {
      console.log('Component will unmount');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
```   
在这个例子中，withLogging 是一个 HOC，它接受一个组件 WrappedComponent 作为参数，并返回一个新的组件。新的组件在 componentDidMount 和 componentWillUnmount 生命周期方法中添加了日志记录功能。   
4.使用`HOC`  
假设我们有一个`Button`组件，我们希望在每次`Button`组件挂载和卸载时记录日志。    
```jsx   
class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>Click me</button>;
  }
}

const LoggingButton = withLogging(Button);

function App() {
  return (
    <div>
      <LoggingButton onClick={() => console.log('Button clicked')} />
    </div>
  );
}
```
在这个例子中，LoggingButton 是通过 withLogging HOC 包装后的 Button 组件。每当 LoggingButton 挂载和卸载时，都会在控制台中记录日志。   

5.常见的`HOC`用法  
+ 数据获取：在 HOC 中处理数据获取逻辑，并将数据作为 props 传递给被包装的组件。
+ 权限控制：在 HOC 中检查用户的权限，并根据权限决定是否渲染被包装的组件。
+ 状态管理：在 HOC 中管理组件的状态，并将状态作为 props 传递给被包装的组件。
+ 性能优化：在 HOC 中使用 React.memo 或 shouldComponentUpdate 来优化组件的性能   

6.注意事项   
+ 静态方法：HOC 可能会丢失被包装组件的静态方法。可以通过 hoist-non-react-statics 库来解决这个问题。
+ displayName：为了方便调试，建议为 HOC 返回的组件设置 displayName 属性。
+ 嵌套 HOC：可以将多个 HOC 嵌套使用，但需要注意顺序和依赖关系。  

> 总结  
> `HOC`是`React`中一种强大的模式，用于复用组件逻辑。通过将逻辑抽象到`HOC`中，可以使组件的代码更加简洁和易于维护。`HOC`可以用于数据获取、权限控制、状态管理等多种场景。   


