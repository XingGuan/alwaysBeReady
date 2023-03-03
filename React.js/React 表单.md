## 表单   
在`React`里，`HTML`表单元素的工作方式和其他的`DOM`元素有些不同，这是因为表单元素通常会保持一些内部的`state`。例如这个纯`HTML`表单只接受一个名称：  
```html 
    <form>
        <label>名字：
            <input type="text" name="name" />
        </label>
        <input type="submit" value="提交" />
    </form>
```   
此表单具有默认的`HTML`表单行为，即在**用户提交表单后浏览到新页面**。如果你在 `React` 中执行相同的代码，它依然有效。但大多数情况下，使用 `JavaScript` 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。  

## 受控组件  
在`HTML`中，表单元素`input`、`textarea`、`select`之类的表单元素通常自己维护`state`,并根据用户输入进行更新。而在`React`中，可变状态(multable state)通常保存在组件的`state`属性中，并且只能通过使用`setState()`来更新。   
我们可以把两者结合起来，使`React`成为`State`的"唯一数据源"。渲染表单的`React`组件还控制着用户输入过程中表单发生的操作。被`React`以这种方式控制取值的表单输入元素就叫做"受控组件"。  
例如：如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：  
```tsx   
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```  
由于在表单上设置了`value`属性，因此显示的值始终为`this.state.value`,这使得`React`的`state`成为唯一数据源。由于`handlechange`在每次按键时都会执行并更新`React`的`state`，因此显示的值将随着用户输入而更新。   

对于受控组件来说，输入的值始终由`React`的`state`驱动。你也可以将`value`传递给其他`UI`元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。   

### `textarea`标签   
在`HTML`中,`<textarea>`元素通过其子元素定义其文本：  
```html
<textarea>
  你好，这是在 text area 里的文本
</textarea>
```  
而在`React`中，`<textarea>`使用`value`属性代替。这样，可以使得使用`<textarea>`的表单和使用单行`input`的表单非常类似：  
```tsx  
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的文章: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```  
> 总的来说，这使得`<input type="text">`,`<textarea>`和`<select>`之类的标签都非常相似-它们都接受一个`value`属性，你可以使用它来实现受控组件。   

> **注意**  
你可以将数组传递到`value`属性中，以支持在`select`标签中选择多个选项：   
```html
<select multiple={true} value={['B','C']}>
```   
## **文件`input`标签**  
在`HTML`中，`<input type="file">`允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用`JavaScript`的`File API`进行控制。   
```html
  <input type="file" />
```  
因为它的`value`只读，所以它是`React`中的一个**非受控**组件。  
## 处理多个输入   
当需要处理多个`input`元素时，我们可以给每个元素添加`name`属性，并让处理函数根据`event.target.name`的值选择要执行的操作。  
```tsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```   
这里使用了`ES6`计算属性名称的语法更新给定输入名称对应的`state`值：  
例如：  
```javascript
this.setState({
  [name]:value
});
```  
等同ES5：   
```javascript
var partialState = {};  
partialState[name] = value;  
this.setState(partialState);
```  
另外，由于`setState()`自动将部分`state`合并到当前`state`，只需调用它更改部分`state`即可。   
### 受控输入空值   
在受控组件上指定`value`的`prop`会阻止用户更改输入。如果你指定了`value`,但输入仍可编辑，则可能是你意外地将`value`设置为`undefined` 或 `null`。   
下面的代码演示了这一点。(输入最初被锁定,但在短暂延迟后变为可编辑)   
```tsx
ReactDOM.render(<input value='hi' />,mountNode);  
setTimeout(function(){
  ReactDOM.render(<input value={null} />,mountNode);
},1000);
```  
### 受控组件的替代品   
有时候使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个`React`组件传递所有的输入`state`。     


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
