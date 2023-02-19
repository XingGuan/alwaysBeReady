<!--
 * @Descripttion: Node.js 进程
 * @Author: GXing
 * @Date: 2023-02-19 16:52:45
-->
## 一.`Node.js`如何开启进程,进程如何通讯？  

### 1.进程`process`和线程`thread`  

+ 进程，`OS`进行资源分配和调度的最小单位，有独立内存空间   
+ 线程，`OS`进行运算调度的最小单位，共享进程内存空间。   
+ `JS`是单线程的，但可以开启多进程执行，如`WebWorker`。  

其他语言如`java`提供了很多`API`去允许你去开启多线程的。而`JS`是没有的。   

## 为何需要多进程？
+ 我们的机器，我们的服务器，多核`CPU`更适合处理`多进程`。  
+ 内存较大，多个进程才能更好的利用(单个进程内存有上限制)。  
+ 总之，"压榨"机器资源，更快,更节省。  
  
单个进程的内存大概在上限`2G`左右。

### 单例模式  
用`js`实现单例模式，非常简单。 如何`Java、C++`可以开启多线程的语言就非常麻烦，单例模式必须考虑线程之间的冲突。因为多个线程同时去实现单例的话，就可能会出现连个单例，三个单例这种情况。  


> ps：默认情况下，进程和进程之间是不能够相互访问的，进程之间要相互隔离。进程之间要想相互访问，要通过合法通讯的手段。
  
> ps：一个进程可以包含多个线程。   

## node.js 开启多进程，进程如何通讯   
```javascript
child_process.fork //fork 叉的意思
```  
```javascript
cluster.fork //cluster 集群
```  
## 进程如何进行通讯？  
使用`send`和`on`通讯
<!-- 父进程 -->
```javascript
    // 开启子进程进行计算
    const computeProcess = fork('./compute.js');
    /* 发送信息给子进程 */
    computeProcess.send('开始计算');
    computeProcess.on('message', data => {
        console.info('主进程接收到的信息', data);
        res.end(data);
    })
```
<!-- 子进程 -->
```javascript
process.on('message', data => {
    console.log('子进程id',process.id);
    console.log('子进程接收到的信息',data);
    const sum = getSum();
    // 发送消息给主进程  
    process.send(sum);
});
```  
### 应用场景   
`cluster`集群一般应用于开启多个进程，多个服务的场景。  
`child_process.fork()`用于单个计算



