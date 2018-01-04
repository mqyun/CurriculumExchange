$(function(){

});

$(document).on('click', '.manage-class', function() {
	$('.main-content').html('');
	var classId = $(this).data('classid');
	var data = {
		'classid': classId
	}
	ajaxPost('/teachermanage/class', data, function(result) {
    if (result.success) {
			$('.main-content').append(result.view);
    }
  });
});
