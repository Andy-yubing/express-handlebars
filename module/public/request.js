/**
 * @author : by Ghost
 * @date : 2017/7/12.
 * @description : 公用request模块.
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
var fs = require("fs");
exports.request = function (req, res, config, cb) {
    try {
        var apiPath = rootApi + config.api;
        logger.info(config.formData);
        request.post({
            "url": apiPath,
            "form": config.formData
        }, function (err, response, body) {
            if (err) {
                logger.error(err);
            }
            logger.info("接口名："+ apiPath);
            logger.info("接口返回："+body);
            if (body) {
                var DS = JSON.parse(body);
                if (req.xhr || typeof cb !== "function") {
                    logger.info("================================");
                    if (config.formData.callback) {
                        fs.unlink("static/uploads/" + config.formData.callback);
                    }
                    res.json(DS);
                } else {
                    if (DS && DS.resultCode === "1") {
                        if (cb && typeof cb === "function") {
                            cb(DS);
                        }
                    } else if(DS.resultCode === "-1") {
                        res.redirect(jumpUrl + "/login/enterpriseLogin");
                    } else {
                        logger.info(DS.resultMsg);
                        error.throwErr(DS.resultMsg, req, res);
                    }
                }
            } else {
                if (req.xhr) {
                    res.json({"resultCode": "0", "resultMsg": "接口返回数据为空:" + apiPath});
                } else {
                    error.throwErr("errorMsg:接口返回数据为空!" + apiPath, req, res);
                }
            }
        });
    } catch (e) {
        logger.info(e.message);
        error.throwErr(e.message, req, res);
    }
};