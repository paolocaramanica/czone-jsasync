let xhr = new XMLHttpRequest();
xhr.open('GET',"./actions/get_rates.php");
xhr.send();
xhr.onload = function(){
	
	if (xhr.status == 200) {
		let data = JSON.parse(xhr.response);
		document.getElementById('loader_1').remove();
		for (let c in data) {
			let row = document.createElement('tr');
			row.innerHTML = '<td></td><td></td>';
			row.querySelector("td:first-child").innerText = c;
			row.querySelector("td:nth-child(2)").innerText = data[c];
			document.querySelector("#rates table").append(row);
		}
				
		let rate = data['BTC/EUR'];
		
		let xhr2 = new XMLHttpRequest();
		xhr2.open('GET',"./actions/get_wallet.php?rate=" + rate);
		xhr2.send();
		
		xhr2.onload = function() {
			if (xhr2.status == 200) {
				let data2 = JSON.parse(xhr2.response);
				document.getElementById("loader_2").remove();
					for (let c in data2) {
						let row = document.createElement('tr');
						row.innerHTML = '<td></td><td></td>';
						row.querySelector("td:first-child").innerText = c;
						row.querySelector("td:nth-child(2)").innerText = data2[c] + ' €';
						document.querySelector("#wallet table").append(row);
				}
			}
			else {
				console.log('Error Code: ' + xhr.status);
			}
		}
	}
	else {
		console.log('Error Code: ' + xhr.status);
	}
}