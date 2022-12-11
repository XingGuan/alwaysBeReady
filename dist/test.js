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

/***/ "./JS基础算法/index.ts":
/*!*************************!*\
  !*** ./JS基础算法/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./将一个数组旋转k步/array-rotate */ \"./JS基础算法/将一个数组旋转k步/array-rotate.ts\");\r\n// import './将一个数组旋转k步/array-rotate.test';\r\n\n\n//# sourceURL=webpack://alwaysBeReady/./JS%E5%9F%BA%E7%A1%80%E7%AE%97%E6%B3%95/index.ts?");

/***/ }),

/***/ "./JS基础算法/将一个数组旋转k步/array-rotate.ts":
/*!******************************************!*\
  !*** ./JS基础算法/将一个数组旋转k步/array-rotate.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.rotate2 = exports.rotate1 = void 0;\r\n/**\r\n * 旋转数组k步 - 使用 pop 和 unshift\r\n * @param arr arr\r\n * @param k k\r\n * @returns arr\r\n */\r\nfunction rotate1(arr, k) {\r\n    const length = arr.length;\r\n    if (!k || length === 0)\r\n        return arr;\r\n    const step = Math.abs(k % length); //Math.abs()方法返回一个数的绝对值  \r\n    // O(n^2) ??\r\n    for (let i = 0; i < step; i++) {\r\n        const n = arr.pop();\r\n        if (n != null) {\r\n            arr.unshift(n); //数组是一个连续内存，数组是一个有序结构，`unshift` 操作非常慢 ！！！O(n)\r\n        }\r\n    }\r\n    return arr;\r\n}\r\nexports.rotate1 = rotate1;\r\n/**\r\n * 旋转数组 k 步 - 使用 concat\r\n * @param arr arr\r\n * @param k k\r\n */\r\nfunction rotate2(arr, k) {\r\n    const length = arr.length;\r\n    if (!k || length === 0)\r\n        return arr;\r\n    const step = Math.abs(k % length); //abs取绝对值 \r\n    // O(1) \r\n    const part1 = arr.slice(-step); // `O(1)`\r\n    const part2 = arr.slice(0, length - step);\r\n    const part3 = part1.concat(part2);\r\n    return part3;\r\n}\r\nexports.rotate2 = rotate2;\r\n// 功能测试\r\n// const arrinit1 = [1, 2, 3, 4, 5, 6, 7];\r\n// const arrinit2 = [1, 2, 3, 4, 5, 6, 7];\r\n// const arr1 = rotate1(arrinit1, 3);\r\n// const arr2 = rotate2(arrinit2, 3);\r\n// console.info('rotate1 arr', arr1);\r\n// console.info('rotate2 arr', arr2);  \r\n//性能测试  \r\n// const arr1 = [];\r\n// for (let i = 0; i < 10 * 10000; i++) {\r\n//     arr1.push(i);\r\n// }\r\n// console.time('rotate1');\r\n// rotate1(arr1, 9 * 10000);\r\n// console.timeEnd('rotate1'); //929ms O(n^2)\r\n// console.log('----------------');\r\n// const arr2 = [];\r\n// for (let i = 0; i < 10 * 10000; i++) {\r\n//     arr2.push(i);\r\n// }\r\n// console.time('rotate2');\r\n// rotate2(arr2, 9 * 10000);\r\n// console.timeEnd('rotate2');//0.4ms O(1)\r\n\n\n//# sourceURL=webpack://alwaysBeReady/./JS%E5%9F%BA%E7%A1%80%E7%AE%97%E6%B3%95/%E5%B0%86%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E6%97%8B%E8%BD%ACk%E6%AD%A5/array-rotate.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./JS基础算法/index.ts");
/******/ 	
/******/ })()
;