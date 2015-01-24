<?php 
/**
 * 
 */
 class File extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 		if (!isset($_SESSION)) {
 			session_start();
 		}
		if (!$_SESSION['id']) {
 			redirect('/');
 		} 	
 	}

 	function index()
 	{
 		$this->load->view('file/index');
 	}

 	function ubah_file($id=null)
 	{
 		if ($id) {
 			if ($_POST) {
	 			if ($this->Model->get('file', array('id_file' => $id))) {
	 				$param = array(
	 					'filename' => $_POST['filename'],
	 					'description' => $_POST['description'],
	 					'last_access_by' => $_SESSION['id'] 
	 					);
 					if ($this->Model->update('file', $param, array('id_file' => $id ))) {
 						echo "yeeey berhasil";
 					} else {
 						echo "cukup sudah perncarianku ini";
 					}
	 			} else {
	 				echo "kita aja nggak bisa nyari nya";
	 			}
 			} else {
 				echo "kita gak bisa apa-apa tanpa lo bro";
 			}
 		} else {
 			echo "apa yang mau kau ubah bro?";
 		}
 	}

 	function cari_file($id=null)
 	{
 		if ($id) {
 			if ($get = $this->Model->get('file', '', 'filename',$id)) {
 				echo json_encode($get);
 			} else {
 				echo "dan kau kemudian menyerah untuk mencari";
 			}
 		} else {
 			echo "dan tersesatlah kau yang mencari sesuatu yang tak ada.";
 		}
 	}


 } ?>