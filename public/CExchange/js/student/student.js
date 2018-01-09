$(function() {

});

// 学生端我的班级
$(document).on('click', '.student-myclass', function() {
  var classid = $('.student-myclass').index(this);
	setBtn2('.student-myclass', classid);
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
  var classid = $('.student-mycurriculum').index(this);
	setBtn2('.student-mycurriculum', classid);
  var curriculumId = $(this).data('curriculumid');
	var data = {
		'curriculumId': curriculumId
	}
	$('.main-content').html('');
	getCurriculumCon(data);
});

// 学生端我的作业
$(document).on('click', '.student-myassignment', function() {
  var classid = $('.student-myassignment').index(this);
	setBtn2('.student-myassignment', classid);
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
  var classid = $('.student-resources').index(this);
	setBtn2('.student-resources', classid);
  var curriculumId = $(this).data('curriculumid');
  var curriculumName = $(this).text();
  var data = {
    'curriculumId': curriculumId,
    'curriculumName': curriculumName
  }
  $('.main-content').html('');
  getResourcesCon(data);
});

// 查看已发布公告
$(document).on('click', '.student-notice-content', function() {
	var classid = $('.student-notice-content').index(this);
	setBtn2('.student-notice-content', classid);
	$('.main-content').html('');
  var classId = $('.student-myclass').data('classid');
  var data = {
    'classId': classId
  }
	getNoticeCon(data);
});
