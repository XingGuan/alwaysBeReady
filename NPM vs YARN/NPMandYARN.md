### 【延伸阅读】NPM vs YARN
从 package.json 中安装项目依赖:  
```
npm install 
或 
yarn 
```
向 package.json 添加/安装新的项目依赖:  
```
npm install {库名} --save 
或
yarn add {库名}   
```
向 package.json 添加/安装新的dev项目依赖（devDependency）:  
```
npm install {库名} --save-dev 
或
yarn add {库名} --dev
```
删除依赖项目:   
```
npm uninstall package --save 
或
yarn remove package
```
升级某个依赖项目:  
```
npm update --save 
或
yarn upgrade
```
全局安装某项目依赖（慎用）:  
```
npm install package -g
或
yarn global add package  
```