var express = require('express');
var app = express();
var config = require("./config/settings");

// post 请求
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// 模板配置
var handlebars  = require('express-handlebars');
app.engine('html', handlebars({
    partialsDir: 'views/common',
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.html'
}));

app.set('view engine', 'html');

// 静态资源配置
app.use(express.static('static'));

// 路由配置
var router = require("./router/index");
app.use(router);

// cookie session 配置
config.cookieParser(app);
config.session(app);

//启动日志服务
config.logger();

app.listen(9002,function(err){
    if (err) {
        logger.error(err);
    }
    logger.info("The server is started,listen port on 9002");
});
