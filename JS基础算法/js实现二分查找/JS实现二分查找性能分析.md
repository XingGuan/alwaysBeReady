<!--
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-18 14:41:18
-->
### JS实现二分查找递归和循环哪个更好？  

```javascript
// 性能测试  
console.time('binarySearch1');
for (let i = 0; i < 100 * 10000; i++) {
    binarySearch1(arr, target);
}
console.timeEnd('binarySearch1');

binarySearch1: 14.22314453125 ms

console.time('binarySearch2');
for (let i = 0; i < 100 * 10000; i++) {
    binarySearch2(arr, target);
}
console.timeEnd('binarySearch2');

binarySearch2: 25.611083984375 ms
```  
由此可见二分查找递归方法用时，比二分查找循环用时多了很多。  
为什么说循环的函数，会比递归的函数快一些？  
> 循环其实就是一个函数(调用一次)，递归需要频繁的去调用多次函数，调用函数是有开销的。两者数量级上的时间复杂度都是`logn`。递归代码看起来简洁度更好，更容易理解。  

### 为什么二分查找的时间复杂度是`O(logn)`?  
[参考](https://blog.csdn.net/nyyngh/article/details/128932502)  
### 总结  
递归-代码逻辑更加清晰  
非递归-性能更好 
时间复杂度都是`O(logn)`。
二分法，前提条件，数组可排序。

