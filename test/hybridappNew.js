var bridge
var xxxxxPlus

window.onload = function () {
  if (xxxxxPlus) {
    if (bridgeInitFinish) {
      bridgeInitFinish()
    }
  }

  setupWebViewJavascriptBridge(function (_bridge) {
    bridge = _bridge
    bridge.registerHandler("javascriptHandler", function (data, responseCallback) {
      let responseData = {
        "Javascript Says": "Right back atcha!"
      }
      if (responseCallback) responseCallback(responseData)
    })
    if (bridgeInitFinish) {
      bridgeInitFinish()
    }
  })
}

//在APP内，app通讯模块初始化完成再获取用户信息
function bridgeInitFinish() {
  //页面加载后初始数据
  getUserInfoJson(function (userinfo) {
    let userData = eval("(" + userinfo + ")")
    userId = userData.id
    token = userData.token
    if ((userId == null || userId == undefined) && userData.dt != null) {
      userId = userData && userData.dt.id
      token = userData && userData.dt.token
    }
  })
}

function isWeixin() {
  return navigator.userAgent.toLowerCase().includes("micromessenger")
}

function isQQ() {
  return navigator.userAgent.toLowerCase().includes("qqtheme")
}
function isxxxxx() {
  // 本地测试时开启return true，提交时关闭
  console.log('%c [ navigator.userAgent.toLowerCase() ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', navigator.userAgent.toLowerCase())
  // return true;
  return navigator.userAgent.toLowerCase().includes("xxxxxPlus")
}

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement("iframe")
  WVJBIframe.style.display = "none"
  WVJBIframe.src = "https://__bridge_loaded__"
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

//打开app
//在app内打开H5页面
//isAppHome---打开app首页，而不是打开当前页面
function openxxxxxPlus(webUrl = window.location.href, isAppHome = false) {
  console.log("------webUrl", webUrl)

  let u = navigator.userAgent
  let isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1 // 微信内
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //IOS终端
  if (isAndroid) {
    let param = `xxxxxPlus://?&type=h5&webUrl=` + encodeURIComponent(webUrl)
    let jumpUrl = `https://a.app.qq.com/o/simple.jsp?pkgname=com.xxxxx.app&android_schema=${encodeURIComponent(param)}`
    if (isAppHome) jumpUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.xxxxx.app&android_schema=xxxxxPlus://"
    console.log("isAndroid jumpUrl", jumpUrl)
    window.location.href = jumpUrl
  } else {
    let param = "?{\"type\":\"h5\",\"webUrl\":\"" + webUrl + "\"}"
    let jumpUrl = "https://app.xxxxx.cn" + param
    if (isAppHome) jumpUrl = "https://app.xxxxx.cn"
    console.log("Note isAndroid jumpUrl", jumpUrl)
    window.location = jumpUrl
  }
}

function isxxxxxIOS() {
  return navigator.userAgent.toLowerCase().includes("xxxxxPlus ios")
}

function sendData2Objc(data, callback) {
  if (bridge) {
    console.log('bridge', bridge)
    bridge.callHandler("objcCallback", data, function (response) {
      // alert(response);
      callback(response)
    })
  } else {
    console.log('initWebViewJavascriptBridge', initWebViewJavascriptBridge)
    initWebViewJavascriptBridge()
  }
}

//获取登录用户Json信息
function getUserInfoJson(callback) {
  console.log('xxxxxPlus', xxxxxPlus)
  if (xxxxxPlus) {
    console.log('xxxxxPlus', getUserInfoJson)
    let val = xxxxxPlus.getUserInfoJson()
    callback(val)
  } else if (isxxxxxIOS()) {
    console.log('isxxxxxIOS')
    let data = {
      "cmd": "getUserInfoJson"
    }
    sendData2Objc(data, function (value) {
      callback(value)
    })
  } else {
    // callback('{"id":"11","token":"b01bcc01c5a973a392760f2b4e4aa083"}');
  }
}

//跳转登录页面 参数等于1时会关闭H5,等于0时不会关闭当前H5
function tokeninvalid(force = 1) {
  if (xxxxxPlus) {
    let val = xxxxxPlus.tokeninvalid(JSON.stringify(force));
  } else if (isxxxxxIOS()) {
    let data = {
      "cmd": "tokeninvalid",
      "force": `${force}`
    };
    sendData2Objc(data, null);
  }
}

//分享页面
function sharePage(data) {
  if (xxxxxPlus) {
    xxxxxPlus.sharePage(JSON.stringify(data))
  } else if (isxxxxxIOS()) {
    sendData2Objc(data, null)
  } else {
    console.log('h5')
    // if ($('.weixin-share-mask')) {
    //     $('.weixin-share-mask').show();
    // }
  }
}

// clearHistory  清除历史
function clearHistory(url) {
  console.info('clearHistory--------------', url);
  if (xxxxxPlus) {
    console.info('clearHistory==============');
    if (url) {
      console.info('url-----------------', url);
      xxxxxPlus.clearHistory(url);
    } else {
      xxxxxPlus.clearHistory();
    }
  } else if (isxxxxxIOS()) {
    console.log('isxxxxxIOS');
    let data = {
      "cmd": "clearHistory"
    }
    if (url) {
      data.newUrl = `${url}`;
    }
    sendData2Objc(data, null);
  }
}



// clearHistory  清除历史 ios返回清除
function goBackHistory(status) {
  if (isxxxxxIOS()) {
    console.log('isxxxxxIOS');
    let data = {
      "cmd": "goBackHistory",
      "isHomePage": `${status}`
    }
    // if (url) {
    //   data.newUrl = `${url}`;
    // }
    sendData2Objc(data, null);
  }
}
