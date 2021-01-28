### 1.配置PostCSS
>PostCSS 是一套利用JS插件实现的用来改变CSS的工具.这些插件能够支持变量和混合语法，转换未来CSS语法，内联图片，还有更多  

PostCSS拥有非常多的插件  
`Autoprefixer`自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为CSS规则添加前缀。
#### 1.1安装`postcss`、`postcss-loader`、`autoprefixer`;
[参考链接](https://segmentfault.com/a/1190000038485632)  
`npm i postcss postcss-loader autoprefixer@9.8.6 -D`  
autoprefixer使用9.8.6版本主要是与postcss的兼容性问题，autoprefixer默认使用最新版本。
#### 1.2在项目根目录下创建postcss.config.js文件;
```
//创建 postcss.config.js
touch postcss.config.js

// postcss.config.js
module.exports = {
    plugins: [
        // 配置 Autoprefixer 插件
        require('autoprefixer')({
            // 游览器最近的两个版本
            'overrideBrowserslist': ['last 2 versions']
        })
    ],
};
```
### 2.引入element-3
[element-3参考链接](https://element-plus.gitee.io/#/zh-CN/component/installation)  


