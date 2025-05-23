$("document").ready(bereit);

var app;
var schwierigkeit_input;
var name_input;

let start_screen;
let game_screen;
let end_screen;

function bereit() {
	app = $("#app");
	schwierigkeit_input = $("#schwierigkeit");
	name_input = $("#name");

	start_screen = $("#start_screen");
	game_screen = $("#game_screen");
	end_screen = $("#end_screen");

	if (!sessionStorage.getItem("schwierigkeit")) {
		sessionStorage.setItem("schwierigkeit", "normal");
	}

	if (!sessionStorage.getItem("name")) {
		name_aendern("Anonym");
	}

	template_auswechseln(start_screen);
}

function template_auswechseln(template) {
	const update = () => {
		app.empty();
		template.contents().clone().appendTo(app);
	};

	if (document.startViewTransition) {
		document.startViewTransition(update);
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
