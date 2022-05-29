

let xhr = new XMLHttpRequest();
xhr.open('GET',"./actions/get_rates.php");
xhr.send();
xhr.onload = function() { // eseguita solo quando (e se) il server risponde
	if (xhr.status == 200) {
		let data = JSON.parse(xhr.response);
		document.getElementById('loader').remove();
		for (let c in data) {
			let row = document.createElement('tr');
			row.innerHTML = '<td></td><td></td>';
			row.querySelector("td:first-child").innerText = c;
			row.querySelector("td:nth-child(2)").innerText = data[c];
			document.querySelector("#rates table").append(row);
		}
	}
	else {
		console.log('Error Code ' + xhr.status);
	}
}