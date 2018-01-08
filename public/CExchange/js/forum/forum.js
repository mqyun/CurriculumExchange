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
  $('.nav-forumhome').click();
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

// 获取论坛帖子
$(document).on('click', '.nav-forumhome', function() {
  var data = {
    'page': 1
  };
  $('.forumitem-con').html('');
  getForumHome(data);
});

// 获取其他页下面的帖子
$(document).on('click', '.forum-page', function() {
  $('.forum-page').removeClass('active');
  $(this).addClass('active');
  var page = $(this).data('pagenum');
  var data = {
    'page': page
  }
  $('.forumitem-con').html('');
  getForumHome(data);
});

// 查看帖子详情
// $(document).on('click', '.btn-forumitemCon', function() {
//   var forumId = $(this).parents('.panel-forumitem').data('forumid');
//   var data = {
//     'forumId': forumId
//   }
//   $('.forumitem-con').html('');
//   ajaxPost('/forum/getForumCon', data, function(result) {
//     if (result.success) {
//       $('.forumitem-con').append(result.view);
//     }
//   });
// });

// 获取论坛首页帖子方法
function getForumHome(data) {
  ajaxPost('/forum/getAllForum', data, function(result) {
    if (result.success) {
      $('.forumitem-con').append(result.view);
    }
  });
}
