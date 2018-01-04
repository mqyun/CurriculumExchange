var db = require('./dboperation');

module.exports = {
	// 注册界面获取班级列表
	getAllClass: function(callback) {
    var sql = "select * from class";
		db.exec(sql, '', function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 获取当前用户所在班级
  getThisClass: function(uid, usertype, callback) {
		var sql;
		if (usertype == 0) {
			sql = "select class.id as classid, class.classname from class,student where student.id = ? and student.classid = class.id";
		} else {
			sql = "select class.id as classid, class.classname from class,teacher where teacher.id = ? and teacher.classid = class.id";
		}
		console.log(sql);
		db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		})
  },
}
