$(function() {
  $('.manage-class').click();
	alertModel();
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

// 请求班级管理
function getManageClass(data, className) {
  ajaxPost('/teachermanage/class', data, function(result) {
    if (result.success) {
      $('.main-content').append(result.view);
      $('.pageHeaderClassName').text(' ' + className);
    }
  });
}
