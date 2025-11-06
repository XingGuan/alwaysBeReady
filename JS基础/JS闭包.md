
###　变量的生命周期
全局变量的作用域是全局性的，即在整个`JavaScript`程序中，全局变量处处都在。   
而在函数内部声明的变量，只在函数内部起作用。这些变量是局部变量。作用域是局部性的；函数的参数也是局部性的，只在函数内部起作用。      
### 作用域和自由变量  
作用域代表了一个变量的合法范围，一个变量的作用域是**程序中定义这个变量的区域**。   
> 可以这样理解，凡是跨了自己的作用域的变量都叫自由变量。   

### **JS闭包(Closure)**  
**闭包**是一个函数以及其捆绑的周边环境状态(`lexical environment`,词法环境)的引用的组合。**闭包可以让开发者从内部函数访问外部函数的作用域**。在`JavaScript`中，闭包会随着函数的创建而被同时创建。   

[闭包MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures#%E8%AF%8D%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F)   

[闭包阮一峰](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)       

　
[闭包菜鸟教程](https://www.runoob.com/js/js-function-closures.html)  



> 词法一词指的是，词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。嵌套函数可以访问声明于它们外部作用域的变量。   

**闭包就是能够读取其他函数内部变量的函数。** 在`javascript`语言中只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"**定义在一个函数内部的函数**"。   

> `JavaScript`变量可以是局部变量或全局变量。   
私有变量可以用到闭包。

闭包是作用域应用的特殊场景。`js`中常见的作用域包括全局作用域、函数作用域、块级作用域。    
> `JS`中自由变量的查找是在定义的地方，向上级作用域查找，不是在执行的地方。   

常见的闭包有两种使用场景： 一种是函数作用参数被传递；一种是函数作为返回值被返回。    
一、函数作为返回值被返回
```javascript 
function create(){
    let a =100;  
    return function(){
        console.log(a);
    }
}
const fn = create();  
const a= 200;
fn(); //100
```
二、函数作为参数被传递    
```javascript
function print(fb){
    const b = 200;
    fb();
}  
const b = 100;  
function fb(){
    console.log(b);
}  
print(fb); //100
```

```javascript
function memoize(fn){
    const cache = {}; //创建缓存对象  
    return (...args)=>{//返回一个新函数  
        const key = JSON.stringify(args); // 将参数序列化为缓存键  
        if(cache[key]) return cache[key]; // 如果缓存中存在，直接返回  
        cache[key] = fn(...args); // 否则执行原函数并缓存结果
        return cache[key];
    }
}
// 阶乘函数的记忆化  
const factorial = memoize((n)=>{
    return (n <= 1) ? 1 : n * factorial(n - 1);
})
```
// 这是因为`JavaScript`的**调用栈机制**：  
+ 每次函数调用都会在调用栈中创建一个新的帧
+ 当函数调用其他函数时，当前帧会暂停，等待被调用函数返回  
+ 当被调用函数返回后，原来的帧继续执行   
所以实际上：  
+ **步骤1-5**：调用栈不断加深（递归向下）  
+ **步骤6-9**：调用栈不断变浅（递归返回）  
递归调用栈自然展开的过程！  

#### 闭包在`JavaScript`中的应用场景   
##### 1.数据私有化与封装  
闭包可以创建私有变量，避免全局污染，只暴露必要的接口。  
```javascript
function createCounter(){
    let count = 0; //私有变量
    return {
        increment:()=> ++count,
        decrement:()=> --count,
        getCount:()=> count,
    }
}
const counter = createCounter();
console.log(counter.increment()); //1
console.log(counter.getCount()); //1
// 无法直接修改`count`,实现封装
```
##### 2.回调函数与异步编程  
闭包常用于异步操作（如事件监听、定时器、Ajax请求），保留函数执行时的上下文。  
```javascript
function delayedMessage(message,delay){
    setTimeout(()=>{
        console.log(message); // 闭包保留对 message 的引用
    },delay);
}
delayedMessage('Hello after 2秒!',2000);
```  
3.函数柯里化（`Currying`）  
通过闭包实现参数分步传递，生成特定功能的函数。  
```javascript
function multiply(a){
    return (b)=>a*b; // 闭包记住参数a
}
const double = multiply(2);
console.log(double(5)); // 10
```  
4.模块化开发（`ES6`之前）
在`ES6`模块化之前，闭包用于实现模块模式，隔离作用域。  
```javascript
const MyModule = (function(){
    let privateVar = 0;  
    return {
        getVar:()=>privateVar,
        setVar:(val)=>{privateVal = val;}
    } 
})();
MyModule.setVar(42);
console.log(MyModule.getVar()); // 42
```
5.循环中的异步任务  
解决循环中变量被共享的问题（例如`var`声明的变量在循环中会被覆盖）。  
```javascript
// 错误示例（使用`var`）  
for(var i=0;i<3;i++){
    setTimeout(()=>console.log(i),100); //输出3,3,3
}
// 正确示例（使用闭包）  
for(var i=0;i<3:i++){
    (function(j){
        setTimeout(()=>console.log(j),100); // 输出 0,1,2  
    })(i)
}
```  
6.记忆化（`Memoization`）  
缓存函数计算结果，提升性能。  
```javascript
function memoize(fn){
    const cache = {};
    return (...args)=>{
        const key = JSON.stringify(args);
        if(cache[key]) return cache[key];  
        cache[key] = fn(...args);  
        return cache[key];  
    }
}
const factorial = memoize( n=> (n <= 1) ? 1 : n * factorial(n-1));
// 缓存结果，避免重复计算
```   
##### 7.事件监听器  
闭包保留事件触发时的上下文变量。  
```javascript
function setupButton(id){
    const button = document.getElementById(id);
    let clicks = 0;
    button.addEventListener("click",()=>{
        clicks++;
        console.log(`按钮被点击了 ${click} 次`);
    }); //闭包记住 clicks 变量
}
```  
8.防抖(`Debounce`)与节流(`Throttle`)  
优化高频操作（如滚动、输入），减少资源消耗。  
```javascript
function debounce(fn,delay){
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>fn(...args),delay);
    };// 闭包管理 timer 变量
}
```
> 防抖的核心理念："**以最后一次调用为准**"  
> **频繁触发时：** 不断取消前一个，设置新的  
> **停止触发后：** 等待指定时间，执行最后一次  
> **应用场景：** 搜索框输入、窗口调整、滚动事件等需要"稳定后再执行"的场景   
这就是为什么在搜索框中，即使用户快速输入多个字符，也只会发送最后一次搜索请求的原因！  

#### 闭包解决的核心问题  
1.状态保持问题   
> 问题：普通函数调用后，局部变量会销毁，无法保留状态   
> 闭包解决问题：内部函数可以"记住"并访问创建时的词法环境   

```javascript
    // 普通函数 - 无法保持状态  
    function counter(){
        let count = 0;
        count++;
        return count;
    }
    console.log(counter()); // 1  
    console.log(counter()); // 1  (每次都是1，状态丢失)  

    // 闭包 - 保持状态   
    function createCounter(){
        let count = 0;
        return function(){
            return ++ count;
        }
    }
    const myCounter = createCounter();  
    console.log(myCounter()); //1
    console.log(myCounter()); //2 (状态保持)
```  
2.数据封装问题  
> 问题：全局变量容易被意外修改，缺乏私有性  
> 闭包解决方案：创建私有变量，只暴露必要的接口  
```javascript
// 传统方式 - 数据不安全   
let balance = 1000; // 全局变量，可能被任意修改   
// 闭包方式 - 数据安全封装   
function createBankAccount(initialBalance){
    let balance = initialBalance; // 私有变量  
    return {
        deposit:function(amount){
            if(amount > 0){
                balance += amount;
                return `存款成功，当前余额：${balance}`;
            }
            return '存款金额必须大于0';
        },
        withdraw:function(amount){
            if(amount > 0  && amount <= balance){
                balance -= amount;
                return `取款成功，当前余额：${balance}`;
            }
            return '取款金额无效或余额不足';
        },
        getBalance:function(){
            return `当前余额：${balance}`;
        }
    }
}
const account = createBankAccount(1000);
console.log(account.deposit(500)); // 存款成功，当前余额: 1500
console.log(account.withdraw(200)); // 取款成功，当前余额: 1300
// account.balance = 9999; // 无法直接修改balance，数据得到保护
```
#### 实际应用场景   
1.模块化开发（`ES6`之前）  
2.回调函数和事件处理
```javascript
// 事件监听器中的状态保持  
function createButtonHandler(buttonId){
    let clickCount = 0;
    return function(){
        clickCount++;
        console.log(`按钮${buttonId}被点击了${clickCount}次`);
        // 可以访问创建时的buttonId和累积的clickCount 
    }
}  
// 为多个按钮创建独立的点击计数器
const handleButton1 = createButtonHandler("btn1");
const handleButton2 = createButtonHandler("btn2");  

// 模拟点击
handleButton1(); // 按钮 btn1 被点击了 1 次
handleButton1(); // 按钮 btn1 被点击了 2 次
handleButton2(); // 按钮 btn2 被点击了 1 次

```  
3.函数工厂和配置预设   
```javascript
// 创建具有配置预设的函数  
function createLogger(prefix,level="INFO"){
    return function(message){
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${prefix}: ${message}`);
    };
}
// 创建特定用途的日志函数   
const apiLogger = createLogger("API","DEBUG");
const authLogger = createLogger("AUTH", "WARN");
const dbLogger = createLogger("DATABASE");
apiLogger("用户请求开始"); // [2024-01-15T10:30:00Z] [DEBUG] API: 用户请求开始
authLogger("权限验证失败"); // [2024-01-15T10:30:01Z] [WARN] AUTH: 权限验证失败
```  
4.防抖和节流优化性能   
5.循环中的异步操作  
6.缓存和记忆化   

> 虽然闭包很强大，但也要注意：  
> **内存泄漏：** 闭包会阻止垃圾回收，需要及时释放不再需要的引用  
> **性能考量：** 过度使用可能影响性能   
> **调试难度：** 复杂的闭包嵌套可能增加调试难度  
闭包是现代`JavaScript`编程中不可或缺的工具，理解其原理和应用场景对于写出高质量代码至关重要。
