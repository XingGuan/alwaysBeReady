## 前端中this指向及改变this指向的方法
### 一、this
面向对象语言中this表示当前对象的一个引用。
但在JavaScript中this不是固定不变的，它会随着执行环境的改变而改变。
+ 在方法中，this表示该方法所属的对象。
+ 如果单独使用，this表示全局对象。
+ 在函数中，this表示全局对象。
+ 在函数中，在严格模式下，this是未定义的(undefined)。
+ 在事件中，this表示接收事件的元素。
+ 类似call()和applay()方法可以将this引用到任何对象。
### this隐式绑定
a.隐式绑定
当函数被一个对象"包含"的时候，我们称函数的this被隐式绑定到这个对象里面，这时候通过this可以直接访问所绑定的对象里面的其他属性，比如下面的a属性。
b.this是在代码运行期绑定而不是在书写期
>注：在构造函数中：this始终指向新对象  
### 更改this指向
每个Function构造函数的原型，都有方法call(),apply(),bind(). 
#### call()
call()方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。
语法：
```javascript
function.call(thisArg, arg1, arg2, ...)
```    
### apply()
apply() 方法调用一个具有指定this值的函数，以及作为一个数组(或类似数组对象)提供的参数。 
语法：  
`func.apply(thisArg, [argsArray])`  
### bind() 
bind().方法创建一个新的函数，在bind()被调用时，这个新函数的`this`被指定为bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

>注意：call()方法的语法和作用与applay()方法类似，只有一个区别，就是call()方法接受的是一个参数列表，而apply()方法接受的是一个包含多个参数的数组。bind()与call和apply()的最大区别是，bind()不会立即调用，而是返回一个新函数，称为绑定函数。apply()和call()都是为了改变某个函数运行时的上下文而存在的(就是为了改变函数内部this的指向);apply和call的调用返回函数执行结果。  
### 箭头函数
a. 箭头函数的this是在定义函数时绑定的， 不是在执行过程中绑定的  
b. 箭头函数中的this始终指向父级对象  
c. 所有 call() / apply() / bind() 方法对于箭头函数来说只是传入参数， 对它的 this 毫无影响。  

[参考文档](https://www.cnblogs.com/hjson/archive/2019/01/11/10254555.html)

