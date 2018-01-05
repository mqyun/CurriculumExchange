var express = require('express');
var router = express.Router();

var usermodel = require('../../models/student/usermodel');
var indexmodel = require('../../models/indexmodel');

// 学生注册
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

// 学生登录
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

// 学生端首页
router.get('/', function(req, res, next) {
  var uid = req.session.uid;
  var usertype = req.session.usertype;
  indexmodel.getThisClass(uid, usertype, function(err, classData) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.getThisCurriculum(classData[0].classid, function(err, curriculumData) {
      if (err) {
        res.render('student/index', {
          title: '学生端',
          homestyle: '(学生端)',
          classData: classData,
          curriculumData: ''
        });
      }
      res.render('student/index', {
        title: '学生端',
        homestyle: '(学生端)',
        classData: classData,
        curriculumData: curriculumData
      });
    });
  });
});

module.exports = router;
