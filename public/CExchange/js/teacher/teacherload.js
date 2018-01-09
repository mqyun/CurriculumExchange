var isFromUpLoad = getFromUrl('isFromUpLoad') || '';
$(function() {
  if (!isFromUpLoad) {
    var classname = localStorage.getItem('classname');
		var classid = localStorage.getItem('classid');
		if (classname || classid) {
			$(classname).eq(classid).click();
		} else {
			$('.manage-class').click();
		}
  }
});
