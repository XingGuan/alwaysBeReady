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