[vue-cli资源文档](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)  
### **publicPath**
+ Type: string  
+ Default: '/'  
[参考链接](https://cli.vuejs.org/zh/config/#publicpath)  

部署应用包时的基本URL。用法和webpack本身的output.publicPath一致，但是Vue CLI在一些其他地方也需要用到这个值，所以请始终使用`publicPath`而不要直接修改webpack的`output.publicPath`。

默认情况下，Vue CLI会假设你的应用是被部署在一个域名的根路径上，例如`https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，你的应用被部署在`https://www.my-app.com/my-app/`,则设置`publicPath`为`/my-app/`。

### `publicPath`这个值在开发环境下同样生效。如果想把开发服务器架设在根路径，可以使用一个条件式的值。
```
module.exports = {  
  publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/';
}
```

