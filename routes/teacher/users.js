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

module.exports = router;
