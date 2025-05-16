$("document").ready(bereit);

var rangliste;
var beschaeftigt = true;

function bereit() {
	rangliste = $("#leaderboard-tbody");
	beschaeftigt = false
}

function rangliste_anzeigen(schwierigkeit) {
	if (beschaeftigt) {
		return;
	}
	beschaeftigt = true;
	
	get_scores(schwierigkeit)
		.fail(function(error) {
			rangliste.text("Rangliste konnte nicht geladen werden.");
			console.log(error);
			beschaeftigt = false;
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

			beschaeftigt = false;
		});
}
