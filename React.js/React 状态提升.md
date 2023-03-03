## 状态提升  
通常，多个组件需要反映相同的变化数据。这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。   
eg：`创建一个用于计算水在给定温度下是否会沸腾的温度计算器。`  

我们将从一个名为`BoilingVerdict`的组件开始，它接受`celsius`温度作为一个`prop`,并据此打印出该温度是否足以将水煮沸的结果。   
```javascript  
function BoilingVerdict(props){
    if(props.celsius >= 100){
        return `<p>The water would boil</p>`;
    }
    return `<p>The water would not boil</p>`;
}
```    
接下来，我们创建一个名为`Calculator`的组件。它渲染一个用于输入温度的`<input>`,并将其值保存在`this.state.temperature`中。   
根据当前输入值渲染`BoilingVerdict`组件。 
`Calculator`  计算器
```tsx  
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```  
### 添加第二个输入框  
新需求是，在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步。   
我们先从`Calculator`组件中抽离出`TemperatureInput`组件，然后为其添加一个新的`scale`prop,它可以是"c"或是"f"。  
```tsx   
const scaleNames = {
    c:'Celsius',
    f:'Fahrenheit'
};
class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        
    }A
}
```

