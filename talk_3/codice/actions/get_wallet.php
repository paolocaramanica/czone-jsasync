<?php
	
	$seconds = rand(3,7);
	sleep($seconds);
	
	$rate = str_replace(',','',$_GET['rate']);
	
	$val_1 = rand(10,100) / 10;
	$val_2 = rand(10,100) / 10;
			
	$wallets = array('Wallet 1' => number_format($val_1 * $rate,2), 'Wallet 2' => number_format($val_2 * $rate,2));
	
	header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($wallets,JSON_UNESCAPED_UNICODE);
	
?>