// 在 IOS 12 中，判断用户是否关闭了动作与方向的访问权限
{
    let timer = setTimeout(() => {
      alert("请开启动作与方向的访问权限，否则将无法使用本应用");
    }, 200);
    window.addEventListener("devicemotion", () => {
      clearTimeout(timer);
    }, { once: true });
  }
// 判断当前是否是安卓系统
function isAndroid() {
    const u = window.navigator.userAgent;
    return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
}
/*
  setMotion 设置监听加速变化要处理的事情
  cb 加速度变化后要做的处理函数
  return 取消事件注册
*/
function setMotion(cb) {
    let fn = (e) => {
        if (isAndroid()) { // 处理安卓取反问题
            e.acceleration.x = -e.acceleration.x;
            e.acceleration.y = -e.acceleration.y;
            e.acceleration.z = -e.acceleration.z;
            e.accelerationIncludingGravity.x = -e.accelerationIncludingGravity.x;
            e.accelerationIncludingGravity.y = -e.accelerationIncludingGravity.y;
            e.accelerationIncludingGravity.z = -e.accelerationIncludingGravity.z;
        }
        cb(e);
    };
    // 区分 IOS 13 及之前
    if (typeof DeviceMotionEvent.requestPermission === "function") { // IOS 13 及之后
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    // 权限允许
                    window.addEventListener("devicemotion", fn);
                }
            }).catch(() => {
                alert("请开启授权否则无法使用本应用");
            })
    } else { //安卓及IOS 13之前
        window.addEventListener("devicemotion", fn)
    }
    return () => {
        window.removeEventListener("devicemotion", fn);
    }
}