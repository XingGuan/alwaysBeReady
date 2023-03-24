
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

