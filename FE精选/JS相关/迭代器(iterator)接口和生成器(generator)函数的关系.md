### 迭代器(`iterator`)接口和生成器(`generator`)函数的关系  
[参考链接](https://zhuanlan.zhihu.com/p/183124536)  

任意一个对象实现了遵守迭代器协议的[Symbol.iterator]方法，那么该对象就可以调用`[Symbol.iterator]`返回一个遍历器对象。**生成器函数就是遍历器生成函数**，故可以把`generation`赋值给对象的`[Symbol.iterator]`属性，从而使该对象具有迭代器接口。   
```javascript
class ClassRoom{
    constructor(address,name,students){
        this.address = address;
        this.name = name;
        this.students = students;
    }
    entry(student){
        this.students.push(student);
    }
    *[Symbol.iterator](){
        yield* this.students;
    }
}
const classOne = new  ClassRoom("7-101","teach-one-room",["rose","jack","lily","james"]);  
for(const stu of classOne){
    console.log('stu :>>',stu);
      // stu :>>  rose
      // stu :>>  rose
      // stu :>>  jack
      // stu :>>  lily
      // stu :>>  james
      // if (stu === "lily") return;
}
```
