var isFromUpLoad = getFromUrl('isFromUpLoad') || '';
var curriculumid = getFromUrl('curriculumid') || '';

$(function() {
	if (isFromUpLoad) {
		showTips('success', 'Success!', '上传课程资源成功~');
		var resourcesLis = $('.resources-content');
		$('.resourcesTitLi').click();
		resourcesLis.each(function() {
			if ($(this).data('curriculumid') == curriculumid) {
				$(this).click();
			}
		});
	}
});

// 班级管理
$(document).on('click', '.manage-class', function() {
	var classid = $('.manage-class').index(this);
	setBtn('.manage-class', classid);
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
      $('body').append($('.add-curriculum-modal'));
    }
	}, function() {
    $('body').append($('.add-curriculum-modal'));
		$('#public-modal').hide();
		$('.add-curriculum-modal').hide();
	});
});

// 查看课程详情
$(document).on('click', '.class-content', function() {
	var classid = $('.class-content').index(this);
	setBtn('.class-content', classid);
	var curriculumId = $(this).data('curriculumid');
	var data = {
		'curriculumId': curriculumId
	}
	$('.main-content').html('');
	getCurriculumCon(data);
});

// 布置作业
$(document).on('click', '.add-assignment', function() {
	$('.add-assignment-modal').show();
	$('.form-group-isload').show();
	showModal('布置作业', $('.add-assignment-modal'), '确定', '取消', function() {
		var assignmentContent = $("textarea[name='assignmentContent']").val();
		var assignmentClass = $("select[name='assignmentClass']").val();
		var assignmentCurriculum = $('select[name="assignmentCurriculum"]').val();
		var data = {
			'assignmentContent': assignmentContent,
			'assignmentClass': assignmentClass,
			'assignmentCurriculum': assignmentCurriculum
		}
		if (!validationAssignmentInput(assignmentContent)) {
			showTips('warning', 'Warning!', '请填写布置作业的内容');
			setTimeout(function() {
				$('.has-warning').removeClass('has-warning');
			}, 3000);
		} else {
			$('#public-modal').hide();
			$('.add-assignment-modal').hide();
			ajaxPost('/teachermanage/addAssignment', data, function(result) {
				if (result.success) {
					showTips('success', '恭喜你!', result.success);
					$(':input').val('');
          $('.assignment-content').click();
				}
			});
      $('body').append($('.add-assignment-modal'));
    }
	}, function() {
    $('body').append($('.add-assignment-modal'));
		$('#public-modal').hide();
		$('.add-assignment-modal').hide();
	});
});

// 查看已布置作业
$(document).on('click', '.assignment-content', function() {
	var classid = $('.assignment-content').index(this);
	setBtn('.assignment-content', classid);
	$('.main-content').html('');
	var curriculumId = $(this).data('curriculumid');
	var data = {
		'curriculumId': curriculumId
	}
	getAssignmentCon(data);
});

// 发布公告
$(document).on('click', '.add-notice', function() {
	$('.add-assignment-modal').show();
	$('.form-group-isload').hide();
	showModal('发布公告', $('.add-assignment-modal'), '确定', '取消', function() {
		var assignmentContent = $("textarea[name='assignmentContent']").val();
		var assignmentClass = $("select[name='assignmentClass']").val();
		var data = {
			'assignmentContent': assignmentContent,
			'assignmentClass': assignmentClass
		}
		if (!validationAssignmentInput(assignmentContent)) {
			showTips('warning', 'Warning!', '请填写公告的内容');
			setTimeout(function() {
				$('.has-warning').removeClass('has-warning');
			}, 3000);
		} else {
			$('#public-modal').hide();
			$('.add-assignment-modal').hide();
			ajaxPost('/teachermanage/addNotice', data, function(result) {
				if (result.success) {
					showTips('success', '恭喜你!', result.success);
					$(':input').val('');
          $('.notice-content').click();
				}
			});
      $('body').append($('.add-assignment-modal'));
    }
	}, function() {
    $('body').append($('.add-assignment-modal'));
		$('#public-modal').hide();
		$('.add-assignment-modal').hide();
	});
});

// 查看已发布公告
$(document).on('click', '.notice-content', function() {
	var classid = $('.notice-content').index(this);
	setBtn('.notice-content', classid);
	$('.main-content').html('');
	var classId = $('.manage-class').eq(0).data('classid');
	var data = {
		'classId': classId
	}
	getNoticeCon(data);
});

// 查看课程资源
$(document).on('click', '.resources-content', function() {
	var classid = $('.resources-content').index(this);
	setBtn('.resources-content', classid);
	$('.main-content').html('');
  var curriculumId = $(this).data('curriculumid');
  var curriculumName = $(this).text();
  var data = {
    'curriculumId': curriculumId,
    'curriculumName': curriculumName
  }
	getResourcesCon(data);
});

// 添加课程资源
$(document).on('click', '.btn-addResources', function() {
  var resourcesName = $("input[name='resourcesName']").val();
  var resCurriculumId = $(this).data('curriculumid');
  var data = {
    'resourcesName': resourcesName,
    'resCurriculumId': resCurriculumId
  }
  if (!validationAssignmentInput(resourcesName)) {
    showTips('warning', 'Warning!', '请填写课程资源名称');
  } else {
		ajaxPost('/teachermanage/addResourcesItem', data, function(result) {
			if (result.success) {
				showTips('success', '恭喜你!', result.success);
				var resourcesLis = $('.resources-content');
				resourcesLis.each(function() {
					if ($(this).data('curriculumid') == resCurriculumId) {
						$(this).click();
					}
				});
			}
		});
  }
});

// 删除课程资源
$(document).on('click', '.btn-delresources', function() {
	var thisBtn = $(this);
	var resId = thisBtn.data('resid');
	var data = {
		'resid': resId
	}
	ajaxPost('/teachermanage/deleteresources', data, function(result) {
		if (result.success) {
			showTips('success', 'Success!', result.success);
			thisBtn.parents('tr').remove();
		}
	});
});

// 上传资源验证
$(document).on('click', '.btn-uploadResources', function() {
	if ($(this).prev().val() == '') {
		showTips('warning', 'Warning', '请选择要上传的资源');
		return false;
	} else {
		$(this).parents('form').submit();
	}
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

// 验证布置作业时用户输入
function validationAssignmentInput(assignmentContent) {
	if (assignmentContent.length == 0) {
		$("textarea[name='assignmentContent']").parents('.form-group').addClass('has-warning');
		return false;
	}
	return true;
}

// 验证布置作业时用户输入
function validationAssignmentInput(resourcesName) {
	if (resourcesName.length == 0) {
		$("textarea[name='resourcesName']").parents('.form-group').addClass('has-warning');
		return false;
	}
	return true;
}

// 请求已布置作业
function getAssignmentCon(data) {
	ajaxPost('/teachermanage/assignmentcon', data, function(result) {
		if (result.success) {
			$('.main-content').append(result.view);
		}
	});
}

// 请求已发布的公告
function getNoticeCon(data) {
	ajaxPost('/teachermanage/noticecon', data, function(result) {
		if (result.success) {
			$('.main-content').append(result.view);
		}
	});
}

// 请求课程资源内容
function getResourcesCon(data) {
  ajaxPost('/teachermanage/resourcescon', data, function(result) {
		if (result.success) {
			$('.main-content').append(result.view);
		}
	});
}
