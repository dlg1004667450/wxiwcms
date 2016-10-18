function uptime() {
    var timestamp = Math.round(new Date() / 1000);
    var t = zdjgfzmiao - (timestamp - mytime);
    t = t < 0 ? 0 : t;
   /* if (t) {
        $(".refresh").html("剩余:" + t + "秒");
        setTimeout("uptime()", 1000)
    } else {
        $(".refresh").html("置顶刷新")
    }*/
}

var up_user_time = 0;

function load_up_user(){
    var up_list = $(".up_list");
    if(up_user_time == 0){
        up_list.load("up_list.php?fentype="+fentype, function() {
            up_user_time=$.cookie('pdzdmiao');
             up_list.find(".du_miao").text(up_user_time);
        });
    }else{
        up_user_time--;
        if(up_user_time<0){
            up_user_time=0
        }
        up_list.find(".du_miao").html(up_user_time);
        if((pdzd-up_user_time)==2){
        //if(up_user_time==2){
        $.get("isshow.php?action=ispdshow");
        }
    }
    setTimeout("load_up_user()", 1000);
}
var first_user_time = 0;
function load_first_user(){
    var first_list = $(".first_list");
    if(first_user_time == 0){
       first_list.load("first_list.php?fentype="+fentype, function() {
           first_user_time = first_list.find("li").attr("over_time");
           first_list.find(".first_secend").text("剩余" + first_user_time + "秒");
        });
    }else{
        first_user_time--;
        first_list.find(".first_secend").text("剩余" + first_user_time + "秒");
    }
      setTimeout("load_first_user()", 1000);
}

