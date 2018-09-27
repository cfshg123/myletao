$(function(){

  // 验证是否为空以及长度
  $('form').bootstrapValidator({
// 　　　　message: 'This value is not valid',

// 验证成功或失败时小图标的状态
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
                    message: '用户名长度必须在2到12位之间'
                },
                callback: {
                  message: "用户名不存在"
                }
              }
          },
          password: {
              validators: {
                  notEmpty: {
                      message: '密码不能为空'
                  },
                  stringLength: {
                    min: 6,
                    max: 12,
                    message: '用户名长度必须在6到12位之间'
                },
                callback: {
                  message: "密码错误"
                }
              }
          }
      }
  });

// 验证登录 有submit按钮 可以通过 success.form.bv 事件
// 关于bootstrapValidator的AJAX提交有几种方法：

// 1、form中一定要放一个类型为submit的按钮，然后添加 success.form.bv 事件，如下

// 1 on('success.form.bv', function(e) {
// 2     e.preventDefault();
// 3     var form = $(e.target);
// 4      /**提交代码**/
// 5 });
// 2、如果form中没有submit类型的按钮（项目要求，需要在表单外部按钮提交），除了添加1的代码外，外部按钮事件代码如下

// form.submit(function(e){
//     e.preventDefault();//必须添加，不然就重复提交
// });
// 3、不使用 success.form.bv 事件，使用 submitHandler 方法，这应该是官方推荐的方法。不过，这个方法在源码中是找不到的，需要手动修改源码。如果使用 submitHandler 方法，form中一定要放一个类型为submit的按钮。

 

$("#form").on("success.form.bv",function(e){

     e.preventDefault();
     $.ajax({

      url:"/employee/employeeLogin",
      type:"post",
      data:$("#form").serialize(),
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error == 1000){
          console.log($("#form"));
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error == 1001){
          console.log($("#form"));
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
     })
  });


  // 重置

  $(".reset").on("click",function(){

    $("#form").data('bootstrapValidator').resetForm();
  })
})