"use strict";
exports.__esModule = true;
exports.findTwoNumbers2 = exports.findTwoNumbers1 = void 0;
/**
 * @Descripttion: 寻找和为n的两个数-嵌套循环
 * @Author: GXing
 * @return {*}
 */
function findTwoNumbers1(arr, n) {
    var res = [];
    var length = arr.length;
    if (length === 0)
        return res;
    // O(n^2)
    for (var i = 0; i < length - 1; i++) {
        var n1 = arr[i];
        var flag = false; // 是否得到了结果  
        for (var j = i + 1; j < length; j++) {
            var n2 = arr[j];
            if (n1 + n2 === n) {
                res.push(n1, n2);
                flag = true;
                break;
            }
        }
        if (flag)
            break;
    }
    return res;
}
exports.findTwoNumbers1 = findTwoNumbers1;
/**
 * @Descripttion: 寻找和为n的两个数-双指针
 * @Author: GXing
 * @param {number} arr
 * @param {number} n
 * @return {*}
 */
function findTwoNumbers2(arr, n) {
    var res = [];
    var length = arr.length;
    if (length === 0)
        return res;
    var i = 0; //头
    var j = length - 1; //尾 
    while (i < j) {
        var n1 = arr[i];
        var n2 = arr[j];
        var sum = n1 + n2;
        if (sum > n) {
            // sum 大于 n,则j(尾指针)要向前移动
            j--;
        }
        else if (sum < n) {
            //sum小于n,则(i)(头指针)要向前移动
            i++;
        }
        else {
            //找到了
            res.push(n1, n2);
            break;
        }
    }
    return res;
}
exports.findTwoNumbers2 = findTwoNumbers2;
// 功能测试
var arr = [1, 2, 4, 7, 11, 15];
console.info('xxx', findTwoNumbers2(arr, 15));
