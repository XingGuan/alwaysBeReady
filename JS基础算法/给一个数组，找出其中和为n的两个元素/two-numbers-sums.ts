/**
 * @Descripttion: 寻找和为n的两个数-嵌套循环 
 * @Author: GXing
 * @return {*}
 */
export function findTwoNumbers1(arr: number[], n: number): number[] {
    const res: number[] = [];
    const length = arr.length;
    if (length === 0) return res;
    // O(n^2)
    for (let i = 0; i < length - 1; i++) {
        const n1 = arr[i];
        let flag = false;// 是否得到了结果  
        for (let j = i + 1; j < length; j++) {
            const n2 = arr[j];
            if (n1 + n2 === n) {
                res.push(n1, n2);
                flag = true;
                break;
            }
        }
        if (flag) break;

    }
    return res;
}
/**
 * @Descripttion: 寻找和为n的两个数-双指针 
 * @Author: GXing
 * @param {number} arr
 * @param {number} n
 * @return {*}
 */
export function findTwoNumbers2(arr: number[], n: number): number[] {
    const res: number[] = [];
    const length = arr.length;
    if (length === 0) return res;
    // O(n)
    let i = 0;//头
    let j = length - 1; //尾 
    while (i < j) {
        const n1 = arr[i];
        const n2 = arr[j];
        const sum = n1 + n2;
        if (sum > n) {
            // sum 大于 n,则j(尾指针)要向前移动
            j--;
        } else if (sum < n) {
            //sum小于n,则(i)(头指针)要向前移动
            i++;
        } else {
            //找到了
            res.push(n1, n2);
            break;
        }
    }
    return res;
}

// 功能测试
const arr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 4, 7, 11, 15];
console.info('xxx', findTwoNumbers2(arr, 15));

console.time('findTwoNumbers1');
for (let i = 0; i < 100 * 10000; i++) {
    findTwoNumbers1(arr, 15);
}
console.timeEnd('findTwoNumbers1');

console.time('findTwoNumbers2');
for (let i = 0; i < 100 * 10000; i++) {
    findTwoNumbers2(arr, 15);
}
console.timeEnd('findTwoNumbers2');
