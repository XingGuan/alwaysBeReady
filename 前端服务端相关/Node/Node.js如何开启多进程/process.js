// node环境查看当前进程ID
// console.log(process.pid);
// 进程执行完会被杀死，因为它没有被调起，常驻在内存中。   
/* 常驻内存中的方法 */
/* 用APP的方法 */
// const http = require('http');
// const server = http.createServer();
// server.listen(3000, () => {
//     console.info('localhost:3000');
// })  
// console.info(process.pid);  
//`node.js` 没有跟`thread`相关的`API`,没有办法开启多个线程  

// WebWorker 浏览器开启进程  
// fork(岔路) cluster(集群的意思) node开启多进程的方法  

/* process-fork */
const http = require('http');
const fork = require('child_process').fork;
const server = http.createServer((req, res) => {
    if (req.url == '/get-sum') {
        console.info('主进程 id', process.pid);
        /* 大量计算 */
        // 开启子进程进行计算
        const computeProcess = fork('./compute.js');
        /* 发送信息给子进程 */
        computeProcess.send('开始计算');
        computeProcess.on('message', data => {
            console.info('主进程接收到的信息', data);
            res.end('sum is ' + data);
        })
        computeProcess.on('close', () => {
            console.info("子进程因报错而退出");
            computeProcess.kill();
            res.end('error');
        })

    }
});
server.listen(3000, () => {
    console.info('localhost：3000');
})