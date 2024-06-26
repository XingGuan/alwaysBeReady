/*
 * @Descripttion: 子进程，计算
 * @Author: GXing
 * @Date: 2023-02-19 19:21:58
 */
function getSum() {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
    return sum;
}
// 接收主进程发过来的消息
process.on('message', data => {
    console.log('子进程id', process.pid);
    console.log('子进程接收到的信息', data);
    const sum = getSum();
    // 发送消息给主进程  
    process.send(sum);
});