### 数组扁平化是指将一个多维数组变为一个一维数组
```javascript
    const arr = [1,[2,[3,[4,5]]],6];
```
#### 方法一：
```javascript
    const res1 = arr.flat(Infinity);
``` 