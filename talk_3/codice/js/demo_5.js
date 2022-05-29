// Async Await

// Somma asincrona con promise
async function SommaAsyncPromise(x,y) {
	return new Promise(function(resolve,reject) {
		setTimeout(function() {
			resolve(x+y);
		},3000);
	});
}

// Prodotto asincrono con promise
function ProdAsyncPromise(x,y) {
	return new Promise(function(resolve,reject) {
		setTimeout(function() {
			resolve(x*y);
		},3000);
	});
}

// Somma x,y,z e moltiplica il risultato per 2
async function Elaborazione(x,y,z) {
	let p = await SommaAsyncPromise(x,y);
	let q = await SommaAsyncPromise(p,z);
	let r = await ProdAsyncPromise(q,2);
	return r;
}

// Implementazione alternativa di SommaArray
async function SommaArray(v) {
	if (v.length == 1)
		return v[0];
	else {
		let s = await SommaAsyncPromise(v[0],v[1]);
		v.shift();
		v.shift();
		v.unshift(s);
		return SommaArray(v);
	}
}

console.log('Log prima della chiamata');
Elaborazione(3,4,8)
.then(function(r) {
	console.log(r);
});
console.log('Log dopo la chiamata'); // Appare prima del risultato

SommaArray([9,4,5,2,3])
.then((r) => console.log(r));;