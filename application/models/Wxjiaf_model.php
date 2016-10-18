<?php
if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );
class Wxjiaf_model extends CI_model {
	function __construct() {
		parent::__construct ();
		$this->load->database ();
	}
	function openid_exist($openid){
 		$this->db->where('openid', $openid);
		$query = $this->db->get('weixin_fen');
 		return $query->num_rows();
 	}
 	function get_openid($openid){
 		$this->db->where ( 'openid', $openid );
 		$query = $this->db->get ( 'weixin_openid' );
 		$result = $query->result_array ();
 		if($result)
 			return $result [0] ;
 	}
 	function select_openid($openid){
 		$this->db->where ( 'openid', $openid );
 		$query = $this->db->get ( 'weixin_fen' );
 		$result = $query->result_array ();
 		return $result ;
 	}
 	function select_fid($fid){
 		$this->db->where ( 'id', $fid );
 		$query = $this->db->get ( 'weixin_fen' );
 		$result = $query->result_array ();
 		return $result ;
 	}
	function select($p = 0,$where,$order = 'date_time',$num = 10) {
		foreach ($where as $k => $v){
			$this->db->where ( 'weixin_fen.'.$k, $v );
		}
		
		$this->db->select ('weixin_fen.*,weixin_openid.nickname,weixin_openid.headimgurl'); // 关联的文章标题和作者
		$this->db->from ( 'weixin_fen' );
		$this->db->join ( 'weixin_openid', "weixin_fen.openid = weixin_openid.openid" ); // a表与b表关联的id		
		$this->db->order_by("weixin_fen.".$order, "desc");
		$this->db->limit($num,$p);
		
		$query = $this->db->get ();
		return $query->result_array ();
	}
	function get($where=array(),$num = 6,$order = 'id') {
		foreach ($where as $k => $v){
			$this->db->where ( 'weixin_fen.'.$k, $v );
		}
		$this->db->where('weixin_fen.vip_time >',time());
		$this->db->select ('weixin_fen.*,weixin_openid.nickname,weixin_openid.headimgurl'); // 关联的文章标题和作者
		$this->db->from ( 'weixin_fen' );
		$this->db->join ( 'weixin_openid', "weixin_fen.openid = weixin_openid.openid" ); // a表与b表关联的id	
		$this->db->order_by("weixin_fen.".$order, 'RANDOM');
		$this->db->limit($num);
		$query = $this->db->get ();
		return $query->result_array ();
	}
	//后台查询全部用户
	function select_all_num($where = array()) {

		//过滤掉未注册用户
		$this->db->where(array('nickimg !=' => ""));

		$query = $this->db->get ('weixin_fen');
		return $query->num_rows ();
	}


	function select_userinfo($where = array()){
		$this->db->where($where);
		$query = $this->db->get ('weixin_fen' );
		return $query->result_array ();
	}
	function update($where,$data) {
		$this->db->where ( $where );
		return $this->db->update ( 'weixin_fen', $data );
	}
	function insert($data) {
		$this->db->insert('weixin_fen', $data);

		return $this->db->insert_id() ? $this->db->insert_id () : FALSE;
	}
	//写积分数据
	function in_money($data) {
		$this->db->insert ( 'weixin_moneys', $data );
	    return $this->db->insert_id () ? $this->db->insert_id () : FALSE;
	}
}