## 为什么会出现`react`这个框架？  


## React是什么？
React是一个声明式，高效且灵活的用于构建用户界面的JavaScript库。   
render方法的返回值描述了你希望在屏幕上看到的内容   
React组件接收一些参数，我们把这些参数叫做props，然后通过render方法返回需要展示在屏幕上的视图的层次结构。  
**在React应用中，数据通过Props的传递，从父组件流向子组件。**  
可以通过在React组件中的构造函数中设置`this.state`来初始化state。this.state应该被视为一个组件的私有属性。  
通过`this.setState`通知React去更新其子组件。   

## `react`的出现解决了什么问题？  

## 为什么越来越多的程序员加入`React`的行列？
## 函数组件
如果你想写的组件只包含一个render方法，并且不包含state，那么使用**函数组件**就会更简单。 
## JSX
JSX是JavaScript的语法扩展  
在JSX语法中，你可以在大括号内放置任何有效的JavaScript表达式。 
JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。  
JSX防止注入攻击。  
## JSX表示对象
Babel会把JSX转译成一个名为`React.createElement()函数调用`。   
React.createElement()会预先执行一些检查，以帮助你编写无措代码，但实际上它创建了对象，这些对象被称为“React元素”。它们描述了你希望在屏幕上看到的内容。React通过读取这些对象，然后使用它们来构建DOM以及保持随时更新。  
## 元素渲染
元素描述了你在屏幕上想看到的内容。  
与浏览器的DOM元素不同，React元素是创建开销极小的普通对象。React DOM会负责更新DOM来与React元素保持一致。   
想要将一个React元素渲染到根DOM节点中，只需把它们一起传入ReactDOM.render()
## 更新已渲染的元素
React元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的UI。  
更新UI唯一的方式是创建一个全新的元素，并将其传入ReactDOM.render().
React 只更新它需要更新的部分    
## 组件&Props  
组件，从概念上类似于JavaScript函数。它接受任意的入参(即“props”)，并返回用于描述页面展示内容的React元素。  
### 函数组件与class组件  
**ES6 class**  
```
class xxx extends React.Component{
    render(){
        return  'xxxx';
    }
}
```
### 渲染组件
组件名称必须以大写字母开头。  
React会将以小写字母开头的组件视为原生DOM标签。    
所有React组件都必须像纯函数一样保护它们的props不被更改。  
### 正确地使用State
关于setState()你应该了解三件事：  
+ 1.不要直接修改State  
例如，此代码不会重新渲染组件    
`// Wrong
this.state.comment = 'Hello';
`  
而是应该使用setState():
`
// Correct
this.setState({comment: 'Hello'});
`  
构造函数是唯一可以给this.state赋值的地方  
+ State的更新可能是异步的  
+ State的更新会被合并  
### 数据是向下流动的  
不管是父组件或是子组件都是无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是class组件。  
这通常会被叫做“自上而下”或是”单向“的数据流。任何的state总是所属于特定的组件，而且从该state派生的任何数据或UI只能影响树中“低于”它们的组件。  
### 事件处理
React事件的命名采用小驼峰式(camelCase),而不是纯小写。   
使用JSX语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。  
在React中另一个不同点是你不能通过返回false的方式阻止默认行为。你必须显示的使用**preventDefault**。  
### key
元素的key只有放在就近的数组上下文中才有意义。  
key在兄弟节点之间必须唯一,它们不需要全局唯一。   
key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值。  
### 基于路由的代码分割  
### Context  
Context提供了一种在组件之间共享此类值的方式，而不必显示地通过组件树的逐层传递props。  
`
const ThemeContext=React.createContext('light');  
<!-- 使用一个Provider来将当前的theme传递给以下组件树 -->
<ThemeContext.Provider value="dark">
    <Toolbar />
</ThemeContext.Provider>  
<!-- 在子组件中 -->
// 指定 contextType 读取当前的 theme context。   
  // React 会往上找到最近的 theme Provider，然后使用它的值。   
  // 在这个例子中，当前的 theme 值为 “dark”。  
  static contextType = ThemeContext;    
`













