var express = require('express');
var router = express.Router();

var usermodel = require('../../models/teacher/usermodel');

// 教师注册
router.post('/reg', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var classid = req.body.classid;
  usermodel.selectUser(username, function(err, rows) {
    if (err) {
      res.json({
        'error': error
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名已经存在'
      });
      return next(err);
    }
    usermodel.studentReg(username, password, name, classid, function(err) {
      if (err) {
        res.json({
          'error': error
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 教师登录
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  usermodel.selectUser(username, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.usertype = rows[0].usertype;
		req.session.name = rows[0].name;
		req.session.uid = rows[0].id;
    res.json({
      'success': '登录成功'
    });
  });
});

// 教师端首页
router.get('/home', function(req, res, next) {
  res.render('teacher/home', {
    title: '教师端首页',
    homestyle: '(教师端)'
  });
});

module.exports = router;
