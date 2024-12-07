### 创建Vue2项目  
#### 命令行工具 CLI（脚手架）方式创建项目   
#### 1.安装`vue-cli`(脚手架)  
```
    npm install -g @vue/cli  
    #or 
    yarn global add @vue/cli
```  
+ 验证是否已正确安装  
```
vue
vue --version
```  
+ 升级全局`Vue CLI`包  
```
npm update -g @vue/cli  
#or  
yarn global upgrade --latest @vue/cli   
```  
> ps:上面显示的升级命令只适用于全局`Vue CLI`安装   
[参考文档 Vue CLI](https://cli.vuejs.org/guide/installation.html)  

#### 2.利用`Vue CLI`脚手架创建项目
+ 开始创建项目，并选择安装相关配置  
```
    vue create [projectName]
```  
> 使用`GUI`,图形界面和`vue ui`命令创建和管理项目  

扩展——拉取2.x模板(旧版)  
`Vue CLI >=3` 使用相同的二进制文件，因为它覆盖了`Vue CLI2`   
如果仍然需要使用旧版功能，可以安装全局网桥：  
```
npm install -g @vue/cli-init   
vue init webpack [my-project]
```
[参考文档Vue CLI 创建项目](https://cli.vuejs.org/guide/creating-a-project.html)

### 3.初步调整完善项目配置文件`vue.config.js`
```javascript
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// __dirname 代表当前所在文件路径   
// __filename 代表当前所在文件名称
const resolve = (dir) => path.join(__dirname, '.', dir);
module.exports = defineConfig({
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })

    // 正式环境下，删除console和debugger
    config.optimization
      .minimize(true)
      .minimizer('terser')
      .tap(args => {
        let { terserOptions } = args[0];
        terserOptions.compress.drop_console = true;
        terserOptions.compress.drop_debugger = true;
        return args
      })

      config.resolve.alias
      .set('@', resolve('src')) 
  },
  transpileDependencies: true
})

```  
### 4.引入项目需要使用的相关插件和依赖   

#### 引入`Vuex`

> `Vuex`是一个专为`Vue.js`应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  

[参考文档 Vuex](https://v3.vuex.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F)  

#### 安装`Vuex`   
```
npm install vuex --save   
```
创建`store`,`/src/store`  

`eg:`
```javascript
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)   

const store = new Vuex.store({
    state:{
        count:0
    },
    mutations:{
        increment(state){
            state.count++
        }
    }
})

export default store

``` 

#### 安装`Vue Router`   
`Vue Router`是`Vue.js`的官方路由。它与`Vue.js`核心深度集成，让`Vue.js`构建单页应用变得轻而易举。功能包括：   
+ 嵌套路由映射   
+ 动态路由选择   
+ 模块化、基于组件的路由配置  
+ 路由参数、查询、通配符  
+ 展示由`Vue.js`的过渡系统提供的过渡效果   
+ 细致的导航控制   
+ 自动激活`CSS`类的链接   
+ `HTML5 history`模式或`hash`模式  
+ 可定制的滚动行为   
+ `URL`的正确编码      

+ 直接下载/CDN   





### `npm install` 安装依赖包 `--save`、`--save-dev`、`-S`、`-D`的区别   
1. `npm install`和`npm i`是一样的，都是安装`package.json`文件中的依赖包   
  **安装**单独的依赖包时，`npm install <packageName>`  
  + `--save`等同于`-S`(常用，可保存在`package.json`文件中)  
  + `-S`、`--save`安装包信息将加入到`dependencies`(生产阶段的依赖，也就是项目运行时的依赖，**程序上线后**仍然需要依赖)  
  + `--save-dev`等同于`-D`  
  `-D`、`--save-dev`安装包信息将加入到`devDependencies`(开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用)   

> `dependencies`是运行时的依赖
> `devDependencies`是开发时的依赖  

2.`npm`安装指定版本的依赖
```
npm install --save react-router@2.8.1
// 2.8.1 是指定的版本号 
```  
3.删除模块  
```
npm uninstall 模块
```  
删除本地模块时你应该思考的问题:是否将在`package.json`上的相应依赖信息也消除？   
`npm uninstall`模块:删除模块，但不删除模块留在`package.json`中的对应信息  
`npm uninstall 模块 --save` 删除模块，同时删除模块留在`package.json`中`dependencies`下对应信息  
`npm uninstall 模块 --save-dev` 删除模块，同时删除模块留在`package.json`中`devDependencies`下的对应信息   
[参考文档 npm install 安装依赖包 --save、--save-dev、-S、-D的区别](https://blog.csdn.net/aaqingying/article/details/101371352)

### 版本  
+ `Alpha` 内部测试版
+ `Beta` 公开测试版  
+ `RC` 候选版本(类似预览版)  
+ `Stable` 稳定版   
+ `GA：General Availability` 正式发布的版本  
+ `Release` 最终版本   

> 相关说明   
> α、β、λ常用来表示软件测试过程中的三个阶段，α是第一阶段，一般只供内部测试使用；β是第二个阶段，已经消除了软件中大部分的不完善之处，但仍有可能还存在缺陷和漏洞，一般只提供给特定的用户群来测试使用；λ是第三个阶段，此时产品已经相当成熟，只需在个别地方再做进一步的优化处理即可上市发行。

[参考文档](https://blog.csdn.net/test1280/article/details/70880183)

