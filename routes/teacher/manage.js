var express = require('express');
var router = express.Router();

var managemodel = require('../../models/teacher/manage');

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
	})
});

module.exports = router;
