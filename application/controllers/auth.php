<?php 
/**
 * 
 */
 class Auth extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 		if (!isset($_SESSION)) {
 			session_start();
 		} 	
 	}

 	function login()
 	{
 		if ($_POST) {
	 		if (empty($_SESSION)) {
	 			echo $this->Model->login();
	 		} else{
	 			echo "false";
	 		}
 		} else {
 		echo "false";
 		}
 	}

 	function logout()
 	{
 		session_destroy();
 		redirect('/');
 	}

 	function reg()
 	{
 		if ($_POST) {
 			if ($this->Model->get('user', array('nim_nip' => $_POST['id'] ))) {
 				echo "id";
 			} else {
 				$param = array(
 				'nim_nip' => $_POST['id'],
 				'nama' => $_POST['nama'],
 				'password' => md5($_POST['pass'])
 				);
	 			if ($this->Model->add('user', $param )) {
	 				echo "true";
	 			} else {
	 				echo "false";
	 			}
 			}
 		} else {
 			echo "false";
 		}
 	}

 	function ceklogin()
 	{
 		var_dump($_SESSION);
 	}
 } ?>