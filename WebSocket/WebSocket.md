[WebSocket参与文档](http://www.ruanyifeng.com/blog/2017/05/websocket.html)   

[Vue 项目使用WebSocket Demo](https://www.jianshu.com/p/9d8b2e42328c)  

[Websocket定时推送消息到浏览器端华为云社区](https://www.huaweicloud.com/articles/42a2a28f1d3a227550a277243cd53df8.html)   
   
### WebSocket教程
WebSocket是一种网络通信协议,很多高级功能都需要它。
#### 一、为什么需要WebSocket?    
初次接触WebSocket的人，都会问同样的问题，我们已经有了HTTP协议，为什么还需要另一个协议?它能带来什么好处?   
> 答案很简单,因为HTTP协议有一个缺陷 : **通信只能由客户端发起**。
**HTTP协议做不到服务器主动向客户端推送信息**。

这种单向请求的特点,注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用轮询：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的就是聊天室。  
轮询的效率低，非常浪费资源(因为必须不停连接,或者HTTP连接始终打开)。  
**WebSocket就是这样发明的**。
#### 二、简介
WebSocket协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。
它的最大特点就是，服务器可以主动向客户端推送消息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

Client ——>**Handshake**——>Server  
Client <——**Acknowledgement**<——Server  
Client <——>**Bi-directional message**<——>Server   
Connection end

其他特点包括:  
+ (1) 建立在TCP协议之上，服务端的实现比较容易。
+ (2) 与HTTP协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用HTTP协议，因此握手时不容易屏蔽,能通过各种HTTP代理服务器。
+ (3) 数据格式比较轻量，性能开销小，通信高效。
+ (4) 可以发送文本，也可以发送二进制数据。
+ (5) 没有同源限制，客户端可以与任意服务器通信。
+ (6) 协议标识符是`ws`(如果加密，则为`wss`),服务器网址就是URL。

`ws://example.com:80/some/path`

> HTTP: `TCP+HTTP`  
HTTPS: `TCP+TLS+HTTP`  
WS: `TCP+WS`  
WSS: `TCP+TLS+WS`   

#### 三、客户端的简单示例  
WebSocket 的用法相当简单
```javascript
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
``` 
#### 四、客户端的API
WebSocket 客户端的API如下。
#### 4.1 WebSocket构造函数
WebSocket 对象作为一个构造函数，用于新建WebSocket实例。  
`var ws = new WebSocket('ws://localhost:8080');`
执行上面语句之后，客户端就会与服务器进行连接。
#### 4.2 webSocket.readyState
`readyState`属性返回当前实例对象的当前状态，共有四种。
+ CONNECTING：值为0，表示正在连接。
+ OPEN：值为1，表示连接成功，可以通信了。
+ CLOSING：值为2，表示连接正在关闭。
+ CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

下面是一个示例
```javascript
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

