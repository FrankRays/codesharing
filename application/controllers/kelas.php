<?php 
/**
 * 
 */
 class Kelas extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 		if (!isset($_SESSION)) {
 			session_start();
 		} 	
 	}

 	function buat_kelas()
 	{
 		if ($_POST) {
 			$get = $this->Model->get('kelas',array('nama_kelas' => $_POST['nama_kelas'], 'id_dosen' => $_SESSION['id'] ));
 			if (!$get) {
 				if ($this->Model->add('kelas', array('nama_kelas' => $_POST['nama_kelas'], 'id_dosen' => $_SESSION['id'] ))) {
					$get = $this->Model->get('kelas', array('nama_kelas' => $_POST['nama_kelas'], 'id_dosen' => $_SESSION['id'] ))[0]->id_kelas;
					echo $get;
	 			} else {
	 				echo "false";
	 			}
 			} else {
 				echo "exist";
 			}
 		} else {
 			echo "false";
 		}
 	}

 	function daftar_kelas($kelas=null)
 	{
 		if ($kelas) {
 			if ($this->Model->get('anggota',array('id_kelas' => $kelas, 'id_user' => $_SESSION['id'] ))) {
 				echo "you've join this class";
 				return false;
 			} else {
 				if ($this->Model->add('anggota', array('id_kelas' => $kelas, 'id_user' => $_SESSION['id'] ))) {
	 				echo "Berhasil daftar kelas"; 				
	 				return true;
	 			} else {
	 				echo "Gagal daftar kelas";
	 				return false;
	 			}
 			}
 		} else {
 			echo "Hey, what are you doing?";
 		}
	}

 	function keluar_kelas()
 	{
 		if ($_POST) {
 			if ($this->Model->get('anggota', array('id_user' => $_POST['user'], 'id_kelas' => $_POST['kelas']))) {
 				$this->Model->delete('anggota', array('id_user' => $_POST['user'], 'id_kelas' => $_POST['kelas']));
 				echo "true";
 			} else {
 				echo "false";
 			}
 		} else {
 			echo "false";
 		}
 	}


 	function hapus_kelas()
 	{
 		if ($_POST) {
 				$this->Model->delete('kelas', array('id_kelas' => $_POST['id'] ));
 				$this->Model->delete('anggota', array('id_kelas' => $_POST['id'] ));
 				echo "true";
 		} else {
 			echo "false";
 		}
 	}

 	function tampilkan_kelas()
 	{
 		if ($_SESSION['id']) {
 			$get = $this->Model->get('kelas', array('id_dosen' => $_SESSION['id'] ));
 			if ($get) {
 				foreach ($get as $row) {
 					$data[] = array('id' => $row->id_kelas, 'name' => $row->nama_kelas);
 				}
 				echo json_encode($data,JSON_PRETTY_PRINT);
 			} else {
 				echo "false";
 				return false;
 			}
 		} else {
 			echo "false";
 		} 		
 	}

 	function tampilkan_anggota()
 	{
 		if ($_POST['id']) {
 			$get = $this->Model->get('anggota,user', array("anggota.id_kelas = ".$_POST['id']." AND id_user = nim_nip" => null), '','','', 'anggota.id_user, user.nama');
 			if ($get) {
				foreach ($get as $row) {
 					$data[] = array('id' => $row->id_user, 'name' => $row->nama);
 				}
 				echo json_encode($data,JSON_PRETTY_PRINT);
 			} else {
 				return false;
 			}
 		} else {
 			return false;
 		} 
 	}


 } ?>