<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->library('Sessions');
        $this->load->helper('url');
    }

    public function index() {
        $this->load->view('admin/login_form');
    }
    
    function check() {
        $this->load->model('login_model');
        $user = $this->login_model->select($this->input->post('username', TRUE));
        $post_password = md5($this->input->post('password', TRUE));

        if ($user) {
            if ($user[0]['password'] == $post_password) {

                $arr = array('s_id' => $user[0]['id']);
                // echo $this->sessions->userdata('s_id');
                $this->sessions->set_userdata($arr);
                redirect('admin/site/admin', 'refresh');
            } else {
                $this->index();
            }
        } else {
            $this->index();
        }
    }

    function is_login() {
        if ($this->sessions->userdata('s_id')) {
            redirect('admin/site/admin', 'refresh');
        } else {
            echo "no login";
        }
    }

    function logout() {
        $this->sessions->unset_userdata('s_id');
    }

}
