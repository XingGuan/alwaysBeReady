### 深挖一下`TypeScript`编译器`babel-loader`的编译流程  
如何读取`tsconfig.json`文件的？
查看方式：  
`npm run eject` 弹出配置文件 
在根目录下有一个`config`文件夹，里面有`webpack.config.js`文件
`const useTypeScript = fs.existsSync(path.appTsConfig);`  
`appTsConfig`:`resolveApp('tsconfig.json');`     
`loader:require.resolve('babel-loader');`   // `babel-loader` 项目的编译器   

> `@types/react`:`react ts`接口定义(也称`typing`)

