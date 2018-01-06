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
  // 获取班级学生列表
	getAllStudent: function(classid, callback) {
		var sql = "select * from student where classid = ?";
		db.exec(sql, classid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 获取课程内容以及所属班级
	getCurriculumCon: function(curriculumid, callback) {
		var sql = "select *, class.id as reaclassid, curriculum.id as curriculumid from curriculum, class where curriculum.id = ? and curriculum.classid = class.id";
		db.exec(sql, curriculumid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 添加课程
	addCurriculum: function(name, introduce, coursescon, coursesmet, teacherid, classid, callback) {
		var sql = "insert into curriculum(name, introduce, coursescon, coursesmet, teacherid, classid) values(?,?,?,?,?,?)";
		db.exec(sql, [name, introduce, coursescon, coursesmet, teacherid, classid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		})
	},
	// 布置作业
	addAssignment: function(content, userid, classid, callback) {
		var sql = "insert into assignment(content, userid, classid) values(?,?,?)";
		db.exec(sql, [content, userid, classid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	},
	// 查看往期作业
	getAllAssignment: function(userid, callback) {
		var sql = "select * from assignment where userid = ?";
		db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
}
