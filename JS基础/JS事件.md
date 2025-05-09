### **JS事件**  
`JavaScript`(`JS`)事件是网页交互的核心机制，允许开发者响应用户操作或浏览器行为。以下是`JS`事件的关键知识点及示例：   
#### 1.事件模型与流程   
+ **事件流**：分为捕获阶段(从外层到目标元素)和冒泡阶段(从目标元素向外层)。可通过`addEventListener()`的第三个参数选择阶段：   
```javascript
element.addEventListener('click',handler,true); //捕获阶段   
element.addEventListener('click',handler); //冒泡阶段(默认)     
```  
#### 2.事件对象   
事件触发时，回调函数接收`event`对象，包含关键属性：  
+ `target`:触发事件的元素。  
+ `currentTarget`:绑定事件的元素。   
+ `preventDefault()`:阻止默认行为(如链接跳转)。  
+ `stopPropagation()`: 阻止事件传播。   

```javascript
button.addEventListener('click',function(event){
    event.preventDefault(); // 阻止表单提交  
    console.log(event.target);//显示被点击的按钮
})
```  
#### 3.事件委托  
通过父元素代理子元素事件，减少事件绑定次数，提升性能：   
```javascript
document.getElementById('list').addEventListener('click',function(event){
    if(event.target.tagName === 'LI'){
        console.log('点击了列表项：'，event.target.textContent);
    }
});
```  
#### 4.常见事件类型   
+ **鼠标事件**:`click`,`mouseover`,`mouseout`。   
+ **键盘事件**：`keydown`，`keyup`。   
+ **表单事件**：`submit`,`input`,`change`。  
+ **窗口事件**：`load`,`resize`,`scroll`。   

#### 5.自定义事件   
创建并触发自定义事件，用于组件通信：   
```javascript
// 创建事件   
const customEvent = new CustomEvent('myEvent',{detail:{data:'信息'}});  
// 触发事件
element.dispatchEvent(customEvent);  
// 监听事件  
element.addEventListener('myEvent',(e)=>{
    console.log('收到数据'，e.detail.data);
})
```   
> 在`JavaScript`中，**自定义事件(`Custom Events`)**允许开发者创建并触发自己的事件类型，实现组件间通信或复杂交互逻辑的解耦。以下是实现自定义事件的详细步骤和示例;    

> 1.创建自定义事件，使用`CustomEvent`构造函数创建事件对象，可携带自定义数据(通过`detail`属性传递)。  

```javascript
// 创建一个名为`userLogin`的自定义事件，携带用户数据   
const loginEvent = new CustomEvent('userLogin',{
    detail:{
        username:'John',
        timestamp:Date.now()
    },
    bubbles:true,//事件是否冒泡(默认 false)
    cancelable:true //事件是否可取消(默认 false)
})
```  
2.触发自定义事件   
通过`dispatchEvent()`方法在特定元素上触发事件：   
```javascript
const button = document.getElementById('loginButton');   
// 触发事件(事件会被绑定到`button`元素上)  
button.dispatchEvent(loginEvent);
```  
3.监听自定义事件  
使用`addEventListener()`监听自定义事件，并通过`event.detail`获取传递的数据：   
```javascript
button.addEventListener('userLogin', function(event) {
  console.log('用户登录:', event.detail.username);
  // 输出: "用户登录: John"
});

// 也可以在其他元素上监听（若事件冒泡）
document.body.addEventListener('userLogin', (e) => {
  console.log('全局监听到登录事件:', e.detail);
});
```  
4.完整示例   
```javascript
<button id="notifyButton">触发通知</button>
<script>
  const button = document.getElementById('notifyButton');

  // 自定义事件：携带消息内容和类型
  const showNotification = new CustomEvent('showNotification', {
    detail: {
      message: '保存成功！',
      type: 'success'
    },
    bubbles: true
  });

  // 触发事件
  button.addEventListener('click', () => {
    button.dispatchEvent(showNotification);
  });

  // 监听事件（可以在任意位置）
  document.addEventListener('showNotification', (e) => {
    alert(`[${e.detail.type}] ${e.detail.message}`);
  });
</script>
```  
5.高级用法   
继承原生事件(`Event`)  
如果需要更底层控制，可直接使用`Event`构造函数(但无法传递`detail`数据)：  
```javascript
const simpleEvent = new Event("refreshData");  
element.dispatchEvent(simpleEvent);
```  
跨组件通信  
自定义事件常用于解耦不同模块的交互：  
```javascript
// 模块A：触发事件
const dataUpdatedEvent = new CustomEvent('dataUpdated', {
  detail: { newData: [1, 2, 3] }
});
document.dispatchEvent(dataUpdatedEvent);

// 模块B：监听事件
document.addEventListener('dataUpdated', (e) => {
  updateUI(e.detail.newData);
});
```  
6.注意事项   
+ 事件命名：避免与原生事件(如`click`)重名，建议使用特定前缀(如`custom:`)。   
+ 兼容性：`CustomEvent`在现代浏览器中支持良好，旧版`IE`需使用`createEvent`+`initEvent`(参考`Polyfill`)。   
+ 内存管理：及时移除不再需要的事件监听，防止内存泄漏。   

> 通过`CustomEvent`构造函数和`dispatchEvent`方法，可以灵活创建、触发和监听自定义事件。结合`detail`属性传递数据，能有效实现模块间通信，状态同步等复杂场景，提升代码的可维护性和扩展性。   




#### 6.移除事件监听   
使用`removeEventListener()`移除处理函数，需确保参数一致：   
```javascript
const handler =()=> console.log('Clicked!');  
element.addEventListener('click',handler);  
element.removeEventListener('click',handler); // 成功移除
```  
#### 7.注意事项  
+ 内存泄漏：未移除事件监听可能导致内存占用。   
+ `this`指向：传统函数中`this`指向绑定元素，箭头函数需额外处理。  
+ 移动端事件：处理`touchstart`和`touchend`等触摸事件。  
#### 8.阻止默认行为与冒泡  
+ 阻止默认行为：`event.preventDefault()`。   
+ 阻止冒泡：`event.stopPropagation()`。   

### 总结  
掌握事件模型、委托、自定义事件等概念，能高效处理用户交互。合理利用事件委托优化性能，注意避免内存泄漏和兼容性问题，可提升网页体验。  




