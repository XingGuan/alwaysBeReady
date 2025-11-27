var bridge; // bridge 是在 setupWebViewJavascriptBridge 回调方法中赋值的
var bestvPlus;
/* 以下两个值是需要通过 getUserInfoJson方法获取 */
var userId;
var token;

// 在APP内，app通讯模块初始化完成再获取用户信息  
function bridgeInitFinish() {
    getUserInfoJson(function (userinfo) {
        var userData = eval('(' + userinfo + ')'); // json 解析，代码有风险
        // var userData = JSON.parse(userinfo); 
        userId = userData.id;
        token = userData.token;
        // 兼容写法  
        if (userId == null || userId == undefined) {
            userId = userData && userData.dt.id;
            token = userData && userData.dt.token;
        }
        // 获取用户信息成功，调用页面刷新方法
        bridgeCallback();
    }, function (error) {
        console.error("获取用户信息失败:", error);
        userInfoErrorCallback();
    });
}

$(function () {
    // 根据bestvPlus是否有值来判断是否调用bridgeInitFinish方法
    if (bestvPlus) {
        if (bridgeInitFinish) {
            bridgeInitFinish();
        }
    }
    // 这个调用是在使用之前定义的初始化函数来设置 JSBridge 并注册自定义功能。
    // 调用setupWebViewJavascriptBridge方法  
    setupWebViewJavascriptBridge(function (_bridge) {
        // 这个回调函数会在桥就绪后执行
        bridge = _bridge; // 保存桥引用到全局边变量
        // 注册一个供原生端调用的 JavaScript 处理器
        bridge.registerHandler("javascriptHandler", function (data, responseCallback) {
            // 当原生端调用 'javascriptHandler'时执行
            let responseData = {
                "Javascript Says": "Right back atcha!"
            }
            if (responseCallback) responseCallback(responseData);  // 回调原生端
        });
        // 通知其他代码桥已经初始化完成
        if (bridgeInitFinish) {
            bridgeInitFinish(); // 触发自定义的完成回调
        }

    })

})

// 这个调用的实际意义：
// 建立双向通信
// JavaScript → 原生：通过 bridge.callHandler()

// 原生 → JavaScript：通过注册的 'javascriptHandler'
// 原生端可以这样调用 JavaScript：
// bridge.callHandler("javascriptHandler", {"key": "value"}, function(response) {
//     console.log("JavaScript 返回: " + response);
// });

// JavaScript 端可以这样调用原生：
// bridge.callHandler("nativeMethod", params, function(response) {
//     // 处理原生端返回
// });


// JS Bridge WebViewJavascriptBridge 的初始化代码，用于在 WebView 中建立 JavaScript 与原生应用之间的通信桥梁。
// iOS 的 JSBridge 初始化函数
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback]; //WVJB = WebViewJavascriptBridge 的缩写  window.WVJBCallbacks 一个全局的回调队列数组，用于存储所有在桥就绪之前注册的回调函数
    // IOS 机制  通过 iframe 的 src 变化来触发 shouldStartLoadWithRequest 方法，这是 iOS UIWebView/WKWebView 的典型交互方式
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

// 重复调用了
// $(function () {
//     setupWebViewJavascriptBridge(function (_bridge) {
//         bridge = _bridge;
//         bridge.registerHandler('javascriptHandler', function (data, responseCallback) {
//             var responseData = {
//                 'Javascript Says': 'Right back atcha!'
//             }
//             if (responseCallback) responseCallback(responseData)
//         })
//         if (bridgeInitFinish) {
//             bridgeInitFinish();
//         }
//     })
// })

function sendData2Objc(data, callback) {
    if (bridge) {
        bridge.callHandler('objcCallback', data, function (response) {
            callback(response);
        })
    } else {
        initWebViewJavascriptBridge();  // 这个函数在H5端未定义
    }
}

// app回调H5
function bridgeCallback() {
    console.log("bridgeCallback");
    console.log("userId", userId);
    console.log("token", token);
}


function userInfoErrorCallback() {
    console.log("获取用户信息失败");
}

// 是否在APP内 通过UA 中是否包含 bestv 值来判断  
function isBestv() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/bestv/i) == 'bestv';
}

// 主站IOS 通过UA中是否包含 bestvplus ios 值来判断  
function isBestvIOSMAIN() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/bestvplus ios/i) == 'bestvplus ios';
}
// 主站IOS 通过UA中是否包含 bestvplus android 值来判断  
function isBestvAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/bestvplus android/i) == 'bestvplus android';
}
