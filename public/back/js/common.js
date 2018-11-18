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

// jquery入口函数

$(function(){
  // 1导航切换功能
  // slideToggle切换

  $('.category').click(function(){
    $(this).next().stop().slideToggle();
  });


  // 2.左侧菜单切换功能

  $('.lt_topbar .icon_left').click(function(){
    // toggleClass 切换类名的意思
    // hidemenu隐藏菜单 类名
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  })
  // 3.退出功能
  $(".lt_topbar .icon_right").click(function(){

    // 点击按钮显示模态框
     // $('#modal').modal("show") // 显示
    // $('#modal').modal("hide") // 隐藏
    $('#logoutModal').modal("show");
  });
  $('#logoutBtn').click(function() {
    // 发送ajax请求
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })

})
