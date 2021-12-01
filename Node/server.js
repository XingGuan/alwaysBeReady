// node server启动服务
// 访问http://localhost:8888/index.html进行测试
console.log('hello!');
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    console.log('req', req.url);
    var urlObj = url.parse(req.url, true);
    if (urlObj.pathname == "/index.html") {
        var rs = fs.createReadStream("./index.html");
        var index = null;
        rs.on('data', function (chunk) {
            index += chunk
        })

        rs.pipe(res)
    } else if (urlObj.pathname == "/login") {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk
        });
        req.on('end', function () {
            var queryObj = new URLSearchParams(data)
            console.log('----------',queryObj);
        })
    }
});
server.listen(8888, function () {
    console.log('start server');
});