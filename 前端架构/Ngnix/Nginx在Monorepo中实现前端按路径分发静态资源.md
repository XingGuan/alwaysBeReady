```conf
# nginx/conf.d/app.conf
server {
    listen 80;
    server_name your-domain.com;
    
    # 通用静态资源缓存设置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 按路径分发规则
    location / {
        root /usr/share/nginx/html/web-app;
        try_files $uri $uri/ /index.html;
    }
    
    location /admin {
        alias /usr/share/nginx/html/admin;
        try_files $uri $uri/ /admin/index.html;
    }
    
    location /mobile {
        alias /usr/share/nginx/html/mobile-h5;
        try_files $uri $uri/ /mobile/index.html;
    }
    
    # API反向代理示例
    location /api {
        proxy_pass http://backend-service:3000;
        proxy_set_header Host $host;
    }
}
```
