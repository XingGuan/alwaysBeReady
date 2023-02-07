## 事件处理  
`React`元素的事件处理和`DOM`元素的很相似，但是有一点语法上的不同：  
+ `React`事件的命名采用小驼峰式(`camelCase`)，而不是纯小写。  
+ 使用`JSX`语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
```html
<button onclick="activateLasers()">
    Activate Lasers
</button>
```  
在`React`中略微不同： 
```html
<button onclick={activeLasers}>
    Activate Lasers
</button>
```
> 在 `React`中另一个不同点是你不能通过返回`false`的方式阻止默认行为。你必须显示的使用`preventDefault`。   

```html  
<a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
</a>
```  
在`React`中，可能是这样：  
```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```  
在这里，e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。  

使用`React`时，你一般不需要使用`addEventListener`为已创建的`DOM`元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。   

当使用`ES6 class`语法定义一个组件的时候，通常的做法是将事件处理函数声明为`class`中的方法。     

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```  
你必须谨慎对待`JSX`回调函数中的`this`,在`javascript`中，**`class`的方法默认不会绑定`this`**。
> 如果你忘记绑定`this.handleClick`并把它传入了`onclick`,当你调用这个函数的时候`this`的值为`undefined`。   
这并不是`React`的特有行为；这其实与`JavaScript函数工作原理`有关。通常情况下，如果你没有在方法后面追加`()`,例如`onclick={this.handelClick}`，你应该为这个方法绑定`this`。  

`bind`很麻烦，这里有两种方式可以解决：  
```javascript
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```  
如果你没有使用 class fields 语法，你可以在回调中使用箭头函数：  
```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```  
> 此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。  

## 向事件处理程序传递参数   

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```   
上述两种方式是等价的，分别通过箭头函数和 `Function.prototype.bind` 来实现。  

在这两种情况下，`React` 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。
