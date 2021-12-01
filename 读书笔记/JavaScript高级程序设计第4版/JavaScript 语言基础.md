## 一、拆阅章节(第三章)
### 语言基础  
### 语法
ECMAScript的语法很大程度上借鉴了C语言和其他类C语言,如Java和Perl。熟悉这些语言的开发者，应该很容易理解ECMAScript宽松的语法。
### 区分大小写
**ECMAScript中一切都区分大小写。无论是变量、函数名还是操作符，都区分大小写。** 换句话说,变量test和变量Test是两个不同的变量。类似地，**typeof** 不能作为函数名，因为它是一个关键字。但Typeof是一个完全有效的函数名。  

### 标识符
所谓**标识符**,就是变量、函数、属性或函数参数的名称。
标识符可以由一或多个下列字符组成:  
+ 第一个字符必须是一个字母、下划线(_)或美元符号($);
+ 剩下的其他字符可以是字母、下划线、美元符号或数字。

**标识符中的字母可以是扩展 ASCII（Extended ASCII）中的字母，也可以是 Unicode 的字母字符，如 À 和 Æ（但不推荐使用）**

按照惯例,**ECMAScript标识符**使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词的首字母大写。  

**这种写法并不是强制性的，但是因为这种形式跟ECMAScript内置函数和对象的命名方式一致，所以是最佳实践**

>注意：关键字、保留字、true、false 和 null 不能作为标识符。  

### 注释
ECMAScript 采用C语言风格的注释，包括单行注释和块注释。
```javaScript
//单行注释  
/*
这是多行注释
*/
```
### 严格模式
**ECMAScript 5 增加了严格模式（strict mode）的概念。** 严格模式是一种不同的 JavaScript 解析和执行模型，ECMAScript 3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。要对整个脚本开启严格模式,在脚本开头加上这一行:  
`"use strict"`  
**虽然看起来像个没有赋值给任何变量的字符串，但它其实是一个预处理指令。**    
任何支持的 JavaScript引擎看到它都会切换到严格模式。选择这种语法形式的目的是不破坏 ECMAScript 3 语法。  
也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可:
```javascript
function doSomething() { 
 "use strict"; 
 // 函数体 
} 
```
**所有现代浏览器都支持严格模式。**
### 语句
>ECMAScript 中的语句以分号结尾。省略分号意味着由解析器确定语句在哪里结尾。
```javascript
let sum = a + b // 没有分号也有效，但不推荐
let diff = a - b; // 加分号有效，推荐
```
即使语句末尾的分号不是必需的,也应该加上。加分号有助于防止省略造成的问题，比如可以避免输入内容不完整。此外，加分号也便于开发者通过删除空行来压缩代码（如果没有结尾的分号，只删除空行，则会导致语法错误）。加分号也有助于在某些情况下提升性能，因为解析器会尝试在合适的位置补上分号以纠正语法错误。

