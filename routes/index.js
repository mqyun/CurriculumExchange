var express = require('express');
var router = express.Router();

var indexmodel = require('../models/indexmodel');

/* 首页，登录页面 */
router.get('/', function(req, res, next) {
  res.render('public/login', {
    title: '用户登录'
  });
});

// 注册页面
router.get('/reg', function(req, res, next) {
  indexmodel.getAllClass(function(err, rows) {
    if (err) {
      res.render('public/reg', {
        title: '用户注册',
        classList: ''
      });
    }
    res.render('public/reg', {
      title: '用户注册',
      classList: rows
    });
  });
})

// 退出登录
router.get('/logout', function(req, res) {
    req.session.usertype = null;
    req.session.name = null;
    req.session.uid = null;
    res.redirect('/');
});
module.exports = router;
