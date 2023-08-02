一、基本用法  
`fetch()`的功能与`XMLHttpRequest`基本相同，但有三个主要的差异。   
(1) `fetch`使用`Promise`，不使用回调函数，因此大大简化了写法，写起来更简洁。   
(2) `fetch`采用模块化设计，`API`分散在多个对象上(`Response`对象、`Request`对象、`Headers`对象)，更合理一些；相比之下，
(3) `fetch()` 通过数据流(`Stream`对象)处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。`XMLHTTPRequest`对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。   
### `fetch`用法   
> `fetch()`接受一个`URL`字符串作为参数，默认向该网址发出`GET`请求，返回一个`Promise`对象。它的基本用法如下。   
```javascript
fetch(url)
    .then(……)
    .catch(……)
```  
从服务器获取`JSON`数据  
```javascript
fetch(`https://api.github.com/users/ruanvf`)
    .then(response=>response.json())
    .then(json=>console.log(json))
    .catch(err=>{
     console.log("Request failed",err);
    })
```  
`fetch()`接收到的`response`是一个`Stream`对象，`response.json()`是一个异步操作，取出所有内容，并将其转为`JSON`对象。   

> `Promise`可以使用`await`语法改写，使得语义更清晰。   

```javascript
async function getJSON(){
    let url = `https://api.github.com/users/ruanvf`;  
    try{
        let response = await fetch(url);
        return await response.json();
    }catch(error){
       console.log("Request Failed",error);
    }
}
```  
上面示例中，`await`语句必须放在`try……catch`里面，这样才能捕捉异步操作中可能发生的错误。  

### `Response`对象：处理`HTTP`回应   
2.1 `Response`对象的同步属性  
`fetch`请求成功以后，得到的是一个`Response`对象。它对应服务器的`HTTP`回应。   
```javascript
const response = await fetch(url);
```   
`Response`包含的数据通过`Stream`接口异步读取，但是它还包含一些同步属性，对应`HTTP`回应的标头信息(`Headers`),可以立即读取。   
```javascript
async function fetchText(){
    let response = await fetch('/readme.txt');  
    console.log(response.status);
    console.log(response.statusText);
}
```  
上面示例中，`response.status`和`response.statusText`就是`Response`的同步属性，可以立即读取。   

### 标头信息属性有下面这些。  
+ `Response.ok`   
`Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应`HTTP`请求的状态码200到299，`false`对应其他的状态码。  
`Response.status`   





