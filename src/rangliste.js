$("document").ready(bereit);

const Api = "https://score.swarkin.dev"
const Schwierigkeit = {
	Leicht: "easy",
	Normal: "normal",
	Schwer: "hard",
}

var rangliste;

function bereit() {
	rangliste = $("#leaderboard-tbody");
	rangliste_anzeigen(Schwierigkeit.Normal);
}

function rangliste_anzeigen(schwierigkeit) {
	$.get(Api+"/score?difficulty="+schwierigkeit)
		.fail(function() {
			console.log("fail");
		})
		.done(function(result) {
			console.log("done");
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
