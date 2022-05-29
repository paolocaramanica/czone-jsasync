// Array dati: si assumono della stessa lunghezza
let a = [3,6,5,7,8];
let b = [8,2,9,9,5];

let n_dati = a.length; // lunghezza

// Creazione tabella e popolamento con i dati iniziali
(function() {
	for (let i=0; i<n_dati; i++) {
		let row = document.createElement('tr');
		row.innerHTML = '<td></td><td></td><td></td>';
		row.querySelector("td:first-child").innerText = a[i];
		row.querySelector("td:nth-child(2)").innerText = b[i];
		row.querySelector("td:nth-child(3)").innerText = '0';
		
		document.querySelector("#tab_somma table").append(row);
	}

	let row = document.createElement('tr');
		row.innerHTML = '<td></td><td></td><td></td>';
		row.querySelector("td:first-child").innerText = '0';
		row.querySelector("td:nth-child(2)").innerText = '0';
		row.querySelector("td:nth-child(3)").innerText = '0';
		
		document.querySelector("#tab_somma table").append(row);
})();


/* Somma tra due numeri eseguita in modo asincrono:
calcola il risultato di x + y e, appena è pronto, chiama callback passandoglielo */
function SommaAsync(x,y,callback) {
	let risultato =  x + y;
	let ritardo = 3000 + (Math.random() * 4000);
	setTimeout(function(){
		callback(risultato);
	},ritardo);
}

let somma = []; // somma dei due array elemento per elemento
let somma_1; // somma degli elementi del primo array
let somma_2; // somma degli elementi del secondo array
let somma_tot; // somma totale (tutti gli elementi dei due array)

for (let i=0; i<n_dati; i++) {
	SommaAsync(a[i],b[i],function(r) {
		somma[i] = r;
		document.querySelector("#tab_somma table tr:nth-child(" + (i+2).toString() + ") td:nth-child(3)").innerText = r;
	});
}

/* Somma degli elementi di un array eseguita usando solo SommaAsync
SommaAsync(a[0],a[1],function(r){
	SommaAsync(r,a[2],function(r){
		SommaAsync(r,a[3],function(r){
			SommaAsync(r,a[4],function(r){
				document.querySelector("#tab_somma table tr:nth-child(" + (n_dati + 2).toString() + ") td:first-child").innerText = r;
			});
		});
	});
});
*/

/* Effettua la somma degli elementi di un array, utilizzando solo SommaAsync,
e chiama callback passandole il risultato appena pronto:
usando la ricorsione, si ottiene una versione più elegante della precedente
 */
let SommaArray = function(v,cb) {
	if (v.length == 1)
		cb(v[0]);
	else {
		SommaAsync(v[0],v[1],function(res) {
			v.shift();
			v.shift();
			v.unshift(res);
			SommaArray(v,cb);
		});
	}
}

SommaArray(a,function(r){
	somma_1 = r;
	document.querySelector("tr:nth-child(" + (n_dati + 2).toString() + ") td:first-child").innerText = r;
	
	/* La somma tra somma_1 e somma_2 può essere calcolata solo quando entrambe 
	sono pronte: 
		somma_1 è pronta, quindi bisogna controllare se sia pronta anche somma_2 */
	if (typeof somma_2 != 'undefined')
		SommaAsync(somma_1,somma_2, function(r){
			somma_tot = r;
			document.querySelector("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(3)").innerText = r;
		});
});

SommaArray(b,function(r){
	somma_2 = r;
	document.querySelector("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(2)").innerText = r;
	
	/* La somma tra somma_1 e somma_2 può essere calcolata solo quando entrambe 
	sono pronte: 
		somma_2 è pronta, quindi bisogna controllare se sia pronta anche somma_1 */
	if (typeof somma_1 != 'undefined')
		SommaAsync(somma_1,somma_2, function(r){
			somma_tot = r;
			document.querySelector("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(3)").innerText = r;
		});
});


