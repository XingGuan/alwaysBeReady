## Cookie
[Cookie菜鸟教程](https://www.runoob.com/js/js-cookies.html)
[Cookie参考文档](https://www.huaweicloud.com/articles/1fc680259d851614b628c25f3be3dda7.html)  

### 同源策略
#### 同源策略含义:  
+ 协议相同
+ 域名相同
+ 端口相同

#### 跨域解释
| 两个页面相同部分       | 两个页面不同部分                 | 是否允许通信 |
| ---------------------- | -------------------------------- | ------------ |
| 两个页面域名相同       | 两个页面具体文件名不同           | 允许访问     |
| 两个页面域名相同       | 两个页面文件目录不同             | 允许访问     |
| 两个页面域名相同       | 两个页面访问端口不同             | 不允许访问   |
| 两个页面域名相同       | 两个页面访问协议不同             | 不允许访问   |
| 两个页面域名映射ip相同 | 两个页面一个访问ip一个访问域名   | 不允许访问   |
| 两个页面主域名相同     | 两个页面访问子域名不同(其中一个) | 不允许访问   |
#### 目的
同源政策的目的，是为了保证用户信息的安全,防止恶意的网站窃取数据。  
#### 非同源限制
+ Cookie 访问限制
+ DOM 访问限制
+ Ajax 请求限制

二、Cookie跨域  
Cookie,只有同源的网页才能共享。
1.A网页与B网页一级域名相同，二级域名不同，所以可以通过设置`document.domain='example.com'`;来实现跨域访问cookie。

在A页面存在
`
document.cookie="cookieName=cookieValue";  
`

那么在B页面可以通过
`
val allCookie = document.cookie 获取到A网页保存的cookie

`
> 注意，这种方法只适用于Cookie和iframe窗口，LocalStorage和IndexDB无法通过这种方法，规避同源政策。   

>另外,服务器在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如`.example.com`

                                