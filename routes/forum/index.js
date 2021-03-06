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
    forummodel.getForumCon(forumId, function(err, forumCon) {
      if (err) {
        return next(err);
      }
      forummodel.getForumReplyCon(forumId, function(err, forumReplyList) {
        if (err) {
          return next(err);
        }
        for (var i = 0; i < forumCon.length; i++) {
    			var d = forumCon[i].date;
    			forumCon[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    		}
        for (var i = 0; i < forumReplyList.length; i++) {
    			var d = forumReplyList[i].date;
    			forumReplyList[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    		}
        res.render('forum/details', {
          title: '帖子详情',
          forumCon: forumCon[0],
          forumReplyList: forumReplyList,
          isDetails: true
        });
      });
    });
  });
});

// 回复帖子
router.post('/addForumReply', function(req, res, next) {
  var forumId = req.body.forumId;
  var forumReplyContent = req.body.forumReplyContent;
  var userId = req.session.uid;
  var userType = req.session.usertype;
  forummodel.addForumReply(forumId, userId, userType, forumReplyContent, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '回复成功'
    });
  });
});

// 删除帖子
router.post('/deleteForum', function(req, res, next) {
  var forumId = req.body.forumId;
  forummodel.deleteForum(forumId, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    forummodel.deleteForumReply(forumId, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '删除成功'
      });
    });
  });
});

module.exports = router;
