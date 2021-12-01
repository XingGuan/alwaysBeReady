### 为什么typeof可以检测类型，有没有更好的方法?
>typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断number, string, boolean, undefined, symbol,bigInt 这6种基本类型。**注意:null返回object** 而在复杂数据类型里,除了函数返回了`function`其他均返回`object`。这种判断能帮助我们搞定一些问题，js在底层存储变量的时候会在变量的机器码的低位1-3位存储其类型信息(000：对象，010：浮点数，100：字符串，110：布尔，1：整数)，但是null所有机器码均为0，直接被当做了对象来看待。    

那么有没有更好的办法区分类型呢，一般使用?   
### 方法二
`obj instanceof Object`  
只用来判断复杂数据类型，因为`instanceof`是用于检测构造函数(右边)的`prototype`属性是否出现在某个实例对象(左边)的原型链上。

>`instanceof`，用来判断一个变量是否是某个对象的实例，所以对于引用类型我们使用instanceof来进行类型判断。

```
[1,2] instanceof Array  // true
(function(){}) instanceof Function // true
({a:1}) instanceof Object // true
(new Date) instanceof Date // true
```  
### 方法三
`Object.property.toString.call()`方法,他返回`[object 类型]`。注意返回的格式及大小写,前面是小写，后面是首字母大写。  
基本数据类型都能返回相应的类型。
```javascript
Object.prototype.toString.call(22)//"[object Number]"
Object.prototype.toString.call('')//"[object String]"
Object.prototype.toString.call(Symbol())//"[object Symbol]"
Object.prototype.toString.call(42n)//"[object BigInt]"
Object.prototype.toString.call(null)//"[object Null]"
Object.prototype.toString.call(undefined)//"[object Undefined]"
Object.prototype.toString.call(true)//"[object Boolean]"
```
复杂数据类型也能返回相应的类型
```javascript
Object.prototype.toString.call({a:1}) // "[object Object]"
Object.prototype.toString.call([1,2]) // "[object Array]"
Object.prototype.toString.call(new Date) // "[object Date]"
Object.prototype.toString.call(function(){}) // "[object Function]
```