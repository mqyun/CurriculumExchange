$(function() {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    });
});

// 教师学生登录切换
$(document).on('click', '.switch', function() {
  var btnConText = $(this).text();
  if (btnConText.indexOf('教师') != -1) {
    $('.misc-header').text('教师登录');
  } else {
    $('.misc-header').text('学生登录');
  }
  $(this).parents('.misc-box').hide().siblings().show();
});
