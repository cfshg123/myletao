$(function(){

  var currentPage = 1;
  var pageSize = 5;
  var currentId ;
  var isDelete;

// 
  render();
  function render() {

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
          size:"normal",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值(重新发送ajax请求)
            // console.log(page);
            currentPage = page;

            // 重新渲染
            render();
          }
        });
      }
    })

  }


  // 点击btn模态框显现
  $("tbody").on("click",".btn",function(){

    $("#userModal").modal("show");

    // 获取父级的ID  和自身的 启用禁用状态 在全局申明变量 

    currentId = $(this).parent().data("id");
    // console.log(currentId);

    // 获取自身的状态

    isDelete = $(this).hasClass("btn-danger")? 0 : 1;


  })

  // 点击确定按钮 发送ajax请求 获取 父级的ID方便改变相应ID的状态
  $(".sure").on("click",function(){

    $.ajax({

      url:"/user/updateUser",
      type: "post",
      data:{
        id:currentId,
        isDelete:isDelete,
      },
      dataType:"json",
      success:function (info){

        // console.log(info);
        // 判断如果成功 关闭模态框 重新渲染
        if (info.success) {

          // 关闭模态框
          $("#userModal").modal("hide");

          // 重新渲染
          render();
        }

      }
    })


  })

})