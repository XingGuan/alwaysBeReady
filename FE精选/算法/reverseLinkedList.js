"use strict";
exports.__esModule = true;
exports.reverseLinkList = exports.createLinkList = void 0;
;
/* 创建链表(根据数组来生成一个链表) */
/* 单向链表的返回结果是单向链表的头 */
/**
 * 根据数组创建单向链表
 * @param arr number arr
 */
function createLinkList(arr) {
    var length = arr.length;
    if (length === 0)
        throw new Error('arr is empty');
    var curNode = {
        value: arr[length - 1]
    };
    if (length === 1)
        return curNode;
    var node = {
        value: arr[arr.length - 1]
    };
    for (var i = arr.length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        };
    }
    return curNode;
}
exports.createLinkList = createLinkList;
/**
 * 反转单向链表,并返回反转之后的 head node
 * @param listNode list head node
 */
function reverseLinkList(listNode) {
    // 定义三个指针
    var prevNode = undefined;
    var curNode = undefined;
    var nextNode = listNode;
    // 以 nextNode 为主,遍历链表   
    while (nextNode) {
        // 第一个元素，删除 next,防止循环引用  
        if (curNode && !prevNode) {
            delete curNode.next;
        }
        // 反转指针
        if (curNode && prevNode) {
            curNode.next = prevNode;
        }
        // 整体向后移动指针
        prevNode = curNode;
        curNode = nextNode;
        nextNode = nextNode === null || nextNode === void 0 ? void 0 : nextNode.next;
    }
    // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
    curNode.next = prevNode;
    return curNode;
}
exports.reverseLinkList = reverseLinkList;
var arr = [100, 200, 300, 400, 500];
var list = createLinkList(arr);
console.log(list);
var list1 = reverseLinkList(list);
console.info('list1', list1);
