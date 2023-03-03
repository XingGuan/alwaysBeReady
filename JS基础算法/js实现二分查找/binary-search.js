"use strict";
/*
 * @Descripttion: 二分查找
 * @Author: GXing
 * @Date: 2023-02-18 11:38:14
 */
exports.__esModule = true;
exports.binarySearch2 = exports.binarySearch1 = void 0;
/**
 * @Descripttion: 二分查找循环
 * @Author: GXing
 * @return {number}数组下标
 */
function binarySearch1(arr, target) {
    var length = arr.length;
    if (length === 0)
        return -1;
    /* 当前查找区域的开始 */
    var startIndex = 0;
    var endIndex = length - 1; //结束位置
    while (startIndex <= endIndex) {
        var middleIndex = Math.floor((startIndex + endIndex) / 2);
        var middleValue = arr[middleIndex];
        if (target < middleValue) {
            // 目标值较小，继续在左侧查找
            endIndex = middleIndex - 1;
        }
        else if (target > middleValue) {
            // 目标值较大，继续在右侧查找
            startIndex = middleIndex + 1;
        }
        else {
            return middleIndex;
        }
    }
    return -1;
}
exports.binarySearch1 = binarySearch1;
/**
 * @Descripttion: 二分查找递归
 * @Author: GXing
 * @return {number}
 */
/* ts类型中加?,表示该参数为可选参数 */
/**
 * @param arr
 * @param target
 * @param startIndex
 * @param endIndex
 */
function binarySearch2(arr, target, startIndex, endIndex) {
    var length = arr.length;
    if (length === 0)
        return -1;
    // 开始和结束范围
    if (startIndex == null)
        startIndex = 0;
    if (endIndex == null)
        endIndex = length - 1;
    //如果 end 和 start 相遇，则结束  
    if (startIndex > endIndex)
        return -1;
    // 中间位置
    var middleIndex = Math.floor((startIndex + endIndex) / 2);
    var middleValue = arr[middleIndex];
    if (target < middleValue) {
        // 目标值较小，继续在左侧查找   
        endIndex = middleIndex - 1;
        return binarySearch2(arr, target, startIndex, endIndex);
    }
    else if (target > middleValue) {
        // 目标值较大，继续在右侧查找
        startIndex = middleIndex + 1;
        return binarySearch2(arr, target, startIndex, endIndex);
    }
    else {
        // 相等 返回
        return middleIndex;
    }
}
exports.binarySearch2 = binarySearch2;
//功能测试
var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120];
var target = 40;
console.info(binarySearch2(arr, target));
// 性能测试  
console.time('binarySearch1');
for (var i = 0; i < 100 * 10000; i++) {
    binarySearch1(arr, target);
}
console.timeEnd('binarySearch1');
console.time('binarySearch2');
for (var i = 0; i < 100 * 10000; i++) {
    binarySearch2(arr, target);
}
console.timeEnd('binarySearch2');
