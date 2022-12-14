### `TypeScript`编译器，`babel-loader`编译流程，如何读取`tsconfig.js`文件的  

`webpack.config.js` 项目配置核心  
```javascript
const useTypeScript = fs.existsSync(paths.appTsConfig); //读取TS编译的配置信息     

`paths.appTsConfig`  --->   `appTsConfig: resolveApp('tsconfig.json')` 指向根目录下 `tsconfig.json`
```    
### `loader`使用的是`babel-loader`
```javascript
    {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader')
    }
```
>`babel-loader`是项目的编译器    
