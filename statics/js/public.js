$(function(){
    //头部栏目划过区域展开二级栏目
	$("#header_bg").hover(function(){$("#e_menu").stop().animate({height:"116px"},400);},function(){$("#e_menu").stop().animate({height:"0"},400);})
    //头部栏目划过栏目名展示英文名
    $("#nav li").hover(function(){$(this).find("a.hov").stop().animate({marginTop:"-20px"},200);},function(){$(this).find("a.hov").stop().animate({marginTop:"0"},200);})
    //首页我们的服务动态效果
	$(".server_ul a").hover(function(){
		$(this).find(".s_b").stop().animate({height:0},300);
		$(this).find(".s_s").stop().animate({height:210},300);
	},function(){
		$(this).find(".s_b").stop().animate({height:207},300);
		$(this).find(".s_s").stop().animate({height:3},300);
	})
    //我们是谁页面动态效果
	$(".about_1 .team-img").hover(function() {
		$(this).find(".team-icon").stop(true,false).animate({top: "-20"}, 400);
		$(this).find(".team-en").stop(true,false).animate({bottom: "5"}, 250);
	} , function() {
		$(this).find(".team-icon").stop(true,false).animate({top: "15"}, 400);
		$(this).find(".team-en").stop(true,false).animate({bottom: "-40"}, 250);
	});
    //服务页面左侧的列表划过显示
    $(".sercon-float ul li").hover(function() {
        $(this).find("div").stop().animate({ left: "-50"}, 250);
        $(this).find("a").stop().animate({ left: "0"}, 250);
    } , function() {
        $(this).find("div").stop().animate({ left: "0"}, 250);
        $(this).find("a").stop().animate({ left: "-120"}, 250);
    });
    //案例页面动态效果
    $(".case-box").hover(function(){
        $(this).find(".case-txt").stop(true,true).animate({height:'75px',opacity:'0.9'},300);
    }, function(){
        $(this).find(".case-txt").stop(true,true).animate({height:'38px',opacity:'1'},300);
    })
	//联系我们下拉列表
	$("#am").click(function(){
		$(this).blur();
		var zt = $("#HMF-1").is(":hidden")?"block":"none";
		$("#HMF-1").css("display",zt);
	})
	$("#HMF-1 span").click(function(){
		var z = $(this).text();
		$("#am").text(z);
		$("#am_i").attr("value",z);
		$("#HMF-1").css("display","none");
	})









})
