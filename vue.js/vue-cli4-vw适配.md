### 参考资料
[移动端适配方案：基于flexible库的成熟方案和基于vw的新方案](https://mobilesite.github.io/2018/02/05/vm-mobile-layout/)  
[cssnano](https://www.cssnano.cn/docs/advanced-transforms)  
### autoprefixer
>一个很好的例子`autoprefixer`,这个转换通过删除陈旧的带有特定厂商前缀的属性从而修改了CSS语义。为了保证转换的安全，你的browserslist 配置必须反映出你的站点所选择支持的浏览器。 

### 相关依赖
+ `cssnano`
  >cssnano 就是这样的一个缩减器，它使基于 Node.js 开发的。cssnano 是一个 PostCSS 插件，可以添加到你的构建流程中，用于确保最终生成的 用于生产环境的 CSS 样式表文件尽可能的小  
+ cssnano-preset-advanced  
  >使用高级转换，默认情况下，高级转换不会与cssnano捆绑在一起的，因此你需要在安装cssnano时一同安装相应的预设(preset)  
+ postcss-aspect-radio-mini   
  > 用来处理元素容器宽高比  
+ postcss-cssnext  
  > 该插件可以让我们使用css未来的特性，其会对这些特性做相关的兼容性处理。
+ postcss-px-to-viewport
  > 插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。  
+ postcss-px-to-viewport-opt
  > 改良版postcss-px-to-viewport
+ postcss-viewport-units
  >主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。
+ postcss-write-svg   
  > 该插件主要用来处理移动端1px的解决方案。

### 一、使用方式
安装插件
```
  npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-px-to-viewport-opt postcss-write-svg cssnano-preset-advanced  postcss-cssnext postcss-viewport-units cssnano --S
```
添加配置文件`postcss.config.js`
```javascript
  module.exports = {
  plugins: {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-write-svg": {
      uft8: false
    },
    "postcss-cssnext": {},
    // autoprefixer: {},
    // vw/vh配置
    'postcss-px-to-viewport': {
      unitToConvert: "px", // 默认值`px`，需要转换的单位
      viewportWidth: 2000, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', //指定字体需要转换成的视窗单位，默认vw;
      selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/node_modules/] //如果是regexp, 忽略全部匹配文件;如果是数组array, 忽略指定文件.
    },
    "postcss-viewport-units": {},
    "cssnano": {
      preset: "advanced",
      autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
      "postcss-zindex": false
    }
  }
}
```


  ### 二、引入`Viewport Units Buggyfill`
  [参考链接](https://www.jianshu.com/p/477ae5cac982)  
  作用:对于不支持VW单位的机型降级处理。
  >使用方式：1.在HTML文件中引入这两个文件。
  ```javascript
  <script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
  ```
  2.在HTML文件中调用`viewport-units-buggyfill`
  ```javascript
  <!--使用viewport-units-buggyfill解决个别手机不支持vw-->
  <script>
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
  }
  </script>
  ```
  ### 三、项目配置自动引入全局scss文件
  >注：在每个组件中引入的形式如`@import './assets/css/style.scss';`,这样每个组件都要引入一次很麻烦。所以考虑要全局引入，在`main.ts`引入`import './assets/css/common.scss`是无效的，当组件在使用common.scss下的变量的时候，会提示`undefined`。  

  正确配置方式：在`vue.config.js`文件使得每个vue文件自动引入全局scss文件。[参考资料](https://blog.csdn.net/weixin_42206375/article/details/104936076)  
  vue.config.js配置
  ```javascript
  // vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/style.scss";` 
      },
    } 
  }
}
  ```


