var bridge;
var bestvPlus;


// 分享数据开始
// 分享标题
// var shareTitle = "来百视TV看跨年盛典，赢专属百万大奖";
// // 分享描述
// var shareDescription = "iPhone13、扫地机器人、现金券等你来抽！";
// // 分享图标URL 
// var shareIconUrl = "https://dongfanglong-pic.oss-cn-hangzhou.aliyuncs.com/feedbackpic/P8YD6J_logo.png";
// // 埋点参数，活动ID
// var EVENT_ID = "NEW_YEAR_2022";
// 分享页面数据
// var shareIconUrl = '';
// var shareTitle = '';
// var shareDescription = '';
// function getPageShareData(url = window.location.href, innerIconUrl = shareIconUrl) {
//   return {
//     "cmd": "sharePage",
//     "log": innerIconUrl,
//     "title": shareTitle,
//     "des": shareDescription,
//     // "event_id": EVENT_ID,
//     // "event_name": document.title,
//     // "shareUrl": encodeURI(getHomePageUrl() + "?" + "activityCode=" + ACTIVITY_CODE
//     "shareUrl": encodeURI(url)
//   };
// }



$(function () {
    if (bestvPlus) {
        if (bridgeInitFinish) {
            bridgeInitFinish();
        }
    }

    //微信二次分享
    if (!isBestv()) {
        // getWeChatAuthorizationAndShare(getPageShareData());
    }

    setupWebViewJavascriptBridge(function (_bridge) {
        bridge = _bridge;
        bridge.registerHandler("javascriptHandler", function (data, responseCallback) {
            let responseData = {
                "Javascript Says": "Right back atcha!"
            };
            if (responseCallback) responseCallback(responseData);
        });
        if (bridgeInitFinish) {
            bridgeInitFinish();
        }
    });
});

//在APP内，app通讯模块初始化完成再获取用户信息
function bridgeInitFinish() {
    //页面加载后初始数据
    getUserInfoJson(function (userinfo) {
        let userData = eval("(" + userinfo + ")");
        userId = userData.id;
        token = userData.token;
        //获取用户信息成功，调用页面刷新方法
        bridgeCallback();
    });
}

function scrollNum(offsety) {
    if (bestvPlus) {
        bestvPlus.scrollNum(JSON.stringify(offsety));
    } else if (isBestvIOS()) {
        let iosData = {
            "cmd": "scrollNum",
            "offset_y_num": offsety
        };
        sendData2Objc(iosData, null);
    }
}

function isWeixin() {
    return navigator.userAgent.toLowerCase().includes("micromessenger");
}

function isBestv() {
    // 本地测试时开启return true，提交时关闭
    // return true;
    return navigator.userAgent.toLowerCase().includes("bestvplus");
}

function isBestvIOS() {
    return navigator.userAgent.toLowerCase().includes("bestvplus ios");
}

function isBestvAndroid() {
    return navigator.userAgent.toLowerCase().includes("bestvplus android");
}

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "https://__bridge_loaded__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}

function sendData2Objc(data, callback) {
    if (bridge) {
        bridge.callHandler("objcCallback", data, function (response) {
            // alert(response);
            callback(response);
        });
    } else {
        initWebViewJavascriptBridge();
    }
}

//关闭页面
function finshH5() {
    if (bestvPlus) {
        bestvPlus.finshH5();
    } else if (isBestvIOS()) {
        var data = {
            'cmd': 'finshH5'
        };
        sendData2Objc(data, null);
    }
}

//设置全局变量
function set(key, value) {
    if (bestvPlus) {
        bestvPlus.set(key, value);
    } else if (isBestvIOS()) {
        let data = {
            "cmd": "setkey",
            "key": key,
            "value": value
        };
        sendData2Objc(data, null);
    }
}

//获取全局变量
function get(key, callback) {
    if (bestvPlus) {
        let val = bestvPlus.get(key);
        callback(val);
    } else if (isBestvIOS()) {
        let data = {
            "cmd": "getkey",
            "key": key
        };
        sendData2Objc(data, function (value) {
            callback(value);
        });
    }
}

//获取登录用户信息
function getUserInfo(key, callback) {
    if (bestvPlus) {
        let val = bestvPlus.getUserInfo(key);
        callback(val);
    } else if (isBestvIOS()) {
        let data = {
            "cmd": "getUserInfo",
            "key": key
        };
        sendData2Objc(data, function (value) {
            callback(value);
        });
    } else {
        // callback('27')
    }
}

//获取登录用户Json信息
function getUserInfoJson(callback) {
    if (bestvPlus) {
        let val = bestvPlus.getUserInfoJson();
        callback(val);
    } else if (isBestvIOS()) {
        let data = {
            "cmd": "getUserInfoJson"
        };
        sendData2Objc(data, function (value) {
            callback(value);
        });
    } else {
        // callback('{"id":"11","token":"b01bcc01c5a973a392760f2b4e4aa083"}');
    }
}

