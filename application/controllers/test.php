<?php 

/**
 * 
 */
 class Test extends CI_Controller
 {
 	
 	function __construct()
 	{
 		parent::__construct();
 	}

 	function index()
 	{
 		var_dump($_POST);
 		foreach ($_POST as $key => $value) {
 			$set['key'][] = $key;
 			$set['value'][] = $value;
 		}
 		var_dump($set);
 	}
 } ?>