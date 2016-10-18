<!DOCTYPE html>
<html lang="en" ng-app="weuiapp">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width,initial-scale=1,user-scalable=0">
        <title>趣事网络</title>
        <link rel="stylesheet"
              href="<?php echo base_url(); ?>static/newweixin/css/weui.min.css" />
        <link rel="stylesheet"
              href="<?php echo base_url(); ?>static/newweixin/css/jquery-weui.css">
    </head>
    <body>

        <style type="text/css">
            .weui_msg {
                padding-top: 3px;
            }

            .weui_grids_ck {
                content: " ";
                left: 0;
                top: 0;
                width: 100%;
                height: 5px;
                border-top: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }

            #header {
                width: 100%;
                height: 120px;
            }

            #content {
                width: 100%;
                height: 50px;
                position: relative;
            }

            .lf_sidebel {
                position: relative;
                float: left;
                padding: 2px 1px;
                width: 33.33333333%;
                box-sizing: border-box;
                border-right: 1px solid #D9D9D9;
                border-bottom: 1px solid #D9D9D9;
                border-top: 1px solid #D9D9D9;
                text-align: center;
                font-size: 12px !important;
            }

            .weui_grid_label {
                font-size: 12px;
            }

            .lf_sidebels {
                border-right: 0px solid #D9D9D9;
            }

            .weui_icon_area .imgs {
                margin: 0 auto;
                width: 80px;
                height: 80px;
            }

            .weui_icon_area img {
                width: 100%;
                height: 100%;
                display: block;
                overflow: hidden;
                background-repeat: no-repeat;
                -webkit-background-size: cover;
                -webkit-border-radius: 200px;
            }

            .city-time {
                font-size: 10px;
                color: #4e4f68;
                line-height: 1.2;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .weui_panel_hd {
                padding: 8px 15px 1px;
            }
            .bottom10 {
                margin-bottom: 50px;
            }
        </style>
        <div class="page ng-scope">
            <!-- meidder start -->
            <div class="bottom10">
                <div id="header">
                    <div class="weui_msg">
                        <div class="weui_icon_area">
                            <div class="imgs">
                                <img src="<?php echo $user['headimgurl']; ?>" alt="">
                            </div>
                            <p class="weui_msg_desc"><?php echo $user['nickname']; ?> /  uid：<?php echo $user['id']; ?></p>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div class="lf_sidebel">地区：<?php echo $user['province'] . " " . $user['city']; ?></div>
                    <div class="lf_sidebel">人气：18</div>
                    <div class="lf_sidebel lf_sidebels">粉币：20</div>
                </div>
                <div class="weui_grids">
                    <a href="<?php echo base_url(); ?>jiafen/from"
                       class="weui_grid js_grid" data-id="button">
                        <div class="weui_grid_icon">
                            <img
                                src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_panel.png"
                                alt="">
                        </div>
                        <p class="weui_grid_label"><?php
                            if (isset($fen) && $fen) {
                                echo "编辑名片";
                            } else {
                                echo "发布名片";
                            }
                            ?></p>
                    </a> <a href="<?php echo base_url(); ?>qun/add"
                            class="weui_grid js_grid" data-id="cell">
                        <div class="weui_grid_icon">
                            <img
                                src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_cell.png"
                                alt="">
                        </div>
                        <p class="weui_grid_label">发布微信群</p>
                    </a> <a href="#" class="weui_grid js_grid" data-id="toast">
                        <div class="weui_grid_icon">
                            <img
                                src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_toast.png"
                                alt="">
                        </div>
                        <p class="weui_grid_label">三级营销</p>
                    </a>
                </div>
                <div class="weui_panel weui_panel_access">
                    <div class="weui_panel_hd">我的名片</div>
                    <div class="weui_panel_bd">
                        <?php if (isset($fen) && $fen): ?>
                            <?php foreach ($fen as $v): ?>
                                <a href="<?php echo base_url(); ?>jiafen/from"
                                   class="weui_media_box weui_media_appmsg">
                                    <div class="weui_media_hd">
                                        <img class="weui_media_appmsg_thumb"
                                             src="<?php echo base_url() . $v['nickimg']; ?>">
                                    </div>
                                    <div class="weui_media_bd">
                                        <h4 class="weui_media_title"><?php echo $v["nickid"] ?></h4>
                                        <p class="weui_media_desc"><?php echo $v["nickjs"] ?></p>
                                        <p class="city-time"><?php echo dateWord($v['date_time'], time()); ?></p>
                                    </div>
                                </a>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="weui_panel weui_panel_access">
                    <div class="weui_panel_hd">我的微信群</div>
                    <div class="weui_panel_bd">
                        <?php if (isset($qun) && $qun): ?>
                            <?php foreach ($qun as $v): ?>
                                <a href="<?php echo base_url(); ?>qun/update?id=<?php echo $v["id"] ?>"
                                   class="weui_media_box weui_media_appmsg">
                                    <div class="weui_media_hd">
                                        <img class="weui_media_appmsg_thumb"
                                             src="<?php echo base_url() . $v['qunimg']; ?>">
                                    </div>
                                    <div class="weui_media_bd">
                                        <h4 class="weui_media_title"><?php echo $v["qunname"] ?></h4>
                                        <p class="weui_media_desc"><?php echo $v["qunjs"] ?></p>
                                        <p class="city-time"><?php echo dateWord($v['date_time'], time()); ?></p>
                                    </div>
                                </a>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <!-- footer start -->
            <div id="loading" class="loading bottom10" style="display: none;"></div>
            <div class="bd"
                 style="position: fixed; bottom: 0px; width: 100%; z-index: 999;">
                <div class="weui_tab">
                    <div class="weui_tab_bd">
                        <div class="weui_tabbar">
                            <a href="<?php echo base_url(); ?>jiafen/index"
                               class="weui_tabbar_item weui_bar_item_on">
                                <div class="weui_tabbar_icon">
                                    <img
                                        src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_button.png"
                                        alt="">
                                </div>
                                <p class="weui_tabbar_label">快速加粉</p>
                            </a> <a href="<?php echo base_url(); ?>user/er"
                                    class="weui_tabbar_item">
                                <div class="weui_tabbar_icon">
                                    <img
                                        src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_msg.png"
                                        alt="">
                                </div>
                                <p class="weui_tabbar_label">推广二维码</p>
                            </a> <a href="<?php echo base_url(); ?>user/index"
                                    class="weui_tabbar_item">
                                <div class="weui_tabbar_icon">
                                    <img
                                        src="<?php echo base_url(); ?>static/newweixin/images/icon_nav_article.png"
                                        alt="">
                                </div>
                                <p class="weui_tabbar_label">个人中心</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>