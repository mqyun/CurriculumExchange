$(function() {
  var classname = localStorage.getItem('classname2');
  var classid = localStorage.getItem('classid2');
  if (classname || classid) {
    $(classname).eq(classid).click();
  } else {
    $('.student-myclass').click();
  }
});
