var express = require('express');
var router = express.Router();
var xhrHttp = require("../module/public/xhrHttp");
var apiUrl = require("../module/public/apiUrl");

router.get("/",function (req,res) {
    res.render("home/index",{
        "layout": "layout/layout"
    });
});

// 定制请求 或 post render页面
// router.post("/test",);

// 所有ajax请求
router.post("*",apiUrl,xhrHttp);

module.exports = router;
