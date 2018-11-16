//表单校验 


$(function () {
    // 1.用户名不能为空!长度2-6位
    // 2.密码不能为空,长度为6-12位

    $("#form").bootstrapValidator({

        //配置图标
        feedbackIcons:{
            valid:" glyphicon glyphicon glyphicon-ok",
            invalid:"glyphicon glyphicon glyphicon-remove",
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //检验用户名对应name表单的name属性\
            username: {
                // 校验的规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        // 为空时显示的提示信息
                        message: "用户名不能为空"
                    },
                    // 长度要求 2-6 位
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是 2-6 位"
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
                    notEmpty:{
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
    // 阻止默认的表单提交
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $('#form').serialize(),
      success: function( info ) {
        console.log( info )
      if(info.success){
        //   alert('chenggong')
        location.href="index.html";
      }
      if (info.error===1000) {
         $("#from").data("bootstrapValidator").updateStatus("username","INVALID","callback"); 
      }
      if ( info.error === 1001 ) {
        // alert( "密码错误" );
        // updateStatus
        // 参数1: 字段名称
        // 参数2: 校验状态
        // 参数3: 校验规则, 可以设置提示文本
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }  
      }
    })
});


$('[type="reset"]').click(function(){
    
    $("#form").data('bootstrapValidator').resetForm();
 })
});

