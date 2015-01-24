<?php 

/**
 * 
 */
 class App extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
		if (!isset($_SESSION)) {
 			session_start();
 		} 
 	}

 	function index()
 	{
 		if (isset($_SESSION['user']['id'])) {
 			if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 				$this->load->view('app/content/dashboard');
 			} else {
	 			$this->load->view('app/home');
 			}
 		} else {
 			$this->load->view('app/index');
 		}
 	}
 } ?>