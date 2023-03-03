/*
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-26 22:55:07
 */
export interface ITreeNode {
    value: number,
    left: ITreeNode | null,
    right: ITreeNode | null
}
/* 要想拿到一个树,要拿到的是它的根 */
/* 树的构建 */
const bst: ITreeNode = {
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
}

const arr: number[] = [];

/* 前序遍历 */
function preOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    console.log('前序遍历', node.value);
    arr.push(node.value);
    preOrderTraverse(node.left);
    preOrderTraverse(node.right);
}


// let count = 0;
// let num = 0;
/* 中序遍历 */
function inOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    // console.log('count', num++, node);
    inOrderTraverse(node.left);
    // console.log('node', count++, node);
    console.log('中序遍历', node.value);
    arr.push(node.value);
    inOrderTraverse(node.right);
}

/* 后序遍历 */
function postOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
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

export function getKthValue(node: ITreeNode | null, k: number): number | null {
    inOrderTraverse(node);
    console.log('arr', arr);
    return arr[k - 1] || null;
}

// preOrderTraverse(bst);
// inOrderTraverse(bst);
// postOrderTraverse(bst);  
console.log('bts-result', getKthValue(bst, 3));