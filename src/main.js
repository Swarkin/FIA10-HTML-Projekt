$("document").ready(bereit);

var app;
var schwierigkeit_input;
var name_input;

let start_screen;
let game_screen;
let end_screen;
let history_screen;

function bereit() {
	app = $("#app");
	schwierigkeit_input = $("#schwierigkeit");
	name_input = $("#name");

	start_screen = $("#start_screen");
	game_screen = $("#game_screen");
	end_screen = $("#end_screen");
	history_screen = $("#history_screen");

	let schwierigkeit = sessionStorage.getItem("schwierigkeit");
	if (!schwierigkeit) {
		schwierigkeit = "normal";
		sessionStorage.setItem("schwierigkeit", schwierigkeit);
	}

	if (!sessionStorage.getItem("name")) {
		name_aendern("Anonym");
	}

	let transition = template_auswechseln(start_screen);

	let funktion = () => {
		rangliste_anzeigen(schwierigkeit);
	};

	if (transition) {
		transition.finished.then(funktion);
	} else {
		funktion();
	}
}

function template_auswechseln(template) {
	const update = () => {
		app.empty();
		template.contents().clone().appendTo(app);
	};

	// Browser-Support überprüfen
	if (document.startViewTransition) {
		// Transition starten
		return document.startViewTransition(update);
	} else {
		update();
	}
}

function schwierigkeit_aendern(schwierigkeit) {
	let refresh = sessionStorage.getItem("schwierigkeit") != schwierigkeit;
	sessionStorage.setItem("schwierigkeit", schwierigkeit);

	let zeitanzeige = document.getElementById("zeitanzeige");
	switch (schwierigkeit) {
		case "easy":
			zeitanzeige.innerText = "15s";
			break;
		case "normal":
			zeitanzeige.innerText = "20s";
			break;
		case "hard":
			zeitanzeige.innerText = "30s";
			break;
	}

	if (refresh) {
		rangliste_anzeigen(schwierigkeit);
	}
}

function name_aendern(name) {
	sessionStorage.setItem("name", name);
}
