### `cross-env`  
> `cross-env``npm`包，它的主要作用是实现跨平台的环境变量设置。   
#### 核心作用   
解决不同操作系统环境变量设置语法不一致的问题：  
+ `Unix/Linux/macOS`:`VARIABLE=value command`  
+ `Windows`:`set VARIABLE=value & command`  
#### 具体功能  
1.语法统一  
```bash
    # 使用 cross-env后，所有平台都使用相同语法
    cross-env VARIABLE = value command
```  
2.平台兼容性  
+ `windows(CMD/PowerShell)`  
+ macOS
+ Linux  
+ WSL  
3.复杂环境变量支持  
```json
    "script":{
        "simple":"cross-env NODE_ENV=production node app.js",
        "multiple":"cross-env FIRST=value SECOND=value node app.js",  
        "width-spaces":"cross-env MESSAGE=\"Hello World\" node app.js",
        "special-chars":"cross-env API_KEY=abc123!@# node app.js",
    }
```
#### 实际应用场景   
#### 构建环境配置  
```json  
{
    "script":{
        "build:dev":"cross-env NODE_ENV=development vite build",  
        "build:prod":"cross-env NODE_ENV=production vite build",
        "build:analyze":"cross-env VITE_ANALYZE=true vite build",
    }
}
```  
#### `API`配置  
```json  
{
    "script":{
        "start":"cross-env API_URL=https://api.example.com node server.js",  
        "start:local":"cross-env API_URL=http://localhost:3000 node server.js"
    }
}
```  
#### 为什么需要`cross-env`?  
##### 问题示例  
没有`cross-env`时，需要写兼容代码：  
```json  
{
    "script":{
        "build":"npm run build:win || npm run build:unix",  
        "build:win":"set NODE_ENV=production&& vite build",
        "build:unix":"NODE_ENV=production vite build"
    }
}
```  
#### 使用`cross-env`后  
```json
{
    "script":{
        "build":"cross-env NODE_ENV=production vite build"
    }
}
```  
#### 优势总结   
1.**简化配置**：一套脚本适配所有操作系统。  
2.**团队协作**：避免因开发环境不同导致的脚本运行问题。  
3.`CI/CD`友好：在构建服务器上无需关心操作系统差异  
4.错误减少：避免因环境变量设置语法错误导致的构建失败   

#### 安装和使用 
# 安装
```bash
    npm install --save-dev cross-env  
```  
# 在`package.json`中使用 
```bash
{
    "scripts":{
        "dev":"cross-env NODE_ENV=development vite",
        "build":"cross-env NODE_ENV=production vite build"
    }
}
```   
> 总之，`cross-env`是前端开发中解决环境变量跨平台问题的标准解决方案，特别适合需要多人协作或在多种操作系统上部署的项目。   


