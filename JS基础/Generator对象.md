### `Generator`对象   
`Generator`对象由**生成器函数**返回并且它符合**可迭代协议**和**迭代器协议**。  
```javascript
   const foo = function* (){
    yield 'a';
    yield 'b';
    yield 'c';
   } 
   let str = '';
   for(const val of foo()){
    str = str + val;
   }
   console.log(str);
   // Expected output:'abc'
```  
### 构造函数
`Generator`构造函数并不是全局可用，`Generator`的实例必须从**生成器函数**返回。  
```javascript
    function* generator(){
        yield 1;
        yield 2;
        yield 3;
    }
    const gen = generator(); // "Generator { }"
    console.log(gen.next().value);  // 1
    console.log(gen.next().value); // 2
    console.log(gen.next().value); // 3
```  
### 实例属性   
`Generator.prototype[@@toStringTag]`   
    `@@toStringTag`属性的初始值是字符串"`Generator`"。该属性被`Object.prototype.toString()`使用。   
### 实例方法   
+ `Generator.prototype.next()`  
返回`yield`表达式生成的值。  
+ `Generator.prototype.return()`  
类似于在当前的生成器主体的暂停位置插入`return`语句，该语句结束了生成器并且允许生成器与`try……finally`块相组合时，执行任何清理任务。   

+ `Generator.prototype.throw()`
类似于在当前的生成器主体的暂停位置插入`throw`语句，该语句通知生成器有错误的情况并且允许其处理错误或执行清理并自行关闭。
### 示例  
### 无穷迭代器   
该生成器函数，在需要之前不会计算值。因此，生成器允许我们定义一个潜在的无穷数据构。  
```javascript
    function* infinite(){
        let index = 0;
        while(true){
            yield index++;
        }
    }
    const generator = infinite(); // "Generator { }"  
    console.log(generator.next().value);//0
    console.log(generator.next().value);//1
    console.log(generator.next().value);//2
```    


