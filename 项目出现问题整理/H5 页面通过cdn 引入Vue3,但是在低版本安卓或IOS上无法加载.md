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
[webpack 5 相关配置介绍](https://segmentfault.com/a/1190000040419967)
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

> `HtmlWebpackPlugin`    
  
+ 使用观察者模式  
可以指示`webpack`"观察"依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译，所以不必再去手动运行整个构建。   
像下面这样添加一个用于启动`webpack`观察模式的`npm script`:
`package.json`
```javascript
{
  "scripts": {
    "watch":"webpack --watch"
  }
}
```  
在命令中运行`npm run watch`,然后就会看到`webpack`是如何编译代码的，编译完就会发现它并没有退出命令行，这是因为该脚本当前还在观察你的文件。

此时`webpack`已经自动地重新编译修改后的模块！
> 观察模式唯一的缺点是需要手动刷新浏览器才能看到修改后的实际效果。 实现`webpack-dev-server`将能够自动刷新浏览器！     

+ 使用`webpack-dev-server`  
`webpack-dev-server`提供了一个能够实时重新加载的基本的`web server`。安装依赖如下:   
```javascript
npm install --save-dev webpack-dev-server
```
`dev-server`配置   
```javascript
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        host: 'xxx.xx.xxx.xxx',
        port: 5555,
        compress: true,
        hot: true,
        open: true,
    }
```  

+ 引入`sass`,`css`的预处理器，是`CSS` 的扩展语言。   
```javascript
npm install sass-loader sass webpack --save-dev
```
+ 引入图片压缩  
在 `Webpack 5` 中压缩图片，通常会使用 `image-webpack-loader` 或 `responsive-loader`（配合 `imagemin` 等插件）等专门针对图片处理的加载器。  


> 注意：当你在项目中通过 `import` 或 `require` 引入图片时，`Webpack` 会自动调用 `image-webpack-loader` 进行压缩，并通过 `file-loader` 输出到指定目录。在 `HTML` 或 `CSS` 中使用压缩后的图片的 `URL`，就像使用普通静态资源一样。

> 注意：这里不能压缩`css`文件中引入的背景图片  

> `webpack 5` 如何压缩 `css` 中引入的图片？
在 `Webpack 5` 中，要压缩 `CSS` 中引入的图片（例如通过 `background-image` 或 `url()` 函数引用的图片），通常需要结合使用 `css-loader`、`url-loader` 或 `file-loader` 以及 `image-webpack-loader`（或类似图片压缩工具）。

+ 引入`postcss-loader`和`autoprefixer`   
  
`postcss-loader`: 这个 `loader` 用于自动添加浏览器厂商前缀到 `CSS` 文件中，以确保在不同浏览器下的兼容性。它通过 `postcssOptions` 配置项来使用 `PostCSS` 插件，这里使用了 `autoprefixer` 插件。  

> 注：很重要的一点：单单设置`autoprefixer`插件后，代码编译后，可能不能正确添加浏览器前缀，必须添加 `overrideBrowserslist`。 
  
`overrideBrowserslist`选项在 `Autoprefixer` 中非常重要，因为它定义了插件应为哪些浏览器添加厂商前缀。在 `Webpack` 配置中，正确设置 `overrideBrowserslist` 可以帮助确保生成的 `CSS` 能够在目标浏览器中正确渲染，尤其是对于老版本的浏览器以及较老版本的 `Android` 和 `iOS` 设备。


+ 正确设置环境变量   
`dotenv`
```javascript
"scripts": {
  "dev": "cross-env envMode=dev webpack serve --config ./build/webpack.dev.conf.js  --color",
  "build": "cross-env envMode=prod webpack --config build/webpack.prod.conf.js  --color",
  "build:test": "cross-env envMode=test webpack --config build/webpack.prod.conf.js  --color"
},
```  
+ 支持不同环境下打包输出，且`clean`互不影响  

+ 添加`vw`适配  

> 注意：`webapck`,`MiniCssExtractPlugin`单独提取插件在开发环境中使用可能会影响到`webpack-dev-server`的热更新，所以可能需要在测试和预发环境中使用`style-css`，在生产环境使用`MiniCssExtractPlugin`。

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

### 思考问题  
> `webpack html`中引入的`cdn`文件会打包吗?    

`Webpack`在默认情况下不会打包`HTML`文件中通过`<script>`或`<link>`标签直接引入的`CDN`文件。  
`Webpack`的工作原理是处理模块化的`JavaScript`文件(以及`CSS`、图片等资源)，通过分析入口文件和其导入(`import`或`require`)语句来构建依赖树，并对这些依赖进行处理(如编译、压缩等)和打包。对于`HTML`中直接引用的`CDN`地址，`Webpack`本身并不识别和处理这些外部资源。  

> `html` 通过`cdn` 引入的`js` 文件会导致移动端兼容性问题吗？    

移动端兼容性问题主要在于浏览器的兼容性问题，`CDN`引入的`js`文件本身没有问题，但是由于浏览器的兼容性问题，导致移动端无法正常加载`CDN`引入的`js`文件，从而导致移动端无法正常显示页面。

> 子`js`文件 可以使用 父文件中 `import` 进来的变量吗？

> 总结来说，子文件不能直接使用父文件中 `import` 导入的变量。但父文件可以通过导出机制，无论是直接导出还是间接通过函数调用等方式产生结果后导出，使得子文件能够访问到这些变量。子文件应直接从父文件或其他模块通过 `import` 语句导入所需的变量。  

> `webpack` 会打包`index.html` 通过 `<link>` 标签引入的`css` 文件吗？

`webpack`默认不会直接打包`HTML`文件，也不会处理`HTML`文件中通过`<link>`标签引入的`CSS`文件。`webpack`主要负责打包`JavaScript`模块和其他资源文件，比如`CSS`、图片、`字体`等资源文件，但不会直接处理`HTML`文件。   

 通常情况下，可以手动管理`HTML`文件，并在其中引入`webpack`打包生成的`JavaScript`文件和其他资源文件。例如，你可以在 HTML 文件中通过 `<script>` 标签引入打包生成的 `JavaScript` 文件，通过 `<link>` 标签引入打包生成的 `CSS` 文件。如果你想要进一步自动化这个过程，可以使用 `webpack` 插件来处理 `HTML` 文件。比较常用的插件是 `HtmlWebpackPlugin`，它可以自动生成 `HTML` 文件，并自动引入打包生成的 `JavaScript` 文件。

以下是一个使用`HtmlWebpackPlugin`插件的`webpack`配置示例：   
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // CSS loader rules
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 指定 HTML 模板文件
    })
  ]
};

