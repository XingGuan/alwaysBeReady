<!-- TOC -->

- [JS数据类型](#js数据类型)
  - [JS基本数据类型](#js基本数据类型)
  - [引用数据类型](#引用数据类型)
- [JS判断数据类型的方法](#js判断数据类型的方法)
  - [1.typeof](#1typeof)
  - [2.instanceof](#2instanceof)
  - [3.constructor](#3constructor)
  - [4.Object.prototype上的toString()](#4objectprototype上的tostring)

<!-- /TOC -->

## JS数据类型
JS数据类型包含值类型(基本类型)和引用数据类型两大类
### JS基本数据类型
基本数据类型有6个  
&emsp;1.字符串(String)  
&emsp;2.数字(Number)  
&emsp;3.布尔(Boolean)  
&emsp;4.空(Null)  
&emsp;5.未定义(Undefined)  
&emsp;6.Symbol(Symbol)
&emsp;7.BigInt(BigInt)
>注:Symbol是ES6引入的一种新的原始类型数据，表示独一无二的值  。还有一个新增的`BigInt`。

JavaScript拥有动态类型(通过赋值操作可以改变类型)  
undefined 和 null,本质上来说他们是两种不同的JavaScript数据类型。   
null表示一个值被定义了，但是这个值是个空值。  
undefined表示缺少值，即此处应该有值，但是还没有被定义。
### 引用数据类型  
引用类型是指多个值构成的对象，比如  
&emsp;对象(Object)  
&emsp;数组(Array)  
&emsp;函数(Function)  
还有两个特殊的对象:正则(`RegExp`)和日期(`Date`)  



[JS基础类型和引用类型](https://www.cnblogs.com/advanceCabbage/p/10457551.html)

## JS判断数据类型的方法
### 1.typeof
除了`null`，所有原始类型都可以用`typeof`运算符测试  
> `typeof`返回值是一个字符串

语法:
typeof<font color='red'>运算符</font>后接操作数:
`typeof operand`
`typeof(operand)`  
参数：  
operand
一个表示对象或原始值的表达式，其类型将被返回。  
typeof 可能的返回值
类型|结果
-------|-----
Undefined|"undefined"
Boolean|"boolean"
Number|"number"
String|"string"
BigInt|"bigint"
Symbol|"symbol"
BigInt|"bigint"
Null| **"object"**
Function对象(按照ECMA-262规范实现[[Call]])|"function"
其他任何对象|"object"
宿主对象(由JS环境提供)|取决于具体实现  
`//JavaScript诞生以来便如此
typeof null==='object';`    

在JavaScript最初的实现中，javaScript中的值是由一个表示类型的标签和实际数据值表示的。对象的标签是0，typeof null 也因此返回"object"。  
注意：
+ 使用new操作符除Function返回‘function’，其它的构造函数typeof返回的类型都是’object‘;  
<font color='red'>注：typeof不能判断Null，Array，Object的类型，因为它们都会返回'object';
</font>
### 2.instanceof
Instanceof **运算符**用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上  
语法：
`object instanceof constructor`  
>注意：要求前面是个引用类型(对象，数组，函数)，不能判断原始类型的值除非通过`new Boolean()`的方式来声明。
参数：object(某个实例对象) constructor(某个构造函数)   
>instanceof 返回值为布尔类型  
### 3.constructor
constructor是原型对象上的属性，指向构造函数。根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就去原型链上寻找，因此，实例对象也是能使用constrctor属性的。  
如果输出一个类型的实例constructor，就如下所示：
```javascript
console.log(new Number(123).constructor)
//ƒ Number() { [native code] }
```
可以看到它指向了Number的构造函数，因此，可以使用num.constructor==Number来判断一个变量是不是Number类型的。 
```javascript
var num  = 123;
var str  = 'abcdef';
var bool = true;
var arr  = [1, 2, 3, 4];
var json = {name:'wenzi', age:25};
var func = function(){ console.log('this is function'); }
var und  = undefined;
var nul  = null;
var date = new Date();
var reg  = /^[a-zA-Z]{5,20}$/;
var error= new Error();

function Person(){
  
}
var tom = new Person();

// undefined和null没有constructor属性
console.log(
    tom.constructor==Person,
    num.constructor==Number,
    str.constructor==String,
    bool.constructor==Boolean,
    arr.constructor==Array,
    json.constructor==Object,
    func.constructor==Function,
    date.constructor==Date,
    reg.constructor==RegExp,
    error.constructor==Error
);
//所有结果均为true
```  
><font color='red'>注：除了undefined和null之外，其他类型都可以通过constructor属性来判断类型，undefined和null没有constructor属性</font>,会提示`Error in created hook: "TypeError: Cannot read property 'constructor' of undefined"
### 4.Object.prototype上的toString()
语法：`Object.prototype.toString.call(arr);`  
返回结果举例:`[object Number]`这里要注意大小写  
toString()方法返回一个表示该对象的字符串  
[使用Object.prototype.toString.call()检查类型的原因](https://www.jianshu.com/p/e4237ebb1cf0)
[参考文档](https://www.cnblogs.com/bq-med/p/8796836.html)
















