/*
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-19 20:35:31
 */
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