//跳转页面：1，单片；2，剧集；3，H5；4，直播
// jumpId： 接口jumpid
// jumpType： 1，单片；2，剧集；3，H5；4，直播
// titleId： 接口titleid
// refer_event_name：埋点来源页面
// celebrity_id：埋点人物ID
// celebrity_name：埋点人物ID
// refer_module：埋点来源模块名称
function jumpToPageWithType(data, targetUrl = null) {
    // console.log(data);
    if (bestvPlus) {
        bestvPlus.jumpToPageWithType(JSON.stringify(data));
    } else if (isBestvIOS()) {
        let iosData = {
            "cmd": "jumpToPageWithType",
            "params": data
        };
        sendData2Objc(iosData, null);
    } else {
        // 不在app内

        // 如果指定了网页播放URL
        // URL对象存在，并且能找到URL里的http字符串，并且URL是合法的
        if (hasStringInside(targetUrl, "http")) {
            //
            window.location.href = targetUrl; // URL跳转
            console.log("网页播放URL targetUrl", targetUrl);
            return;
        }

        // 没找到网页播放页URL
        if (data.jumpType - 0 === 2) {
            // 打开app再跳转剧集详情页
            openBestvPlusVideoPage(data.jumpId, data.titleId);
        } else {
            // 打开app当前活动页面
            openBestvPlus();
        }
    }
}

//跳转登录页面
function tokeninvalid(force = "1") {
    if (bestvPlus) {
        let val = bestvPlus.tokeninvalid(JSON.stringify(force));
    } else if (isBestvIOS()) {
        let data = {
            "cmd": "tokeninvalid",
            "force": force + ""
        };
        sendData2Objc(data, null);
    }
}

//app播放
function appPlayMediaWithData(data) {
    if (bestvPlus) {
        bestvPlus.addPlayer(JSON.stringify(data));
    } else if (isBestvIOS()) {
        sendData2Objc(data, null);
    }
}

//页面初始化分享信息
function initShareData(data) {
    if (bestvPlus) {
        bestvPlus.initShareData(JSON.stringify(data));
    } else if (isBestvIOS()) {
        sendData2Objc(data, null);
    } else {
        // alert('H5分享写在这里');
    }
}

//分享页面
function sharePage(data) {
    // alert('sharePage = ' + JSON.stringify(data));
    if (bestvPlus) {
        bestvPlus.sharePage(JSON.stringify(data));
    } else if (isBestvIOS()) {
        sendData2Objc(data, null);
    } else {
        console.log('h5')
        // if ($('.weixin-share-mask')) {
        //     $('.weixin-share-mask').show();
        // }
    }
}

//打开app 视频播放页
function openBestvPlusVideoPage(contentId, titleId) {
    let u = navigator.userAgent;
    let isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //IOS终端
    if (isAndroid) {
        let param = `bestvplus://?&type=video&contentId=` + (contentId || "");
        if (titleId > 0) {
            param += `&titleId=` + (titleId || "");
        }
        window.location.href = `https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&android_schema=${encodeURIComponent(param)}`;
    } else {
        let param = "?{\"type\":\"video\",\"contentId\":\"" + (contentId || "") + "\",\"titleId\":\"" + (titleId || "") + "\"}";
        window.location = "https://app.bestv.cn" + param;
    }
}

//打开app
//在app内打开H5页面
//isAppHome---打开app首页，而不是打开当前页面
function openBestvPlus(webUrl = window.location.href, isAppHome = false) {
    console.log("webUrl", webUrl);

    let u = navigator.userAgent;
    let isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //IOS终端
    if (isAndroid) {
        let param = `bestvplus://?&type=h5&webUrl=` + encodeURIComponent(webUrl);
        let jumpUrl = `https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&android_schema=${encodeURIComponent(param)}`;
        if (isAppHome) jumpUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&android_schema=bestvplus://";
        console.log("isAndroid jumpUrl", jumpUrl);
        window.location.href = jumpUrl;
    } else {
        let param = "?{\"type\":\"h5\",\"webUrl\":\"" + webUrl + "\"}";
        let jumpUrl = "https://app.bestv.cn" + param;
        if (isAppHome) jumpUrl = "https://app.bestv.cn";
        console.log("Note isAndroid jumpUrl", jumpUrl);
        window.location = jumpUrl;
    }
}

