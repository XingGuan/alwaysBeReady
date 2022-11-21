function ajax(options) {
  // console.log(options);
  let xhr = null;
  let optionData = options.AES ? ajax_AES(options.data) : options.data;
  let params = JSON.stringify(optionData);
  options.data.token = options.data.token || "";
  options.data.userId = options.data.userId || "";
  // let params = formsParams(options.data);
  // console.log(params, "params");
  // 创建对象
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 连接
  if (options.type === "GET") {
    // xhr.open(options.type, options.url + "?" + params, options.async);
    let targeturl = options.url;
    // 判断是否有参数
    if (targeturl.indexOf("?") !== -1) {
      targeturl += "&" + ajax_urlformat_params(options.data);
    } else {
      targeturl += "?" + ajax_urlformat_params(options.data);
    }
    xhr.open(options.type, targeturl);
    xhr.setRequestHeader("token", options.data.token);
    xhr.setRequestHeader("x-access-token", options.data.token);
    xhr.setRequestHeader("userId", options.data.userId);
    xhr.timeout = 1000; // 超时时间，单位是毫秒
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open(options.type, options.url, options.async);
    xhr.setRequestHeader("token", options.data.token);
    xhr.setRequestHeader("x-access-token", options.data.token);
    xhr.setRequestHeader("userId", options.data.userId);
    xhr.setRequestHeader("Content-Type", "application/json;charset-utf-8");
    xhr.timeout = 1000; // 超时时间，单位是毫秒
    // console.log(params, "params");
    xhr.send(params);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let result;
        if (!isJSON(xhr.responseText)) {
          let key = CryptoJS.enc.Utf8.parse("UITN25LMUQC436IM");
          let decryptedData = CryptoJS.AES.decrypt(xhr.responseText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          result = decryptedData.toString(CryptoJS.enc.Utf8);
          console.log("解密后:" + result);
        } else {
          result = xhr.responseText;
        }
        //  checkLoginTimeout(result);
        options.success(result);
      } else {
        if (options.error) {
          options.error(xhr);
        }
      }
    }
  };
}

function isJSON(str) {
  try {
    var obj = JSON.parse(str);
    return !!(typeof obj == "object" && obj);
  } catch (e) {
    console.log("error：" + str + "!!!" + e);
    return false;
  }
}

// 检查登录过期
function checkLoginTimeout(data) {
  if (data) {
    let jsonData = JSON.parse(data);
    if (jsonData) {
      // 请求返回成功结果
      if (jsonData.ss) {
        return;
      }

      // 请求返回失败结果
      // 1.登录失效，不要toast，引导用户重新登录
      if (jsonData.ec === "AC0009" || jsonData.em === "登录失效，请重新登录") {
        console.log("登录失效，不要toast，引导用户重新登录");
        // 清除本地cookie和全局变量
        console.log("清除cookie前 userId", $.cookie("userId"));
        // setUserId("");
        // setToken("");
        // setValueIntoCookie("phone", "");
        // setValueIntoCookie("userInfo", "");
        console.log("清除cookie后 userId", $.cookie("userId"));

        // 在app内，调用app跳转登录功能
        if (isBestv()) {
          console.log("在app内，调用app跳转登录功能");
          tokeninvalid();
        }

        // 不在app内，显示登录弹窗
        else {
          console.log("不在app内，显示登录弹窗");
          app.isLoginShown = true;
        }
      }

      // 2.其他错误信息，显示toast
      else {
        console.log("其他错误信息，显示toast");
        toastErrorMessage(jsonData.em ? jsonData.em : "");
      }
    }
  }
}

function ajax_urlformat_params(params) {
  let arr = [];
  if (params) {
    for (let prop in params) {
      arr.push(prop + "=" + params[prop]);
    }
  }
  return arr.join("&");
}

function ajax_md5_params(params) {
  let arr = [];
  let keyArray = [];
  for (let item in params) {
    keyArray.push(item);
  }
  keyArray.sort().forEach(function (key) {
    let value = params[key];
    // console.log("value", value);
    // console.log("typeof value", typeof value);
    value += "";
    if (value && value.trim()) {
      arr.push(key + "=" + params[key]);
    }
  });

  let valueString = arr.join("&") + "C8F5954G8B61A93EDT4594BB8C318852";
  return $.md5(valueString);
}

function ajax_AES(params) {
  if (!params.time) {
    let d = new Date();
    let fullyear = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let date = d.getDate().toString().padStart(2, "0");
    let hours = d.getHours().toString().padStart(2, "0");
    let minutes = d.getMinutes().toString().padStart(2, "0");
    let seconds = d.getSeconds().toString().padStart(2, "0");
    params.time = fullyear + month + date + hours + minutes + seconds;
  }
  if (!params.devid) {
    params.devid = "1899999";
  }
  if (!params.channelid) {
    params.channelid = "199999";
  }
  params.sign = ajax_md5_params(params);

  // console.log("params = " + JSON.stringify(params));
  let jsonStr = JSON.stringify(params); // 请求原文

  let key = CryptoJS.enc.Utf8.parse("UITN25LMUQC436IM");

  let encryptedData = CryptoJS.AES.encrypt(jsonStr, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  let result = encryptedData.toString();

  console.log("加密前：" + jsonStr);
  console.log("加密后：" + result);

  return { "params": result };
}
