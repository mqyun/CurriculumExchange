var db = require('../dboperation');

module.exports = {
  // 发帖
  addForumItem: function(theme, content, userid, usertype, callback) {
    var sql = "insert into forum(theme, content, userid, usertype, date) values(?,?,?,?,now());";
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
    var sql = "SELECT *,\
              case forum.usertype\
              when 0 THEN student.name\
              when 1 THEN teacher.name\
              END as relname, forum.id as forumid, forum.usertype as forumtype\
              FROM forum\
              LEFT JOIN student on student.id=forum.userid\
              LEFT JOIN teacher on teacher.id=forum.userid\
              order by forum.id desc limit " + page + ", 2;";
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
        sql = "select count(id) from forum;";
      } else if (type == 1) {
        sql = "select count(id) from forum where usertype = 0;";
      } else if (type == 2) {
        sql = "select count(id) from forum where usertype = 1;";
      } else if (type == 3) {
        sql = "select count(id) from forum where usertype = 1;";
      }
    } else {
      sql = "select count(id) from forum where userid = " + uid + " and usertype = " + usertype + ";";
    }
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
}
