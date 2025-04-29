$("document").ready(bereit);

var start;
var schwierigkeit;

function bereit() {
	start = $("#start");
	schwierigkeit = $("#schwierigkeit");
	
	start.click(starten);
	start.focus();
}

function starten() {
	sessionStorage.setItem("schwierigkeit", schwierigkeit.val());
	template_auswechseln(game_screen);
}
