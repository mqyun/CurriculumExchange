var db = require('../dboperation');

module.exports = {
  // 发帖
  addForumItem: function(theme, content, userid, usertype, callback) {
    var sql = "insert into forum(theme, content, userid, usertype, date, viewingtimes) values(?,?,?,?,now(),0);";
    db.exec(sql, [theme, content, userid, usertype], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查询所有帖子
  getForumAll: function(page, callback) {
    // var sql = "select *,forum.id as forumid from forum join student on forum.userid=student.id where forum.usertype=0 union select *,forum.id as forumid from forum join teacher on forum.userid=teacher.id where forum.usertype=1;";
    var sql = "SELECT forum.*,\
              case forum.usertype\
              when 0 THEN student.name\
              when 1 THEN teacher.name\
              END as relname\
              FROM forum\
              LEFT JOIN student on student.id=forum.userid\
              LEFT JOIN teacher on teacher.id=forum.userid\
              order by id desc limit " + page + ", 5;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取页码
  getPage: function(type, uid, usertype, callback) {
    // type: 0所有帖子 1教师帖子 2学生帖子 3自己的帖子
    var sql;
    if (!uid || !usertype) {
      if (type == 0) {
        sql = "select ceil(count(id)/5) as page from forum;";
      } else if (type == 1) {
        sql = "select ceil(count(id)/5) as page from forum where usertype = 0;";
      } else if (type == 2) {
        sql = "select ceil(count(id)/5) as page from forum where usertype = 1;";
      } else if (type == 3) {
        sql = "select ceil(count(id)/5) as page from forum where usertype = 1;";
      }
    } else {
      sql = "select ceil(count(id)/5) as page from forum where userid = " + uid + " and usertype = " + usertype + ";";
    }
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取帖子详情更新浏览量
  addforumViewTimes: function(forumId, callback) {
    var sql = "update forum set viewingtimes=viewingtimes+1 where id = ?;";
    db.exec(sql, forumId, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取主题帖详情
  getForumCon: function(forumId, callback) {
    var sql = "SELECT * from (SELECT forum.*,\
              case forum.usertype\
              when 0 THEN student.name\
              when 1 THEN teacher.name\
              END as relname\
              FROM forum\
              LEFT JOIN student on student.id=forum.userid\
              LEFT JOIN teacher on teacher.id=forum.userid) as a where id = ?;";
    db.exec(sql, forumId, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取帖子回复内容
  getForumReplyCon: function(forumId, callback) {
    var sql = "SELECT * from (SELECT forumreply.*,\
              case forumreply.usertype\
              when 0 THEN student.name\
              when 1 THEN teacher.name\
              END as relname\
              FROM forumreply\
              LEFT JOIN student on student.id=forumreply.userid\
              LEFT JOIN teacher on teacher.id=forumreply.userid) as a where forumid = ?;";
    db.exec(sql, forumId, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 回复主题帖
  addForumReply: function(forumid, userid, usertype, content, callback) {
    var sql = "insert into forumreply(forumid, userid, usertype, content, date) values(?,?,?,?,now());";
    db.exec(sql, [forumid, userid, usertype, content], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 教师删除学生帖子
  deleteForum: function(forumId, callback) {
    var sql = "delete from forum where id = ?;";
    db.exec(sql, forumId, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 删除帖子的同时删除所有回复
  deleteForumReply: function(forumId, callback) {
    var sql = "delete from forumreply where forumid = ?;";
    db.exec(sql, forumId, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
