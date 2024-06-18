### 1.`TS`中`interface`和`type`有什么区别？   

[参考链接](https://juejin.cn/post/7063521133340917773)  

文档：`type`叫类型别名，在高级类型这一篇里。   

#### `interface`   
`interface`(接口)是`TS`设计出来用于定义对象类型的，可以对对象的形状进行描述。    
#### `type`  
`type`(类型别名)，顾名思义，类型别名只是给类型起一个新名字。它并不是一个类型，只是一个别名而已。   
有了`type`,我们书写`TS`的时候可以更加方便简洁。   

#### `type`或`interface`两者相同点   
+ 都可以定义一个对象或函数      
+ 都允许继承(`extends`)  

`interface`使用`extends`实现继承，`type`使用交叉类型实现继承。   

#### `type`或`interface`两者不同点   
+ `type`可以，`interface`不行   

> 类型别名会给一个类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。——`TS`文档   

声明基本类型、联合类型、交叉类型、元组    

+ `interface`可以，`type`不行  

`interface`可以合并重复声明   
重复声明`type`，就报错了   

#### 总结：  
`interface`和`type`被`TS`设计出来，是完全不同的东西，有各自的职责。   
`interface`是**接口**,用于描述一个对象。  
`type`是**类型别名**,用于给各种类型定义别名，让`TS`写起来更简洁、清晰。   
只是有时候两者都能实现同样的功能，才会经常被混淆。   
平时开发中，一般**使用组合或交叉类型**的时候，用`type`。   
一般要用类的`extends`和`implements`时，用`interface`。   

> `interface`可以重复声明，`type`不行，继承方式不一样，`type`使用交叉类型方式，`interface`使用`extends`实现。在对象扩展的情况下，使用接口的继承要比交叉类型的性能更好。建议使用`interface`来描述对象对外暴露的接口，使用`type`将一组类型重命名(或对类型进行复杂编程)。   


## 2.`any`类型，`unknown`类型，`never`类型    

[参考链接](https://typescript.p6p.net/typescript-tutorial/any.html)

`TypeScript`的三种特殊类型，他们可以作为学习`TypeScript`类型系统的起点。  
### `any`类型  
#### `基本含义`  
`any`类型表示没有任何限制，该类型的变量可以赋予任意类型的值。  
变量类型一旦设为`any`，`TypeScript`实际上会关闭这个变量的类型检查。即使**有明显的类型错误**，只要句法正确，都不会报错。
```javascript
let x:any = "gx";
x(1);//不报错  
x.foo = 100; // 不报错
```  
> 当 `x`的类型是`any`，`TypeScript`不对其进行类型检查。   

由于这个原因，应该尽量避免使用`any`类型，否则就失去了使用`TypeScript`的意义。    

实际开发中，`any`类型主要适用以下两个场合：   
(1) 出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为`any`。   
（2）为了适配以前老的`javascript`项目，尤其是别人的代码，很难为每一行适配正确的类型，这时你为那些类型复杂的变量加上`any`，`TypeScript` 编译时就不会报错。  
> 从集合论的角度看，`any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。  
`TypeScript`将这种类型称为"**顶层类型**"(`top type`),意为涵盖了所有下层。 
#### 类型推断问题

对于开发者没有指定类型，`TypeScript`必须自己推断类型的那些变量，如果无法推断出类型，`TypeScript`就会认为该变量的类型是`any`。
`TypeScript`提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会出错。   
```javascript
$ tsc --noImplicitAny app.ts
``` 
#### 污染问题
`any`类型除了关闭了类型检查，还有一个很大的问题，就是它会"污染"其他变量。它可以赋值给其他任何类型的变量
(因为没有类型检查)，导致其他变量出错。
```javascript
let x:any = "hello";
let y:number;
y = x; //不报错  
y*123; //不报错  
y.toFixed()；// 不报错   
```  
`TypeScript`也检查不出错误，问题就这样留到运行时才会暴露。   
污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因。    
### `unknown`类型   
为了解决`any`类型"污染"其他变量的问题，`TypeScript3.0`引入`unknown`类型。它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为严格版的`any`。   
`unknown`跟`any`的相似之处，在于所有的值都可以分配给`unknown`类型。   
> `unknown`类型跟`any`类型的不同之处在于，它不能直接使用。主要有以下几个限制：

+ `unknown`类型的变量，不能直接赋值给其他类型的变量(除了`any`类型和`unknown`类型)。   

```javascript
let v:unknown = 123;
let v1:boolean = v; //报错  
let v2:number = v; //报错  
```  
上面变量`v`赋值给`any`和`unknown`意外类型的变量都会报错，这就避免了污染问题，从而克服了`any`类型的一大缺点。   

+ 不能直接调用`unknown`类型变量的方法和属性
```javascript
let v1:unknown = { foo：123 };
v1.foo; // 报错  
let v2:unknown = "hello";
v2.trim(); // 报错  
let v3:unknown = (n=0)=>n+1;
v3(); // 报错
```  
上面示例中，直接调用`unknown`类型变量的属性和方法，或者直接当作函数执行，都会报错。

> `unknown`类型变量能够进行的运算是有限的,只能进行比较运算(运算符 `==`、`===`、`!=`,`!==`、`||`、`&&`、`?`)、取反运算(运算符`!`)、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。   

```javascript
let a:unknown = 1;
a+1; // 报错
a === 1; // 正确
```
+ 如何解决加法运算报错的问题？
 可以通过类型缩小

```javascript
let a:unknown = 1;
if(typeof a === 'number'){
a+1; // 正确
}
```
#### 总结
`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。
> 在集合论上，`unknown`也可以视为所有其他类型(除了`any`)的全集，所以它和`any`一样，也属于`TypeScript`的顶层类型。

### `never`类型
为了保持与集合论的对应关系，以及类型运算符的完整性，`TypeScript`还引入了"空类型"的概念，即该类型为空，不包含任何值。
```javascript
let x:never;
```
上面示例中，变量`x`的类型是`never`，就不可能赋给它任何值，否则都会报错。
> `never`类型的使用场景，主要是在一些类型运算之中,保证类型运算的完整性。   
> 另外，不可能返回值的函数，返回值的类型就可以写成`never`。  
> `never`类型的一个重要特点是，可以赋值给任意其他类型。

```javascript
function f():never{
throw new Error("error");
}
let v1:number = f(); //不报错
let v2:string= f(); //不报错
let v3:boolean = f(); //不报错
```  
上面示例中，函数`f()`会抛错，所以返回值类型可以写成`never`,即不可能返回任何值。各种其他类型的变量都可以赋值为`f()`的运行结果(`never`类型)。   

为什么`never`类型可以赋值给任意其他类型呢？   

这也跟集合论有关，空集是任何集合的子集。`TypeScript`就相应规定，任何类型都包含了`never`类型。**因此，`never`类型是任何其他类型所共有的。`TypeScript`把这种情况称为"底层类型"(`bottom type`)**。  

## 总结
总之，`TypeScript`有两个顶层类型：(`any`和`unknown`),但是"底层类型"只有`never`唯一一个。



