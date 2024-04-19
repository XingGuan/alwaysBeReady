### 下载页面H5唤起App问题整理
需求如果有App就跳转打开App,如果没有App就下载App。

## 安卓   
微信内唤起App：
+ 微信内部无法通过`scheme`唤起App
+ 微信内部无法直接下载安卓apk应用程序包  
微信内安卓可通过应用宝间接跳转/下载App

网页内唤起App:
+ `URL Scheme`  
+ `App Links`  

> 在`Android 6.0`之前，点击链接会产生一个对话框，询问用户打开哪个应用。但是谷歌在`Android 6.0`实现了一个自动认证机制——`App Links`,让开发者可以避开这个弹出框，使用户不必去选择一个列表，直接跳转到我们的`app`中。   

> `App Links`是谷歌在`Android 6.0`中新加入的，`URL Scheme`是苹果在`iOS 9`中新加入的。  

### `APP Links`和`URL Scheme`的区别   
下面列举了一些`App Links` 和 `URL Scheme` 这两种短链唤起`app`的一些区别，主要差异在于使用`App Links`,可以在保证安全的前提下，无缝打开`App`提高用户体验，缺点为仅支持`Android`6.0以上的系统。   

| 区别项            | App Links                                                           | URL Scheme                                                 |
| ----------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Intent URL Scheme | `http、https`                                                       | `http、https、自定义scheme`                                |
| IntentAction      | `android.intent.action.View`                                        | 任何`action`                                               |
| IntentCategory    | `android.intent.category.BROWSABLE android.intent.category.DEFAULT` | 任何`category`                                             |
| 链接验证          | 验证                                                                | 不验证                                                     |
| 用户体验          | 不弹`App`选择框，直接打开`App`                                      | 会打开一个弹窗让你选择用哪个应用打开，或者跳转到默认浏览器 |
| 兼容性            | `Android 6.0`及以上                                                 | 所有`Android`版本                                          |

[Android App Links 实现](https://www.jianshu.com/p/46711d72ecef)  

### 实施方案  
经测试，在不同的厂商下`App Links`存在一定的兼容性，且仅支持`Android 6.0`以上的系统,故计划同时支持`App Links`和`URL scheme`,如下：    

![alt text](./img/App%20Links%20And%20URL%20scheme.png)  



## IOS 
微信内唤起App：
+ 微信内无法通过`scheme`唤起App  
+ 微信内无法直接跳转AppStore下载应用  
通过通用链接实现跳转(需要跨域)


## 安卓和IOS在微信内跳转APP解决方案  
[微信开放标签接入说明](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#22)
[微信开放标签唤起App](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#22)  

[参考链接微信内H5页面打开手机APP功能，使用开放标签](https://juejin.cn/post/7093372515564650504)  



