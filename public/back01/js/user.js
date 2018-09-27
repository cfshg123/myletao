$(function(){

  var currentPage = 1;
  var pageSize = 5;
  $.ajax({

    url:"/user/queryUser",
    type:"get",
    data: {
      page:currentPage,
      pageSize:pageSize
    },
    dataType:"json",
    success:function(info){

      console.log(info);
      var str = template("tmp",info);
      $("tbody").html(str);

      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total /pageSize),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
        }
      });
    }
  })

})