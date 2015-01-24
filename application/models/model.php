<?php 

/**
 * 
 */
 class Model extends CI_Model
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 		if (!isset($_SESSION)) {
 			session_start();
 		}
 	}

 	function add($tabel,$param)
 	{
 		$this->db->insert($tabel,$param);
 		return true;
 	}

 	function get($tabel,$where=NULL,$columnlike=null,$like=null,$orcolumnlike=null,$select=NULL,$field=NULL,$by=NULL)
 	{
 		if(!empty($where)){
			$this->db->where($where);
		}
		if (!empty($field)) {
			$this->db->order_by($field,$by);
		}
		if (!empty($limit)) {
			$this->db->limit($limit);
		}
		if (!empty($select)) {
			$this->db->select($select);
		}
		if (!empty($columnlike)) {
			$this->db->like($columnlike,$like);
		}
		if (!empty($orcolumnlike)) {
			$this->db->or_like($orcolumnlike,$like);
		}
		$query = $this->db->get($tabel);
		return $query->result();
	}
 	

 	function update($table, $param, $id)
 	{
 		$this->db->where($id);
		$this->db->update($table,$param);
		return true;
 	}

 	function delete($tabel,$param)
 	{
 		if ($this->get($tabel,$param)) {		
 			$this->db->delete($tabel,$param);
 			return true;
 		} else {
 			return false;
 		}

 	}
 	
 	function login()
 	{
 		$id 	= $_POST['id'];
		$pass 	= $_POST['pass'];
		$cekid 	= $this->db->get_where('user', array('nim_nip' => $id));
		if ($cekid->num_rows() != 0) {
			foreach ($cekid->result() as $row){
                $client['password'] 	= $row->password;
                $client['id'] 			= $row->nim_nip;
                $client['name'] 		= $row->nama;
            }
           	$passmd5 = md5($pass);
           	var_dump($passmd5, $client['password']);
            if ($passmd5 == $client['password']) {
            	$_SESSION['id'] 	= $client['id'];
            	$_SESSION['name'] 	= $client['name'];
            	return "true";
            } else {
            	return "password";
            }
		} else {
				return "id";
		}
 	}

 } ?>