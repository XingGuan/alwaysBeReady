## Class 的继承
### 1.简介
Class 可以通过`extends`关键字实现继承,这比ES5通过修改原型链实现继承，要清晰和方便很多。  
[参考链接](https://es6.ruanyifeng.com/#docs/class-extends)  
`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

+ 子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。(这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后在对其进行加工，加上子类自己的实例属性和方法。)  
    
如果不调用`super`方法,子类就得不到`this`对象。  

#### ES5的继承
ES5的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面(`Parent.apply(this)`)。

#### ES6的继承
ES6的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面(所以必须先调用`super`方法)，然后再用子类的构造函数修改`this`。

>ps:另一个需要注意的地方是，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。  

### 3.Object.getPrototypeOf()

`Object.getPrototypeOf`方法可以用来从子类上获取父类。  
`Object.getPrototypeO(ColorPoint) === Point `
因此，可以使用这个方法判断，一个类是否继承了另一个类。   

### 4.super
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

### 5.类的prototype属性和_proto_属性
大多数浏览器的ES5实现之中，每一个对象都有_proto_属性，指向对应的构造函数的`prototype`属性。Class作为构造函数的语法糖，同时有`prototype`属性和`_proto_`属性，因此同时存在两条继承链。  

(1) 子类的`_proto_`属性，表示构造函数的继承,总是指向父类。  
(2) 子类`prototype`属性的`_proto_`属性，表示方法的继承，总是指向父类的`prototype`属性。  

```javascript
class A{
}
class B extends A{
}
B._proto_ === A //true
B.prototype._proto_  === A.prototype //true

```
这两条继承链可以这么理解：作为一个对象，子类`B`的原型(_proto_属性)是父类`A`;作为一个构造函数，子类(`B`)的原型对象(`prototype`属性)是父类的原型对象(prototype属性)的实例。   

### 6实例的_proto_属性
子类实例的`_proto_`属性的`_proto_`属性，指向父类实例的`_proto_`属性。也就是说，子类的原型的原型是父类的原型。  
因此，通过子类实例的`_proto_._proto_`属性，可以修改父类实例的行为。
```javascript
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```
### 7原生构造函数的继承
原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。  
+ Boolean()
+ Number()
+ String()
+ Array()
+ Date()
+ Function()
+ RegExp()
+ Error()
+ Object()

### 8.Mixin模式的实现

