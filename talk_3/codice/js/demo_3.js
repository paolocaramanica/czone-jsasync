let a = [12,23,14,5,2];
let b = [3,7,12,15,2];

// Popolamento iniziale della tabella
(function() {
	for (let i = 0; i < a.length; i++) {
		let row = document.createElement('tr');
		row.innerHTML = '<td></td><td></td><td>0</td><td>0</td>';
		row.querySelector("td:first-child").innerText = a[i];
		row.querySelector("td:nth-child(2)").innerText = b[i];
		document.querySelector("table").append(row);
	}
	
	let row = document.createElement('tr');
	row.innerHTML = '<td>0</td><td>0</td><td>0</td><td>-</td>';
	document.querySelector("table").append(row);
})();

// Somma asincrona tra due numeri tramite le promise
function SommaAsyncProm(x,y) {
	return new Promise(function(resolve,reject){
		setTimeout(function() {
			resolve(x+y);
		},3000 + Math.random() * 4000);
	});
}

let somme = [];
let differenze = [];

for (let i=0; i<a.length; i++) {
	somme[i] = SommaAsyncProm(a[i],b[i]);
	somme[i].then(function(r) {
		document.querySelector("tr:nth-child(" + (i+2).toString() + ") td:nth-child(3)").innerText = r;
	});
}

/* Differenza tra numeri naturali:
	- possibile solo se il minuendo è maggiore o uguale del sottraendo
	- altrimenti dà errore (reject) */
function DifferenzaAsyncProm(x,y) {
	return new Promise(function(resolve,reject) {
		setTimeout(function() {
			if (x >= y)
				resolve(x-y);
			else
				reject(new Error("x < y"));
		},3000 + Math.random() * 4000);
	});
}

for (let i = 0; i<a.length; i++) {
	differenze[i] = DifferenzaAsyncProm(a[i],b[i]);
	differenze[i].then(function(r) {
		// in caso di resolve, scrive il risultato nella relativa casella
		document.querySelector("tr:nth-child(" + (i+2).toString() + ") td:nth-child(4)").innerText = r;
	})
	.catch(function(err) {
		// in caso di reject, nella relativa casella viene stampata una E
		document.querySelector("tr:nth-child(" + (i+2).toString() + ") td:nth-child(4)").innerText = "E";
	});
}

/* Somma degli elementi di un array
SommaAsyncProm(a[0],a[1])
.then(function(r) {
	return SommaAsyncProm(r,a[2]);
})
.then(function(r) {
	return SommaAsyncProm(r,a[3]);
})
.then(function(r) {
	return SommaAsyncProm(r,a[4]);
})
.then(function(r) {
	document.querySelector("tr:last-child td:first-child").innerText = r;
}) */

/* Implementazione alternativa che sfrutta la ricorsione */
function SommaAsyncArray(v) {
	if (v.length == 1)
		return new Promise(function(resolve,reject){
			resolve(v[0]);
		});
	else {
		return new Promise(function(resolve,reject) {
				SommaAsyncProm(v[0],v[1]).then(function(r) {
					v.shift();
					v.shift();
					v.unshift(r);
					resolve(SommaAsyncArray(v));
			});
		});
	}
}

let somma_1 = SommaAsyncArray(a)
somma_1.then(function(r) {
	document.querySelector("tr:last-child td:nth-child(1)").innerText = r;
});

let somma_2 = SommaAsyncArray(b)
somma_2.then(function(r) {
	document.querySelector("tr:last-child td:nth-child(2)").innerText = r;
});

Promise.all([somma_1,somma_2])
.then(function(r) {
	SommaAsyncProm(r[0],r[1])
	.then(function(r) {
		document.querySelector("tr:last-child td:nth-child(3)").innerText = r;
	});
});

Promise.all(somme)
.then(function(r) {
	document.querySelector("tr:first-child th:nth-child(3)").style.backgroundColor = "#00ff00";
});

Promise.any(somme)
.then(function(r) {
	document.querySelector("tr:first-child th:nth-child(3)").style.backgroundColor = "#ffff00";
});
