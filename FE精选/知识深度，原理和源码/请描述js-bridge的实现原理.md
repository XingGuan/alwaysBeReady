## 什么是`JS Bridge`?  
+ H5中JS无法直接调用`native API`。  
+ 需要通过一些特定的格式来调用。  
+ 这些"格式"就统称`JS-Bridge`，例如微信`JSSDK`。   
## `JS Bridge`的常见实现方式？   
+ 注册全局`API`。  
+ `URL SCheme`。(制造一个协议标准，在APP层做拦截，不要发送网络请求)   

> `JS Bridge`更推荐`URL Scheme`的方式 


