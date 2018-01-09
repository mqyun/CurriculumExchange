$(function() {
  $("input[name='introduce']").parents('.form-group').hide();
  localStorage.clear();
});

// 教师学生注册切换
$(document).on('click', '.switch', function() {
  var btnConText = $(this).text();
  if (btnConText.indexOf('教师') != -1) {
    $('.misc-header').text('教师注册');
    $(this).text('切换至学生注册 >>>');
    $("input[name='introduce']").parents('.form-group').show();
  } else {
    $('.misc-header').text('学生注册');
    $(this).text('切换至教师注册 >>>');
    $("input[name='introduce']").parents('.form-group').hide();
  }
});

// 绑定enter
$(document).keydown(function(event) {
  if (event.keyCode == 13) {
    $('.btn-reg').click();
  }
});

// 注册
$(document).on('click', '.btn-reg', function() {
  var username = $("input[name='username']").val();
  var password = $("input[name='password']").val();
  var name = $("input[name='name']").val();
  var classid = $("select[name='classid']").val();
  var introduce = $("input[name='introduce']").val();
  var data;
  if (!validationInput(username, password, name)) {
    showTips('warning', '请检查注册信息!', '填写错误的地方已经被标注~');
    setTimeout(function() {
      $('.has-warning').removeClass('has-warning');
    }, 3000);
  } else {
    var url;
    if ($('.misc-header').text().indexOf('学生') != -1) {
      url = '/student/reg';
      data = {
        'username': username,
        'password': password,
        'classid': classid,
        'name': name
      };
    } else {
      url = '/teacher/reg';
      data = {
        'username': username,
        'password': password,
        'classid': classid,
        'name': name,
        'introduce': introduce
      };
    }
    ajaxPost(url, data, function(result) {
      if (result.success) {
        showTips('success', '恭喜你!', result.success + ',两秒钟之后返回登录界面');
        $('input').val('');
        setTimeout(function() {
          if (url == '/teacher/reg') {
            location = '/?isFromTeacherReg=true';
          } else {
            location = '/';
          }
        }, 2000);
      }
    });
  }
});

// 验证用户输入
function validationInput(username, password, name) {
  if (username.length == 0) {
    $("input[name='username']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (password.length == 0) {
    $("input[name='password']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if ($("input[name='confirmpassword']").val() != password) {
    $("input[name='confirmpassword']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (name.length == 0) {
    $("input[name='name']").parents('.form-group').addClass('has-warning');
    return false;
  }
  return true;
}
