$("document").ready(bereit);

let antwort_feld;
let score_feld;
let score_panel;
let aufgabe;
let antwort;
let score = 0;
let erlaubte_rechenzeichen = ["+", "-"];

function bereit() {
	antwort_feld = $("#antwort");
	antwort_feld.on("keypress", antwort_eingabefilter);
	score_feld = $("#score");
	score_panel = $(".panel-score");

	antwort_feld.focus();

	aufgabe_generieren();
	aufgabe_anzeigen();
	timer_starten(15);
}

function antwort_eingabefilter(event) {
	const antwort_leer = antwort_feld.val().length === 0;

	if (event.key === "Enter" && !antwort_leer) {
		// Enter gedrückt
		let eingabe = parseInt(antwort_feld.val());
		if (antwort == eingabe) {
			antwort_feld.val(""); // Antwortfeld leeren
			score_erhoehen(1);
			animation_flash("richtig");
			aufgabe_generieren();
			aufgabe_anzeigen();
		} else {
			animation_flash("falsch");
		}
	} else if (event.key === "-" && !antwort_leer) {
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
		// Eingabe ist keine Zahl, daher ablehnen
		event.preventDefault();
	}
}

function aufgabe_anzeigen() {
	$("#aufgabe").html(aufgabe.join(""));
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

	antwort = math.evaluate(aufgabe.join(""));
}

function score_erhoehen(zahl) {
	score += zahl;
	score_feld.text(score);
}

function zufalls_zahl(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zufalls_rechenzeichen() {
	let zahl = zufalls_zahl(0, erlaubte_rechenzeichen.length - 1);
	return erlaubte_rechenzeichen[zahl];
}

function animation_flash(classname) {
	score_panel.addClass(classname);
	score_panel.css("outline", "none")
	document.startViewTransition(() => {
		score_panel.removeClass(classname);
	score_panel.css("outline", "")
});
}

function timer_starten(zeit_s) {
	let interval = 0.05;
	let zeit = 0;

	let a = setInterval(() => {
		zeit += interval;
		score_panel.css("--timer", zeit / zeit_s);

		if (zeit >= zeit_s) {
			clearInterval(a);
			timer_vorbei();
		}
	}, interval * 1000);
}

function timer_vorbei() {
	document.startViewTransition(() => {
		$("#eingabebereich").hide();
		score_panel.css("background", "none");
		score_feld.css("font-size", "xxx-large");
	});
}
