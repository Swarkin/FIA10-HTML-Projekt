$("document").ready(bereit);

const Api = "https://score.swarkin.dev"
const Schwierigkeit = {
	Leicht: "easy",
	Normal: "normal",
	Schwer: "hard",
}

let rangliste_tbody;

function bereit() {
	rangliste_tbody = $("#leaderboard-tbody");
	rangliste_anzeigen(Schwierigkeit.Normal);
}

function rangliste_anzeigen(schwierigkeit) {
	$.get(Api+"/score?difficulty="+schwierigkeit)
		.fail(function() {
			console.log("fail");
		})
		.done(function(result) {
			console.log("done");
			rangliste_tbody.empty();

			let names = [];
			let scores = [];

			result.forEach(eintrag => {
				names.push(eintrag["name"]);
				scores.push(eintrag["score"])
			});

			for (let i = 0; i < names.length; i++) {
				rangliste_tbody.append("<tr><td>"+names[i]+"</td><td>"+scores[i]+"</td></tr>");
			}
		}
	);
}
