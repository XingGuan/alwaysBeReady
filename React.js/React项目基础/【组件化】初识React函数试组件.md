### 结合项目名称: `robot-gallery`  线上机器人卡通绘画商店  

### 了解项目基本组件`src/App.tsx`  
```tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```   
输出：`App`函数  
`App`函数---第一个组件(函数式组件)  

### 什么是函数式组件  
```jsx
function App(){} //function App():JSX.Element
```   

### `index.tsx`  
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```  
这里把`App`函数传递给`ReactDOM`的`render`函数，让`react`来帮助渲染虚拟`DOM`。  

### 项目编写过程 
1.在src文件夹下，创建`mockdata`数据  
2.将`mock`的数据引入到`App.tsx`  
3.在`App`函数的返回中，我们可以使用`ul`元素来渲染列表
4.对于`ul`的每一个元素，我们都可以创建一个新的组件来进行处理。创建放组件文件夹在`src`下创建`components`



