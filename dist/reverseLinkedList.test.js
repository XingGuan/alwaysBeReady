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

/***/ "./FE精选/算法/reverseLinkedList.test.ts":
/*!*******************************************!*\
  !*** ./FE精选/算法/reverseLinkedList.test.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\n/**\r\n * @description 反转单向链表 test\r\n * @author GXing\r\n */\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst reverseLinkedList_1 = __webpack_require__(/*! ./reverseLinkedList */ \"./FE精选/算法/reverseLinkedList.ts\");\r\ndescribe('反转单向链表', () => {\r\n    it('单个元素', () => {\r\n        const node = { value: 100 };\r\n        const node1 = (0, reverseLinkedList_1.reverseLinkList)(node);\r\n        expect(node1).toEqual({ value: 100 });\r\n    });\r\n    it('多个元素', () => {\r\n        const node = (0, reverseLinkedList_1.createLinkList)([100, 200, 300]);\r\n        const node1 = (0, reverseLinkedList_1.reverseLinkList)(node);\r\n        expect(node1).toEqual({\r\n            value: 300,\r\n            next: {\r\n                value: 200,\r\n                next: {\r\n                    value: 100\r\n                }\r\n            }\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://alwaysBeReady/./FE%E7%B2%BE%E9%80%89/%E7%AE%97%E6%B3%95/reverseLinkedList.test.ts?");

/***/ }),

/***/ "./FE精选/算法/reverseLinkedList.ts":
/*!**************************************!*\
  !*** ./FE精选/算法/reverseLinkedList.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.reverseLinkList = exports.createLinkList = void 0;\r\n;\r\n/* 创建链表(根据数组来生成一个链表) */\r\n/* 单向链表的返回结果是单向链表的头 */\r\n/**\r\n * 根据数组创建单向链表\r\n * @param arr number arr\r\n */\r\nfunction createLinkList(arr) {\r\n    const length = arr.length;\r\n    if (length === 0)\r\n        throw new Error('arr is empty');\r\n    let curNode = {\r\n        value: arr[length - 1]\r\n    };\r\n    if (length === 1)\r\n        return curNode;\r\n    let node = {\r\n        value: arr[arr.length - 1],\r\n    };\r\n    for (let i = arr.length - 2; i >= 0; i--) {\r\n        curNode = {\r\n            value: arr[i],\r\n            next: curNode\r\n        };\r\n    }\r\n    return curNode;\r\n}\r\nexports.createLinkList = createLinkList;\r\n/**\r\n * 反转单向链表,并返回反转之后的 head node\r\n * @param listNode list head node\r\n */\r\nfunction reverseLinkList(listNode) {\r\n    // 定义三个指针\r\n    let prevNode = undefined;\r\n    let curNode = undefined;\r\n    let nextNode = listNode;\r\n    // 以 nextNode 为主,遍历链表   \r\n    while (nextNode) {\r\n        // 第一个元素，删除 next,防止循环引用  \r\n        if (curNode && !prevNode) {\r\n            delete curNode.next;\r\n        }\r\n        // 反转指针\r\n        if (curNode && prevNode) {\r\n            curNode.next = prevNode;\r\n        }\r\n        // 整体向后移动指针\r\n        prevNode = curNode;\r\n        curNode = nextNode;\r\n        nextNode = nextNode === null || nextNode === void 0 ? void 0 : nextNode.next;\r\n    }\r\n    // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next\r\n    curNode.next = prevNode;\r\n    return curNode;\r\n}\r\nexports.reverseLinkList = reverseLinkList;\r\nconst arr = [100, 200, 300, 400, 500];\r\nconst list = createLinkList(arr);\r\nconsole.log(list);\r\nconst list1 = reverseLinkList(list);\r\nconsole.info('list1', list1);\r\n\n\n//# sourceURL=webpack://alwaysBeReady/./FE%E7%B2%BE%E9%80%89/%E7%AE%97%E6%B3%95/reverseLinkedList.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./FE精选/算法/reverseLinkedList.test.ts");
/******/ 	
/******/ })()
;