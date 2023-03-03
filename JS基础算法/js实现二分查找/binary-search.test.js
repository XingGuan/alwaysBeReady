"use strict";
exports.__esModule = true;
/**
 * @Descripttion: 二分查找单元测试
 * @Author: GXing
 * @return {*}
 */
var binary_search_1 = require("./binary-search");
describe('二分查找', function () {
    it('正常情况', function () {
        var arr = [10, 20, 30, 40, 50, 60];
        var target = 40;
        var index = (0, binary_search_1.binarySearch1)(arr, target);
        expect(index).toBe(3);
    });
    it('空数组', function () {
        expect((0, binary_search_1.binarySearch1)([], 100)).toBe(-1);
    });
    it('找不到target', function () {
        var arr = [10, 20, 30, 40, 50, 60];
        var target = 400;
        var index = (0, binary_search_1.binarySearch1)(arr, target);
        expect(index).toBe(-1);
    });
});
