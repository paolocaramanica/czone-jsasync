
fetch('./actions/get_rates.php')
.then(function(response){
	return response.json();
})
.then(function(rates){
	document.getElementById('loader_1').remove();
	for (let k in rates) {
		let row = document.createElement('tr');
		row.innerHTML = '<td></td><td></td>';
		row.querySelector("td:first-child").innerText = k;
		row.querySelector("td:nth-child(2)").innerText = rates[k];
		document.querySelector("#rates table").append(row);
	}
	
	let rate = rates['BTC/EUR'];
	
	return fetch('./actions/get_wallet.php?rate=' + rate.toString());
})
.then(function(response){
	return response.json();
})
.then(function(wallets){
	document.getElementById('loader_2').remove();
	for (let k in wallets) {
		let row = document.createElement('tr');
		row.innerHTML = '<td></td><td></td>';
		row.querySelector("td:first-child").innerText = k;
		row.querySelector("td:nth-child(2)").innerText = wallets[k];
		document.querySelector("#wallet table").append(row);
	}
});