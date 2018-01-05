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

module.exports = router;
