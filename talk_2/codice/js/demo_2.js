
console.log('Pluto');

setTimeout(function() {
	console.log('Pippo');
},2000); // non blocca lo script

console.log('Topolino'); // viene stampato prima di 'Pippo'

/* Quando il risultato è pronto (dopo 3 secondi)
viene chiamata la funzione callback, a cui viene passato */
/*
let SommaAsync = function(x,y,callback) {
	let risultato = x+y;
	setTimeout(function() {
		callback(risultato);
	},3000);
} */

/* Quando il risultato è pronto (dopo un tempo variabile tra 3 e 7 secondi)
viene chiamata la funzione callback, a cui viene passato.
E' simile alla versione precedente commentata */
let SommaAsync = function(x,y,callback) {
	let risultato = x+y;
	let ritardo = 3000 + Math.random() * 4000;
	setTimeout(function() {
		callback(risultato);
	},ritardo);
}

/* Quando il risultato della somma (12) è pronto, viene passato ad alert (viene chiamata alert(12)) */
SommaAsync(5,7,alert);

let a = 32;
let b = 77;
let r;

SommaAsync(a,b,function(s) {
	r = s;
});

console.log(r);

setTimeout(function() {
	console.log(r);
},5000);