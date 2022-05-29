// Somma asincrona
function SommaAsync(x,y,callback) {
	setTimeout(function() {
		callback(x+y);
	},3000);
}

// Promisification
function SommaAsyncPromise(x,y) {
	return new Promise(function(resolve,reject) {
		SommaAsync(x,y,function(r) {
			resolve(r);
		});
	});
}

let p = SommaAsyncPromise(43,12);
p.then(function(r){
	console.log(r);
});