### `Service Worker`(服务工作者)  
`Service Worker`(服务工作者)是运行在浏览器后台的独立线程中的`JavaScript`脚本，它是`PWA`(渐进式`Web`应用)的核心技术之一，主要作用如下：  
+ 1.离线缓存与网络代理  
    + 可以拦截和处理网络请求
    + 缓存关键资源，实现**离线访问**  
    + 在网络不稳定时提供备用内容
+ 2.提升性能  
  + 从缓存直接加载资源，减少网络请求
  + 实现资源预加载  
  + 支持后台数据同步
+ 3.推送通知  
    + 即使网站未打开，也能向用户发送推送通知
    + 支持后台消息处理
+ 4.后台同步  
    + 用户离线时的操作可以在网络恢复后自动同步  
    + 例如：离线时写的邮件，联网后自动发送  

```javascript
// 1. 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('注册成功');
    });
}

// 2. sw.js 中的典型结构
self.addEventListener('install', event => {
  // 安装阶段：预缓存关键资源
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  // 拦截网络请求
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```
