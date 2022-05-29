
function Somma(x,y) {
	return x+y;
}

let Differenza = function(x,y) {
	return x-y;
}

let Prodotto = (x,y) => x*y;

console.log(Somma(6,4));
console.log(Differenza(6,4));
console.log(Prodotto(6,4));

// Una funzione può essere passata come parametro ad un'altra funzione
let EffettuaOperazione = function(x,y,op) {
	return op(x,y);
}

console.log(EffettuaOperazione(10,7,Differenza));
console.log(EffettuaOperazione(5,4,Prodotto));