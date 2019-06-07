var path = require('path');
var fs = require('fs');

function mapPath(req) {
    var realPath = path.join(__dirname, req.path + '.js');
    if (fs.existsSync(realPath)) {
        return realPath;
    } else {
        return '';
    }
}

module.exports = function (proxyReq, req, res) {
    var data = new Buffer(0);

    req.on('data', function (chunk) {

        // 请求参数
        data = Buffer.concat([data, chunk]);
    });

    req.on('end', function () {

        // 取到mock文件路径
        var realPath = mapPath(req);
        if (!realPath) {
            return;
        }

        // 删掉缓存
        require.cache[require.resolve(realPath)] = null;
        var mockModule = require(realPath);
        var mockData = mockModule.mockData();

        if (!!mockModule.check()) {

            // 不响应代码请求
            proxyReq.abort();
            proxyReq.destroy();

            res.set('Content-Type', 'text/html');

            // 直接返回mock数据
            if (typeof mockData === 'string' && mockData instanceof Buffer) {
                res.end(mockData);
            } else {
                res.end(JSON.stringify(mockData));
            }
        }
    });
};