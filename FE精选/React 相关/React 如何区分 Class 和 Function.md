[React 参考文档](https://overreacted.io/how-does-react-tell-a-class-from-a-function/)

+ 以函数形式定义的`Greeting`组件。   
```javascript
function Greeting(){
    return `<p>Hello</p>`
}
```
+ 以类的形式定义`Greeting`组件   
```javascript
class Greeting extends React.Component{
    render(){
        return <p>Hello</p>;
    }
}
```  

