// 数组去重方法一flat
const arr = [1, [2, [3, [4, 5]]], 6];
const flatArr = arr.flat(Infinity);
console.log('flatArr',flatArr)