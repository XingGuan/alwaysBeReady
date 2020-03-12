### 异步组件引用报错

Uncaught Error: Cannot find module 'core-js/modules/es.object.to-string'
提示执行命令:
`npm install --save core-js/modules/es.object.to-string`  
之后报错:`npm ERR! Could not install from "core-js\modules\es.object.to-string" as it does not contain a package.json file.`  
**现在解决方式为升级 core-js 的版本之前应用的 vue-cli3 脚手架，core-js 的版本为^2.6.11，现在升级为 3，问题解决**  
`npm install core-js@3 -save-dev`
