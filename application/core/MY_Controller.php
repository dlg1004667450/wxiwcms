<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    public $openid = false;
    public $app;

    function __construct() {
        parent::__construct();
        $this->load->helper("url");
        $this->load->model('weixin_model');
        $this->config->load('wechat');
        $options = $this->config->item('wechat');
        $options ['logcallback'] = 'logdebug';
        $this->app = $options;
        $this->load->library('mywechat', $options);
        $this->load->library('doosession', 'wYU9F2qtuXo6WK2x');
        // uid openid access_token
        if (!$this->doosession->openid) {
            $oauth = $this->mywechat->getOauthAccessToken();
            $info = $this->mywechat->getUserInfo($oauth ['openid']);
            if ($info && isset($info ['openid']) && isset($info ['unionid'])) {
                $this->load->model('token_model');
                $re = $this->token_model->openid_select($info ['unionid']);
                if ($re && isset($re [0] ['openid'])) {
                    $wheres ['unionid'] = $info ['unionid'];
                    $data ['fopenid'] = $info ['openid'];
                    $this->token_model->openid_update($wheres, $data);
                    $this->openid = $this->doosession->openid = $re [0] ['openid'];
                } else {
                    // echo "请用微信使用3";
                    // exit;
                }
            } else {
                $this->mywechat->resetAuth();
                $info = $this->mywechat->getUserInfo($oauth ['openid']);
                $this->load->model('token_model');
                $re = $this->token_model->openid_select($info ['unionid']);

                if ($re && isset($re [0] ['openid'])) {

                    $this->openid = $this->doosession->openid = $re [0] ['openid'];
                } else {
                    // echo "请用微信使用1";
                    // exit;
                }
                // echo "---请用微信使用2";
                // exit;
            }
        }
    }

}

class Admin_Controller extends CI_Controller {

    public $data = false;

    function __construct() {
        parent::__construct();
        $this->load->library('Sessions');
        if (!$this->sessions->userdata('s_id')) {
            echo "no login";
            exit();
        }
    }

}

class WX_Controller extends CI_Controller {

    public $data = false;
    public $app;

    function __construct() {
        parent::__construct();

        $this->load->helper("url");

        $this->load->model('weixin_model');

        $this->config->load('wechat');

        $options = $this->config->item('wechat');

        $options ['logcallback'] = 'logdebug';

        $this->app = $options;

        $this->load->library('mywechat', $options);
    }

}
