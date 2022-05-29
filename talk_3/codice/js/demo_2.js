
// Funzione somma sincrona
function Somma(x,y) {
	return x+y;
}

// Funzione somma asincrona con callback
function SommaAsync(x,y,callback) {
	setTimeout(function() {
		callback(x+y);
	},2000);
}

// Funzione somma asincrona con promise
function SommaAsyncPromise(x,y) {
	let p = new Promise(function(resolve,reject) {
		setTimeout(function() {
			resolve(x+y);
		},2000);
	});
	return p;
}

/* Stampare in console la somma tra 10 e 6 */

// Sincrona
console.log(Somma(10,6)); 

// Asincrona
SommaAsync(10,6,function(r){
	console.log(r);
});

// Promise
let a = SommaAsyncPromise(10,6);
a.then(function(res){
	console.log(res);
});

// Differenza tra numeri naturali con le promise
/* Nell'insieme dei numeri maggiori o uguali a 0, la differenza non è possibile se il
minuendo è minore del sottraendo */
function DiffAsyncPromise(x,y) {
	let p = new Promise(function(resolve,reject) {
		setTimeout(function(){
			if (x >= y)
				resolve(x-y);
			else 
				reject(new Error("Impossibile")); // Minuendo minore del sottraendo
		},3000);
	});
	return p;
}

// Differenza tra 24 e 10
let b = DiffAsyncPromise(24,10);
b.then(function(result) {
	console.log('Risultato: ' + result);
})
.catch(function(error) {
	console.log('Errore: ' + error);
})

// Differenza tra 12 e 45
let c = DiffAsyncPromise(12,45);
c.then(function(result) {
	console.log('Risultato: ' + result);
})
.catch(function(error) {
	console.log('Errore: ' + error);
})