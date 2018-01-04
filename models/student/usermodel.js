var db = require('../dboperation');

module.exports = {
  // 验证学生
  selectUser: function(username, callback) {
    var sql = "select * from student where username = ?";
		db.exec(sql, username, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 学生注册
  studentReg: function(username, password, name, classid, callback) {
    var sql = "insert into student(username, password, name, classid, usertype) values(?,?,?,?,0)";
    db.exec(sql, [username, password, name, classid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取当前用户所有课程
	getThisCurriculum: function(classid, usertype, callback) {
    var sql = "select id, name from curriculum where classid = ?";
    db.exec(sql, classid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
	}
}
