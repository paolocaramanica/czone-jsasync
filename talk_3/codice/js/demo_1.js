
let p = new Promise(function(resolve,reject) {
	setTimeout(function(){
		resolve('done');
	},2000);
});

console.log(p); // p esiste già, prima che siano trascorsi i 2 secondi

// la funzione passata come argomento al metodo then viene eseguita dopo (almeno) 2 secondi
p.then(function(r) {
	console.log(r);
});