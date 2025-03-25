$("document").ready(bereit);

function bereit() {
	$("#answer").on("keypress", answer_texteingabe);
}

let term = null;

function answer_texteingabe(event) {
	if (event.key === "Enter") {
		let answer = $("#answer");
		let nummer = parseInt(answer.val());
		answer.val(""); // Antwortfeld leeren
		answer_validieren(nummer)
	} else if (event.key !== "," && isNaN(event.key)) {
		// Eingabe ignorieren
		event.preventDefault();
	}
}

function answer_validieren(antwort) {
	console.log(antwort);
}

function aufgabe_generieren() {
	let term = [];
	let parameter_anzahl = zufalls_zahl(1, 3);

	for (let i=0; i<parameter_anzahl; i++) {
		term.push(zufalls_zahl(0, 9));

		if (i < parameter_anzahl - 1) {
			term.push(zufalls_rechenzeichen());
		}
	}

	return term;
}

function zufalls_zahl(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zufalls_rechenzeichen() {
	switch (zufalls_zahl(1, 4)) {
		case 1:
			return "+";
		case 2:
			return "-";
		case 3:
			return "*";
		case 4:
			return "/";
	}
}
