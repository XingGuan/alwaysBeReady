### for……of   
`for……of`语句在**可迭代对象**(`Array,Map,Set,String,TypedArray,arguments`对象等等)上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。  

### 语法   
```javascript
    for(variable of iterable){
        // statements
    }
```   
+ variable 
在每次迭代中，将不同属性的值分给变量。  
+ iterable  
被迭代枚举其属性的对象   

### eg
```javascript
    let iterable = [10,20,30];
    for(let value of iterable){
        value +=1;
        console.log(value);
    }
    // 11
    // 21
    // 31
```
```javascript
    let iterable = [10,20,30];
    for(const value of iterable){
        console.log(value);
    }
    // 10
    // 20
    // 30
```  
### 关闭迭代器  
对于`for……of`的循环，可以由`break`、`throw`或`return`。
```javascript
    function* foo(){
        yield 1;
        yield 2;
        yield 3;
    }  
    for(let o of foo()){
        console.log(o); // 1
        break; // closes iterator, triggers return
    }
```    
### 迭代生成器   
斐波那契数列   
```javascript
function* fibonacci(){
    // 一个生成器函数  
    let [prev,curr] = [0,1];  
    for(;;){
        // while(true){
        [prev,curr] = [curr,prev+curr];  
        yield curr
    }
}
for(let n of fibonacci()){
    console.log(n);
    // 当 n 大于 1000 时跳出循环
    if(n>=1000) break; 
}
```  
### 不要重用生成器   
生成器不应该重用，即使`for……of`的循环提前终止，例如通过`break`关键字。在退出循环后，生成器关闭，并尝试再次迭代，不会产生任何进一步的结果。   
```javascript
    var gen = (function* (){
        yield 1;
        yield 2;
        yield 3;
    })();
    for(let o of gen){
        console.log(o);// 1
        break; // 关闭生成器
    }
    //生成器不应该重用，以下没有意义
    for(let o of gen){
        console.log('o----',o);
    }
```  
### 迭代其他可迭代对象  
可以迭代显式实现**可迭代**协议的对象：  
```javascript
  var iterable = {
    [Symbol.iterator](){
        return{
            i:0,
            next(){
                if(this.i < 3){
                    return { value:this.i++, done:false };
                }
                return { value:undefined, done:true }
            }
        }
    }
  };
  for(var value of iterable){
    console.log(value); 
  }  
  // 0
  // 1
  // 2
```  
### `for……of`与`for……in`的区别   
`for……of`与`for……in`语句都是迭代一些东西。
迭代方式不同:  
`for……in`语句以任意顺序迭代对象的可枚举属性。  
`for……of`语句遍历**可迭代对象**定义要迭代的数据。


1.`for……in`遍历的是数组的索引(即键名)。
  `for……of`遍历的是数组元素的值。   
> `for……in`的一些缺陷   
+ 1.索引是字符串型的数字，因而不能直接进行几何运算。  
+ 2.遍历顺序可能不是实际的内部顺序。
+ 3.`for in`会遍历数组的所有的可枚举的属性，包括原型。   

> 故而一般用`for……in`遍历对象而不用来遍历数组。   

2.`for……of`不支持遍历普通对象,`for-of`，可以很方便的遍历数组和类数组，但是却不能遍历对象。   

想遍历对象的属性，可以使用`for……in`循环或内建的`Object.keys()`方法。  
`Object.keys(myObject)`获取对象的实例属性组成的数组，不包括原型方法和属性。   

> 使用`hasOwnProperty()`方法可以判断某属性是不是对象的实例属性。   

> `ES6` 中引入了 `Iterator`，只有提供了 `Iterator` 接口的数据类型才可以使用 `for-of` 来循环遍历，而 `Array`、`Set`、`Map`、某些类数组如 `arguments` 等数据类型都默认提供了 `Iterator` 接口，所以它们可以使用 `for-of` 来进行遍历。   

能不能为对象已经其它的一些数据类型提供 `Iterator` 接口呢?  

ES6 同时提供了 `Symbol.iterator` 属性，只要一个数据结构有这个属性，就会被视为有 `Iterator` 接口，可以自己实现一个`Iterator`接口。
