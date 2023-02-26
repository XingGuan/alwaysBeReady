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

/***/ "./求二叉搜索树的第k小值/binary-search-tree.ts":
/*!*******************************************!*\
  !*** ./求二叉搜索树的第k小值/binary-search-tree.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getKthValue = void 0;\r\n/* 要想拿到一个树,要拿到的是它的根 */\r\n/* 树的构建 */\r\nconst bst = {\r\n    value: 5,\r\n    left: {\r\n        value: 3,\r\n        left: {\r\n            value: 2,\r\n            left: null,\r\n            right: null\r\n        },\r\n        right: {\r\n            value: 4,\r\n            left: null,\r\n            right: null\r\n        }\r\n    },\r\n    right: {\r\n        value: 7,\r\n        left: {\r\n            value: 6,\r\n            left: null,\r\n            right: null\r\n        },\r\n        right: {\r\n            value: 8,\r\n            left: null,\r\n            right: null\r\n        }\r\n    }\r\n};\r\nconst arr = [];\r\n/* 前序遍历 */\r\nfunction preOrderTraverse(node) {\r\n    if (node == null)\r\n        return;\r\n    console.log('前序遍历', node.value);\r\n    arr.push(node.value);\r\n    preOrderTraverse(node.left);\r\n    preOrderTraverse(node.right);\r\n}\r\n// let count = 0;\r\n// let num = 0;\r\n/* 中序遍历 */\r\nfunction inOrderTraverse(node) {\r\n    if (node == null)\r\n        return;\r\n    // console.log('count', num++, node);\r\n    inOrderTraverse(node.left);\r\n    // console.log('node', count++, node);\r\n    console.log('中序遍历', node.value);\r\n    arr.push(node.value);\r\n    inOrderTraverse(node.right);\r\n}\r\n/* 后序遍历 */\r\nfunction postOrderTraverse(node) {\r\n    if (node == null)\r\n        return;\r\n    postOrderTraverse(node.left);\r\n    postOrderTraverse(node.right);\r\n    console.log('后序遍历', node.value);\r\n    arr.push(node.value);\r\n}\r\n/**\r\n * 查找二叉搜索树中的第k小值\r\n * @param node bts node\r\n * @param k 第几个值\r\n *  */\r\nfunction getKthValue(node, k) {\r\n    inOrderTraverse(node);\r\n    console.log('arr', arr);\r\n    return arr[k - 1] || null;\r\n}\r\nexports.getKthValue = getKthValue;\r\n// preOrderTraverse(bst);\r\n// inOrderTraverse(bst);\r\n// postOrderTraverse(bst);  \r\nconsole.log('bts-result', getKthValue(bst, 3));\r\n\n\n//# sourceURL=webpack:///./%E6%B1%82%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E7%AC%ACk%E5%B0%8F%E5%80%BC/binary-search-tree.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./求二叉搜索树的第k小值/binary-search-tree.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;