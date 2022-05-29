/* Per mitigare la callback hell, si possono creare due funzioni,
una per ogni chiamata AJAX:
La prima funzione, LoadTableRates, effettua la prima chiamata AJAX e popola la prima tabella,
dopodiché chiama la seconda funzione, LoadTableWallet. */
function LoadTableRates() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET',"./actions/get_rates.php");
	xhr.send();
	xhr.onload = function(){
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.response);
			let rate = data['BTC/EUR'];
			document.getElementById('loader_1').remove();
			for (let c in data) {
				let row = document.createElement('tr');
				row.innerHTML = '<td></td><td></td>';
				row.querySelector("td:first-child").innerText = c;
				row.querySelector("td:nth-child(2)").innerText = data[c];
				document.querySelector("#rates table").append(row);
			}
			LoadTableWallet(rate);
		}
		else {
			console.log('Error Code: ' + xhr.status);
		}
	}
}

function LoadTableWallet(rate) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET',"./actions/get_wallet.php?rate=" + rate);
	xhr.send();
	xhr.onload = function() {
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.response);
			document.getElementById("loader_2").remove();
			for (let c in data) {
				let row = document.createElement('tr');
				row.innerHTML = '<td></td><td></td>';
				row.querySelector("td:first-child").innerText = c;
				row.querySelector("td:nth-child(2)").innerText = data[c] + ' €';
				document.querySelector("#wallet table").append(row);
			}
		}
		else {
			console.log('Error Code: ' + xhr.status);
		}
	}
}

function LoadTables() {
	LoadTableRates();
}

/* Il pulsante con id "btn_update" permette di effettuare un refresh delle due tabelle 
senza dover ricaricare la pagina */

document.getElementById('btn_update').onclick = function() { // eseguita al click del pulsante
	
	document.querySelectorAll("#rates table tr:not(:first-child)").forEach(function(t) {
		t.remove();
	});
	
	// Cancella le righe e ripristina il loader, per ricondursi alla situazione precedente
	let loader_1 = document.createElement('p');
	loader_1.setAttribute('id','loader_1');
	loader_1.innerHTML = '<img src="./img/loader.gif" />';
	document.getElementById('rates').append(loader_1);
	
	document.querySelectorAll("#wallet table tr:not(:first-child)").forEach(function(t) {
		t.remove();
	});
	
	let loader_2 = document.createElement('p');
	loader_2.setAttribute('id','loader_2');
	loader_2.innerHTML = '<img src="./img/loader.gif" />';
	document.getElementById('wallet').append(loader_2);
	
	LoadTableRates();
}


LoadTables();
