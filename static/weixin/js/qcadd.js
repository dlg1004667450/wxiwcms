$(function() {
    $("a.upbtn").click(function() {
        if ($.trim($("input[name=wxtitle]").val()) == "") {
            alert("请填写我的昵称");
            return false
        }
        if ($.trim($("input[name=wxid]").val()) == "") {
            alert("请填写我的微信号");
            return false
        }
        if ($("input[name=wximg]").val() == "") {
            alert("请上传我的头像");
            return false
        }
        if ($("input[name=qrcode]").val() == "") {
            alert("请上传微信二维码");
            return false
        }
        if ($("#content").val() == "") {
            alert("请填写个人描述");
            return false
        }
        $("#codeform").submit()
    });
    var bar = $(".bar");
    var percent = $(".percent");
    var showimg = $("#showimg");
    var progress = $(".progress");
    var files = $(".files");
    var btn = $(".btn span");
    var btn1 = $(".btn");
    $("#fileupload").wrap("<form id='myupload' action='upimg.php?a=qcimg&r=" + Math.random() + "' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload").change(function() {
        $("#myupload").ajaxSubmit({
            dataType: "json",
            beforeSend: function() {
                showimg.empty();
                progress.show();
                var percentVal = "0%";
                bar.width(percentVal);
                bar.show();
                btn.show();
                btn1.show();
                files.hide();
                percent.show();
                percent.html(percentVal);
                btn.html("上传中...")
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + "%";
                bar.width(percentVal);
                percent.html(percentVal)
            },
            success: function(data) {
                progress.hide();
                var err = data.err;
                if (err) {
                    btn.html("重新上传");
                    bar.width("0");
                    percent.hide();
                    files.html('<font style="color:red">' + err + "</font>");
                    files.show();
                    $("input[name=feninfo\\[codeimg\\]]").val("")
                } else {

                	var img = data.pic;
                    var key = data.key;
                    var upid = data.upid;
                    percent.hide();

                    files.hide();
                    bar.hide();
                    btn.hide();
                    btn1.hide();

                    //if (img.indexOf("http://") < 0) {
                     //   img = "http://m.chaojirm.com/static/qcimg" + img
                    //}
                    showimg.html("<span><img src='" + img + "' width='100' class='qcimg'><span class='delimg' rel='" + img + "'>删除</span></span>");
                    btn.html("图片上传");
                    $("input[name=feninfo\\[codeimg\\]]").val(img);
                    $("input[name=qrcode_upid]").val(upid)
                }
            },
            error: function(xhr) {
            	alert();
                btn.html("重新上传");
                bar.width("0");
                percent.hide();
                files.show();
                files.html('<font style="color:red">图片上传失败!</font>');
                $("input[name=feninfo\\[codeimg\\]]").val("")
            }
        })
    });
    $(".delimg").live("click",
    function() {
        var pic = $(this).attr("rel");
        percent.hide();
        bar.hide();
        btn.show();
        btn1.show();
        files.hide();
        showimg.empty();
        progress.hide();
        $("input[name=feninfo\\[codeimg\\]]").val("")
    });
    var bar1 = $(".bar1");
    var percent1 = $(".percent1");
    var showimg1 = $("#showimg1");
    var progress1 = $(".progress1");
    var files1 = $(".files1");
    var btn2 = $(".btn1 span");
    var btn3 = $(".btn1");
    $("#fileupload1").wrap("<form id='myupload1' action='upimg.php?a=himg&fentype="+fentype+"&r=" + Math.random() + "' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload1").change(function() {
        $("#myupload1").ajaxSubmit({
            dataType: "json",
            beforeSend: function() {
                showimg1.empty();
                progress1.show();
                var percentVal = "0%";
                bar1.width(percentVal);
                bar1.show();
                btn2.show();
                btn3.show();
                files1.hide();
                percent1.show();
                percent1.html(percentVal);
                btn2.html("上传中...")
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + "%";
                bar1.width(percentVal);
                percent1.html(percentVal)
            },
            success: function(data) {
                var err = data.err;
                if (err) {
                    btn2.html("重新上传");
                    bar1.width("0");
                    percent1.hide();
                    files1.html('<font style="color:red">' + err + "</font>");
                    files1.show();
                    $("input[name=feninfo\\[photoimg\\]]").val("")
                } else {
                    var img = data.pic;
                    var key = data.key;
                    var upid = data.upid;
                    percent1.hide();
                    files1.hide();
                    bar1.hide();
                    btn2.hide();
                    btn3.hide();
                    /*if (img.indexOf("http://") < 0) {
                        img = "http://m.chaojirm.com/static/qcimg" + img
                    }*/
                    showimg1.html("<span><img src='" + img + "' width='100' class='qcimg'><span class='delimg1' rel='" + img + "'>删除</span></span>");
                    btn2.html("图片上传");
                    $("input[name=feninfo\\[photoimg\\]]").val(img);
                    $("input[name=wximg_upid]").val(upid)
                }
            },
            error: function(xhr) {
                btn2.html("重新上传");
                bar1.width("0");
                percent1.hide();
                files1.show();
                files1.html('<font style="color:red">图片上传失败!</font>');
                $("input[name=feninfo\\[photoimg\\]]").val("")
            }
        })
    });
    $(".delimg1").live("click",
    function() {
        var pic = $(this).attr("rel");
        percent1.hide();
        bar1.hide();
        btn2.show();
        btn3.show();
        files1.hide();
        showimg1.empty();
        progress1.hide();
        $("input[name=feninfo\\[photoimg\\]]").val("")
    });
    //pic2
    var bar2 = $(".bar2");
    var percent2 = $(".percent2");
    var showimg2 = $("#showimg2");
    var progress2 = $(".progress2");
    var files2 = $(".files2");
    var btn4 = $(".btn2 span");
    var btn5 = $(".btn2");
    $("#fileupload2").wrap("<form id='myupload2' action='upimg.php?a=qcimg&r=" + Math.random() + "' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload2").change(function() {
        $("#myupload2").ajaxSubmit({
            dataType: "json",
            beforeSend: function() {
                showimg2.empty();
                progress2.show();
                var percentVal = "0%";
                bar2.width(percentVal);
                bar2.show();
                btn4.show();
                btn5.show();
                files2.hide();
                percent2.show();
                percent2.html(percentVal);
                btn4.html("上传中...")
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + "%";
                bar2.width(percentVal);
                percent2.html(percentVal)
            },
            success: function(data) {
                var err = data.err;
                if (err) {
                    btn4.html("重新上传");
                    bar2.width("0");
                    percent2.hide();
                    files2.html('<font style="color:red">' + err + "</font>");
                    files2.show();
                    $("input[name=feninfo\\[pic2\\]]").val("")
                } else {
                    var img = data.pic;
                    var key = data.key;
                    var upid = data.upid;
                    percent2.hide();
                    files2.hide();
                    bar2.hide();
                    btn4.hide();
                    btn5.hide();
                    /*if (img.indexOf("http://") < 0) {
                     img = "http://m.chaojirm.com/static/qcimg" + img
                     }*/
                    showimg2.html("<span><img src='" + img + "' width='100' class='qcimg'><span class='delimg2' rel='" + img + "'>删除</span></span>");
                    btn4.html("图片上传");
                    $("input[name=feninfo\\[pic2\\]]").val(img);
                    $("input[name=pic2_upid]").val(upid)
                }
            },
            error: function(xhr) {
                btn4.html("重新上传");
                bar2.width("0");
                percent2.hide();
                files2.show();
                files2.html('<font style="color:red">图片上传失败!</font>');
                $("input[name=feninfo\\[pic2\\]]").val("")
            }
        })
    });
    $(".delimg2").live("click",
        function() {
            var pic = $(this).attr("rel");
            percent2.hide();
            bar2.hide();
            btn4.show();
            btn5.show();
            files2.hide();
            showimg2.empty();
            progress2.hide();
            $("input[name=feninfo\\[pic2\\]]").val("")
        })
    //pic2end
    //pic3
    var bar3 = $(".bar3");
    var percent3 = $(".percent3");
    var showimg3 = $("#showimg3");
    var progress3 = $(".progress3");
    var files3 = $(".files3");
    var btn6 = $(".btn3 span");
    var btn7 = $(".btn3");
    $("#fileupload3").wrap("<form id='myupload3' action='upimg.php?a=qcimg&r=" + Math.random() + "' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload3").change(function() {
        $("#myupload3").ajaxSubmit({
            dataType: "json",
            beforeSend: function() {
                showimg3.empty();
                progress3.show();
                var percentVal = "0%";
                bar3.width(percentVal);
                bar3.show();
                btn6.show();
                btn7.show();
                files3.hide();
                percent3.show();
                percent3.html(percentVal);
                btn6.html("上传中...")
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + "%";
                bar3.width(percentVal);
                percent3.html(percentVal)
            },
            success: function(data) {
                var err = data.err;
                if (err) {
                    btn6.html("重新上传");
                    bar3.width("0");
                    percent3.hide();
                    files3.html('<font style="color:red">' + err + "</font>");
                    files3.show();
                    $("input[name=feninfo\\[pic3\\]]").val("")
                } else {
                    var img = data.pic;
                    var key = data.key;
                    var upid = data.upid;
                    percent3.hide();
                    files3.hide();
                    bar3.hide();
                    btn6.hide();
                    btn7.hide();
                    /*if (img.indexOf("http://") < 0) {
                     img = "http://m.chaojirm.com/static/qcimg" + img
                     }*/
                    showimg3.html("<span><img src='" + img + "' width='100' class='qcimg'><span class='delimg3' rel='" + img + "'>删除</span></span>");
                    btn6.html("图片上传");
                    $("input[name=feninfo\\[pic3\\]]").val(img);
                    $("input[name=pic3_upid]").val(upid)
                }
            },
            error: function(xhr) {
                btn6.html("重新上传");
                bar3.width("0");
                percent3.hide();
                files3.show();
                files3.html('<font style="color:red">图片上传失败!</font>');
                $("input[name=feninfo\\[pic3\\]]").val("")
            }
        })
    });
    $(".delimg3").live("click",
        function() {
            var pic = $(this).attr("rel");
            percent3.hide();
            bar3.hide();
            btn6.show();
            btn7.show();
            files3.hide();
            showimg3.empty();
            progress3.hide();
            $("input[name=feninfo\\[pic3\\]]").val("")
        })
    //pic3end
    //pic4
    var bar4 = $(".bar4");
    var percent4 = $(".percent4");
    var showimg4 = $("#showimg4");
    var progress4 = $(".progress4");
    var files4 = $(".files4");
    var btn8 = $(".btn4 span");
    var btn9 = $(".btn4");
    $("#fileupload4").wrap("<form id='myupload4' action='upimg.php?a=qcimg&r=" + Math.random() + "' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload4").change(function() {
        $("#myupload4").ajaxSubmit({
            dataType: "json",
            beforeSend: function() {
                showimg4.empty();
                progress4.show();
                var percentVal = "0%";
                bar4.width(percentVal);
                bar4.show();
                btn8.show();
                btn9.show();
                files4.hide();
                percent4.show();
                percent4.html(percentVal);
                btn8.html("上传中...")
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + "%";
                bar4.width(percentVal);
                percent4.html(percentVal)
            },
            success: function(data) {
                var err = data.err;
                if (err) {
                    btn8.html("重新上传");
                    bar4.width("0");
                    percent4.hide();
                    files4.html('<font style="color:red">' + err + "</font>");
                    files4.show();
                    $("input[name=feninfo\\[pic4\\]]").val("")
                } else {
                    var img = data.pic;
                    var key = data.key;
                    var upid = data.upid;
                    percent4.hide();
                    files4.hide();
                    bar4.hide();
                    btn8.hide();
                    btn9.hide();
                    /*if (img.indexOf("http://") < 0) {
                     img = "http://m.chaojirm.com/static/qcimg" + img
                     }*/
                    showimg4.html("<span><img src='" + img + "' width='100' class='qcimg'><span class='delimg4' rel='" + img + "'>删除</span></span>");
                    btn8.html("图片上传");
                    $("input[name=feninfo\\[pic4\\]]").val(img);
                    $("input[name=pic4_upid]").val(upid)
                }
            },
            error: function(xhr) {
                btn8.html("重新上传");
                bar4.width("0");
                percent4.hide();
                files4.show();
                files4.html('<font style="color:red">图片上传失败!</font>');
                $("input[name=feninfo\\[pic4\\]]").val("")
            }
        })
    });
    $(".delimg4").live("click",
        function() {
            var pic = $(this).attr("rel");
            percent4.hide();
            bar4.hide();
            btn8.show();
            btn9.show();
            files4.hide();
            showimg4.empty();
            progress4.hide();
            $("input[name=feninfo\\[pic4\\]]").val("")
        })
    //pic4end
});


