$(function() {
	$('.navbar').hide();
	$('.forumitem-con').html('');
	$('.summernote-reply').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link']]
    ],
  });
});

$(document).on('click', '.btn-showreply', function() {
	$('.panel-reply').slideToggle();
});

$(document).on('click', '.btn-cancelreply', function() {
	$('.panel-reply').slideUp();
});

// 回复
$(document).on('click', '.btn-addreply', function() {
	var forumId = $(this).data('forumid');
	var forumReplyContent = $('.summernote-reply').code().replace(/\"/g,"'");
	var data = {
		'forumId': forumId,
		'forumReplyContent': forumReplyContent
	}
	ajaxPost('/forum/addForumReply', data, function(result) {
		if (result.success) {
			showTips('success', '恭喜你!', result.success);
			setTimeout(function() {
				location.reload();
			}, 1000);
		}
	});
});
