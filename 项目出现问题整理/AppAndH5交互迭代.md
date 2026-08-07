
#### 1.事件通知  
当`JSBridge`初始化完成，新增`notifyBridgeReady()`事件通知函数  
#### 2.`bridgeInitFinish`单次调用  
改为重试循环，去`eval`，不再写全局变量。   
#### 3.`sendData2Objc` 所有响应同时进`callback`和`TvSDTPUserInfoCallback`
改为`cmd==='getUserInfoJson'`分发，通道隔离  

#### `TvSDTPUserInfoCallback` 在重试期间会被多次触发（带空数据）未登录场景可能反复唤起登录
改进方法，回调端做幂等（`id`相同跳过）。
```javascript
// 幂等守卫：同一登录态只处理一次，避免重试期间 TvSDTPUserInfoCallback 反复触发
// 导致 setInfo / clearUserInfo / 唤起登录 等副作用重复执行
let lastHandledUserKey = null
const hasHandledUserKey = (userId) => {
  const key = userId || '__logged_out__'   // 未登录也算一种"状态"
  if (lastHandledUserKey === key) return true
  lastHandledUserKey = key
  return false
}
```
> 注：`bridge`是否创建成功和`window.onload`之间没有因果或顺序依赖，它只是挑了一个"大概率已经够晚"的时间点来启动。   




