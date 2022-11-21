"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Array rotate test
 */
const array_rotate_1 = require("./array-rotate");
describe('数组旋转', () => {
    // 测试用例
    it('正常情况', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const k = 3;
        const res = (0, array_rotate_1.rotate2)(arr, k);
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });
    it('数组为空', () => {
        const res = (0, array_rotate_1.rotate2)([], 3);
        expect(res).toEqual([]);
    });
    it('k是负值', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const k = -3;
        const res = (0, array_rotate_1.rotate2)(arr, k);
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });
    it('k 是 0', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const k = 0;
        // @ts-ignore
        const res = (0, array_rotate_1.rotate2)(arr, k);
        expect(res).toEqual(arr);
    });
    it('k不是数字', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const k = 'abc';
        // @ts-ignore
        const res = (0, array_rotate_1.rotate2)(arr, k);
        expect(res).toEqual(arr);
    });
});
