## 1.URLSearchParams  
`URLSearchParams`接口定义了一些实用的方法来处理`URL`的查询字符串。  
一个实现了`URLSearchParams`的对象可以直接用在`for...of`结构中。
如何实现`URLSearchParams`对象:
```javascript
const urlSearchParams = new URLSearchParams();
```  
![avatar][URLSearchParams]  

构造函数,`URLSearchParams`返回一个`URLSearchParams`对象。该接口不继承任何属性。一个实现了`URLSearchParams`的对象可以直接用在`for...of`中。  

## 方法   

+ `URLSearchParams.append()`插入一个指定的键/值对作为新的搜索参数。  
### 语法 
```javascript
URLSearchParams.append(name,value);
```
+ `URLSearchParams.delete()`从搜索列表里删除指定的搜索参数及其对应的值。
### 语法 
```javascript
URLSearchParams.delete(name);  
```  
+ `URLSearchParams.entries()`返回一个`iterator`可以遍历所有键/值对的对象。  
### 语法
```javascript
searchParams.entries();
```  
+ `URLSearchParams.get()` 获取指定搜索参数的第一个值。  
### 语法
```javascript
URLSearchParams.get(name);
```   
+ `URLSearchParams.getAll()` 获取指定搜索参数的所有值，返回是一个数组。
### 语法
```javascript
URLSearchParams.getAll(name);
```  
+ `URLSearchParams.has()`,返回`Boolean`判断是否存在此搜索参数。
### 语法
```javascript
var hasName = URLSearchParams.has(name)
```
+ `URLSearchParams.keys()`,返回`iterator`此对象包含了键/值对的所有键名。
### 语法
```javascript
URLSearchParams.keys();
```  
+ `URLSearchParams.set()`,设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值。  
### 语法
```javascript
URLSearchParams.set(name, value);
```   
+ `URLSearchParams.sort()`,按键名排序。   
### eg
```javascript
// Create a test URLSearchParams object
var searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");

// Sort the key/value pairs
searchParams.sort();

// Display the sorted query string
console.log(searchParams.toString());

```
### result
```javascript
a=2&a=1&b=3&c=4
```  
+ `URLSearchParams.toString()`,返回搜索参数组成的字符串，可直接使用在`URL`上。  
+ `URLSearchParams.values()` ,返回`iterator`此对象包含了键/值对的所有值。 
  
## EG:
```javascript
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```

## 2.通过正则获取URL中的参数

 ```javascript
 function getQueryString(name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);

          if (r != null) {
             return decodeURIComponent(r[2]);
          }
          return null;
  }
// 这样调用：
alert(GetQueryString("参数名1"));

alert(GetQueryString("参数名2"));

alert(GetQueryString("参数名3"));
```  
### 另外一种写法  
假设`url`参数为`?activicode=1&username=gg`
```javascript
// 获取当前页面URL的查询字符串部分
const urlParams = window.location.search;

// 正则表达式匹配参数
const regex = /[?&]([^=#]+)=([^&#]*)/g;
const paramsObject = {};

// 匹配并填充参数对象
let match;
while ((match = regex.exec(urlParams)) !== null) {
  paramsObject[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
}

// 获取单个参数值
const paramValue = paramsObject['username'];
```
`window.location.search`的输出值
![alt text](./img/locationSearch.png)
`regex.exec(urlParams)`的输出值  
![alt text](./img/regexExec.png)

## 3.原生`JavaScript`手动解析`url`中的参数值   
```javascript
// 获取当前页面URL的查询字符串部分
const urlParams = window.location.search.substring(1);

// 将查询字符串分割为键值对数组
const paramPairs = urlParams.split('&');

// 创建一个对象来存储参数
const paramsObject = {};

// 遍历键值对数组，填充参数对象
for (const pair of paramPairs) {
  const [key, value] = pair.split('=');
  paramsObject[decodeURIComponent(key)] = decodeURIComponent(value);
}

// 获取单个参数值
const paramValue = paramsObject['yourParameterName'];
```


[URLSearchParams]:data:image/png;base64,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
