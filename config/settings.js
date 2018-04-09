/**
 * @author : by yubing
 * @date : 2017/5/19.
 * @description : 项目所有的公用配置
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
var session = require("express-session"),
    loggers = require("logger"),
    cookieParser = require("cookie-parser"),
    today = require("../module/public/date");

//加密cookie
exports.cookieParser = function (app) {
    app.use(cookieParser("singedMangMaoCookie"));
};

//设置session
exports.session = function (app) {
    //使用express-session中间件
    app.use(session({
        "secret": "keyboard cat",
        "resave": false,
        "saveUninitialized": true,
        "cookie": {"maxAge": 30 * 60 * 1000}
    }));

    //只要用户操作，session自动续期
    app.use(function (req, res, next) {
        req.session._garbage = Date();
        req.session.touch();
        next();
    });
};

//配置日志
exports.logger = function () {
    // 创建日志
    global.logger = loggers.createLogger("static/logs/log_" + today.format(Date.now(), "yyyy-MM-dd") + ".log");
    loggers.format = function (level, date, message) {
        return "[" + level + "]" + ":" + today.format(Date.now(), "yyyy-MM-dd HH:mm:ss") + message;
    };
};
