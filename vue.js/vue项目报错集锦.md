### 异步组件引用报错

Uncaught Error: Cannot find module 'core-js/modules/es.object.to-string'
提示执行命令:
`npm install --save core-js/modules/es.object.to-string`  
之后报错:`npm ERR! Could not install from "core-js\modules\es.object.to-string" as it does not contain a package.json file.`  
**现在解决方式为升级 core-js 的版本之前应用的 vue-cli3 脚手架，core-js 的版本为^2.6.11，现在升级为 3，问题解决**  
`npm install core-js@3 -save-dev`

### npm run build打包报错
To install them, you can run: npm install --save @c/Home @c/My @c/Shopping @c/currency/ToolBar.vue @js/axios.config.js @js/filter.js @js/htmlFontSize
This relative module was not found:
* ../views/goodsList.vue in ./src/router/index.js  

**报错描述：**无法找到@c(components)下的Home,My,Shopping组件。
**报错原因：**为开发环境增加别名操作步骤(修改@vue/cli 默认 webpack 配置），所以别名只会在开发环境中生效，当我们使用build打包一个项目的时候，那么这里的配置不会生效  
**解决方法：**改变别名设置位置