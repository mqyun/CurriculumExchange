var db = require('../dboperation');

module.exports = {
  // 验证注册学生是否存在
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
}
