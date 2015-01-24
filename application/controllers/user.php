<?php 
/**
 * 
 */
 class User extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 		if (!isset($_SESSION)) {
 			session_start();
 		} 	
  	}
  	
 	function tampil_user()
 	{
 		$data['user'] = $this->Model->get('user'); 
 		$this->load->view('app/content/user', $data);
 	}

 	function hapus_user()
 	{
 		if ($_POST) {
	 		if($this->Model->delete('user', array('nim_nip' => $_POST['id'] ))){
	 			echo true;
 			} else{
 				echo false;
 			}
 		} else {
 			echo false;
 		}
 	}

 	function cari_user($param=null)
 	{
 		if ($param) {
	 		$param = $this->Model->get('user','', 'nim_nip', $param, 'nama');
	 		if ($param) {
	 			echo json_encode($param, JSON_PRETTY_PRINT);
	 		} else {
	 			echo "false";
	 		}
	 	} else {
	 		echo "false";
	 	}
 	}

 	} ?>