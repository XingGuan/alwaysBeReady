#### 当前项目`Android`与`H5`的数据交互    

> 当前项目中`Android`与`H5`的数据交互没有引入任何第三方插件或包。

这种交互方式就叫`Webview JavascriptInterface`（或`Android Webview Bridge`）。  
更准确地说，它是`Android`系统`WebView`原生提供的标准通信机制，整个链条里没有任何第三方介入。  

+ `Android`:系统只额吉提供了`@JavascriptInterface`，**不需要任何库就能双向通信**，这就是标准做法。   
+ `IOS`:系统没有对等的API(`JavaScriptCore`不能直接注入到`UIWebView`的`JS`上下文中)，所以才需要第三方库`WebViewJavascriptBridge`  

当前方式就是**`Android`官方推荐的正统方式**，就像`document.getElementById`不需要一个专用名字一样——这就是`Android WebView`本身的功能，不是某个框架或模式。   

Google 官方文档就叫它：[WebView 与 JavaScript 交互](https://developer.android.com/develop/ui/views/communications/webview#BindingJavaScript)，其中这一节标题就是 "将 JavaScript 代码绑定到 Android 代码中"（`Binding JavaScript code to Android code`）。  

**就是用`Android WebView`原生的**`@JavascriptInterface`注入了一个`bestvPlus`全局对象，H5直接调用它上面的方法就行，没引入任何`bridge`库。

