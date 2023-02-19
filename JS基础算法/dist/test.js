/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./给一个数组，找出其中和为n的两个元素/two-numbers-sums.ts":
/*!************************************************!*\
  !*** ./给一个数组，找出其中和为n的两个元素/two-numbers-sums.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.findTwoNumbers2 = exports.findTwoNumbers1 = void 0;\r\n/**\r\n * @Descripttion: 寻找和为n的两个数-嵌套循环\r\n * @Author: GXing\r\n * @return {*}\r\n */\r\nfunction findTwoNumbers1(arr, n) {\r\n    const res = [];\r\n    const length = arr.length;\r\n    if (length === 0)\r\n        return res;\r\n    // O(n^2)\r\n    for (let i = 0; i < length - 1; i++) {\r\n        const n1 = arr[i];\r\n        let flag = false; // 是否得到了结果  \r\n        for (let j = i + 1; j < length; j++) {\r\n            const n2 = arr[j];\r\n            if (n1 + n2 === n) {\r\n                res.push(n1, n2);\r\n                flag = true;\r\n                break;\r\n            }\r\n        }\r\n        if (flag)\r\n            break;\r\n    }\r\n    return res;\r\n}\r\nexports.findTwoNumbers1 = findTwoNumbers1;\r\n/**\r\n * @Descripttion: 寻找和为n的两个数-双指针\r\n * @Author: GXing\r\n * @param {number} arr\r\n * @param {number} n\r\n * @return {*}\r\n */\r\nfunction findTwoNumbers2(arr, n) {\r\n    const res = [];\r\n    const length = arr.length;\r\n    if (length === 0)\r\n        return res;\r\n    // O(n)\r\n    let i = 0; //头\r\n    let j = length - 1; //尾 \r\n    while (i < j) {\r\n        const n1 = arr[i];\r\n        const n2 = arr[j];\r\n        const sum = n1 + n2;\r\n        if (sum > n) {\r\n            // sum 大于 n,则j(尾指针)要向前移动\r\n            j--;\r\n        }\r\n        else if (sum < n) {\r\n            //sum小于n,则(i)(头指针)要向前移动\r\n            i++;\r\n        }\r\n        else {\r\n            //找到了\r\n            res.push(n1, n2);\r\n            break;\r\n        }\r\n    }\r\n    return res;\r\n}\r\nexports.findTwoNumbers2 = findTwoNumbers2;\r\n// 功能测试\r\nconst arr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 4, 7, 11, 15];\r\nconsole.info('xxx', findTwoNumbers2(arr, 15));\r\nconsole.time('findTwoNumbers1');\r\nfor (let i = 0; i < 100 * 10000; i++) {\r\n    findTwoNumbers1(arr, 15);\r\n}\r\nconsole.timeEnd('findTwoNumbers1');\r\nconsole.time('findTwoNumbers2');\r\nfor (let i = 0; i < 100 * 10000; i++) {\r\n    findTwoNumbers2(arr, 15);\r\n}\r\nconsole.timeEnd('findTwoNumbers2');\r\n\n\n//# sourceURL=webpack:///./%E7%BB%99%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%EF%BC%8C%E6%89%BE%E5%87%BA%E5%85%B6%E4%B8%AD%E5%92%8C%E4%B8%BAn%E7%9A%84%E4%B8%A4%E4%B8%AA%E5%85%83%E7%B4%A0/two-numbers-sums.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./给一个数组，找出其中和为n的两个元素/two-numbers-sums.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;