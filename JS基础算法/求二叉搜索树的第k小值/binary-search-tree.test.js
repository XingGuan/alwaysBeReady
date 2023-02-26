"use strict";
/**
 * @description 二叉搜索树test
 */
exports.__esModule = true;
var binary_search_tree_1 = require("./binary-search-tree");
describe('二叉搜索树', function () {
    var bst = {
        value: 5,
        left: {
            value: 3,
            left: {
                value: 2,
                left: null,
                right: null
            },
            right: {
                value: 4,
                left: null,
                right: null
            }
        },
        right: {
            value: 7,
            left: {
                value: 6,
                left: null,
                right: null
            },
            right: {
                value: 8,
                left: null,
                right: null
            }
        }
    };
    it('正常情况', function () {
        var res = (0, binary_search_tree_1.getKthValue)(bst, 3);
        expect(res).toBe(4);
    });
    it('k 不在正常范围内', function () {
        var res = (0, binary_search_tree_1.getKthValue)(bst, 3);
        expect(res).toBeNull;
        var res2 = (0, binary_search_tree_1.getKthValue)(bst, 1000);
        expect(res2).toBeNull;
    });
});
