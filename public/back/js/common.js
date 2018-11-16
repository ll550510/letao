//在第一个ajax请求时,开启进度条
//在最后一个ajax请求都回来后,关闭进度条
// ajax全局事件
// .ajaxComplete()  当每个ajax完成时调用,  (不管成功还是失败, 都调用)
// .ajaxSuccess()   当每个ajax成功响应时调用
// .ajaxError()     当每个ajax失败响应时调用
// .ajaxSend()      当每个ajax准备要发送前, 会调用ajaxSend

// .ajaxStart()     当第一个ajax请求发送时调用
// .ajaxStop()      当所有的ajax请求完成时调用
$( document ).ajaxStart(function() {
  NProgress.start();
});
$( document ).ajaxStop(function() {
  setTimeout(function(){
      NProgress.done();
  },500);

});