$(function() {
  $('.student-myclass').click();
});

// 学生端我的班级
$(document).on('click', '.student-myclass', function() {
  $('.main-content').html('');
  var classId = $(this).data('classid');
  var className = $(this).text();
  var data = {
    'classid': classId
  }
  getManageClass(data, className);
});

// 学生端我的课程
$(document).on('click', '.student-mycurriculum', function() {
  var curriculumId = $(this).data('curriculumid');
	var data = {
		'curriculumId': curriculumId
	}
	$('.main-content').html('');
	getCurriculumCon(data);
});

// 学生端课程资源
$(document).on('click', '.student-resources', function() {
  var curriculumId = $(this).data('curriculumid');
  var curriculumName = $(this).text();
  var data = {
    'curriculumId': curriculumId,
    'curriculumName': curriculumName
  }
  $('.main-content').html('');
  getResourcesCon(data);
});
