// 是否开启mock
exports.check = function () {
    return true;
};

exports.mockData = function () {
    return {
        data: "这是mock数据",
        success: true
    };
};