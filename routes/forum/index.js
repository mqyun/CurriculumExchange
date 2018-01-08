var express = require('express');
var router = express.Router();

var forummodel = require('../../models/forum/indexmodel');

// 论坛首页
router.get('/', function(req, res, next) {
  forummodel.getPage(0, false, false, function(err, rows) {
    if (err) {
      res.render('forum/index', {
        title: '交流论坛',
        page: rows
      });
    }
    res.render('forum/index', {
      title: '交流论坛',
      page: rows[0]
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

// 获取论坛首页所有帖子
router.post('/getAllForum', function(req, res, next) {
  var page = (req.body.page - 1) * 5 || 0;
  forummodel.getForumAll(page, function(err, forumList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    for (var i = 0; i < forumList.length; i++) {
			var d = forumList[i].date;
			forumList[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		}
    res.render('forum/_ForumContent', {
      forumList: forumList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 获取帖子详情
router.get('/details/:forumid', function(req, res, next) {
  var forumId = req.params.forumid;
  forummodel.addforumViewTimes(forumId, function(err) {
    if (err) {
      return next(err);
    }
    forummodel.getForumCon(forumId, function(err, rows) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < rows.length; i++) {
  			var d = rows[i].date;
  			rows[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  		}
      res.render('forum/details', {
        title: '帖子详情',
        forumCon: rows[0],
        isDetails: true
      });
    });
  });
});


module.exports = router;
