function ajaxPost(url, data, successfn, isLoadingShow) {
  var oDiv;
  $.ajax({
    url: url,
    contentType: "application/json; charset=utf-8",
    type: 'POST',
    data: JSON.stringify(data),
    success: function(result) {
      if (result.success) {
        successfn && successfn(result);
      } else {
        showTips('error', '出错了！', result.error);
      }
    },
    error: function(jqXHR, status, error) {
      if (error.length > 0) {
        showTips('error', '出错了！', error);
      } else {
        showTips('error', '出错了！', '请刷新页面试试~');
      }
    },
    beforeSend: function(jqXHR, settings) {
      if (isLoadingShow == undefined || isLoadingShow == true) {
        oDiv = alertLoading();
      }
    },
    complete: function(jqXHR, status) {
      if (oDiv) oDiv.remove();
    }
  })
};

function showTips(type, msgtit, msgcon, newTimeOut = 2000) {
  // type取值 "warning"、"error"、"success"、"info"
  swal({
    title: msgtit,
    text: msgcon,
    timer: newTimeOut,
    button: false,
    icon: type
  });
}

function alertLoading() {
  var oDiv = $('<div class="loadingTip"><img src="/CExchange/images/loading.gif"/></div>');
  $('body').append(oDiv);
  return oDiv;
}

function getFromUrl(key) {
  var urlInfo = location.search.substring(1).split('&');
  for (var i = 0; i < urlInfo.length; i++) {
    var name = urlInfo[i].split('=')[0];
    var value = urlInfo[i].split('=')[1];
    if (key.toLowerCase() === name.toLowerCase()) {
      return value;
      break;
    }
  }
  return '';
}

function showModal(tit, content, ok, cancel, okcallback, cancelcallback) {
  // tit 模态框标题
  // content 模态框内容
  // ok 模态框ok按钮内容
  // cancle 模态框cancle按钮内容
  $('#public-modal').show();
  if (tit) {
    $('#public-modal .pdig-headertit').text(tit);
  }
  if (content) {
    $('#public-modal .pdig-body').html('');
    $('#public-modal .pdig-body').append(content);
  }
  if (ok) {
    $('#public-modal .pdig-btnok').text(ok);
  }
  if (cancel) {
    $('#public-modal .pdig-btncancel').text(cancel);
  }
  $('#public-modal .pdig-btnok').unbind('click').bind('click', function() {
    okcallback();
  });
  $('#public-modal .pdig-btncancel').unbind('click').bind('click', function() {
    cancelcallback();
  });
  $('#public-modal .pdig-close').click(function() {
    $('#public-modal').hide();
  });
  $('#public-modal .public-modalbg').click(function() {
    $('#public-modal').hide();
  });
}
