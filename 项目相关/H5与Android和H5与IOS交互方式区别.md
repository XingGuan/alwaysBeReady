> 现象：H5与APP进行数据交互，`Android`没有引入任何库，`IOS`引入了库，两边处理不一致。  

#### 为什么两边不一致？   
根本原因：两个平台的`WebView`底层架构不同。  

| ``            | `Android`                  | `IOS`                         |
| ------------- | -------------------------- | ----------------------------- |
| `WebView`内核 | `Chromium`（`V8`引擎）     | `WKWebView`(`JavaScriptCore`) |
| 原生注入能力  | 有`addJavascriptInterface` | 没有对等的`API`               |
| 结果          | 系统自带，零依赖           | 需要第三方库补缺口            |

#### 具体来说  
`Android`的`WebView`是`Chrome`团队维护的，很早就设计了`addJavascriptInterface``API`——意思就是「你要把`Java`对象暴露给`JS`?系统直接帮你做」。   
`IOS`的`WKWebView`从一开始就没有这样一个直接的绑定`API`。它的`WKUserContentController`虽然能处理`JS`消息，但：  
// `ios WKWebView`只能这样：`JS`发消息给`Native`  
// `ios`侧注册一个`handler`，`JS`通过`postMessage`触发  
`webView.configuration.userContentController.add(self,name:"handlerName")`  

// JS 侧
`window.webkit.messageHandlers.handlerName.postMessage(data)`  
但它不支持把**`Native`方法暴露给`JS`直接调用**，也不能同步返回值。所以社区就搞出了`WebViewJavascriptBridge`,通过`iframe URL`拦截的`hack`来模拟双向通信。
后来`ios7`虽然引入了`JavaScriptCore`框架，但它只能操作`JSContext`，跟`WKWebView`的`JS`环境是隔离的，还是接不上。   




> `WKWebView(JavaScript)`可以理解为"使用`JavaScriptCore`作为`JS`引擎的`WKWebView`"。    
> 或者是"`WKWebView`"中那个用来跑`JS`的`JavaScriptCore`环境。  


`addJavascript`**至今仍然是`Android`官方推荐、最广泛使用的方式**。  
这种方法算什么？就是所说的那种`window`注入的方式吗？  
> "`window`注入" 就是这个意思，不过更准确的叫法是**JS对象注入或`Java`对象绑定**。  

不同的叫法  
|叫法|是否准确|说明|
|`window注入`|通俗说法|注入后确实挂在`window.bestvPlus`上|
|`JS`对象注入|准确|把`Java`对象注入到`JS`执行环境|
|`Java`对象绑定|官方术语|`addJavascriptInterface`的官方叫法就是"`Binding JavaScript code to Android code`"|
|`JavascriptInterface`|官方`API`名|注解名|
|`JS Bridge`|模糊|这个范围更广，包含了`URL`拦截、`prompt`劫持等所有方案|  

这种方法的本质是什么？  
就是「把一个`Java`对象挂到了`JS`的`window`上」。  
```
window.bestvPlus = {
    getBarHeight:???,
    getMapJson:???
}
```  
只不过这个对象里的方法，底层实现**不在`JS`里，`WebView`帮你做了这个穿透**。   
所以用「`window` 注入」来理解完全正确——给`window`上挂了一个叫`bestvPlus`的东西，`JS`能直接调它。差别就是常规`JS`对象的方法在`JS`里执行，而它上面的方法在`Java`里执行。

除了`JS`对象注入的方法，其它的方法？  
按时间顺序：  
方法一：`URL`拦截（最早、最通用的方式）  
**原理**  
`H5`发起一个特殊的`URL`请求，`Native`在`Webview`的请求回调里拦截它，不让它真的去加载网络，而是解析`URL`参数，执行对应的`Native`代码。
**实现**
**`H5`与`Android`原生通过`URL`拦截方式实现通信（`JSBridge`）的经典流程。**
```javascript
//H5
window.location.href = "jsbridge://getBarHeight?callback=cb_1001";  
//Android  
webView.setWebViewClient(new WebViewClient()){
    @Override  
    public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request){
        String url = request.getUrl().toString();  
        if(url.startsWith("jsbridge://")){
            // 拦截，解析`URL`，执行对应方法  
            String method = url.substring(12);//"getBarHeight"
            if(method.contains("getBarHeight")){
                view.evaluateJavascript("javascript:cb_1001('88')",null);
            }
            return true;
        }
        return false;
    }
}


```

##### 这里可以拆成两步来理解：  
1.`H5`发起调用  
```javascript
window.location.href=`jsbridge://getBarHeight?callback=cb_1001`;
```  

