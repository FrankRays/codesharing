<?php 
/**
 * 
 */
 class Project extends CI_Controller
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

 	function cari_project($id=null, $session=null)
 	{
 		if ($id) {
 			if ($session) {
 				$get = $this->Model->get('project', array('id_project' => $id, 'id_owner' => $_SESSION['id'] ));
 				if ($get) {
 					echo json_encode($get);
 					return true;
 				} else {
 					echo "gagal bra<br>";
 					return false;
 				}
 			} else {
 				$get = $this->Model->get('project', array('id_project' => $id ));
 				if ($get) {
 					echo json_encode($get);
 					return true;
 				} else {
 					echo "gagal bro";
 					return false;
 				}
 			}
 		} else {
 			echo "kesalahan bro";
 			return false;
 		}
 		
 	}

	function hapus_project()
 	{
 		if ($_POST['id']) {
 			$this->Model->delete('project',array('id_project' => $_POST['id'], 'id_owner' => $_SESSION['id']));
 			echo "true";
 		} else {
 			echo "false";
 		}
 	}

 	function tampil_list_project(){
 		if ($_POST) {
 			$get = $this->Model->get('project', array('id_owner' => $_SESSION['id'] ));
 			if ($get) {
 				foreach ($get as $row) {
 					$data[] = array('id' => $row->id_project, 'name' => $row->project_name, 'path' => $row->path);
 				}
 				echo json_encode($data,JSON_PRETTY_PRINT);
 			} else {
 				echo "empty";
 			}
 		} else {
 			echo "false";
 		}
 	}

	function project_detail()
 	{
 		if ($_POST['id']) {
 			$folder = array();
 			$file = array();
 			$detail = $this->Model->get('project, user', array('project.id_project = '.$_POST['id'].' AND id_owner = nim_nip' => null),'','','', 'project.*, user.nama');
 			$get = $this->Model->get('file', array('parent' => $_POST['id'], 'folder' => 1),'','','',array('id_file', 'filename', 'description','folder'),'filename', 'asc');
 			foreach ($get as $row) {
 				$folder[] = array('id' => $row->id_file, 'filename' => $row->filename, 'desc' => $row->description);
 			}
 			$get = $this->Model->get('file', array('parent' => $_POST['id'], 'folder' => 0),'','','',array('id_file', 'filename', 'description','folder'),'filename', 'asc');
 			foreach ($get as $row) {
 				$file[] = array('id' => $row->id_file, 'filename' => $row->filename, 'desc' => $row->description);
 			}
 			$detail = array('detail' => $detail, 'folder' => $folder, 'file' => $file, );
 			echo json_encode($detail, JSON_PRETTY_PRINT);
 		} else {
 			echo "error";
 		} 
 	}

 	function tambah_project()
 	{
 		if ($_POST) {
 			$get= $this->Model->get('project', array('id_owner' => $_SESSION['id'], 'project_name' => $_POST['name'] ));
 			if (!$get) {
 				if ($this->Model->add('project', array('id_owner' => $_SESSION['id'], 'project_name' => $_POST['name'], 'path' => $_POST['path'], 'description' => $_POST['desc']))) {
 					$get2 = $this->Model->get('project', array('id_owner' => $_SESSION['id'], 'project_name' => $_POST['name']))[0]->id_project;
 					echo $get2;
 				} else {
 					echo "error";
 				}
 			} else {
 				echo "exist";
 			}
 		} else{
 			echo "false";
 		}
 	}

 	function ubah_project($id=null)
 	{
 		if ($id) {
 			if ($this->cari_project($id,true)) {
 				if ($_POST) {
 					$param = array(
 						'project_name' => $_POST['project_name'],
 						'description' => $_POST['description'],
 					 );
 					$this->Model->update('project', $param,array('id_project' => $id ));
 					echo "echiiieeee.. yang bisa ubah project sendiri....";
 				} else {
 					echo "aduuh broo, kayaknya ada yang salah deh, ga bisa disimpan nih.";	
 				}
 			} else {
 				echo "kayaknya sih gda nih project kayak begituan";
 			}
 		} else {
 			echo "kesasar lagi yah bro";
 		}
 	}

 	function salin_project($id=null)
 	{
 		if($id){
 		  $get = $this->Model->get('project', array('id_project' => $id ));
 		  if ($get) {
 		    if($this->tambah_project($get[0]->project_name)){
 		       echo "true";  
 		    } else {
 		       echo "false";
 		    }
 		  } else {
 		    echo "false";
 		  }
 		} else{
            echo "false";
 		}
 	}


 } ?>