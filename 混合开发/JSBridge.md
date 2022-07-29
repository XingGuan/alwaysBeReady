### 什么是JSBridge  
我们开发的`h5`页面运行在端上的`WebView`容器之中，很多业务场景下`h5`需要依赖端上提供的信息/能力，这时我们需要一个可以连接原生运行环境和`JS`运行环境的桥梁。这个桥梁就是`JSB`，**JSB让Web端和Native端得以实现双向通信。**   

在`IOS`开发`Hybrid App`的时候，有两个`Webview`可以选择。  
`UIwebView & WKWebView`  

`IOS8`以后，苹果推出了新框架`Webkit`，提供了替换`UIWebView`的`WKWebView`,速度会更快，占用内存少。从`IOS13`开始苹果将`UIWebView`列为过期`API`。**2020年4月起APP Store将不再接受使用`UIWebView`的新App上架。2020年12月将不再接受使用`UIWebView`的`App`更新。**  

**WKWebView的特性**

+ 在性能，稳定性，功能方面有很大提升，直观体现是内存占用变少。
+ 允许`JavaScript`的`Nitro`库加载并使用(`UIWebView`中限制)。
+ 支持了更多的`HTML5`特性。
+ 高达60fps的滚动刷新频率以及内置手势。
+ 将`UIWebViewDelegate`与`UIWebView`重构成了14类与3个协议;
   
`UIWebView`和`WKWebView`，可以完全只借助`IOS`自带的框架进行`OC`&`JS`交互。   
+ `UIWebView`使用`javascriptCore`
+ `WKWebView`使用`WKUserContentController`  

### UIWebView 原生的交互原理
通过一个`JSContext`获取`UIWebView`的JS执行上下文。  
然后通过这个上下文，进行`OC & JS`的双端交互。  
```javascript
_jsContext = [webview valueForKeyPath:@"documentView.webview.mainFrame.javaScriptContext"];
  _jsContext.exceptionHandler = ^(JSContext *context, JSValue *exception) {
        NSLog(@"%@",@"获取 WebView JS 执行环境失败了!");
    };
```  
### WKWebView 原生交互原理  
通过`userContentController`把需要观察的`JS`执行函数注册起来。  
然后通过一个协议方法，将所有注册过的JS函数执行的参数传递到此协议方法中。  
注册需要观察的`JS`执行函数
```javascript
[webView.configuration.userContentController addScriptMessageHandler:self name:@"jsFunc"];
```  
在`JS`中调用这个函数并传递参数数据  
```javascript
window.webkit.messageHandlers.jsFunc.postMessage({name:"李四",age:22});
```  
OC中遵守`WKScriptMessageHandler`协议。
```javascript
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message  
``` 
>此协议方法里的`WKScriptMessage`有`name` & `body`两个属性。`name`可以用来判断是那个`JSFunc`调用了。`body`则是`JSFunc`传递到`OC`的参数。  

### WebViewJavaScriptBridge
`WebViewJavaScriptBridge`用于`WKWebView`和`UIWebView`中`OC`和`JS`交互。  



[WebViewJavaScriptBridge 基本使用](https://www.jianshu.com/p/d12ec047ce52)  
[WebViewJavascriptBridge 源码学习--了解其实现原理](https://www.jianshu.com/p/485e7baf577c)  
