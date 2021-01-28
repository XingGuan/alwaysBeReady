### 实现a+a+a打印'abc';  
console.log(a+a+a);//打印'abc' 
#### 1.利用Object.defineProperty(obj,props,descriptor) 
**参数**  
+ 1.**obj**--在其上定义或修改属性的对象。  
+ 2.**props**要定义其可枚举属性或修改的属性描述符的对象。对象中存在的属性描述符主要有两种:数据描述符和访问器描述符  
+ 3.**descriptor**要定义或修改的属性描述符。  
对象里目前存在的属性描述符有两种主要形式:数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由getter函数和setter函数所描述的属性。一个描述符号只能是这两者其中之一;不能同时是两者。  
>**get** 
属性的getter函数,如果没有getter，则为undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入this对象(由于继承关系，这里的this并不一定是定义该属性的对象)。该函数的返回值会被用作属性的值。  
**默认为undefined**  
[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)  
### 一、解法一(Object.defineProperty()外部变量)
```javascript
    let value = 'a';
    Object.defineProperty(this,'a',{
        get(){
            let result = value;
            if(value==='a'){
                value = 'b';
            }else if(value === 'b'){
                value = 'c';
            }
            return result;
        }
    })
```
### 解法一(优化版):Object.defineProperty()内部变量  
```javascript
    Object.defineProperty(this, 'a', {
        get() {
            this._v = this._v || 'a';
            if (this._v === 'a') {
                this._v = 'b';
                return 'a';
            } else if (this._v === 'b') {
                this._v = 'c';
                return 'b';
            }else{
                return this._v;
            }
        }
    })
```
### 2.利用Object.prototype.valueOf();
>valueOf()方法返回指定对象的原始值。`Object.valueOf()`  
JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用`valueOf`方法;当遇到要预期的原始值的对象时，JavaScript会自动调用它。  
[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)  
### 解法二:Object.prototype.valueOf()  
```javascript
    let index = 0;
    let a ={
        value:"a",
        valueOf(){
            return ["a","b","c"][index++]
        }
    }

```
### 利用charCodeAt(),fromCharCode()  
>1.fromCharCode()可接受一个指定的Unicode值，然后返回一个字符串。  
语法:`String.fromCharCode(numX,numX,……,numX)`  
**numX**必需。一个或多个Unicode值，即要创建的字符串中的字符的Unicode编码。  

>2.charCodeAt()方法可返回指定位置的字符的Unicode编码。这个返回值是0-65535之间的整数。  
`stringObject.charCodeAt(index)`  
**index**必需。表示字符串中某个位置的数字，即字符在字符串中的下标。  
注释：字符串中第一个字符的下标是0.如果index是负数，或大于等于字符串的长度，则charCodeAt()返回`NaN`。 

## 题目扩展: 打印`a...z` 
输出:  
`a+a+a; //'abc'`  
` a+a+a+a; //'abcd'`
### 解法三:charCodeAt(),fromCharCode()  
```javascript
    let code = "a".charCodeAt(0);
    let count = 0;
    Object.defineProperty(this, 'a', {
        get() {
            let char = String.fromCharCode(code+count);
            count++;
            return char;
        }
    })
```
### 解法三优化版1:charCodeAt(),fromCharCode()  
```javascript
// 内部变量
Object.defineProperty(this, 'a', {
    get() {
        let _code = "a".charCodeAt(0);
        this._count = this._count || 0;
        let char = String.fromCharCode(_code + this._count);
        this.count++;
        return char;
    }
})
console.log(a + a + a);//'abc'
```
### 解法三优化版2:charCodeAt(),fromCharCode()  
```javascript
Object.defineProperty(this, "a", {
  get() {
    this._code = this._code || "a".charCodeAt(0);
    let char = String.fromCharCode(this._code);
    this._code++;
    return char;
  },
});
console.log(a + a + a); // 'abc'
```


