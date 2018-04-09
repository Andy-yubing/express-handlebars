var request = require("request");
module.exports = function (req,res) {
    logger.info("给java传递的数据：" + JSON.stringify(req.body));
    request.post({
        url: global.apiUrl,
        form: req.body,
    },function(err,response,body){
        if(req.xhr){
            if(err){
                logger.error("err=========：" + err);
            }else if(response.statusCode == 404){
                logger.info("接口访问失败~状态404~:" + global.apiUrl);
                res.json({"resultCode": 0, "resultMsg":"请求失败，请稍后再试"});
            }
            logger.info("返回的数据：" + JSON.stringify(body));
            res.json(JSON.parse(body));
        }else{

        }
    });
};