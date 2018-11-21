
$(function() {
  
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条
    // 1. 一进入页面, 发送 ajax 请求, 获取数据, 进行渲染
    render();
  
    function render() {
      $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
          page: currentPage,
          pageSize: pageSize
        },
        dataType: "json",
        success: function( info ) {
          console.log( info );
          // 结合模板引擎渲染
           // 生成 htmlStr, 将来进行渲染
          // 参数1: 模板id, 参数2: 数据对象
          // 在模板中, 可以直接访问传进去对象中的所有属性
            var htmlStr = template("firstTpl", info );
          $('tbody').html( htmlStr );
  
          // 分页初始化
          $('#paginator').bootstrapPaginator({
            // 版本号
            bootstrapMajorVersion: 3,
            // 总页数
            totalPages: Math.ceil( info.total / info.size ),
            // 当前页
            currentPage: info.page,
            // 给按钮添加点击事件
            onPageClicked: function( a, b, c, page ) {
              // 更新当前页
              currentPage = page;
              // 重新渲染
              render();
            }
          })
        }
      })
    };
    $('#addBtn').click(function(){
      $('#addModal').modal("show");
    });
    // 表单校验
   $('from').bootstrapPaginator({
    //  配置校验插件
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//成功
      invalid: 'glyphicon glyphicon-remove',//失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //字段列表
    
   })


});