$(function() {
  $('.summernote-content').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link']]
    ],
  });
  var sHTML = $('.summernote-content').code();
});

// 显示隐藏发帖form
$(document).on('click', '.nav-forumadd', function() {
  $('.forum-addPanel').slideToggle();
});
// 隐藏发帖form
$(document).on('click', '.forum-addPanel .btn-canceladd', function() {
  $('.forum-addPanel').slideUp();
});

// 发帖
$(document).on('click', '.btn-forumadd', function() {
  var forumTheme = $("input[name='theme']").val();
  var forumContent = $('.summernote-content').code().replace(/\"/g,"'");
  var data = {
    'forumTheme': forumTheme,
    'forumContent': forumContent
  }
  if (forumTheme.length == 0) {
    showTips('warning', 'Warning!', '请填写帖子主题');
    $("input[name='theme']").parents('.form-group').addClass('has-warning');
    setTimeout(function() {
      $('.has-warning').removeClass('has-warning');
    }, 2400);
  } else {
    console.log(data);
    ajaxPost('/forum/addForumItem', data, function(result) {
      if (result.success) {
        showTips('success', '恭喜你!', result.success);
        setTimeout(function() {
          location.href = '/forum';
        }, 1000);
      }
    });
  }
});
