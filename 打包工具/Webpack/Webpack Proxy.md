### `Webpack Proxy`  
#### `Webpack Proxy`工作原理与跨域解决方案  
#### 核心原理  
`Webpack DevServer`的`proxy`功能本质上是一个**反向代理服务器**。它通过在本地开发服务器和目标`API`服务器之间建立一个中间层，将浏览器发出的`API`请求转发到目标服务器，从而绕过浏览器的同源策略限制。     

> 首先，`proxy` 配置是针对开发环境的，对生产环境没有任何意义。
当我们通过 `webpack-dev-server` 启动开发服务器后，所有的打包资源都可以通过访问开发服务器获得。
> 与此同时，我们又配置了 `proxy`，当我们向开发服务器请求特定的地址时，开发服务器会将其代理到目标地址。因此，后续对代理地址的请求，就可以变为直接请求开发服务器。  
这样一来，我们请求静态页面的域和请求代理地址的域就同源了，因为都是请求开发服务器，所以就不会产生跨域问题。

#### 工作原理详解   
1.请求转发流程  
```text
    浏览器（`http://localhost:3000`）
    -> `Webpack DevServer`(代理层)
    -> 目标`API`服务器（`http://api.example.com`）
```
2.关键配置示例   
```javascript
// webpack.config.js  
module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"http://api.example.com",
                changeOrigin:true,//修改请求头中的`Origin`字段，让目标服务器认为请求来自它自己的域名
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
```
#### 为什么能解决跨域问题  
##### 跨域问题的本质   
浏览器出于安全考虑，实施了**同源策略**（`Same-Origin Policy`）,限制不同源（协议、域名、端口任一不同）的资源交互。  
##### `Proxy`的解决方案   
1.服务器间通信无跨域限制  
+ 跨域限制仅存在于浏览器环境  
+ 服务器之间的`HTTP`请求不受同源策略约束  
+ `Proxy`作为中间服务器，可以自由请求任何目标服务器  
2.请求路径统一化  
+ 浏览器——>代理：同源请求（无跨域） 
+ 代理——>目标服务器：服务器间请求（无跨域）  
3.实际请求示例  
```javascript
    // 前端代码（浏览器中运行）  
    fetch('/api/users') // 相对路径，指向当前域  
    // 实际请求流程   
    // 1.浏览器请求`http://localhost:3000/api/users`（同源） 
    // 2.`Proxy`接收请求，转发至:`http://api.example.com/users`  
    // 3.返回结果经过`Proxy`返回给流量器  
```  
#### 配置参数详解  
```javascript
    proxy:{
        '/api':{
            target:'http://localhost:4000', // 目标服务器  
            changeOrigin:true, // 修改请求头中的`Origin`
            secure:false, // 是否验证SSL证书  
            logLevel:'debug', // 日志级别  
            pathRewrite:{
                '^/api':'/v1/api'
            },
            headers:{  // 自定义请求头
                'X-Custom-Header':'value'
            }
        }
    }
```  
#### 实际应用场景   
1.开发环境跨域解决    
```javascript
    //开发时使用代理  
    devServer:{
        proxy:{
            '/api':{
                target:'https://procuction-server.com',
                changeOrigin:true
            }
        }
    }
    // 生产环境使用绝对路径   
    const API_BASE = process.env.NODE_ENV === 'development'?'/api':'https://procuction-server.com/api'  
```  
2.多环境配置  
```javascript
const getProxyConfig = () =>{
    const env = process.env.ENV;
    const targets = {
        dev:'http://dev-api.example.com',
        test:'http://test-api.example.com',
        prod:'https://api.example.com'
    }
    
    return {
        '/api':{
            target:targets[env],
            changeOrigin:true
        }
    }
}

### 优势与局限  
#### 优势  
+ 开发阶段完美解决跨域  
+ 配置简单，无需需改业务代码  
+ 支持路径重写、请求头修改等高级功能  
+ 热更新，配置修改立即生效  
#### 局限  
+ 仅适用于开发环境   
+ 生产环境需要其他解决方案（如`CORS`、`Ngnix`反向代理）  
+ 复杂的代理规则可能影响性能    

```
### 总结  
`Webpack Proxy`通过建立本地代理服务器，巧妙地将跨域请求转换为同源请求，是开发阶段解决跨域问题的高效方案。理解其工作原理有助于更好地配置和使用这一功能，提升开发体验。

### 拓展
#### `changeOrigin`
> `changeOrigin`具体作用：将请求头中的`Origin`字段改为目标服务器的域名。默认情况下，浏览器发送的请求头中的`Origin`是开发服务器的地址（如`http://localhost:8080`）,设置`changeOrigin:true`后，`origin`会被改为目标服务器的域名（如`http://api.example.com`）  
+ 为什么需要这个配置?  
很多服务器会检查请求的`Origin`头来进行：  
+ `CORS`（跨域资源共享）验证   
+ 安全检查   
+ 防止`CSRF`攻击   
如果`Origin`不匹配，服务器可能会拒绝请求。  
#### 示例对比  
```javascript
    //没有 `changeOrigin:true`时的请求头   
    Origin：http://localhost:8080  
    Host:api.example.com
    // 有 changeOrigin:true 时的请求头  
    Origin:http://api.example.com  
    Host:api.example.com
```    
#### 适用场景   
+ 当目标服务器对`Origin`有严格校验时  
+ 需要绕过`CORS`限制时  
+ 模拟生态环境请求时  
这个配置在开发阶段解决跨域问题时非常有用，让服务器能够正确代理`API`请求。   




