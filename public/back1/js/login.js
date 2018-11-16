$(function() {
  // 1. 用户名不能为空
  // 2. 用户密码不能为空
  // 3. 用户密码长度为6-12位
  $("#form").bootstrapValidator({
    
            //配置图标
      feedbackIcons:{
      valid:" glyphicon glyphicon glyphicon-ok",
      invalid:"glyphicon glyphicon glyphicon-remove",
      validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        username:{
          validators:{
            notEmpty:{
              message:"用户不能为空"
            },
            stringLength:{
              min:2,
              max:4,
              message:"用户名2-4位",
            },
            callback: {
              message: "用户名不存在"
          }
          }
        },
        password:{
          validators:{
            notEmpty:{
              message:"密码不能为空"
            },
            stringLength:{
              min:6,
              max:12,
              message:"密码长度必须是6-12"
          },
          callback:{
            message:"密码错误"
        }
          } 
        }
      }
  });
  // 2. 进行登录请求
  //    通过 ajax 进行登录请求

  // 表单校验插件有一个特点, 在表单提交的时候进行校验
  // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
  // 如果校验失败, 默认会阻止提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    //使用ajax提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html";
        }
        if(info.error===1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback"); 
        }
        if(info.error===1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback"); 
        }
      }
    })
   });
   $('[type="reset"]').click(function(){
    
    $("#form").data('bootstrapValidator').resetForm();
 })
})