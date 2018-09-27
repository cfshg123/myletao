// 拦截功能
$.ajax({

  url:"/employee/checkRootLogin",
  type:"get",
  dataType:"json",
  success:function(info){

    console.log(info);
    if(info.error === 400){
      location.href = "login.html";
    }
    
  }
})