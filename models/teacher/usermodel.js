var db = require('../dboperation');

module.exports = {
  // 验证教师
  selectUser: function(username, callback) {
    var sql = "select * from teacher where username = ?";
		db.exec(sql, username, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 教师注册
  studentReg: function(username, password, name, classid, callback) {
    var sql = "insert into teacher(username, password, name, classid, usertype) values(?,?,?,?,1)";
    db.exec(sql, [username, password, name, classid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取当前用户所有课程
	getThisCurriculum: function(teacherid, callback) {
    var sql = "select id, name from curriculum where teacherid = ?";
    db.exec(sql, teacherid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
	},
}
