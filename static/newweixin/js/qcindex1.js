if($('.svip_countdown').length > 0){
        window.svip_countdown = setInterval(function(){
            $('.svip_countdown').each(function(k, e){
                var seconds = parseInt($(e).text());
                seconds -= 1;
                if(seconds >= 0){
                  $(e).text(seconds);
                }
            });
        }, 1000);
}

var up_user_time = 0;

function load_up_user(){
   
}
var first_user_time = 0;
function load_first_user(){
   
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
    $("#show-custom").live("click",
    function() {
        ctime = Math.round(new Date() / 1000); 
        var fansid = $(this).attr("fansid");
        //alert($(".fscode_it" + fansid).val());
        $("#showimgs").attr("src", $(".fscode_it" + fansid).val());
        $("#showimgs").attr("fansid", fansid);
        $("#showcode").css("display", "block");		 
	});
	$("#showimgs").live("click",
    function() {
        var fansid = $(this).attr("fansid");
        //alert(fansid);
        
		$.get(Gurl + "jiafen/jshot?id=" + fansid + "&r=" + Math.random(), {},
			function(data) 
			{
				
			},
			"json"
		)
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

    $("#msgshow").click(function() {
        storage.setItem("msgshow", "1");
        $(this).css("display", "none")
    });
    if (!page) {
        var stop = true;
        var page = 2
    }
    $(window).scroll(function() {    	
        if ($(document).scrollTop() + 10 >= $(document).height() - $(window).height()) {
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
                                		var str = info.flist[i].nickimg;
                                		
                                      	liStr += '<div class="weui_panel weui_panel_access"><div class="weui_panel_bd"><div class="weui_media_box weui_media_appmsg"><div class="weui_media_hd ui-badge-wrap">';
                                      	if(info.flist[i].headimgurl.indexOf("http")>=0)
                                		{
                                      		liStr += '<img id="showimg" class="weui_media_appmsg_thumb" src="' + info.flist[i].headimgurl + '" alt=""><div class="ui-badge-corner">' + info.flist[i].nickhot + '</div></div>';
                                         }
                                		else
                                		{
                                			liStr += '<img id="showimg" class="weui_media_appmsg_thumb" src="' + Gurl + info.flist[i].headimgurl + '" alt=""><div class="ui-badge-corner">' + info.flist[i].nickhot + '</div></div>';
                                        }
                                      	
                                      	liStr += '<div class="weui_media_bd"><h4 class="weui_media_title">' + info.flist[i].nickname +'</h4><p class="weui_media_desc">' + info.flist[i].nickjs + '</p></div>';
                                      	if(info.flist[i].nickimg.indexOf("http")>=0)
                                		{
                                      		liStr += '<div class="weui_media_bd"><div id="show-custom"  class="weui_btn weui_btn_mini weui_btn_primary ckright" fansid="' + info.flist[i].id + '">加好友</div><input type="hidden" name="fsimg' + info.flist[i].id + '" class="fscode_it' + info.flist[i].id + '" value="' + info.flist[i].nickimg + '" /></div></div></div></div>';							
                                         }
                                		else
                                		{
                                			liStr += '<div class="weui_media_bd"><div id="show-custom"  class="weui_btn weui_btn_mini weui_btn_primary ckright" fansid="' + info.flist[i].id + '">加好友</div><input type="hidden" name="fsimg' + info.flist[i].id + '" class="fscode_it' + info.flist[i].id + '" value="' + Gurl + info.flist[i].nickimg + '" /></div></div></div></div>';							
                                        }
                                     }
                                }                               
                                page++;
                                $("#sort_box").append(liStr);
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
