 ```javascript
 function getQueryString(name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);

          if (r != null) {
             return decodeURIComponent(r[2]);
          }
          return null;
  }
// 这样调用：
alert(GetQueryString("参数名1"));

alert(GetQueryString("参数名2"));

alert(GetQueryString("参数名3"));
```