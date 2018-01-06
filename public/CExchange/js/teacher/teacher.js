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
  $('.add-curriculum-modal').show();
  showModal('添加课程', $('.add-curriculum-modal'), '确认', '取消', function() {
    var name = $("input[name='name']").val();
    var introduce = $("textarea[name='introduce']").val();
    var coursescon = $("textarea[name='coursescon']").val();
    var coursesmet = $("input[name='coursesmet']").val();
    var classid = $("select[name='classid']").val();
    var data = {
      'name': name,
      'introduce': introduce,
      'coursescon': coursescon,
      'coursesmet': coursesmet,
      'classid': classid
    }
    if (!validationCurriculumInput(name, introduce, coursescon, coursesmet)) {
      showTips('warning', '请检查课程信息!', '填写错误的地方已经被标注~');
      setTimeout(function() {
        $('.has-warning').removeClass('has-warning');
      }, 3000);
    } else {
      $('#public-modal').hide();
      $('.add-curriculum-modal').hide();
      ajaxPost('/teachermanage/addCurriculum', data, function(result) {
        if (result.success) {
          showTips('success', '恭喜你!', result.success);
          $(':input').val('');
          ajaxPost('/teachermanage/reGetCurriculum', {}, function(result) {
            if (result.success) {
              $('.curriculumUl').html('');
              for (var i = 0; i < result.curriculumList.length; i++) {
                var item = '<li data-curriculumid=' + result.curriculumList[i].id + ' class="class-content">\
                            <a href="javascript: void(0);">' + result.curriculumList[i].name + '</a></li>';
                $('.curriculumUl').append(item);
              }
            }
          });
        }
      });
    }
  }, function() {
    $('#public-modal').hide();
    $('.add-curriculum-modal').hide();
  });
});

// 查看课程详情
$(document).on('click', '.class-content', function() {
  var curriculumId = $(this).data('curriculumid');
  var data = {
    'curriculumId': curriculumId
  }
  $('.main-content').html('');
  getCurriculumCon(data);
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
function getCurriculumCon(data) {
  ajaxPost('/teachermanage/curriculumcon', data, function(result) {
    if (result.success) {
      $('.main-content').append(result.view);
    }
  });
}

// 验证添加课程时用户输入
function validationCurriculumInput(name, introduce, coursescon, coursesmet) {
  if (name.length == 0) {
    $("input[name='name']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (introduce.length == 0) {
    $("textarea[name='introduce']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (coursescon.length == 0) {
    $("textarea[name='coursescon']").parents('.form-group').addClass('has-warning');
    return false;
  }
  if (coursesmet.length == 0) {
    $("input[name='coursesmet']").parents('.form-group').addClass('has-warning');
    return false;
  }
  return true;
}
