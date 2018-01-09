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

// 学生端我的作业
$(document).on('click', '.student-myassignment', function() {
  var curriculumId = $(this).data('curriculumid');
  var classId = $('.student-myclass').eq(0).data('classid');
  var curriculumName = $(this).text();
  var data = {
    'curriculumId': curriculumId,
    'classId': classId,
    'curriculumName': curriculumName
  }
  $('.main-content').html('');
  ajaxPost('/student/myassignment', data, function(result) {
    if (result.success) {
      $('.main-content').append(result.view);
    }
  });
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
