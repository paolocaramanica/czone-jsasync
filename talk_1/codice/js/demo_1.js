
alert('Inizio script');

let btn = document.getElementById("btn_color");

btn.onclick = function() { // eseguita solo quando (e se) l'utente clicca sul pulsante
	let title = document.getElementById("title");
	if (title.style.color == 'rgb(255, 0, 0)')
		title.style.color = 'rgb(0, 0, 0)';
	else 
		title.style.color = 'rgb(255, 0, 0)';
}

alert('Fine script'); // eseguito dopo che l'utente ha cliccato OK sul primo alert