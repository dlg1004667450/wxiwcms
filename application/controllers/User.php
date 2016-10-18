<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    function __construct() {
        parent :: __construct();
        $this->load->model('wxjiaf_model');
    }

    public function index_test() {
        $get_openid = $this->input->get('openid', TRUE);
        if ($this->doosession->openid) {
            $openid = $this->doosession->openid;
        } else {
            if ($get_openid) {
                $openid = $this->doosession->openid = $get_openid;
            } else {
                //$openid = "oLIXVwMTXsonYhuqLdTqIcelvYas";
                echo "获取openid错误!!";
                return;
            }
        }
        $data['user'] = $this->wxjiaf_model->get_openid($openid);
        if (!$data['user']) {
            echo "请取消关注，重新关注!!";
            return;
        }
        // 获取我的个人二维码
        $data['fen'] = $this->wxjiaf_model->select_openid($openid);
        // 获取我的群二维码
        $this->load->model('qun_model');
        $data['qun'] = $this->qun_model->select_openid($openid);

        // print_r($data['user']);
        $this->load->view('nwxin/user', $data);
    }
    
    public function index() {
        $get_openid = $this->input->get('openid', TRUE);
        if ($this->doosession->openid) {
            $openid = $this->doosession->openid;
        } else {
            if ($get_openid) {
                $openid = $this->doosession->openid = $get_openid;
            } else {
                //$openid = "oLIXVwMTXsonYhuqLdTqIcelvYas";
                echo "获取openid错误!!";
                return;
            }
        }
        $data['user'] = $this->wxjiaf_model->get_openid($openid);
        if (!$data['user']) {
            echo "请取消关注，重新关注!!";
            return;
        }
        // 获取我的个人二维码
        $data['fen'] = $this->wxjiaf_model->select_openid($openid);
        // 获取我的群二维码
        $this->load->model('qun_model');
        $data['qun'] = $this->qun_model->select_openid($openid);

        // print_r($data['user']);
        $this->load->view('nwxin/user', $data);
    }

}
