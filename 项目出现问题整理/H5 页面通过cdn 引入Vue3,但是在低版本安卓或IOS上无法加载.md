## H5 页面通过cdn 引入Vue3,但是在低版本安卓/IOS上无法加载

[参考链接一文搞清楚前端 polyfill](https://zhuanlan.zhihu.com/p/71640183)  
[babel中文文档](https://www.babeljs.cn/docs/)  


### 兼容性问题与polyfills  

> `polyfill`在英文中有垫片的意思，意为兜底的东西。在计算机科学中，指的是对未能实现的客户端上进行的"兜底"操作。

> 低版本安卓(IOS)浏览器可能存在对现代`javascript`特性的支持不足，如`ES6`语法、`Promise`、`Proxy`等，而这些特性可能被`Vue3`及依赖库所使用。确保项目中包含必要的`polyfills`以兼容这些旧版浏览器：   

+ 使用`Babel`将`Vue3`及项目源代码转换为更广泛支持的`ES5`语法。   
+ 引入`core-js`或`@babel/polyfill`(已弃用，推荐使用`core-js`搭配`@babel/plugin-transform-runtime`)来补充缺失的`JavaScript API`,如`Promise`、`Array.from`等。  
+ 如果使用了`async/await`等异步编程语法，确保相应的`polyfills`也被添加。  

配置示例（以@babel/preset-env为例）：
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["Android >= 4", "iOS >= 8"] // 或者使用更具体的兼容列表
        },
        "useBuiltIns": "usage", // 或 "entry"，根据实际需求选择
        "corejs": "3.x" // 根据实际使用的core-js版本调整
      }
    ]
  ]
}
```  

### 引入`Babel`转义转义不兼容的`ES6`语法  
+ 安装`Babel`相关依赖
`npm install --save-dev @babel/core @babel/cli @babel/preset-env`  

+ 在项目的根目录中创建一个名为 babel.config.json（需要 v7.8.0 及更高版本）的配置文件，其中包含以下内容：
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```  

### `Babel`代码转义成功提示错误
> `Babel` 编译后代码运行出现`‘require is not defined’`错误怎么解决？  


```javascript
weChatAuthorizationConfig.js:3 Uncaught ReferenceError: require is not defined
``` 
#### 错误产生原因  
当使用 `Babel` 编译后的代码在浏览器环境中运行时遇到 `require is not defined` 错误，这通常意味着编译后的代码中仍然包含使用 `require` 函数来加载模块的语句，而浏览器原生并不支持 `require` 这样的 `CommonJS` 模块加载方式。

### 引入打包工具解决问题  
+ 安装`webpack`相关依赖  
```javascript
npm install --save-dev babel-loader @babel/core @babel/preset-env  
```  
+ 安装`babel`  
```javascript
npm install --save-dev babel-loader @babel/core @babel/preset-env
```
+ 安装`core-js`  
```javascript
npm install --save core-js@^3
```  
+ `webpack`把`src`下的`html`打包到`dist`下

### 思考问题  
> `webpack html`中引入的`cdn`文件会打包吗?    

`Webpack`在默认情况下不会打包`HTML`文件中通过`<script>`或`<link>`标签直接引入的`CDN`文件。  
`Webpack`的工作原理是处理模块化的`JavaScript`文件(以及`CSS`、图片等资源)，通过分析入口文件和其导入(`import`或`require`)语句来构建依赖树，并对这些依赖进行处理(如编译、压缩等)和打包。对于`HTML`中直接引用的`CDN`地址，`Webpack`本身并不识别和处理这些外部资源。  

> `html` 通过`cdn` 引入的`js` 文件会导致移动端兼容性问题吗？  
移动端兼容性问题主要在于浏览器的兼容性问题，`CDN`引入的`js`文件本身没有问题，但是由于浏览器的兼容性问题，导致移动端无法正常加载`CDN`引入的`js`文件，从而导致移动端无法正常显示页面。

> 子`js`文件 可以使用 父文件中 `import` 进来的变量吗？

> 总结来说，子文件不能直接使用父文件中 `import` 导入的变量。但父文件可以通过导出机制，无论是直接导出还是间接通过函数调用等方式产生结果后导出，使得子文件能够访问到这些变量。子文件应直接从父文件或其他模块通过 `import` 语句导入所需的变量。
  
### `vue3`单独安装   
1.在项目目录中初始化`npm`:  
```javascript
npm init -y
```  
2.安装`Vue.js 3`:  
```javascript
npm install vue@next
```  
这将安装`Vue.js`的最新版本，即`Vue.js 3`。  

