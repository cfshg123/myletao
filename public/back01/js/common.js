
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

})

