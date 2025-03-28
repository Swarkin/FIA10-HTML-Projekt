$("document").ready(bereit);

let antwort_feld;
let aufgabe;
let score = 0;

function bereit() {
	antwort_feld = $("#antwort");
	antwort_feld.on("keypress", antwort_eingabefilter);
	
	aufgabe_generieren();
	aufgabe_anzeigen();
}

function antwort_eingabefilter(event) {
	if (event.key === "Enter") {
		// Enter gedrückt
		let nummer = parseInt(antwort_feld.val());
		antwort_feld.val(""); // Antwortfeld leeren
		if (antwort_validieren(nummer)) {
			// Richtige Antwort
			score++;
			let aufgabe = aufgabe_generieren();
			aufgabe_anzeigen(aufgabe);
		}
	} else if (event.key === "-" && antwort_feld.val().length !== 0) {
		// Minus nur am Anfang erlauben
		event.preventDefault();
	} else if ([",", "-"].includes(event.key) && !antwort_feld.val().includes(event.key)) {
		// Komma und Minus nur ein mal erlauben
		return; // Eingabe zulassen
	} else if (event.key === "." && !antwort_feld.val().includes(",")) {
		// Punkt mit Komma austauschen
		antwort_feld.val(antwort_feld.val() + ",");
		event.preventDefault();
	} else if (isNaN(event.key)) {
		// Eingabe ist keine Zahl
		event.preventDefault(); // Eingabe ablehnen
	}
}

function antwort_validieren(antwort) {
	console.log(antwort);
	for (let i = 0; i < aufgabe.length; i++) {
		const element = aufgabe[i];
		// todo
	}
	return true;
}

function aufgabe_anzeigen() {
	$("#aufgabe").html(aufgabe.join(" "));
}

function aufgabe_generieren() {
	aufgabe = [];
	let parameter_anzahl = zufalls_zahl(2, 3);

	for (let i = 0; i < parameter_anzahl; i++) {
		aufgabe.push(zufalls_zahl(0, 9));

		if (i < parameter_anzahl - 1) {
			let rechenzeichen = zufalls_rechenzeichen();

			// todo: Saubere Teilbarkeit überprüfen, 0 vermeiden

			aufgabe.push(rechenzeichen);
		}
	}

	aufgabe.push("=");
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
