var express = require('express');
var router = express.Router();

var forummodel = require('../../models/forum/indexmodel');

// 论坛首页
router.get('/', function(req, res, next) {
  // type: 0所有帖子 1教师帖子 2学生帖子 3自己的帖子
  var type = req.body.type || 0;
  var page = (req.body.page - 1) * 2 || 0;
  forummodel.getPage(type, false, false, function(err, page) {
    if (err) {
      return next(err);
    }
    forummodel.getForumAll(page, function(err, forumList) {
      if (err) {
        res.render('forum/index', {
          title: '交流论坛',
          forumList: '',
          page: ''
        });
      }
      console.log('11111111111111111111111111111111111111111111' + page);
      res.render('forum/index', {
        title: '交流论坛',
        forumList: forumList,
        page: page
      });
    });
  });
});

// 发帖
router.post('/addForumItem', function(req, res, next) {
  var theme = req.body.forumTheme;
  var content = req.body.forumContent;
  var userid = req.session.uid;
  var usertype = req.session.usertype;
  forummodel.addForumItem(theme, content, userid, usertype, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '发帖成功!'
    });
  });
});

module.exports = router;
