$("document").ready(bereit);

var rangliste;

function bereit() {
	rangliste = $("#leaderboard-tbody");
	rangliste_anzeigen("normal");
}

function rangliste_anzeigen(schwierigkeit) {
	get_scores(schwierigkeit)
		.fail(function() {
			rangliste.text("Rangliste konnte nicht geladen werden");
		})
		.done(function(result) {
			rangliste.empty();

			let names = [];
			let scores = [];

			result.forEach(eintrag => {
				names.push(eintrag["name"]);
				scores.push(eintrag["score"])
			});

			for (let i = 0; i < names.length; i++) {
				rangliste.append("<tr><td>"+names[i]+"</td><td>"+scores[i]+"</td></tr>");
			}
		}
	);
}
