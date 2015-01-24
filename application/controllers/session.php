<?php 
/**
 * 
 */
 class Session extends CI_Controller
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

 	function create_session()
 	{
 		if ($_POST) {
 			$get = $this->Model->get('session', array('session_name' => $_POST['name'], 'id_kelas' => $_POST['kelas']));
 			if (!$get) {
 				$this->Model->add('session', array('session_name' => $_POST['name'], 'id_kelas' => $_POST['kelas']));
 				$get = $this->Model->get('session', array('session_name' => $_POST['name'], 'id_kelas' => $_POST['kelas']))[0]->id;
					echo $get;
 			} else {
 				echo "exist";
 			}
 		} else {
 			echo "false";
 		}
 	}

 	function open_session()
 	{
 		if ($_POST['id']) {
 			$this->Model->update('session',array('status' => 1),array('id' => $_POST['id']));
	 		echo "true";
 		} else {
 			echo "false";
 		}
 	}

 	function close_session()
 	{
 		if ($_POST['id']) {
 			$this->Model->update('session',array('status' => 0),array('id' => $_POST['id']));
	 		echo "true";
 		} else {
 			echo "false";
 		}		
 	}

 	function delete_session()
 	{
 		if ($_POST['id']) {
 			$this->Model->delete('session', array('id' => $_POST['id']));
 	 		echo "true";
 		} else {
 			echo "false";
 		}		
 	}

 	function masuk_session($session=null)
 	{
 		if ($session) {
 			$get = $this->Model->get('folder', array('parent' => $session ));
 			foreach ($get as $row) {
 				$folder[]['id'] = $row->id;
 				$folder[]['name'] = $row->folder_name;
 			}
 			$get2 = $this->Model->get('file', array('folder_id' => $session ));
 			foreach ($get as $row) {
 				$file[]['id'] = $row->id_file;
 				$file[]['name'] = $row->filename;;
 			}
 			echo json_encode($folder);
 			echo json_encode($filde);
 		} else {
 			echo "Mau kemana bro?";
 		} 	
 	}

 	function list_session()
 	{
 		if ($_POST['id']) {
 			$get = $this->Model->get('session', array('id_kelas' => $_POST['id'] ));
 			if ($get) {
 				foreach ($get as $row) {
 					if($row->status == 1){ $status = 'close';}else{$status = 'open';}
 					$data[] = array('id' => $row->id, 'name' => $row->session_name, 'status' => $status);
 				}
 				echo json_encode($data,JSON_PRETTY_PRINT);
 			} else {
 				echo "false";
 			}
 		} else {
 			echo "false";
 		}
 	}


 } ?>