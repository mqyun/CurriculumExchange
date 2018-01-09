var db = require('../dboperation');

module.exports = {
	// 根据班级获取教学队伍以及各老师教授课程
	getTeam: function(classid, callback) {
		var sql = "select * from teacher where classid = ?;";
		db.exec(sql, classid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
  // 获取班级学生列表
	getAllStudent: function(classid, callback) {
		var sql = "select * from student where classid = ?;";
		db.exec(sql, classid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 获取课程内容以及所属班级
	getCurriculumCon: function(curriculumid, callback) {
		var sql = "select *, class.id as reaclassid, curriculum.id as curriculumid from curriculum, class where curriculum.id = ? and curriculum.classid = class.id;";
		db.exec(sql, curriculumid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 添加课程
	addCurriculum: function(name, introduce, coursescon, coursesmet, teacherid, classid, callback) {
		var sql = "insert into curriculum(name, introduce, coursescon, coursesmet, teacherid, classid) values(?,?,?,?,?,?);";
		db.exec(sql, [name, introduce, coursescon, coursesmet, teacherid, classid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		})
	},
	// 布置作业
	addAssignment: function(content, userid, classid, assignmentCurriculumid, callback) {
		var sql = "insert into assignment(content, userid, classid, assignmentCurriculumid, date) values(?,?,?,?,now());";
		db.exec(sql, [content, userid, classid, assignmentCurriculumid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	},
	// 查看往期作业
	getAllAssignment: function(userid, curriculumId, callback) {
		var sql = "select * from assignment where userid = ? and assignmentCurriculumid = ? order by date desc;";
		db.exec(sql, [userid, curriculumId], function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 发布公告
	addNotice: function(content, userid, classid, callback) {
		var sql = "insert into notice(content, userid, classid, date) values(?,?,?,now());";
		db.exec(sql, [content, userid, classid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	},
	// 查看往期公告
	getAllNotice: function(userid, callback) {
		var sql = "select * from notice where userid = ? order by date desc;";
		db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 添加课程资源
	addResources: function(name, curriculumid, callback) {
		var sql = "insert into curriculumresources(name, curriculumid) values(?,?);";
		db.exec(sql, [name, curriculumid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	},
	// 查询该课程下所有课程资源
	getAllResources: function(curriculumid, callback) {
		var sql = "select * from curriculumresources where curriculumid = ?;";
		db.exec(sql, curriculumid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
	},
	// 上传课程资源
	uploadResources: function(url, resid, callback) {
		var sql = "update curriculumresources set url = ? where id = ?;";
		db.exec(sql, [url, resid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	},
	// 删除课程资源
	deleteResources: function(resid, callback) {
		var sql = "delete from curriculumresources where id = ?;";
		db.exec(sql, resid, function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
	}
}
