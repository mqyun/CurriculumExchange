var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

var usermodel = require('../../models/teacher/usermodel');
var managemodel = require('../../models/teacher/managemodel');

// 教师端请求班级管理
router.post('/class', function(req, res, next) {
	var classid = req.body.classid;
	managemodel.getTeam(classid, function(err, teamData) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		managemodel.getAllStudent(classid, function(err, studentData) {
			if (err) {
				res.json({
					'error': err
				});
				return next(err);
			}
			res.render('teacherAndpub/_ClassManagement', {
				pageHeaderTit: '班级管理',
				teamData: teamData,
				studentData: studentData
			}, function(err, html) {
				res.json({
					'success': true,
					'view': html
				});
			});
		});
	});
});

// 获取课程内容
router.post('/curriculumcon', function(req, res, next) {
	var curriculumId = req.body.curriculumId;
	managemodel.getCurriculumCon(curriculumId, function(err, curriculumCon) {
		res.render('teacherAndpub/_CurriculumContent', {
			pageHeaderTit: '课程详情',
			curriculumCon: curriculumCon[0]
		}, function(err, html) {
			res.json({
				'success': true,
				'view': html
			})
		});
	});
});

// 添加课程
router.post('/addCurriculum', function(req, res, next) {
	var name = req.body.name;
	var introduce = req.body.introduce;
	var coursescon = req.body.coursescon;
	var coursesmet = req.body.coursesmet;
	var teacherid = req.session.uid;
	var classid = req.body.classid;
	managemodel.addCurriculum(name, introduce, coursescon, coursesmet, teacherid, classid, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '添加课程成功'
		});
	});
});

// 添加课程之后重新获取当前用户课程列表
router.post('/reGetCurriculum', function(req, res, next) {
	var teacherid = req.session.uid;
	usermodel.getThisCurriculum(teacherid, function(err, rows) {
		if (err) {
			res.json({
				'error': err
			});
		}
		res.json({
			'success': true,
			'curriculumList': rows
		});
	});
});

// 布置作业
router.post('/addAssignment', function(req, res, next) {
	var content = req.body.assignmentContent;
	var userid = req.session.uid;
	var classid = req.body.assignmentClass;
	managemodel.addAssignment(content, userid, classid, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '布置作业成功'
		});
	});
});

// 查看已布置作业
router.post('/assignmentcon', function(req, res, next) {
	var userid = req.session.uid;
	managemodel.getAllAssignment(userid, function(err, rows) {
		if (err) {
			res.json({
				'error': err
			});
		}
		for (var i = 0; i < rows.length; i++) {
			var d = rows[i].date;
			rows[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		}
		res.render('teacherAndpub/_ClassAssignment', {
			pageHeaderTit: '已布置作业',
			data: rows
		}, function(err, html) {
			res.json({
				'success': true,
				'view': html
			})
		});
	});
});

// 发布公告
router.post('/addNotice', function(req, res, next) {
	var content = req.body.assignmentContent;
	var userid = req.session.uid;
	var classid = req.body.assignmentClass;
	managemodel.addNotice(content, userid, classid, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '发布公告成功'
		});
	});
});

// 查看已发布公告
router.post('/noticecon', function(req, res, next) {
	var userid = req.session.uid;
	managemodel.getAllNotice(userid, function(err, rows) {
		if (err) {
			res.json({
				'error': err
			});
		}
		for (var i = 0; i < rows.length; i++) {
			var d = rows[i].date;
			rows[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		}
		res.render('teacherAndpub/_ClassAssignment', {
			pageHeaderTit: '已发布公告',
			data: rows
		}, function(err, html) {
			res.json({
				'success': true,
				'view': html
			})
		});
	});
});

// 管理课程资源
router.post('/resourcescon', function(req, res, next) {
	var curriculumId = req.body.curriculumId;
	var curriculumName = req.body.curriculumName;
	managemodel.getAllResources(curriculumId, function(err, rows) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.render('teacherAndpub/_CurriculumResources', {
			pageHeaderTit: '课程资源',
			curriculumId: curriculumId,
			curriculumName: curriculumName,
			resourcesList: rows
		}, function(err, html) {
			res.json({
				'success': true,
				'view': html
			})
		});
	});
});

// 添加课程资源
router.post('/addResourcesItem', function(req, res, next) {
	var resourcesName = req.body.resourcesName;
	var resCurriculumId = req.body.resCurriculumId;
	managemodel.addResources(resourcesName, resCurriculumId, function(err) {
		if (err) {
			res.json({
				'error': err
			});
		}
		res.json({
			'success': '添加课程资源成功'
		});
	});
});

// 上传课程资源
router.post('/uploadResources/:curriculumid/:resourcesid', function(req, res, next) {
	var curriculumid = req.params.curriculumid;
	var resourcesId = req.params.resourcesid;
	var uid = req.session.uid;
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({
		uploadDir: './public/upload/resources'
	});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.inputFile[0];
			var uploadedPath = inputFile.path;
			var fileName = inputFile.originalFilename;
			var dstPath = './public/upload/resources/' + uid + '-' + resourcesId + '-' + fileName;
			var resourcesUrl = '/upload/resources/' + uid + '-' + resourcesId + '-' + fileName;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					console.log('rename ok');
				}
			});
			managemodel.uploadResources(resourcesUrl, resourcesId, function(err) {
				if (err) {
					return next(err);
				}
			});
		}
		res.redirect('/teacher/?isFromUpLoad=true&curriculumid=' + curriculumid);
	});
});

module.exports = router;
