### Node.js 文件系统
Node.js 提供一组类似UNIX(POSIX)标准的文件操作API。
Node导入文件系统模块(fs)语法如下所示：  
`var fs=require("fs")`  
#### 异步和同步
Node.js文件系统(fs模块)模块中的方法均有异步和同步版本。  
eg：读取文件内容的函数有异步的`fs.readFile()`和同步的`fs.readFileSync()`。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。  
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。  
实例
创建input.txt文件，内容如下：
> 文件读取实例   
创建file.js文件，代码如下：
```node
    var fs=require("fs");
    <!-- 异步读取 -->
    fs.readFile("input.txt",function(err,data){
        if(err){
            return console.err(err);
        }
        console.log("异步读取:"+data.toString());
    })
    <!-- 同步读取 -->
    var data=fs.readFileSync('input.txt);
    console.log("同步读取: " + data.toString());
    console.log("程序执行完毕。");
```
以上代码执行结果如下：
```
$ node file.js
同步读取: 菜鸟教程官网地址：www.runoob.com
文件读取实例

程序执行完毕。
异步读取: 菜鸟教程官网地址：www.runoob.com
文件读取实例
```
接下来，让我们来具体了解下Node.js文件系统的方法。
### 打开文件
语法
以下为在异步模式下打开文件的语法格式：  
>fs.open(path,flags[,mode],callback)
### 参数
参数使用说明如下：
+ path - 文件的路径
+ flags - 文件打开的行为
+ mode - 设置文件模式(权限)，文件创建默认权限为0666(可读，可写)。
+ callback - 回调函数，带有两个参数如：callback(err,fd)。
#### flags参数可以是以下值
|Flags|描述|
|---|---|
|r|以读取模式打开文件。如果文件不存在抛出异常。|
|r+|以读写模式打开文件。如果文件不存在抛出异常。|
|rs|以同步的方式读取文件。|
|rs+|以同步的方式读取和写入文件。|
|w|以写入模式打开文件，如果文件不存在则创建|
|wx|类似"w",但是如果文件路径存在，则文件写入失败|
|w+|以读写模式打开文件，如果文件不存在则创建|
|wx+|类似'w+',但是如果文件路径存在，则文件读写失败|
|a|以追加模式打开文件，如果文件不存在则创建|
|ax|类似'a',但是如果文件路径存在，则文件追加失败|
|a+|以读取追加模式打开文件，如果文件不存在则创建|
|ax+|类似'a+',但是如果文件路径存在，则文件读取追加失败。|
### 实例
接下来我们创建file.js文件，并打开input.txt文件进行读写，代码如下所示：
```node
    var fs=require("fs");
    <!-- 异步打开文件 -->
    console.log("准备打开文件！”);
    fs.open('input.txt','r+',function(err,fd){
        if(err){
            return console.error(err);
        }
        console.log("文件打开成功！");
    })
```
以上代码执行结果如下：
>$ node file.js   
准备打开文件！  
文件打开成功！ 
### 获取文件信息
#### 语法
以下为通过异步模式获取文件信息的语法格式：  
> fs.stat(path,callback)  
##### 参数
参数使用说明如下：
+ path-文件路径
+ callback-回调函数，带有两个参数如:(err,stats),stats是fs.Stats对象
fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
```node
    var fs = require('fs');

    fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
        console.log(stats.isFile());         //true
    })
```   
具体`stats`类中的方法有
### 写入文件
#### 语法
以下为异步模式下写入文件的语法格式:
<!-- 以下为异步模式下写入文件的语法格式 -->
> fs.writeFile(file,data[,options],callback)  

writeFile 直接打开文件默认是`w`模式，