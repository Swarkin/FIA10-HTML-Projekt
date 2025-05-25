$("document").ready(bereit);

var rangliste;
var rangliste_titel;
var beschaeftigt = true;
var uebersicht;
var in_uebersicht = false;

function bereit() {
	rangliste = $("#leaderboard-tbody");
	rangliste_titel = $("#leaderboard-title");
	uebersicht = $("#history");
	uebersicht.click(uebersicht_wechseln);

	beschaeftigt = false
}

function rangliste_anzeigen(schwierigkeit) {
	if (beschaeftigt) {
		return;
	}
	beschaeftigt = true;
	rangliste_titel.text("Rangliste ("+schwierigkeit_deutsch(schwierigkeit)+")");
	
	get_scores(schwierigkeit)
		.fail(function(error) {
			rangliste.text("❌ Rangliste konnte nicht geladen werden.");
			console.log(error);
			beschaeftigt = false;
		})
		.done(function(result) {
			const update = () => {
				let names = [];
				let scores = [];

				rangliste.empty();
				result.forEach(eintrag => {
					names.push(eintrag["name"]);
					scores.push(eintrag["score"])
				});

				for (let i = 0; i < names.length; i++) {
					rangliste.append("<tr><td>"+names[i]+"</td><td>"+scores[i]+"</td></tr>");
				}
			};

			// Browser-Support überprüfen
			if (document.startViewTransition) {
				document.startViewTransition(update);
			} else {
				update();
			}

			beschaeftigt = false;
		});
}

function uebersicht_wechseln() {
	if (in_uebersicht) {
		template_auswechseln(start_screen);
		uebersicht.text("Übersicht");
	} else {
		template_auswechseln(history_screen);
		uebersicht.text("Zurück");

	}

	in_uebersicht = !in_uebersicht;
}

function schwierigkeit_deutsch(schwierigkeit) {
	switch (schwierigkeit) {
		case "easy":
			return "Leicht";
		case "normal":
			return "Normal";
		case "hard":
			return "Schwer";
	}
}
