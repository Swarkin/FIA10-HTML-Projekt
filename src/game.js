$("document").ready(bereit);

var schwierigkeit;
var antwort_feld;
var score_feld;
var score_panel;
var aufgabe;
var antwort;
var score = 0;
var score_plus = 0;
var aufgabe_nr = -1;
var historie = [];

function bereit() {
	antwort_feld = $("#antwort");
	antwort_feld.on("keypress", antwort_eingabefilter);
	score_feld = $("#score");
	score_panel = $(".panel-score");
	schwierigkeit = sessionStorage.getItem("schwierigkeit");

	antwort_feld.focus();

	aufgabe_generieren(schwierigkeit);
	aufgabe_anzeigen();
	timer_starten(schwierigkeit);
}

function antwort_eingabefilter(event) {
	const antwort_leer = antwort_feld.val().length === 0;

	if (event.key === "Enter" && !antwort_leer) {
		// Enter gedrückt
		let eingabe = parseInt(antwort_feld.val());
		if (antwort == eingabe) {
			// Ergebnisse speichern
			historie[aufgabe_nr]["eingabe"] = eingabe;
			historie[aufgabe_nr]["score"] = score_plus;

			antwort_feld.val(""); // Antwortfeld leeren
			score_erhoehen();
			animation_flash("richtig");
			aufgabe_generieren(schwierigkeit);
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

function aufgabe_generieren(schwierigkeit) {
	aufgabe = [];
	aufgabe_nr += 1;
	score_plus = 1;
	let parameter_anzahl = 2;
	let zeichen = ["+", "-"];
	// Beschränkt auf nur ein Mal- oder Geteiltzeichen
	let besonderes_zeichen = false;
	// Begrenzt die nächste Zufallszahl
	let temp_limit = 0;

	switch (schwierigkeit) {
		case "easy":
			parameter_anzahl = 2;
			zeichen = ["+", "-"];
			break;
		case "normal":
			parameter_anzahl = zufalls_zahl(2, 3);
			zeichen = ["+", "-", "*"];
			break;
		case "hard":
			parameter_anzahl = zufalls_zahl(3, 4);
			zeichen = ["+", "-", "*", "/"];
			break;
	}

	for (let i = 0; i < parameter_anzahl; i++) {
		// Wenn bereits ein Mal- oder Geteiltzeichen existiert, verwende nur noch einfache, gerade Zahlen
		if (besonderes_zeichen) {
			aufgabe.push(zufalls_zahl(1, 5) * 2);
		} else {
			let max = (temp_limit != 0) ? temp_limit : 9;
			aufgabe.push(zufalls_zahl(0, max));
		}

		if (i < parameter_anzahl - 1) {
			temp_limit = 0;
			if (besonderes_zeichen) {
				zeichen = ["+", "-"];
			}

			let rechenzeichen = zufalls_rechenzeichen(zeichen);
			if (rechenzeichen == "*") {
				score_plus += 1;
				temp_limit = 5;
				besonderes_zeichen = true;
			} else if (rechenzeichen == "/") {
				score_plus += 3;
				besonderes_zeichen = true;
			}

			aufgabe.push(rechenzeichen);
		}
	}

	// Ergebnis berechnen
	antwort = math.evaluate(aufgabe.join(""));

	// Aufgabe in Historie speichern
	historie[aufgabe_nr] = { "aufgabe": aufgabe, "antwort": antwort };
}

function score_erhoehen() {
	score += score_plus;
	score_feld.text(score);
}

function zufalls_zahl(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zufalls_rechenzeichen(zeichen) {
	let zahl = zufalls_zahl(0, zeichen.length - 1);
	return zeichen[zahl];
}

function animation_flash(classname) {
	score_panel.addClass(classname);
	score_panel.css("outline", "none")

	const update = () => {
		score_panel.removeClass(classname);
		score_panel.css("outline", "")
	};

	if (document.startViewTransition) {
		document.startViewTransition(update);
	} else {
		update();
	}
}

function timer_starten(schwierigkeit) {
	const interval = 0.05;
	let zeit = 0;
	let zeit_s = 15;

	if (schwierigkeit == "normal") {
		zeit_s = 20;
	} else if (schwierigkeit == "hard") {
		zeit_s = 30;
	}

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
	sessionStorage.setItem("ergebnis", score);
	sessionStorage.setItem("historie", JSON.stringify(historie));
	template_auswechseln(end_screen);
}