多条语句可以合并到一个C语言风格的代码块中。代码块由一个左花括号（{）标识开始，一个右花括号（}）标识结束：  
if(test){
    test = false; 
    console.log(test); 
}
if之类的控制语句只在执行多条语句时要求必须有代码块。不过，最佳实践是始终在控制语句中使用代码块，即使要执行的只有一条语句，如下例所示：  
```javascript
// 有效，但容易导致错误，应该避免
if (test) 
 console.log(test); 
// 推荐
if (test) { 
 console.log(test); 
}
```  
在控制语句中使用代码块可以让内容更清晰，在需要修改代码时也可以减少出错的可能性。 
### 关键字与保留字
ECMA-262 描述了一组保留的关键字，这些关键字有特殊用途，比如表示控制语句的开始和结束，或者执行特定的操作。按照规定，保留的关键字不能用作标识符或属性名。ECMA-262 第 6 版规定的所有关键字如下：  
```javascript
break do in typeof 
case else instanceof var 
catch export new void 
class extends return while 
const finally super with 
continue for switch yield 
debugger function this 
default if throw 
delete import try   
```
规范中也描述了一组未来的保留字，同样不能用作标识符或属性名。虽然保留字在语言中没有特定用途，但它们是保留给将来做关键字用的。以下是 ECMA-262 第 6 版为将来保留的所有词汇。始终保留:     
```javascript
enum
``` 
严格模式下保留:   
```javascript
implements package public 
interface protected static 
let private 
````
模块代码中保留: 
```javascript
await  
```  
这些词汇不能用作标识符，但现在还可以用作对象的属性名。一般来说，最好还是不要使用关键字和保留字作为标识符和属性名，以确保兼容过去和未来的 ECMAScript 版本。  
### 变量
`ECMAScript`变量是**松散类型的**,意思是**变量可以用于保存任何类型的数据。** 每个变量只不过是**一个用于保存任意值的命名占位符**。有3个关键字可以声明变量:`var`、`const`、`let`。  
其中，var 在ECMAScript 的所有版本中都可以使用，而 const 和 let 只能在 ECMAScript 6 及更晚的版本中使用。  

### var关键字  
`var message;`  
这行代码定义了一个名为`message`的变量，可以用它保存任何类型的值。
(不初始化的情况下，变量会保存一个特殊值`undefined`)。
```javascript
var message = 'hi';
```
这里，message 被定义为一个保存字符串值 hi 的变量。像这样初始化变量不会将它标识为字符串类型，只是一个简单的赋值而已。随后，不仅可以改变保存的值，也可以改变值的类型：  
### 1.var声明作用域
关键的问题在于，使用 var 操作符定义的变量会成为包含它的函数的局部变量。比如，使用 var在一个函数内部定义一个变量，就意味着该变量将在函数退出时被销毁：
```javascript
function test() { 
 var message = "hi"; // 局部变量
} 
test(); 
console.log(message); // 出错！
```
这里，message 变量是在函数内部使用 var 定义的。**函数叫 test()，调用它会创建这个变量并给它赋值。调用之后变量随即被销毁，** 因此示例中的最后一行会导致错误。不过，在函数内定义变量时省略 var 操作符，可以创建一个全局变量：
```javascript
function test() { 
 message = "hi"; // 全局变量
} 
test(); 
console.log(message); // "hi"
``` 
去掉之前的 var 操作符之后，message 就变成了全局变量。只要调用一次函数 test()，就会定义这个变量，并且可以在函数外部访问到。  
> 虽然可以通过省略 var 操作符定义全局变量，但不推荐这么做。在局部作用域中定
义的全局变量很难维护，也会造成困惑。这是因为不能一下子断定省略 var 是不是有意而
为之。在严格模式下，如果像这样给未声明的变量赋值，则会导致抛出 ReferenceError。

**定义多个变量,可以在一条语句中用逗号分隔每个变量(及可选的初始化)**  
```javascript
var message = "hi", 
    found = false, 
    age = 29; 
```  
里定义并初始化了 3 个变量。因为 ECMAScript 是松散类型的，所以使用不同数据类型初始化的变量可以用一条语句来声明。插入换行和空格缩进并不是必需的，但这样有利于阅读理解。在严格模式下，不能定义名为 `eval` 和 `arguments` 的变量，否则会导致语法错误。
### var声明提升
使用 var 时，下面的代码不会报错。这是因为使用这个关键字声明的变量会自动提升到函数作用域顶部：
```javascript
function foo() { 
 console.log(age); 
 var age = 26; 
} 
foo(); // undefined 
```
之所以不会报错，是因为 ECMAScript 运行时把它看成等价于如下代码：  
```javascript
function foo() { 
 var age; 
 console.log(age); 
 age = 26; 
} 
foo(); // undefined
``` 
**这就是所谓的“提升”（hoist），也就是把所有变量声明都拉到函数作用域的顶部。**此外，反复多次使用 var 声明同一个变量也没有问题：
```javascript
function foo() { 
 var age = 16; 
 var age = 26; 
 var age = 36; 
 console.log(age); 
} 
foo(); // 36 
```



## 思考
1.JavaScript合法标识符是什么样的?应该遵循什么样的规则？
2.驼峰格式是什么样的？为什么javascript标识符推荐用驼峰形式？
3.编码层面有哪些提升性能的方法？