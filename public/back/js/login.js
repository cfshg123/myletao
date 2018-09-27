// 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空
  //              (2) 密码不能为空, 且必须是 6-12 位

  $('#form').bootstrapValidator({
　　　　
  　    feedbackIcons: {
      　　　　　　　　valid: 'glyphicon glyphicon-ok',
      　　　　　　　　invalid: 'glyphicon glyphicon-remove',
      　　　　　　　　validating: 'glyphicon glyphicon-refresh'
  　　　　　　　　   },
        fields: {
            username: {
                // message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '长度必须在2-12之间'
                    },
                    callback: {
                      message: '用户名不存在'
                    }
                }
            },
            password: {
              // message: '用户名验证失败',
              validators: {
                  notEmpty: {
                      message: '密码不能为空'
                  },
                  stringLength: {
                      min: 6,
                      max: 12,
                      message: '长度必须在6-12之间'
                  },
                  callback: {
                    message: '密码错误'
                  }
              }
          },
        }
  });
  
  // 2. 进行登录请求
  //    通过 ajax 进行登录请求
    $("#form").on("success.form.bv",function(e){

      e.preventDefault();
      
      $.ajax({

        url:"/employee/employeeLogin",
        type:"post",
        dataType: "json",
        data: $("#form").serialize(),
        success: function(info){
          // console.log(info);
          if(info.success){
            location.href = "index.html"
          }
          // error 1000 用户名错误  1001 密码错误
          if (info.error == 1000) {
            $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback"); 
          }
        }
      })
    })
  // 表单校验插件有一个特点, 在表单提交的时候进行校验
  // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
  // 如果校验失败, 默认会阻止提交


   // 3. 重置功能实现
   $(".reset").on("click",function(){

    $("#form").data("bootstrapValidator").resetForm(); 
   })