## 列表 & Key  
首先，让我们看下在`JavaScript`中如何转化列表。   
如下代码，我们使用 map() 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 doubled 并打印出来：  
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```  
代码打印出 [2, 4, 6, 8, 10]。  
在`React`中，把数组转化为**元素**列表的过程是相似的。    

### 渲染多个组件  
可以通过`{}`在`JSX`内构建一个`元素集合`。    
我们使用`JavaScript`中的`map()`方法来遍历`numbers`数组。将数组中的每个元素变成`<li>`标签，最后我们将得到的数组赋值给`listItems`：   
```javascript
const numbers = [1,2,3,4,5];   
const listItems = numbers.map((number)=>{
    <li>{number}</li>
});
```  
我们把整个`listItems`插入到`<ul>`元素中，然后渲染进`DOM`：   
```javascript   
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
```  
这段代码生成了一个1到5的项目符号列表。   

### 基础列表组件   
通常你需要在一个**组件**中渲染列表。   
我们可以把前面的例子重构成一个组件，这个组件接收`numbers`数组作为参数并输出一个元素列表。    
```javascript
    function numberList(props){
        const numbers = props.numbers;
        const listItems = numbers.map((number)=>{
            <li>{number}</li>
        });
        return(
            <ul>{listItems}</ul>
        );
    }
    const numbers = [1,2,3,4,5];
    ReactDOM.render(
        <NumberList numbers={numbers}/>,
        document.getElementById('root')
    );
```    
当我们运行这段代码，将会看到一个警告`a key should be provided for list items`,意思是当你创建一个元素时，必须包括一个特殊的`key`属性。   
让我们来给每个列表元素分配一个`key`属性来解决上面的那个警告:   
```javascript
function NumberList(props){
    const numbers = props.numbers;   
    const listItems = numbers.map((number)=>{
        <li key ={number.toString()}>\
            {number}
        </li>
    });
    return(
        <ul>{listItems}</ul>
    );
}
const numbers = [1,2,3,4,5];  
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```   

### **key**  
`key`帮助`React`识别哪些元素改变了，比如被添加或删除。因此你应该给数组中的每一个元素赋予一个确定的标识。   
```javascript
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number)=>{
    <li key={number.toString()}>{number}</li>
});
```  
一个元素的`key`最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们是用数据中的`id`来作为元素的`key`:  
```tsx
const todoItems = todos.map((todo)=>{
    <li key="todo.id">
        {todo.text}
    </li>
});
```   
当元素没有确定`id`的时候，万不得已你可以使用元素索引`index`作为`key`:   
```tsx
const todoItems = todos.map((todo,index)=>{
    <li key={index}>
        {todo.text}
    </li>
});
```   
如果列表的顺序可能会变化，我们不建议使用索引来用作`key`值，因为这样做会导致性能变差，还可能引起组件状态的问题。如果你选择不指定显式的`key`值，那么`react`将默认使用索引引用作为列表项目的`key`值。   

## **用key提取组件**  
元素的`key`只有放在就近的数组上下文中才有意义。   
比方说，如果你提取出一个 `ListItem` 组件，你应该把 `key` 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>`元素上。   

> 一个好的经验法则是：在`map()`方法中的元素需要设置`key`属性。   

## **key 只是在兄弟节点之间必须唯一**  
数组元素中使用`key`在其兄弟节点之间应该是独一无二的。然而，他们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的`key`值：   
```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```  
`key`会传递信息给`React`，但是不会传递信息给你的组件。如果你的组件中需要使用`key`属性的值，请使用其他属性名显式传递这个值：  
```tsx  
const content = posts.map((post)=>{
    <Post key={post.id} id={post.id} title={post.title} />
});
```  
`Post`组件可以读出`props.id`，但是不能读出`props.key`。    

## 在`JSX`中嵌入`map()`  
在上面的例子中，我们声明了一个单独的`lisItems`变量并将其包含在`JSX`中：   
```tsx
function NumberList(props){
    const numbers = props.numbers;   
    const listItems = numbers.map((number)=>{
        <ListItem key={number.toString()} value={number} />
    });
    return(
        <ul>{lisItems}</ul>
    );
}
```  
`JSX`允许在大括号中嵌入任何表达式，所以我们可以内联`map()`的返回结果。   
```tsx  
function NumberList(props){
    const numbers = props.numbers;   
    return(
        <ul>
            {
                numbers.map((number)=>{
                    <ListItem key={number.toString()} value={number} />
                })
            }
        </ul>
    );
}
```  

`如果一个 map() 嵌套了太多层级，那可能就是你提取组件的一个好时机。`
 
