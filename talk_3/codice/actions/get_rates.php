<?php
	
	$seconds = rand(3,7);
	sleep($seconds);
			
	$ch = curl_init();
	$url = "https://api.coindesk.com/v1/bpi/currentprice.json";
			
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			
	$ret_json = curl_exec($ch);
	$ret_obj = json_decode($ret_json);
			
	curl_close($ch);
			
	$rates = array('BTC/EUR' => $ret_obj->bpi->EUR->rate, 'BTC/USD' => $ret_obj->bpi->USD->rate, 'BTC/GBI' => $ret_obj->bpi->GBP->rate,);

	header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($rates,JSON_UNESCAPED_UNICODE);
	
?>