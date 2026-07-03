[nginx](https://nginx.org/en/)

## `Nginx`是什么
> `nginx`("引擎X")是一个`HTTP`网络服务器，反向代理，内容缓存，负载均衡器，`TCP/UDP`代理服务器，以及邮件代理服务器。它是由俄罗斯程序员`Igor Sysoev`开发的，于2004年开源。   

它采用**事件驱动、异步非阻塞**的处理模型，能够以极低的内存占用支撑数万甚至数十万并发连接，因此特别适合高并发、静态文件服务或作为前端反向代理使用。   

## `Nginx`起到什么作用？  

`Nginx`的核心作用包括：  
+ `Web`服务器  
直接提供静态文件(`HTML、CSS、JS、图片等`)，性能远超传统`Apache`。  
+ **反向代理与负载均衡**  
接收客户端请求，再转发给后端多个应用服务器（如`Node.js、Tomcat、Gunicorn`等），并可安排负载均衡算法（轮询、最少连接、`IP`哈希等），提升服务稳定性和扩展性。  
+ `HTTP`缓存  
  代理时缓存后端响应，直接返回给客户端，减少后端压力，加快响应 
+ `SSL/TLS`终结  
在反向代理层统一处理`HTTPS`加解密，后端使用`HTTP`通信，简化证书管理并减轻后端负担。   
+ 动静分离  
将动态请求代理到应用服务器，静态资源直接从 `Nginx`返回，提高效率。   
+ 访问控制、限速与安全  
可限制请求频率、连接数，可配置`IP`黑白名单、请求过滤等，还能用作简单的`WAF`。  
+ 正向代理（较少用）  
可以配置为正向代理，让内网客户端通过`Nginx`访问外部网络，但这不是它典型的使用场景。  
+ 流媒体、`API`网关  
支持视频流分发，也可作为统一的`API`入口，管理路由、认证、日志等。   

## `Nginx`是正向代理还是反向代理  
`Nginx`最著名、最常用的角色是反向代理，但它同样可以配置成正向代理。   
### 正向代理（`Forward Proxy`）  
代理客户端，隐藏客户端身份，代表客户端访问外部服务。  
典型场景：公司内网通过代理上网。对服务端来说，它看到的是代理的`IP`。  
`Nginx`实现正向代理`HTTP`示例：  
```nginx  
    server{
        listen 8080;  
        resolve 8.8.8.8  #DNS 解析器   
        location / {
            proxy_pass http://$http_host$request_uri;
        }
    }
```
> 注意： 
> `Nginx`官方默认不直接支持`HTTPS`正向代理（`CONNECT`隧道），如果支持需要引入第三方模块（如 `ngx_http_proxy_connect_module`）,或者通过`stream`模块做`TCP`层转发来实现。

上面这个配置只是一个`demo`,**实现了一个没有任何限制的公开正向代理，极其不安全，不建议直接上生产环境。**  
会产生的安全问题:  
+ 1.所有人均可匿名使用
+ 2.`SSRF`(服务器请求伪造)攻击敞口
+ 3.无法限制请求目标  
+ 4.无认证、无日志、无流量控制  
#### 安全建议怎么写？  
如果确实需要`Nginx`作为正向代理（注意 `Nginx`原生只能代理`HTTP/HTTPS`流量，且`HTTPS`需要`ngx_http_proxy_connect_module`支持`CONNECT`隧道）,一定要做到以下几点：  
    1.强身份认证（如 BASIC Auth + SSL，或IP白名单）  
    2.严格限制允许的域名/主机（白名单） 
    3.禁止请求内网地址和危险`IP`(防`SSRF`)  
    4.限制请求方法和协议（只允许 `GET/POST`,禁用`CONNECT`等） 
    5.添加访问控制和速率限制  
    6.使用专用的正向代理模块（推荐 `ngx_http_proxy_connect_module`,否则无法代理`HTTPS`）  

推荐的安全配置示例:
```nginx
# 允许代理的目标域名白名单（用 map 或 set）
map $http_host $allowed {
    default         0;
    "example.com"   1;
    "api.example.org" 1;
    # 可按需添加更多
}

# 禁止代理的私有地址（用 CIDR）
geo $blocked_ip {
    default          0;
    10.0.0.0/8       1;
    172.16.0.0/12    1;
    192.168.0.0/16   1;
    127.0.0.0/8      1;
    169.254.0.0/16   1;   # 云 metadata
    0.0.0.0/8        1;
    100.64.0.0/10    1;
}

server {
    listen 8080;

    # 基本认证（推荐加上，否则任何人都能访问）
    auth_basic "Proxy Authentication";
    auth_basic_user_file /etc/nginx/.htpasswd;

    # DNS 解析器（不要用公共 DNS 暴露内网，建议用内部 DNS 或限制）
    resolver 8.8.8.8 valid=60s;
    resolver_timeout 10s;

    # 限制请求速率
    limit_req_zone $binary_remote_addr zone=proxy:10m rate=5r/s;
    limit_req zone=proxy burst=10 nodelay;

    # 禁止非 GET/POST/HEAD 方法（防止恶意利用）
    if ($request_method !~ ^(GET|POST|HEAD)$) {
        return 405;
    }

    location / {
        # 1. 白名单检查
        if ($allowed = 0) {
            return 403 "Forbidden destination";
        }

        # 2. 解析目标地址，防止 SSRF
        set $target_ip "";
        # 使用 resolver 进行手动解析并检查（需要 lua 模块或 njs，否则纯 nginx 较难判断 IP）
        # 这里给出一个不完整示例，实际推荐用 njs / OpenResty 处理：
        #
        # 简单方案：用 ngx_http_geoip_module ？Nginx 原生无法在 proxy_pass 前检查解析后的 IP，
        # 所以最好的办法是在应用层做 SSRF 防御，或搭配 njs / Lua 模块。
        #
        # 如果只用纯 nginx，可以接一个内部 location 用带 resolver 的 proxy_pass 强制解析，
        # 但依然难以对解析结果做 ACL。强烈建议引入 njs 脚本或使用 OpenResty。

        # 在这里先 resolve 并检查 IP 是否在 blocked_ip 内（需要 njs）
        # js_content check_ssrf; 或 access_by_lua_block { ... }
        
        # 3. 转发
        proxy_pass http://$http_host$request_uri;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 其他安全设置
        proxy_connect_timeout 10s;
        proxy_read_timeout 20s;
        proxy_send_timeout 20s;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }
}
```
> `CONNECT`是什么意思？  
> `CONNECT`方法用来**要求代理服务器建立一条到目标服务器的`TCP`隧道**。建立后，代理不再解析`HTTP`,而是原样转发原始字节，让客户端和目标服务器像直连一样进行加密通信（如`HTTPS`）,或者传输任意`TCP`协议。  

### 反向代理（`Reverse Proxy`）  
代理服务端，隐藏后端真实服务器，代表服务端接收请求并分发。  
客户端只知道自己和`Nginx`通信，不知道后端的应用服务器是谁。这是`Nginx`的看家本领。  

> 结论：`Nginx`主要作为"反向代理"使用，但只要有相应需要，也可以配置为"正向代理"。  

## `Nginx` 怎么配置？   
`Nginx`通过配置文件控制，主配置文件通常位于`/etc/nginx/nginx.conf`或`/user/local/nginx/conf/nginx.conf`,并可使用`include`引入其他配置。   
+ 基本结构  
```nginx
user  www-data;                    # 运行用户
worker_processes  auto;           # 工作进程数
error_log  /var/log/nginx/error.log;
pid        /run/nginx.pid;

events {
    worker_connections  1024;     # 单个进程最大连接数
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout  65;

    # 一台“虚拟主机”就是一个 server 块
    server {
        listen       80;
        server_name  example.com;

        # 静态网站根目录
        root   /var/www/html;
        index  index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

    # 可以定义多个 server 块，实现不同域名或端口的虚拟主机
}
```  




