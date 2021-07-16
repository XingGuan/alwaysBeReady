### JavaScript Array map()方法
`Array.map()`  
定义和用法  
map()方法**返回一个新数组**，数组中的元素为**原始数组元素调用函数处理后的值**。  
map()方法按照原始数组元素顺序依次处理元素。

> map() 不会对空数组进行检测  
> map() 不会改变原始数组  

语法
```javascript
array.map(function(currentValue,index,arr),thisValue)
``` 
参数说明  
| 参数                             | 描述                                                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function(currentValue,index,arr) | **必须**。函数，数组中的每个元素都会执行这个函数  函数参数currentValue---必须。当前元素的值，index---可选。当前元素的索引值，arr---可选，当前元素属于的数组对象。 |
| thisValue                        | 可选。对象作为该执行回调时使用，传递给函数，用作"this"的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。                      |

### JavaScript Array reduce()方法
`Array.reduce()`  **返回计算结果**  
定义和用法  
reduce() 方法接收一个函数作为**累加器**,数组中的每个值(从左到右)开始缩减，最终计算为一个值。  
reduce()可以作为一个高阶函数，用于函数的compose。
> reduce()对于空数组是不会执行回调函数的。  

语法  
`array.reduce(function(total,currentValue,currentIndex,arr),initialValue)`  

[参考链接](https://www.runoob.com/jsref/jsref-reduce.html)  


