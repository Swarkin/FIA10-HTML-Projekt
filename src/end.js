$("document").ready(bereit);

var restart;
var back;
var score_feld;
var ergebnisse;
var uploadstatus;

function bereit() {
	restart = $("#restart");
	back = $("#back");
	score_feld = $("#score");
	ergebnisse = $("#results-tbody");
	uploadstatus = $("#upload-status");

	restart.click(neustarten);
	back.click(zurueck);

	let schwierigkeit = sessionStorage.getItem("schwierigkeit");
	let name = sessionStorage.getItem("name");
	let score = sessionStorage.getItem("ergebnis");
	let historie = JSON.parse(sessionStorage.getItem("historie"));
	sessionStorage.removeItem("ergebnis");
	sessionStorage.removeItem("historie");

	post_scores(schwierigkeit, name, score)
		.fail(function(error) {
			uploadstatus.text("❌ Score konnte nicht hochgeladen werden.");
			console.log(error);
		})
		.done(() => {
			uploadstatus.text("✅ Score wurde hochgeladen.");
			rangliste_anzeigen(schwierigkeit);
		});

	score_feld.text(score);
	ergebnisse.empty();

	for (let i = 0; i < historie.length - 1; i++) {
		const element = historie[i];
		let aufgabe_text = element["aufgabe"].join(" ");
		ergebnisse.append("<tr><td>"+aufgabe_text+"</td><td>"+element["antwort"]+"</td><td>"+element["score"]+"</td></tr>");
	}
}

function neustarten() {
	template_auswechseln(game_screen);
}

function zurueck() {
	template_auswechseln(start_screen);
}
