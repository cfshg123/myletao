
// 进度条事件

$(function(){
// console.log(111);
//   开始第一个ajax请求时开启进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })

 
  // 结束时关闭进度条
  $(document).ajaxStop(function(){
    NProgress.done();
  })

  // 左侧二级菜单栏切换
$(".aside_nav .nav_classify").click(function(){

  $(".classify").stop().slideToggle();
})

// 左侧上菜单栏切换

 $(".lt_top .pull-left").click(function(){

  // console.log(111);
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
  $(".lt_top").toggleClass("now");

 })


//  点击右边 弹出模态框 退出
$(".lt_top .pull-right").click(function(){

  $('#myModal').modal("show")
});

// 点击确定 退出(此时并没有真正销毁后台，因为登录页不需要 所以单独开一个js---)
// 即需要在另外的地方写==========拦截功能==============
$(".modal-footer .btn-primary").click(function(){

  $.ajax({

    url:"/employee/employeeLogout",
    type:"get",
    datatype:"json",
    success:function(info){

      console.log(info);
      if(info.success){
        location.href = "login.html"
      }
    }
  })
})

})

