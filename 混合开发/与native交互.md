## 原生APP配置
### WEB端展示
1.WEB端在Native中的展示
APP展示方式(Android)
屏幕分为三个部分 
statusBar-content-NavigationBar  
Android4.4之后  
提供API可以让content可以向上或向下延伸(沉浸式布局)，content占据webView所有空间
2.WEB和Native的互相调用
(1)WEB与Android的互相调用
(2)WEB端与IOS的互相调用  
互调涉及的主要内容
自动登录
支付宝、微信支付
#### 自动登录
当用户在应用中登录过一次之后，再次打开APP时，登录过的用户处于已登录状态  
实现方式很多  
实现原理相近  
1.通过一个字段来标记唯一的指定用户  
2.保存该标记到应用中  
3.根据标记找到对应的登录用户
>扩展：为了信息安全(标记字段可变)遵循一定的规则发生改变(请求接口变，加密)
## 支付
官方不推荐在APP中使用H5调起支付 
支付宝、微信平台的注册商户才可使用支付功能(营业执照)
### 微信支付基本流程
[微信开放平台](https://open.weixin.qq.com/)
[微信支付商户平台](https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F)
### 支付宝支付基本流程
[支付宝开放平台](https://open.alipay.com/platform/home.htm)
### 对沉浸式布局的适配
嵌入Android和IOS出现问题  
顶部原生statusBar和web端navBar重合
解决方法：给avBar加距离顶部padding让出位置  
### IOS设备适配
IOS设备根据屏幕的形状可以分为两种类型     
    1.IPhonex 以下的标准屏幕   
    2.IPhonex 以上的留海屏幕    
IOS问题：      
1.IOS设备中：网页滚动卡顿。并且点击按钮出现高亮效果     
2.在iphonex中展示，navBar紧贴留海展示   
3.在iphonex中展示，toolBar占据底部操作区的位置     
IOS设备展示:正常屏幕都可展示，流汗屏幕上下有Danger 区域
+ 1.原因：IOS运行机制（Android没有）需要指定滑动的元素使用IOS原生的滑动方式  
+ 解决：html元素  -webkit-overflow-scrolling: touch,-webkit-overflow-scrolling: touch;
2.3解决方案
+ 1.判断当前设备是否为iphoneX  
+ 2.让项目中的内容区避开IphoneX中的危险区域。让内容在安全区展示  
```javascript
/**
 * 判断当前设备是否为IphoneX
 * @return boolean true 表示当前设备为iphoneX。false就表示不为iphoneX。
 * 
 */
const isIphoneX=()=>{
    // window对象存在执行逻辑
    if(typeof window !=='undefined' && window){
        // window.navigator.userAgent 如果他包含iphone表示当前的设备在IOS设备中运行
        // iphoneX及以上的设备屏幕垂直像素数大于812
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height>=812;
    }
    return false;
}
// 计算结果赋值给window对象下的一个属性
window.isIphoneX=isIphoneX();
```
## 与Native交互-自动登录
 1. 指定Native主动调用方法
`window.nativeFunctionUserLogin=this.nativeFunctionUserLogina();`
```
/**
     * 提供给native调用的方法，这个方法可接受当前自动登录的用户名
     * 保存当前自动登录的用户名到vuex
     */
    nativeFunctionUserLogin(username){
      // 保存自动登录用户的username到vuex
      this.$store.commit('setUsername',username);
    }
```
## 支付对接



