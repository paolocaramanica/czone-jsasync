
console.log('pluto');
console.log('topolino');

setTimeout(function() {
		alert('pippo'); // non viene mai eseguita, poiché JavaScript è single thread
	}, 2000);
	
while(true) { // loop infinito che blocca lo script
	console.log('paperino');
}