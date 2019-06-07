var http = require('http');

var express = require('express');
var opn = require('opn');
var proxyMiddleware = require('http-proxy-middleware');

var hook = require('../mock/hook');

function start() {
    console.log('start server...');

    var app = express();

    // 请求代码与数据mock
    app.use(proxyMiddleware('/demo', {

        // 目标地址，比如 http://localhost/vapi => https://13.1.0.8/vapi
        target: 'http://localhost:9999',

        // 发送到目标服务器时添加自定义头部
        headers: {},

        // proxy 定制，转发到目标服务器前可以hook到本地json
        onProxyReq: function (proxyReq, req, res, options) {
            hook(proxyReq, req, res, options);
        },

        // 代理数据返回时触发，可以修改后台返回的数据，比如统一添加http头部等
        onProxyRes: function (proxyRes, req, res, options) {

            console.log('\n-------------------- Proxy Response start----------------------');
            console.log(res);
            console.log('\n-------------------- Proxy Response end----------------------');
        }
    }));

    // static 静态资源代码
    app.use(express.static('src'));

    var host = 'localhost';

    module.exports = app.listen(8888, host, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var uri = 'http://' + host + ':8888';
        console.log('Listening at ' + uri + '\n');
        opn(uri);
    });
}

//开启服务
start();