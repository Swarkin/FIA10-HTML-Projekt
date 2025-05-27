$("document").ready(bereit);

var start;
var schwierigkeit_select;
var name_input;

function bereit() {
	start = $("#start");
	schwierigkeit_select = $("#schwierigkeit");
	name_input = $("#name");

	// Vorherigen Namen laden
	let name = sessionStorage.getItem("name");
	if (name) {
		name_input.val(name);
	}

	let schwierigkeit = sessionStorage.getItem("schwierigkeit");

	if (schwierigkeit == "easy") {
		schwierigkeit_select.prop("selectedIndex", 0);
	} else if (schwierigkeit == "normal") {
		schwierigkeit_select.prop("selectedIndex", 1);
	} else if (schwierigkeit == "hard") {
		schwierigkeit_select.prop("selectedIndex", 2);
	}

	start.click(starten);
	start.focus();
}

function starten() {
	let name = name_input.val();
	if (!name) {
		name = "Anonym";
		name_aendern(name);
	}

	sessionStorage.setItem("schwierigkeit", schwierigkeit_select.val());
	template_auswechseln(game_screen);
}
