/**
 * @Descripttion: node cluster(集群的方式开启多线程)
 * @Author: GXing
 * @return {*}
 */
const http = require('http');
/* 根据CPU核数开启多进程 */
const cpuCoreLength = require('os').cpus().length;
const cluster = require('cluster');

// 如果是集群的主进程 fork 叉的意思
if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork(); //开启子进程
    }
    cluster.on('exit', worker => {
        console.log('子进程退出');
        cluster.fork(); //进程守护
    })
}else{
    // 多个子进程会共享一个TCP连接，提供一份网络服务
    const server = http.createServer((req,res)=>{
        res.writeHead(200)
        res.end('done')
    })
    server.listen(3000)
}

//工作中根据CPU核数开启多进程，或者是进程守护，一般会用`PM2`这个工具来写。   
