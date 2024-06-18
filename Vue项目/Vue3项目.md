##`Vue3`项目搭建
### `Vue`单页应用   
项目依赖:   
+ `18.0`以上版本的`Node.js`  
+ 创建的项目使用基于`vite`的构建设置  
+ 使用`Vue`的**单文件组件**`SFC`   

#### 1.开始安装  
使用`Vue`官方**脚手架工具**`create vue`创建项目
在项目目录下执行：  
```javascript
npm create vue@latest
```
在项目被创建后，通过以下步骤**安装依赖**,并启动开发服务器：
```javascript
cd <your-project-name>  
npm install  
npm run dev
```
当你准备将应用发布到生产环境时,运行  
```javascript
npm run build
```  
此命令会在`./dist`文件夹中为你的应用创建一个生产环境的构建版本。

#### 参考文档  
[Vue.js](https://cn.vuejs.org/guide/quick-start.html#next-steps)   
[Vite 文档](https://cn.vitejs.dev/)   

#### 增加环境配置文件，修改启动及打包命令
新增`.env`、`.env.development`、`.env.staging`、`.env.production`不同环境下的环境变量配置。
修改`package.json`下的项目**启动**及**打包**命令
```json
  "scripts": {
    "dev": "vite --mode development",
    "stage": "vite --mode staging",
    "prod": "vite --mode production",
    "build-dev": "vite build --mode development",
		"build-stage": "vite build --mode staging",
    "build": "vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
```


#### 3.修改更新`vite.config.js`配置文件   
+ `server`开发服务器选项  
```javascript
  // 配置开发服务器
  server: {
    host: "0.0.0.0",
    open: env.BROWSER // 开发服务器启动时，是否自动在浏览器中打开应用程序  
    proxy:{
      "^/v1/.*":{
        target: 'http://172.16.108.106',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      }
    }, // 为开发服务器配置自定义代理规则
  }
```  
+ `alias`别名配置
```javascript
  resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        assets: "@/assets",
      }
  },
```
+ 生产环境下去除`console`、`debugger`
```javascript
    esbuild: {
      drop: env?.VITE_DROP_CONSOLE === "true" ? ["console", "debugger"] : [],
    }
```

#### 4.`Vue3 + Vite`移动端适配并兼容`Vant`  
+ 引入`cnjm-postcss-px-to-viewport`适配移动端(`px 转成 vw`)  
```javascript
import pxTovw from "cnjm-postcss-px-to-viewport";
  const myPxToVW = pxTovw({
    unitToConvert: "px", // 要转化的单位
    viewportWidth: 750, // UI设计稿的宽度
    unitPrecision: 6, // 转换后的精度，即小数点位数
    propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
    fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
    selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    replace: true, // 是否转换后直接更换属性值
    exclude: [/node_modules/], // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件, 设置忽略文件，用正则做目录名匹配
    landscape: false, // 是否处理横屏情况
    // 如果没有使用其他的尺寸来设计，下面这个方法可以不需要，比如vant是375的
    customFun: ({ file }) => {
      //这个自定义的方法是针对处理vant组件下的设计稿为375问题;
      const designWidth = path
        .join(file)
        .includes(path.join("node_modules", "vant"))
        ? 375
        : 750;
      return designWidth;
    },
  });
```
配置在`css`中
```javascript
    css: {
      postcss: {
        plugins: [myPxToVW],
      },
    },
```
+ 引入`autoprefixer`
> autoprefixer是一个常用的postcss插件，可以帮我们给css添加样式前缀，以兼容旧浏览器。

```
npm install autoprefixer -D
```  
配置在`css`,`plugins`里
```javascript
    css: {
      postcss: {
        plugins: [myPxToVW, autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["> 1%", "last 2 versions"]
        })],
      },
    },
```
+ 引入`vant 4`  
[vant 安装](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart)  

#### 5.引入`CSS`预处理器`Less`  
+ 安装
> npm install less -D   

> `Vite` 和 `Webpack` 不同，不需要 `less-loader` 等，只需安装 `less`  

在`src/assets`目录下添加**全局样式**文件`global.less`。  
配置在`vite.config.js`中加载  
```javascript
import { fileURLToPath, URL } from 'node:url'
import { dirname } from "node:path"
  // 获取__dirname
  function getCurrentDir() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname;
  }
   css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(getCurrentDir(), 'src/assets/style/global.less')}";`
        }
      },
    }
```  
> 注意查看控制台`Network`、`CSS`选项不会有，`global.css`或`global.less`。   
#### 6.利用`pinia`,创建`store` 

> 项目初始化时已引入`pinia`  



#### 7.引入`axios`封装并处理请求  
+ 安装  
```
npm install axios
```

+ 引入`MD5`加密  
```javascript
npm install --save js-md5
```  
+ 引入加密标准的 JavaScript 库 `crypto`  

```
npm install --save crypto-js
```

#### 8.修改`vue-router`路由  

#### 9.`vite`兼容低版本浏览器  
引入`legacy`  
