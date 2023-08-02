<!-- TOC -->

- [JS数据类型](#js数据类型)
  - [JS基本数据类型](#js基本数据类型)
  - [引用数据类型](#引用数据类型)
- [JS判断数据类型的方法](#js判断数据类型的方法)
  - [1.typeof](#1typeof)
  - [2.instanceof](#2instanceof)
  - [3.constructor](#3constructor)
  - [4.Object.prototype上的toString()](#4objectprototype上的tostring)
- [`typeof` 和 `instanceof`的区别](#typeof-和-instanceof的区别)
- [拓展](#拓展)
  - [`getPrototypeOf()`](#getprototypeof)
    - [参数](#参数)
    - [返回值](#返回值)
  - [`isPrototypeOf()`](#isprototypeof)
    - [语法](#语法)
    - [参数](#参数-1)
    - [返回值](#返回值-1)
    - [报错](#报错)
    - [描述](#描述)
  - [`isPrototypeOf`和`instanceof`的区别](#isprototypeof和instanceof的区别)
  - [`instanceof`的实现原理](#instanceof的实现原理)

<!-- /TOC -->

## JS数据类型
JS数据类型包含值类型(基本类型)和引用数据类型两大类
### JS基本数据类型
基本数据类型有7个  
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
`typeof` 能识别所有的值类型，识别函数，能区分是否是引用类型。   
 
> `typeof`返回值是一个字符串

语法:
typeof<font color='red'>运算符</font>后接操作数:
`typeof operand`
`typeof(operand)`  
参数：  
operand
一个表示对象或原始值的表达式，其类型将被返回。  
typeof 可能的返回值
| 类型                                       | 结果           |
| ------------------------------------------ | -------------- |
| Undefined                                  | "undefined"    |
| Boolean                                    | "boolean"      |
| Number                                     | "number"       |
| String                                     | "string"       |
| BigInt                                     | "bigint"       |
| Symbol                                     | "symbol"       |
| BigInt                                     | "bigint"       |
| Null                                       | **"object"**   |
| Function对象(按照ECMA-262规范实现[[Call]]) | "function"     |
| 其他任何对象                               | "object"       |
| 宿主对象(由JS环境提供)                     | 取决于具体实现 |
`//JavaScript诞生以来便如此
typeof null==='object';`//true    

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



## `typeof` 和 `instanceof`的区别 
> `typeof`是一个一元运算符，放在一个运算数前面。它返回一个字符串，说明运算数的类型。  

>`instanceof`运算符返回一个布尔值，可以用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上，通俗说就是用于判断某个实例是否属于某构造函数。(或者说，只要构造函数的`prototype`在左边对象的原型链上就返回`true`)。
差异总结 ：  
+ `typeof`会返回一个运算数的基本类型的字符串表示而`instanceof`返回的是布尔值 。    
+ `instanceof`可以准确判断引用类型数据，但是不能正确判断原始数据类型。`typeof` 虽然可以准确判断(除`null`)外原始数据类型，但是无法判断引用数据类型(`function`除外)。 

## 拓展
### `getPrototypeOf()`   
> `Object.getPrototypeOf()`静态方法返回指定对象的原型(即内部`[[Prototype]]`属性的值)。   

```javascript
Object.getPrototypeOf(obj)
```  
#### 参数  
```javascript
obj //要返回其原型的对象
```    
#### 返回值    
返回给定对象的原型，可能是`null`。   

### `isPrototypeOf()`   
> `Object.prototype.isPrototypeOf()`(`isPrototypeOf()`)方法用于检查一个对象是否存在于另一个对象的原型链中。   

> 备注：`isPrototypeOf()`与`instanceof` 运算符不同。在表达式`object instanceof AFunction`中，会检查`object`的原型链是否与`AFunction.prototype`匹配，而不是与`AFunction`本身匹配。   

#### 语法   
```javascript
isPrototypeOf(object)  
```     
#### 参数   
```javascript
object
```   
要搜索其原型链的对象  

#### 返回值  
一个布尔值，指示调用`isPrototypeOf()`方法的对象(即`this`)是否位于`object`的原型链中。当`object`不是一个对象(即基本类型)时，直接返回`false`。  

#### 报错  
`TypeError`   
如果`prototypeObj`为`undefined`或`null`，会抛出`TypeError`。   

#### 描述   
所有继承自`Object.prototype`的对象(即除了`null原型对象`之外的所有对象)都继承了`isPrototypeOf()`方法。该方法允许你检查对象是否存在于另一个对象的原型链中。如果作为参数的`object`不是对象(即基本类型)，则该方法直接返回`false`。否则，`this`值被`转换为对象`，并且在`object`的原型链中搜索`this`值,直到到达链的末端或找打`this`为止。   

### `isPrototypeOf`和`instanceof`的区别   

+ `isPrototypeOf`方法用于测试一个对象是否存在于另一个对象的原型链上。  
+ `instanceof`运算符用来测试一个对象在其原型链中是否存在一个构造函数的`prototype`属性。     

### `instanceof`的实现原理   

```javascript
/**
 * @descripition 判断对象(对象在其原型链)中是否存在于某个构造函数的原型
 * @params left:实例对象 right:构造函数   
 * @return boolean
 */  
function myInstanceof(instanceofObj,constructorFunc){
  let constructorFuncProto = constructorFunc.prototype; //获取构造函数的显式原型   
  let instanceofObjProto = instanceofObj.__proto__; //获取实例对象的隐式原型   
  while(true){
    // 说明到原型链顶端，还未找到，则返回false
    if(instanceofObjProto === null){
      return false;
    }
    // 隐式原型与显示原型相等
    if(instanceofObjProto === constructorFuncProto){
      return true;
    }
    /**
     * 没有查找到，向上查找实例对象原型链
     * 获取实例对象隐式原型的隐式原型，重新赋值个给instanceofObjProto
     * */
    instanceofObjProto = instanceofObjProto.__proto__;
  }
}
```
可以简单理解为：顺着原型链去找，直到找打相同的原型对象，返回`true`,否则返回`false`。   




















