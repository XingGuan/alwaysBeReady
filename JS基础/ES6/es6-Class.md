### 构造函数
[ES6-Class](https://es6.ruanyifeng.com/#docs/class#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)  
[参考链接](https://blog.csdn.net/weixin_41796631/article/details/82939585);　　
### ES6
ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。  

> 语法糖(Syntactic sugar),是由Peter J. Landin(和图灵一样的天才人物，是他最先发现了Lambda演算，由此而创立了函数式编程)创造的一个词语，它意指那些没有给计算机语言添加新功能，而只是对人类来说更“甜蜜”的语法。语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。不过其并没有给语言添加什么新东西。  

### constructor 方法
`constructor()`方法是类的默认方法,通过`new`命令生成对象实例时,自动调用该方法。一个类必须有`constructor()`方法，如果没有显示定义，一个空的`constructor()`方法会被默认添加。   

`constructor()`方法默认返回实例对象(即`this`),完全可以指定返回另外一个对象。  

类必须使用`new`调用,否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

### 类的实例
生成类的实例的写法，与ES5完全一样，也是使用`new`命令。
> 如果忘记加上`new`，像函数那样调用`Class`,将会报错。  

**与ES5一样，类的所有实例共享一个原型对象。**  

### 取值函数(getter)和存值函数(setter)  
> 存值函数和取值函数是定义在`html`属性的描述对象上面,这与ES5完全一致。  

### 属性表达式
类的属性名,可以采用表达式。
```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```
上面代码中，Square类的方法名getArea，是从表达式得到的。  

### Class 表达式

注意点
+ (1)严格模式-类和模块的内部，默认就是严格模式。
+ (2) 不存在提升
+ (3) name属性-`name属性总是返回紧跟在class关键字后面类名。`  
+ (4) Generator 方法
+ (5) this的指向  

### 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法".  

> 注意：如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。  

父类的静态方法，可以被子类继承。  

静态方法也是可以从`super`对象上调用的。

+ ## super
  >super这个关键字，既可以当作函数使用，又可以当作对象使用

  ### 第一种情况:super作为函数时，代表父类的构造函数

  ES6要求，子类的构造函数，必须执行一次`super`函数

  >注意：虽然super代表父类的构造函数，但此时返回的是B的实例，即super内部的this指的是B的实例，因此super()相当于 A.prototype.constructor.call(this)   

  super作为函数使用时，必须出现在子类的构造函数`constructor`中，否则会报错   

  ### 第二种情况:super作为对象时，在普通方法中，指向父类的原型对象，在静态方法中，指向父类
  `super`作为函数时，代表父类的构造方法，作为对象时，指向父类的原型对象，所以`super.p()`相当于`A.prototype.p()`  

  >由于`super指向父类的原型,所以在父类实例上的属性或方法，并不能通过super调用`  

  ES6规定，在子类普通方法中，通过`super`调用父类的方法时，`方法内部的this指向当前的子类实例`   

  `super`作为对象，在静态方法中使用，相当于父类，而不是父类的原型  

## 3.实例属性的新写法
实例属性除了定义在`constructor()`方法里面的`this`上面,也可以定义在类的最顶层。   
## 4.静态属性
静态属性指的是Class本身的属性，即`Class.propName`,而不是定义在实例对象(`this`)上的属性。  

## 5.私有方法和私有属性
私有方法和私有属性，是只能在类内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但ES6不提供，只能通过变通方法模拟实现。   