```  
在这个示例中，我们通过 `HtmlWebpackPlugin` 插件指定了 `HTML` 模板文件为 `src/index.html`，`webpack` 在打包时会生成一个新的 `HTML` 文件，并自动将打包生成的 `JavaScript` 文件引入到这个 `HTML` 文件中。你只需要在模板文件中手动引入 `CSS` 文件即可，`webpack` 不会处理 `<link>` 标签引入的 `CSS` 文件。  

`webpack` 怎么在`index.html` 中引入打包好的 `css` 文件?
在 `webpack` 中，你可以通过 `HtmlWebpackPlugin` 插件来自动将打包好的 `CSS` 文件引入到 `HTML` 中。下面是一个简单的示例:
首先，确保你已经安装了 `HtmlWebpackPlugin` 插件：  
然后，在 `webpack` 的配置文件中配置 `HtmlWebpackPlugin`：  
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // CSS loader rules
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 指定 HTML 模板文件
    })
  ]
};

```  
接下来，确保你的 `HTML` 文件（比如 `src/index.html`）中没有手动引入 `CSS` 文件的代码。`HtmlWebpackPlugin` 会自动处理这个过程。

最后，构建你的项目。`webpack` 会根据配置生成打包好的 `HTML` 文件，并自动将打包好的 `CSS` 文件引入到 `HTML` 中。

在构建完成后，你可以在 `dist` 目录中找到生成的 `HTML` 文件，其中会包含对打包好的 `CSS` 文件的引用。


> `webapck` 可以直接打包`css` 吗?  

是的，`webpack` 可以直接打包 `CSS` 文件。你可以使用不同的加载器（`loader`）来处理不同类型的文件，包括 `CSS` 文件。  
通常，你会使用两个主要的`CSS`相关加载器。   
1.`CSS-Loader`:用于解析`CSS`文件，并处理其中的`import`和`url()`等语句。  
2.`style-loader`:将解析后的`CSS`通过添加`<style>`标签的方式注入到`HTML`页面中。  
可以通过安装相应的`loader`，并在`webpack`配置中使用它们来处理`CSS`文件。   
安装`loader`:  
```javascript
npm install --save-dev style-loader css-loader
```  
然后，在`webpack`配置中添加对`CSS`文件的处理规则：   
```javascript
module.exports={
   // 其他配置...
   module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```  
这段配置指定了当`webpack`遇到`.css`结尾的文件时，使用`css-loader`解析`CSS`文件，并通过`style-loader`将解析后的`CSS`注入到`HTML`页面中。  
然后，在你的`JavaScript`文件中，你可以通过`import`或`require`的方式引入`CSS`文件：   
```javascript
import './style.css';  //或者 require('./style.css');
```  
`webpack` 在打包时会自动处理这些 `CSS` 文件，并将它们打包到你的输出目录中。  

> `webpack` 如何打包`H5`页面？  





## 项目问题整理   
`jwexin-1.6.0.js`，`js-wexin-sdk`在`webpack`打包的`index.html`中引入其将`cdn`文件复制到本地，通过`script`标签引入，会报错`wx is not defined ReferenceError: wx is not defined` 。  
在`webpack`打包的项目中需要引入，`js-wexin-sdk`。  

然后通过`import`引入  
```javascript
 import wx from 'weixin-js-sdk';
```  

> 微信开放标签唤起App`wx-open-launch-app`,提示错误`launch:fail`，可能原因是直接点击`url`链接跳转`App`导致的，必须要通过分享卡片或者二维码访问才能唤起。




