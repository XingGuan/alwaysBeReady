"use strict";
exports.__esModule = true;
exports.getKthValue = void 0;
/* 要想拿到一个树,要拿到的是它的根 */
/* 树的构建 */
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
var arr = [];
/* 前序遍历 */
function preOrderTraverse(node) {
    if (node == null)
        return;
    console.log('前序遍历', node.value);
    arr.push(node.value);
    preOrderTraverse(node.left);
    preOrderTraverse(node.right);
}
// let count = 0;
// let num = 0;
/* 中序遍历 */
function inOrderTraverse(node) {
    if (node == null)
        return;
    // console.log('count', num++, node);
    inOrderTraverse(node.left);
    // console.log('node', count++, node);
    console.log('中序遍历', node.value);
    arr.push(node.value);
    inOrderTraverse(node.right);
}
/* 后序遍历 */
function postOrderTraverse(node) {
    if (node == null)
        return;
    postOrderTraverse(node.left);
    postOrderTraverse(node.right);
    console.log('后序遍历', node.value);
    arr.push(node.value);
}
/**
 * 查找二叉搜索树中的第k小值
 * @param node bts node
 * @param k 第几个值
 *  */
function getKthValue(node, k) {
    inOrderTraverse(node);
    console.log('arr', arr);
    return arr[k - 1] || null;
}
exports.getKthValue = getKthValue;
// preOrderTraverse(bst);
// inOrderTraverse(bst);
// postOrderTraverse(bst);  
console.log('bts-result', getKthValue(bst, 3));
