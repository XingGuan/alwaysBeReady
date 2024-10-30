[掘金前端一共几种请求API](https://juejin.cn/post/7427265723947237376)  
1.`XMLHttpRequest`：这是一个老牌的`API`，用于在浏览器和服务器之间发送`HTTP`请求。**它支持异步请求**，并可以通过设置回调函数来处理响应。尽管它已经被更现代的`API`取代，但在一些旧的浏览器或特定的场景中仍然有用。   
2.`Fetch`:`Fetch`是一个现代、功能强大的网络`API`,它使用`Promise`使异步操作更加容易。`Fetch`提供了更简洁的语法和更好的错误处理机制，并支持发送和接收各种类型的数据(如`JSON`\文本\\`Blob`)等。   
> `Fetch`的性能是要强`XMLHttpRequest`。

3.`Beacon API`:    
`navigator.sendBeacon()`方法允许异步地发送少量数据到服务器，通常用于早页面卸载时发送分析或诊断信息。这个方法确保数据发送成功，即使页面已经关闭或用户已经导航到其他页面。
`navigator.sendBeacon()`：方法可用于通过`HTTP POST`将少量数据`异步`传输到`Web`服务器。  
它主要用于将统计数据发送到`Web`服务器，同时避免了用传统技术(如：`XMLHttpRequest`)发送分析数据的一些问题。  
#### 语法：
```javascript
navigator.sendBeacon(url);
navigator.sendBeacon(url,data);
```  

[Navigator.sendBeacon() MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
