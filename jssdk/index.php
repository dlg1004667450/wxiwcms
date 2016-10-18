<!DOCTYPE html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,user-scalable=no" name="viewport" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta name="format-detection" content="telephone=no" />
    <title>【{sh:$store.name}】{sh:$goodsData.name}</title>
    <link type="text/css" rel="stylesheet" href="{sh::PUB}css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="{sh::PUB}css/font-awesome.min.css">
    <script src="{sh::PUB}js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <style>
    body {
        background-color: #EFEFEF;
        min-width: 320px;
        max-width: 640px;
        margin: 0 auto;
    }

    .item-bottom {
        position: absolute;
        left: 0px;
        bottom: 0px;
        background: rgba(0, 0, 0, 0.4) none repeat scroll !important;
        width: 100%;
        color: #fff;
        line-height: 25px;
        padding-right: 5px;
        text-align: left;
        font-size: 13px;
        padding-left: 10px;
    }

    .qrcode img {
        width: 95%;
    }

    .qrcode strong {
        color: #cc0033;
        text-align: center;
        padding: 20px;
        display: block
    }

    .tip .title {
        height: 30px;
        margin: 10px;
        vertical-align: middle;
        line-height: 30px;
    }

    .tip .title img {
        padding: 5px;
        float: left;
    }

    .tip .title div {
        width: 100%;
        margin-left: 5px;
        height: 1px;
        background-color: #cc0033;
    }

    .tip .content {
        margin-left: 15px;
        margin-right: 15px;
        color: gray;
    }

    .tip .content strong {
        color: black;
    }

    .row_1 {
        width: 100%;
        display: -webkit-box;
        background-color: white;
        margin-bottom: 15px;
    }

    .row_2 {
        width: 100%;
        position: relative;
        background-color: white;
    }

    .row_2_1 {
        display: -webkit-box;
        margin-bottom: 10px;
    }

    .popover {
        display: inline;
        left: 80px;
        top: 10px;
        width: 70%;
    }

    .headimg {
        margin: 10px 10px;
    }

    .item-img {
        position: relative;
    }

    .price {
        color: #CC3300;
        font-size: 16px;
    }

    .money {
        display: inline-grid;
        font-size: 16px;
        padding: 10px 5px 5px 5px;
    }

    .sale {
        font-size: 14px;
        padding-left: 10px;
        color: gray;
    }

    .money_img {
        width: 70px;
        padding: 5px;
    }

    .popover-content {
        font-size: 14px;
    }
    </style>
</head>

<body>
    <div class="row_1">
        <div class="left">[站外图片上传中……(2)]</span>
        </div>
        <div class="right">
            <div class="money">分销佣金
                <font color='#CC0000'>{sh:$commission}</font>元</div>
            <div class="sale">已销售
                <font color='#CC0000'>
                    <php>echo ($goodsData['salecount'] + $goodsData['fakemembercount']);</php>
                </font>件</div>
        </div>
    </div>
    <div class="row_2">
        <if condition="$wxuserData.nickname neq ''">
            <div clas="row_2_1">
                <div class="left">[站外图片上传中……(3)]</div>
                <div class="popover right">
                    <div class="arrow"></div>
                    <div class="popover-content">
                        <p>我是
                            <font color='#FF9900'>{sh:$wxuserData.nickname}</font>，
                            <br/><span>我为<font color='#FF9900'>{sh:$store.name}</font>代言。</span></p>
                    </div>
                </div>
            </div>
        </if>
        <div class="row_2_2">
            <div class="item-img">
                [站外图片上传中……(4)]
                <div class="item-bottom">
                    <span>{sh:$goodsData.name}</span>
                    <div>
                        <span class="price">¥<strong>{sh:$goodsData.price}</strong></span>
                        <small><s>¥{sh:$goodsData.oprice}</s></small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row_2_3 qrcode text-center">
            [站外图片上传中……(5)]
            <strong>长按二维码 识别图中二维码</strong>
        </div>
    </div>
    <div class="row_3 tip">
        <div class="title">
            <i class="fa fa-sitemap"></i><span> 分销如何赚钱</span>
        </div>
        <div class="content">
            <div>
                <strong>第一步：</strong>转发商品链接或商品二维码图片给微信好友；
                <br/>
                <br/>
                <strong>第二步：</strong>从您转发的链接或图片进入商城的好友，系统将自动锁定成为您的客户，他们在微信商城中购买任何商品，您都可以获得分销佣金；
                <br/>
                <br/>
                <strong>第三步：</strong>您可以在分销中查看【我的团队】和【分销佣金】。好友确认收货后，佣金可提现。
                <br/>
                <br/>
            </div>
        </div>
    </div>
    <include file="./Tpl/Store/Public/Public_foot.html" />
</body>
<include file="./Tpl/Store/Wx_config.html"/>
<script>
// 微信JSSDK开发
wx.ready(function () {
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: '{sh:$wxShare.title}', // 商品名
      desc: '{sh:$wxShare.desc}', // 店铺名
      link: '{sh:$wxShare.link}', // 商品购买地址
      imgUrl: '{sh:$wxShare.imgUrl}', // 分享的图标
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });

    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: '{sh:$wxShare.title}', // 商品名
      link: '{sh:$wxShare.link}', // 商品购买地址
      imgUrl: '{sh:$wxShare.imgUrl}', // 分享的图标
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
});
</script>
</html>