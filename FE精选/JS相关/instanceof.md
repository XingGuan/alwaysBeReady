### instanceOf的原理是什么  
eg:  
+ 例如`f instanceof Foo`  
顺着`f.__proto__`向上查找(原型链)  
看能否找到`Foo.prototype`    
