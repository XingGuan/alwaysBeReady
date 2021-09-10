### 1.立即调用函数表达式(IIFE)
```javascript
var a=1;
(function a(){
    a=2;
    console.log(a);
})();
```
答案:
```javascript
f a(){
    a=2;
    console.log(a);
}
```
> 立即调用的函数表达式(IIFE)有一个自己独立的作用域，如果函数名称与内部变量名称冲突，就会永远执行函数本身；所以上面的结果输出是函数本身；

### 2.类型转换
```javascript
var a = [0];
if (a) {
  console.log(a == true);
} else {
  console.log(a);
}
```
答案 `false`  
解析:  
当`a`(变量)出现在if的条件中时,被转成布尔值，而`Boolean([0])`为`true`,所以就进行下一步判断`a==true`,在进行比较的时,[0]被转换成0,所以`0==true`为false数组从非primitive转为primitive的时候会先隐式调用join变成“0”，`string`和`Boolean`比较的时候，两个都先转为`number`类型再比较，最后就是`0==1`的比较了 

```javascript
var a = [1];
if (a) {
  console.log(a == true);
} else {
  console.log(a);
}
// true

```