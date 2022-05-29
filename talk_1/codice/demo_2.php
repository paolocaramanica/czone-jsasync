<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Demo 2 - esempio di chiamata sincrona</title>
		<link rel="stylesheet" href="./css/demo_2.css" />
	</head>
	<body>
		
		<h1>Demo 2 - esempio di chiamata sincrona</h1>
		
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
		?>
		
		<h2>Tassi di cambio di Bitcoin</h2>
		
		<table>
			<tr><th>Coppia</th><th>Tasso di cambio</th></tr>
			<?php 
				foreach ($rates as $k => $v) {
					echo '<tr>';
					echo '<td>'.$k.'</td>';	
					echo '<td>'.$v.'</td>';
					echo '</tr>';
				}
			?>
		</table>
	
	</body>
</html>