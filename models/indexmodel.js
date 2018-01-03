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
}
