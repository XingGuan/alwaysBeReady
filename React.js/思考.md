### 1、如何启动一个`React`项目？
>`npm start`启动项目
`npm start`会打开一个本地服务器，然后把`react`网站托管在这个本地服务器上,然后就可以浏览网站了。
### 2、如何启动一个`TypeScript`版本的`React`项目？  
执行命令搭建`typescript`,`react`项目
```
npx create-react-app projectName --template typescript
```  
执行`npm start`启动项目   

### 3、`create-react-app` 是什么？  

>`create-react-app`(**创建react应用**),它是一个通过`npm`发布的安装包，也是一个命令，在安装好`nodejs`后，在命令终端下执行`npm`或`cnpm`,全局安装`create-react-app`这个脚手架工具  

### 4、`npm`与`yarn`的区别是什么？  
`yarn`是新推出的一个`JS`包管理工具。  
[npm和yarn的区别参考一](https://zhuanlan.zhihu.com/p/27449990#:~:text=npm%20%E5%92%8C%20Yarn%20%E4%B8%A4%E8%80%85%E7%9A%84%E4%B8%8D%E5%90%8C%E4%B9%8B%E5%A4%84%E5%9C%A8%E4%BA%8E%EF%BC%8CYarn%20%E9%BB%98%E8%AE%A4%E4%BC%9A%E7%94%9F%E6%88%90%E8%BF%99%E6%A0%B7%E7%9A%84%E9%94%81%E5%AE%9A%E6%96%87%E4%BB%B6%EF%BC%8C%E8%80%8C%20npm,%E8%A6%81%E9%80%9A%E8%BF%87%20shrinkwrap%20%E5%91%BD%E4%BB%A4%E7%94%9F%E6%88%90%20npm-shrinkwrap.json%20%E6%96%87%E4%BB%B6%EF%BC%8C%E5%8F%AA%E6%9C%89%E5%BD%93%E8%BF%99%E4%B8%AA%E6%96%87%E4%BB%B6%E5%AD%98%E5%9C%A8%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8Cpackages%20%E7%89%88%E6%9C%AC%E4%BF%A1%E6%81%AF%E6%89%8D%E4%BC%9A%E8%A2%AB%E8%AE%B0%E5%BD%95%E5%92%8C%E6%9B%B4%E6%96%B0%E3%80%82)  

[yarn vs npm](https://www.w3cschool.cn/article/9538462.html)


### 5、`tsconfig.json`有什么用？    
+ `TypeScript`的编译  
必须使用相应的编译器。
编译器:`ts-loader`、`awesome-typescript-loader`、
以及`babel-loader`。 `create-react-app`默认引入的编译器是`babel-loader`。  

+ 编译器配置文件`tsconfig.json`   

### 6、如何配置`typeScript`编译器？  
[参考TypeScript基础](../TypeScript基础/TypeScript基础.md)
### 7、`npx` 是什么？
>`npx`是`npm 5.2+` 附带的包运行器工具。`npx`可以在不全局安装工具集的情况下直接使用工具。

### 8、`npx` 使用淘宝镜像？  
+ 1.查看`npm`的镜像源  
```javascript
npm config get registry
``` 
+ 2.修改成淘宝的镜像源  
```javascript
npm config set registry https://registry.npm.taobao.org
```  
+ 3.然后执行`npx`命令进行安装   
### 9.`jsx`文件  
> `jsx`文件允许我们在`javascript`文件中使用类似`html`的写法来渲染页面
 