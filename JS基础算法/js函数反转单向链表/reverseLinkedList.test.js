"use strict";
/**
 * @description 反转单向链表 test
 * @author GXing
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reverseLinkedList_1 = require("./reverseLinkedList");
describe('反转单向链表', () => {
    it('单个元素', () => {
        const node = { value: 100 };
        const node1 = (0, reverseLinkedList_1.reverseLinkList)(node);
        expect(node1).toEqual({ value: 100 });
    });
    it('多个元素', () => {
        const node = (0, reverseLinkedList_1.createLinkList)([100, 200, 300]);
        const node1 = (0, reverseLinkedList_1.reverseLinkList)(node);
        expect(node1).toEqual({
            value: 300,
            next: {
                value: 200,
                next: {
                    value: 100
                }
            }
        });
    });
});
