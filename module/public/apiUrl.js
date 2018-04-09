module.exports = function (req,res,next) {
    console.log(req.headers.host);
    // 默认生产
    var api = "https://xxx" + req.url;
    switch (req.headers.host){
        case "prd":
            api = "https://xxxxxxx/moyao" + req.url;
            break;
        case "dev":
            api = "http://www.feiyu.com/fdaf" + req.url;
            break;
        case "ci":
            api = "https://xxxxxxx/moyao" + req.url;
            break;
            // 本地启动node
        case "127.0.0.1:9002":
            api = "http://127.0.0.1:9003" + req.url;
            break;
    }
    // 接口地址
    global.apiUrl = api;
    logger.info("用户访问的接口名称：" + api);
    next();
};