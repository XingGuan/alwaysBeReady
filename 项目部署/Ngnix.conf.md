```conf
server {
    listen 80; //监听服务器的 80 端口
    server_name localhost;
    location /2025 {
        alias /path/to/activity-2025/dist;
        try_files $uri $uri/ /index.html;
    }
}
```   
```
{
    listen 80;
    /**
    *   监听服务器的80 端口
     */
}
```

