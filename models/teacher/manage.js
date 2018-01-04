var db = require('../dboperation');

module.exports = {
	// 根据班级获取教学队伍以及各老师教授课程
	getTeam: function(classid, callback) {
		var sql = "select teacher.name as teacherName, curriculum.name as curriculumName, curriculum.introduce from teacher, class, curriculum where class.id = ? and teacher.classid = class.id and curriculum.teacherid = teacher.id";
		db.exec(sql, classid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
}