//打开app其他模式首页
//modelType 等于 1 首页 2 少儿 3 空课 4 银发戏曲首页 5 银发金色学堂
function openBestvPlusModePage(modelType = 2) {
    if (isBestv()) {
        //app
        if (bestvPlus) {
            modelType = 1;
            bestvPlus.jumpMode(modelType + "");
        } else if (isBestvIOS()) {
            let data = {
                "cmd": "jumpMode",
                "modelType": modelType + ""
            };
            sendData2Objc(data, function (value) {});
        }
    } else {
        //网页
        let u = navigator.userAgent;
        let isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //IOS终端
        if (isAndroid) {
            let param = `bestvplus://?&type=model&modelType=` + modelType;
            let jumpUrl = `https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&android_schema=${encodeURIComponent(param)}`;
            console.log("isAndroid jumpUrl", jumpUrl);
            window.location.href = jumpUrl;
        } else {
            let param = "?{\"type\":\"model\",\"modelType\":\"" + modelType + "\"}";
            let jumpUrl = "https://app.bestv.cn" + param;
            console.log("Note isAndroid jumpUrl", jumpUrl);
            window.location = jumpUrl;
        }
    }


    // window.location = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&from=singlemessage';
    // if (isWeixin()) {
    //   alert('请点击右上角。。。选择在浏览器中打开');
    //   return;
    // }
    // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    //   let loadDateTime = new Date();
    //   // window.location = "bestvplus://";//schema链接或者universal link
    //   window.location = 'https://app.ibbtv.cn/bestv/'
    //   window.setTimeout(function () { //如果没有安装app,便会执行setTimeout跳转下载页
    //     let timeOutDateTime = new Date();
    //     if (timeOutDateTime - loadDateTime < 5000) {
    //       window.location = 'https://apps.apple.com/cn/app/id1008005924'; //ios下载地址
    //     } else {
    //       window.close();
    //     }
    //   }, 500);
    // } else if (navigator.userAgent.match(/android/i)) {
    //   let state = null;
    //   try {
    //     window.location = 'bestvplus://'; //schema链接或者universal link
    //     window.setTimeout(function () {
    //       window.location = 'http://app.bestv.cn/'; //android下载地址
    //     }, 500);
    //   } catch (e) {
    //   }
    // } else {
    //   alert('请在手机浏览器打开');
    // }
}


//打开app会员权益
// 3是合家欢，6是体育会员
function translates(cardId = 0) {
    if (isBestv()) {
        //app
        if (bestvPlus) {
            bestvPlus.translate(cardId + "");
        } else if (isBestvIOS()) {
            let data = {
                "cmd": "translate",
                "cardId": cardId + ""
            };
            sendData2Objc(data, function (value) {});
        }
    } else {
        //网页
        let u = navigator.userAgent;
        let isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //IOS终端
        if (isAndroid) {
            let param = `bestvplus://?&type=translate&cardId=` + cardId;
            let jumpUrl = `https://a.app.qq.com/o/simple.jsp?pkgname=com.bestv.app&android_schema=${encodeURIComponent(param)}`;
            console.log("isAndroid jumpUrl", jumpUrl);
            window.location.href = jumpUrl;
        } else {
            let param = "?{\"type\":\"translate\",\"cardId\":\"" + cardId + "\"}";
            let jumpUrl = "https://app.bestv.cn" + param;
            console.log("Note isAndroid jumpUrl", jumpUrl);
            window.location = jumpUrl;
        }
    }
}

// 微信分享
function getWeChatAuthorizationAndShare(shareWxData) {
    console.log("微信分享数据 shareWxData", shareWxData);

    // console.log(shareWxData)
    let sharePageDetail = shareWxData;
    let nowurl = window.location.href;
    // console.log(nowurl)
    ajax({
        url: "https://bp-api.bestv.com.cn/cms/api/test/weixin/share", //获取签名的接口
        type: "POST",
        async: true,
        dataType: "json",
        contentType: "application/json",
        data: {
            "url": nowurl
        },
        success: function (msg) {
            msg = JSON.parse(msg);
            // console.log(sharePageDetail)
            if (wx) {
                let dt = msg.dt;
                // console.log('dt = ' + msg)
                wx.config({
                    debug: false,
                    appId: dt.appId, // 必填，公众号的唯一标识
                    timestamp: dt.timestamp, // 必填，生成签名的时间戳
                    nonceStr: dt.noncestr, // 必填，生成签名的随机串
                    signature: dt.signature, // 必填，签名，见附录1
                    jsApiList: [
                        "updateAppMessageShareData", //1.4 分享到朋友
                        "updateTimelineShareData", //1.4分享到朋友圈
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    let shareData = {
                        title: sharePageDetail.title,
                        desc: sharePageDetail.des, //这里请特别注意是要去除html
                        link: nowurl,
                        imgUrl: sharePageDetail.log
                    };
                    wx.updateAppMessageShareData(shareData); //1.4 分享到朋友
                    wx.updateTimelineShareData(shareData); //1.4分享到朋友圈
                });
            }
        }
    });
}