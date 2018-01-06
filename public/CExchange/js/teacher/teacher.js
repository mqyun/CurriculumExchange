$(function() {
  $('.manage-class').click();
});

// 班级管理
$(document).on('click', '.manage-class', function() {
  $('.main-content').html('');
  var classId = $(this).data('classid');
  var className = $(this).text();
  var data = {
    'classid': classId
  }
  getManageClass(data, className);
});

// 添加课程
$(document).on('click', '.add-curriculum', function() {
  alertModel();
});

// 查看课程详情
$(document).on('click', '.class-content', function() {
  var curriculumId = $(this).data('curriculumid');
  var curriculumName = $(this).text();
  var data = {
    'curriculumId': curriculumId
  }
  $('.main-content').html('');
  getCurriculumCon(data, curriculumName);
});

// 请求班级管理
function getManageClass(data, className) {
  ajaxPost('/teachermanage/class', data, function(result) {
    if (result.success) {
      $('.main-content').append(result.view);
      $('.pageHeaderClassName').text(' ' + className);
    }
  });
}

// 请求课程详情
function getCurriculumCon(data, curriculumName) {
  ajaxPost('/teachermanage/curriculumcon', data, function(result) {
    if (result.success) {
      $('.main-content').append(result.view);
      $('.panel-heading').text(' ' + curriculumName);
    }
  });
}
