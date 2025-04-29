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
		sessionStorage.setItem("name", "Anonym");
	}

	template_auswechseln(start_screen);
}

function template_auswechseln(template) {
	document.startViewTransition(() => {
		app.empty();
		template.contents().clone().appendTo(app);
	});
}

function schwierigkeit_aendern(schwierigkeit) {
	sessionStorage.setItem("schwierigkeit", schwierigkeit);
	rangliste_anzeigen(schwierigkeit);
}

function name_aendern(name) {
	sessionStorage.setItem("name", schwierigkeit);
}
