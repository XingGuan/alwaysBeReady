/**
 * @Descripttion: 寻找和为n的两个数-嵌套循环 单元测试
 * @Author: GXing
 * @return {*}
 */

import { findTwoNumbers1,findTwoNumbers2 } from "./two-numbers-sums";

describe('两数之和', () => {
    it('正常情况', () => {
        const arr = [1, 2, 4, 7, 11, 15];
        const res = findTwoNumbers2(arr, 15);
        expect(res).toEqual([4, 11]);
    });
    it('空数组', () => {
        const res = findTwoNumbers2([], 100);
        expect(res).toEqual([]);
    })
    it('找不到结果', () => {
        const arr = [1, 2, 4, 7, 11, 15];
        const n = 100;
        const res = findTwoNumbers2(arr, n);
        expect(res).toEqual([]);
    })
});