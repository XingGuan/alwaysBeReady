<!--
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-18 20:52:50
-->
### 给一个数组，找出其中和为`n`的两个元素
+ 有一个**递增**的数组`[1,2,4,7,11,15]`和一个`n=15`。  
+ 数组中有**两个**数，和是`n`。即`4+11===15;` 
+ 写一个`JS`函数，找出这两个数。 

> 嵌套循环不是最优解。  

## 常规思路  
+ 嵌套循环，先找到一个数，然后去遍历下一个数，求和，做判断。  
+ 时间复杂度是`O(n^2)`，不可用  

## 利用递增(有序)的特性   
+ 随便找两个数  
+ 如果和大于`n`,则需要向前寻找  
+ 如果和小于`n`,则需要向后寻找---(二分法思想)  
### 双指针，时间复杂度降低到O(n)  
> **指针**从`C`语言中来的。  指针在`JS`中就是指向和引用的意思。沿用`C`语言的一个通俗的表示而已。  
+ 定义`i`指向头，定义`j`指向尾，求`arr[i]+arr[j]`   
+ 如果大于`n`，则`j`需要向前移动。  
+ 如果小于`n`,则`i`需要向后移动。

## 性能对比嵌套循环---双指针的方式 
```javascript

const arr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 4, 7, 11, 15];
console.info('xxx', findTwoNumbers2(arr, 15));

console.time('findTwoNumbers1');
for (let i = 0; i < 100 * 10000; i++) {
    findTwoNumbers1(arr, 15);
}
console.timeEnd('findTwoNumbers1');

findTwoNumbers1: 141.376953125 ms

console.time('findTwoNumbers2');
for (let i = 0; i < 100 * 10000; i++) {
    findTwoNumbers2(arr, 15);
}
console.timeEnd('findTwoNumbers2');
findTwoNumbers2: 37.885009765625 ms
```  
很明显双指针方式比嵌套循环速度快很多。  

## 总结  
+ 时间复杂度O(n^2),是不可用算法
+ 凡有序，可以借助二分思想。  
+ 优化嵌套循环，可以考虑"双指针"。  







  




