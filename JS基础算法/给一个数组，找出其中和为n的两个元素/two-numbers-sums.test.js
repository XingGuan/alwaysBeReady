"use strict";
/**
 * @Descripttion: 寻找和为n的两个数-嵌套循环 单元测试
 * @Author: GXing
 * @return {*}
 */
exports.__esModule = true;
var two_numbers_sums_1 = require("./two-numbers-sums");
describe('两数之和', function () {
    it('正常情况', function () {
        var arr = [1, 2, 4, 7, 11, 15];
        var res = (0, two_numbers_sums_1.findTwoNumbers2)(arr, 15);
        expect(res).toEqual([4, 11]);
    });
    it('空数组', function () {
        var res = (0, two_numbers_sums_1.findTwoNumbers2)([], 100);
        expect(res).toEqual([]);
    });
    it('找不到结果', function () {
        var arr = [1, 2, 4, 7, 11, 15];
        var n = 100;
        var res = (0, two_numbers_sums_1.findTwoNumbers2)(arr, n);
        expect(res).toEqual([]);
    });
});
