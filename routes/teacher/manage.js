var express = require('express');
var router = express.Router();

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
			res.render('teacher/_ClassManagement', {
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
		res.render('teacher/_CurriculumContent', {
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

module.exports = router;
