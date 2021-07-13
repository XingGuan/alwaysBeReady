### 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？
[参考链接](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87)  

+ 1.避免跨域(img天然支持跨域)  
+ 2.利用空白gif或1*1 px的img是互联网广告或网站监测方面常用的手段,简单、安全、相比PNG/JPG体积小，1px透明图，对网页内容的影响几乎没有影响，这种请求用在很多地方，比如浏览、点击、热点、心跳、ID颁发等等。
+ 3.图片请求不占用Ajax请求限额
+ 4.不会阻塞页面加载，影响用户的体验，只要`new Image`对象就好了，一般情况下也不需要append到DOM中，通过它的`onerror`和`onload`事件来检测发送状态。