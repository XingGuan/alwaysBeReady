+ app回调H5
`bridgeCallback()`
+ app里面底部分享弹窗，点击分享触发这个  
`function shareStart() {}`    

+ app里面分享成功返回app触发这个  
`function shareSuccess() {}`  

+ app页面跳转，暂停H5页面上的播放器  
`function pauseVideo() {}`  

+ app页面跳转，暂停H5页面上的播放器  
`function pauseVideoOnly() {}`

+ app里面goback返回页面
`function webViewDidFinishNavigation(){}`  

+ app里面网页页面出现在屏幕上（网页不一定加载完成）
`function webViewDidAppear(){}`  

+ app启用分享按钮  
`function enableShareButton(){}`

+ app禁用分享按钮 
`function disableShareButton(){}`

事件是当APP内多次切换TAB，或APP退出到后台时（页面形成缓存)

+ 缓存页面恢复的方法
`function pageShowCacheH5(){}` 
+ 缓存页面销毁的方法
`function pageHideCacheH5(){}` 