$(function() {
    load_first_user();
    load_up_user();
    $(".refresh1").click(function() {
        if ($("#msgshow1").css("display") == "none") {
            $("#msgshow1").show()
        } else {
            $("#msgshow1").hide()
        }
    });
    $(".refresh-lb").click(function() {
        if ($("#choicelb").css("display") == "none") {
            $("#choicelb").show()
        } else {
            $("#choicelb").hide()
        }
    });


    $(".imgshow").click(function() {
        var timestamp = Math.round(new Date() / 1000);
        //alert(ctime);
        //alert (timestamp);
        if (ctime && timestamp - ctime >= 5) {
            if (storage.getItem("addfans_num")) {
                var click_num = parseInt(storage.getItem("addfans_num"));
                storage.setItem("addfans_num", click_num + 1);
				 
            } else {
                storage.setItem("addfans_num", 1)
            }
        }
        $("#showcode").css("display", "none")
    });
    $("a.addfans").live("click",
    function() {
        ctime = Math.round(new Date() / 1000); 
        var fansid = $(this).attr("fansid");
        //alert($(".fscode_it" + fansid).val());
        $("#showimg").attr("src", $(".fscode_it" + fansid).val());
        $("#showcode").css("display", "block");		 
        /*
		$.get("uphit.php?weixinid=" + fansid , {},
			function(data) 
			{
				var info = eval(data);
				
				if (info.sta == "ok") 
				{ 
				   var topid= "#topnum"+ fansid;
				   var topnmu1 = $(topid).html();
				   var topnmu2 = parseInt(topnmu1) +1;
				   $(topid).html(topnmu2+"+"); 
				   //location.reload(true);
				}
			},
			"json"
		)
		*/
	});
	
    $("a.ltfans").live("click",    		
    	    function() {
    			if (!vip) {
    				alert("您不是VIP会员，无法发布聊天！\n\n购买VIP会员即可发布聊天信息！");
    	            return false
    			} else {
    				
    			}    	        
    		});
    $("a.upcode").click(function() {
        if (!vip) {
            alert("您不是VIP会员，无法发布二维码！\n\n购买VIP会员即可发布二维码，享受主动被加的特权，结识更多人脉朋友！");
            return false
        } else {
			    if (vip == 2 && !fansid) {
                if (storage.getItem("addfans_num")) {
                    var click_num = parseInt(storage.getItem("addfans_num"));
                    if (click_num < syvipewmhy) {
                        alert("亲爱的,您是试用VIP，需要加"+syvipewmhy+"个好友才能发布哦！\n\n购买包月VIP，无需加人即可发布二维码！");
                        return false
                    }
                    storage.setItem("addfans_num", 0)
                } else {
                    storage.setItem("addfans_num", 0);
                    alert("亲爱的,您是试用VIP，需要加"+syvipewmhy+"个好友才能发布哦！\n\n购买包月VIP，无需加人即可发布二维码！");
                    return false
                }
            }
        }
    });
    /*
    普通置顶
     */

    $("a.ptzd").click(function() {
                 if (storage.getItem("addfans_num")) {
                var click_num = parseInt(storage.getItem("addfans_num"));
                if (click_num <ptzdhynum) {
	                if (fentype==5) {
	                 alert("亲爱的,需要转发"+ptzdhynum+"篇文章才能置顶哦！");
	                } else{
	                 alert("亲爱的,需要加"+ptzdhynum+"个好友才能置顶哦！");
	                }; 
                        return false
                    }else{
                        	$.get("ptup.php?a=upfans&fentype="+ fentype , {},
                            function(data) 
							{
                                var info = eval(data);
                              	if (info.sta == "ok") 
								{
                               	    alert("置顶成功！\n\n如果频繁刷新会出现没有置顶成功的情况，请须知！可稍后再试！");
                          		    storage.setItem("addfans_num", 0);
                                  location.reload(true);
                         // window.location.href = "list.php?r=" + Math.round(new Date());
                                }
                            },
                            "json"
                        )
                 }
              } else {
                    storage.setItem("addfans_num", 0);
                    alert("亲爱的,需要加"+ptzdhynum+"个好友才能置顶哦！");
					window.location.reload(); 
                    return false
                }
   });
    /*
    普通置顶结束
     */
    $("a.refresh").click(function() {
        if (vip && fansid) {
            if (upnum >= syvipmrzd && vip == 2) {
                alert("亲爱的,您是试用VIP，每日只能置顶"+syvipmrzd+"次（刚发布算1次）！\n\n购买包月VIP，即可不受置顶次数的限制！");
				window.location.reload(); 
                return false
            }
            var timestamp = Math.round(new Date() / 1000);
            if (storage.getItem("refresh")) {
                if (timestamp - mytime < zdjgfzmiao) {
                    alert("距您上次刷新不到"+zdjgfz+"分钟,请您休息会,稍后再刷新!\n\n还需等待：" + (zdjgfzmiao - (timestamp - mytime)) + "秒！");
					window.location.reload(); 
                    return false
                }
            }
            if (vip != 1) {
                if (storage.getItem("addfans_num")) {
                    var click_num = parseInt(storage.getItem("addfans_num"));
                    if (click_num < syvipzdhynum) {
                        alert("亲爱的,您是试用VIP，加"+syvipzdhynum+"个好友后才可使用置顶刷新一次哦！\n\n购买包月VIP，无需加人即可使用置顶刷新！");
						window.location.reload(); 
                        return false
                    }
                    storage.setItem("addfans_num", 0)
                } else {
                    storage.setItem("addfans_num", 0);
                    alert("亲爱的,您是试用VIP，加"+syvipzdhynum+"个好友后才可使用置顶刷新一次哦！\n\n购买包月VIP，无需加人即可使用置顶刷新！");
					window.location.reload(); 
                    return false
                }
            }
		
            $.get("up.php?a=upfans&fentype="+ fentype+"&r=" + timestamp, {},
            function(data) {
                var info = eval(data);
                if (info.sta == "ok") {
                    //storage.setItem("refresh", timestamp);

                    alert("置顶成功！\n\n如果频繁刷新会出现没有置顶成功的情况，请须知！可稍后再试！");
					window.location.reload(); 
                    return true;
					

                   // window.location.href = "list.php?r=" + Math.round(new Date())
                } else {
                    if (info.sta == "time") {
                        alert("距您上次刷新不到"+zdjgfz+"分钟,请您休息会,稍后再刷新!\n\n还需等待：" + (info.flist) + "秒！");
						window.location.reload(); 
                        return false
                    } else {
                        if (info.sta == "vip") {
                            alert("置顶失败，只有VIP会员才能使用。");
							window.location.reload(); 
                            return false
                        } else {
                            if (info.sta == "upnum") {
                                alert("亲爱的,您是试用VIP，每日只能置顶"+syvipmrzd+"次（新发布算1次）！\n\n购买包月VIP，即可不受置顶次数的限制！");
								window.location.reload(); 
                                return false
                            } else {
                                alert("置顶刷新失败，请稍后再尝试！\n\n" + info.sta);
								window.location.reload(); 
                                return false
                            }
                        }
                    }
                }
            },
            "json")
        } else {
            $("#msgshow").css("display", "block")
        }
    });
    $("#msgshow").click(function() {
        storage.setItem("msgshow", "1");
        $(this).css("display", "none")
    });
    if (!page) {
        var stop = true;
        var page = 2
    }
    $(window).scroll(function() {    	
        if ($(document).scrollTop() + 100 >= $(document).height() - $(window).height()) {
            if (stop == true) {
				$("#loading").css("display", "block");
                stop = false;
                setTimeout(function() {

                    var lnum = $("input[name=limitnum]").val();
                    //document.write("/fans.php?search=" + 1 + "&province=" + getUrlParam("province") + "&city=" + getUrlParam("city") + "&sex="+ getUrlParam("sex") +"&page=" + page + "&utime=" + utime + "&r=" + Math.random())
                    //document.write(nickurl + "&page=" + page + "&r=" + Math.random());
                    $.get(nickurl + "&per_page=" + page + "&r=" + Math.random(), {},
                    function(data) {
                        var info = eval(data);                        
                        if (info.sta == "err") {
                            stop = true;
                            $("#loading").css("display", "none")
                        } else {
                            if (info.sta == "ok") {
                                var liStr = "";
                                if(fentype==0){
                                    for (var i = 0; i < info.flist.length; i++) {
                                        liStr += '<li><div class="headimg"><span class="top">' + info.flist[i].cishu + '+</span><img src="' + info.flist[i].headimg + '"/></div><div class="desc"><span class="name"  style="color:#E53333;">' + info.flist[i].username + '</span><span>' + info.flist[i].city +' | '+ info.flist[i].categoryname +'</span><span class="desc_info">' + info.flist[i].remark + '</span></div><div class="adddiv"><a href="javascript:;" class="addfans" class="fansadd" fansid="' + info.flist[i].id + '">添加好友</a></div><input type="hidden" name="fsimg' + info.flist[i].id + '" class="fscode_it' + info.flist[i].id + '" value="' + info.flist[i].qrcode + '"/></li>'
                                    }
                                }
                                if(fentype==1){
                                    for (var i = 0; i < info.flist.length; i++) {
                                        liStr += '<li><div class="headimg"><span class="top">' + info.flist[i].cishu + '+</span><img src="' + info.flist[i].headimg + '"/></div><div class="desc"><span class="name"><span style="color: #999;">[' + info.flist[i].city + "]</span>" + info.flist[i].username + '</span><span>类别：'+ info.flist[i].categoryname +'</span><span class="desc_info">' + info.flist[i].remark + '</span></div><div class="adddiv"><a href="javascript:;" class="addfans" class="fansadd" fansid="' + info.flist[i].id + '">添加好友</a></div><input type="hidden" name="fsimg' + info.flist[i].id + '" class="fscode_it' + info.flist[i].id + '" value="' + info.flist[i].qrcode + '"/></li>'
                                    }
                                }
                                if(fentype==2){
                                    for (var i = 0; i < info.flist.length; i++) {
                                    	liStr += '<div class="fn-mt fn-mb fn-mlr cklist"><div class="btn btn-bar btn-arrow"><div class="uc-user"><div class="uc-user-photo" id="Enlargement">';
                                    	liStr += '<span class="user-top">' + info.flist[i].nickhot + '</span> <img src="' + info.flist[i].headimgurl + '" /></div>';
                                    	liStr += '<div class="uc-user-infobase">';
                                    	if(info.flist[i].nicklv==0){
                                    		liStr += '<div class="user">' + info.flist[i].nickname +'<i class="mark-level0">LV&nbsp;'+ info.flist[i].nicklv +'</i></div>';
                                    	} else {
                                    		liStr += '<div class="user">' + info.flist[i].nickname +'<i class="mark-level">LV&nbsp;'+ info.flist[i].nicklv +'</i></div>';
                                         	
                                    	}
                                    	liStr += '<div class="grade"><span class="point">微信号：' + info.flist[i].nickid +'</span></div></div>';
                                    	liStr += '<div class="icon-arrow icon-arrow-right"><div class="ltdiv"><a href="javascript:;" class="ltfans" fansid="' + info.flist[i].id +'">聊天</a></div>';
                                    	liStr += '<div class="adddiv"><a href="javascript:;" class="addfans" fansid="' + info.flist[i].id +'">添加好友</a><input type="hidden" name="fsimg' + info.flist[i].id +'" class="fscode_it' + info.flist[i].id +'" value="' + info.flist[i].nickimg +'" />	</div></div></div></div></div>';
                                   }
                                }                               
                                page++;
                                $("div.sort_box").append(liStr);
                                $("input[name=limitnum]").val(parseInt(lnum) + 2);
                                stop = true
                            } else {
                                if (info.sta == "null") {
                                    stop = false;
                                    //$("#loading").css("display", "none");
                                    liStr = '<li style="height:20px;"><center color="green">已经全部加载完毕！</center></li>';
                                    $("ul.list").append(liStr)
                                } else {
                                    stop = true;
                                    $("#loading").css("display", "none");
                                    $("#loading").hide()
                                }
                            }
                        }
                    },
                    "json")
                },
                200)
            }
        }
    });
    $(document).scrollTop(0);
    $("input[name=limitnum]").val(10)
});
