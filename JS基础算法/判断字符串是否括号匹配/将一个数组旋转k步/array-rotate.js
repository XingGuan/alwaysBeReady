"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate2 = exports.rotate1 = void 0;
/**
 * 旋转数组k步 - 使用 pop 和 unshift
 * @param arr arr
 * @param k k
 * @returns arr
 */
function rotate1(arr, k) {
    const length = arr.length;
    if (!k || length === 0)
        return arr;
    const step = Math.abs(k % length); //Math.abs()方法返回一个数的绝对值  
    // O(n^2) ??
    for (let i = 0; i < step; i++) {
        const n = arr.pop();
        if (n != null) {
            arr.unshift(n); //数组是一个连续内存，数组是一个有序结构，`unshift` 操作非常慢 ！！！O(n)
        }
    }
    return arr;
}
exports.rotate1 = rotate1;
/**
 * 旋转数组 k 步 - 使用 concat
 * @param arr arr
 * @param k k
 */
function rotate2(arr, k) {
    const length = arr.length;
    if (!k || length === 0)
        return arr;
    const step = Math.abs(k % length); //abs取绝对值 
    // O(1) 
    const part1 = arr.slice(-step); // `O(1)`
    const part2 = arr.slice(0, length - step);
    const part3 = part1.concat(part2);
    return part3;
}
exports.rotate2 = rotate2;
// 功能测试
// const arrinit1 = [1, 2, 3, 4, 5, 6, 7];
// const arrinit2 = [1, 2, 3, 4, 5, 6, 7];
// const arr1 = rotate1(arrinit1, 3);
// const arr2 = rotate2(arrinit2, 3);
// console.info('rotate1 arr', arr1);
// console.info('rotate2 arr', arr2);  
//性能测试  
// const arr1 = [];
// for (let i = 0; i < 10 * 10000; i++) {
//     arr1.push(i);
// }
// console.time('rotate1');
// rotate1(arr1, 9 * 10000);
// console.timeEnd('rotate1'); //929ms O(n^2)
// console.log('----------------');
// const arr2 = [];
// for (let i = 0; i < 10 * 10000; i++) {
//     arr2.push(i);
// }
// console.time('rotate2');
// rotate2(arr2, 9 * 10000);
// console.timeEnd('rotate2');//0.4ms O(1)
