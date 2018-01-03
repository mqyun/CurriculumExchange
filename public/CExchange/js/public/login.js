var isFromTeacherReg = getFromUrl('isFromTeacherReg') || false;

$(function() {
  if (isFromTeacherReg) {
    $('.switch').click();
  }
});

// 教师学生登录切换
$(document).on('click', '.switch', function() {
  var btnConText = $(this).text();
  if (btnConText.indexOf('教师') != -1) {
    $('.misc-header').text('教师登录');
    $(this).text('切换至学生登录 >>>');
  } else {
    $('.misc-header').text('学生登录');
    $(this).text('切换至教师登录 >>>');
  }
});
