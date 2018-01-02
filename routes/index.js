var express = require('express');
var router = express.Router();

/* 首页，登录页面 */
router.get('/', function(req, res, next) {
  res.render('public/login', { title: '用户登录' });
});

module.exports = router;
