$("document").ready(bereit);

var restart;
var back;
var score_feld;

function bereit() {
	restart = $("#restart");
	back = $("#back");
	score_feld = $("#score");

	restart.click(neustarten);
	back.click(zurueck);

	let schwierigkeit = sessionStorage.getItem("schwierigkeit");
	let name = sessionStorage.getItem("name");
	let score = sessionStorage.getItem("ergebnis");
	sessionStorage.removeItem("ergebnis");

	post_scores(schwierigkeit, name, score)
		.fail((error) => {
			console.log(error);
		})
		.done(() => {
			rangliste_anzeigen(schwierigkeit);
		});

	score_feld.text(score);
}

function neustarten() {
	template_auswechseln(game_screen);
}

function zurueck() {
	template_auswechseln(start_screen);
}
