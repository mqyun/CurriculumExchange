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

// 绑定enter
$(document).keydown(function(event) {
  if (event.keyCode == 13) {
    $('.btn-login').click();
  }
});

// 登录
$(document).on('click', '.btn-login', function() {
  var username = $("input[name='username']").val();
  var password = $("input[name='password']").val();
  if (!validationInput(username, password)) {
    showTips('warning', '请检查登录信息!', '填写有误的地方已经被标注~');
    setTimeout(function() {
      $('.has-warning').removeClass('has-warning');
    }, 3000);
  } else {
    var url;
    if ($('.misc-header').text().indexOf('学生') != -1) {
      url = '/student/login';
    } else {
      url = '/teacher/login';
    }
    var data = {
      'username': username,
      'password': password
    };
    ajaxPost(url, data, function(result) {
      if (result.success) {
        showTips('success', '恭喜你!', result.success + ',即将跳转至首页~');
        setTimeout(function() {
          if (url == '/student/login') {
            location = '/student/';
          } else {
            location = '/teacher/';
          }
        }, 1500);
      }
    });
  }
});

// 验证用户输入
function validationInput(username, password) {
  if (username.length == 0) {
    $("input[name='username']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (password.length == 0) {
    $("input[name='password']").parents('.form-group').addClass('has-warning');
    return false;
  }
  return true;
}
