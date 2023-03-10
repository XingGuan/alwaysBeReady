// 展开数组方法一flat  `ES2019`

/* 
* 1.flat()方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。   
* 2.flatMap() 方法首先使用映射函数映射每一个元素，然后将结果压成一个新数组。它与`map`连着深度值为1的`flat`几乎相同，但`flatMap`通常在合并成一种方法的效率稍微高些。
*/
const arr = [1, [2, [3, [4, 5]]], 6];
const flatArr = arr.flat(Infinity);
console.log('flatArr',flatArr);