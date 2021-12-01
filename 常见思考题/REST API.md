### 为什么要使用RESTful架构？
+ REST是`Representational` `State` `Transfer`(代表性状态转移)的缩写，如果一个架构符合`REST`原则,就称它为RESTful架构。
+ `RESTful`架构可以充分利用HTTP协议的各种功能,是HTTP协议的最佳实践。
+ RESTful API是一种软件架构风格、设计风格，可以让软件更加清晰，更简洁，更有层次，可维护性更好。  

### API请求设计
> 请求 = 动词 + 宾语;  
+ 动词 使用五种`HTTP`方法，对应`CURD`操作
+ 宾语URL应该全部使用名词复数，可以有例外,比如搜索可以使用更加直观的`search`。
+ 过滤信息(`Filtering`)如果记录数量很多,API应该提供参数，过滤返回结果。?limit=10 指定返回记录的数量 ?offset=10 指定返回记录的开始位置。

请求方式|宾语|操作目标
---|---|--- 
GET|/zoos|列出所有动物园
POST|/zoos|新建一个动物园
GET|/zoos/:id|获取某个指定动物园的信息
PUT|/zoos/:id|更新某个指定动物园的全部信息
PATCH|/zoos/:id|更新某个指定动物园的部分信息
DELETE|/zoos/:id|删除某个动物园
GET|zoos/:id/animals|列出某个指定动物园的所有动物
DELETE|/zoos/:id/animals/:id|删除出某个指定动物园下的指定动物

### 使用HTTP状态码  
+ 客户端的每一次请求，服务器都必须给出回应。回应包括HTTP状态码和数据两部分。
+ 五大类状态码,总共100多种，覆盖了绝大部分可能遇到的情况。每一种状态码都有约定的解释，客户端只需查看状态码，就可以判断出发生了什么情况。API不需要1XX状态码。  

1XX 相关信息。  
2XX 操作成功。  
3XX 重定向。  
4XX 客户端错误。  
5XX 服务器错误。

### 服务器回应数据
+ 客户端请求时，要明确告诉服务器，接受 JSON 格式，请求的 HTTP 头的 ACCEPT 属性要设成 application/json。  
+ 服务端返回的数据，不应该是纯文本，而应该是一个 JSON 对象。服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json  
+ 错误处理 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 error 作为键名，出错信息作为键值即可。 {error: "Invalid API key"}。  
+ 认证 RESTful API 应该是无状态，每个请求应该带有一些认证凭证。推荐使用 JWT 认证，并且使用 SSL。  
+ Hypermedia 即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么。  