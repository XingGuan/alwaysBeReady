## HTTP-1.0  
+ 最基本的`HTTP`协议，支持基本的`GET`、`POST`方法。  
## HTTP-1.1  
+ 增加了缓存策略`cache-control`、`E-tag`等。
+ 支持长连接`Connection:keep-alive;`,一次`TCP`连接多个请求。   
+ 断点续传，状态码206。  
+ 支持新的方法`PUT``DELETE`等，可用于`Restful API`。  

## HTTP-2.0  
+ 可压缩`header`,减少体积。  
+ 多路复用,一次`TCP`连接中可以多个`HTTP`并行请求。 
+ 服务端推送。  
