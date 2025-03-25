$("document").ready(bereit);

function bereit() {
	$("#answer").on("keypress", answer_texteingabe)
}

function answer_texteingabe(event) {
	console.log(event.key);
	if (event.key === "Enter") {
		let nummer = parseInt($("#answer").val());
		answer_validieren(nummer)
	} else if (event.key !== "," && isNaN(event.key)) {
		// Eingabe ignorieren
		event.preventDefault();
	}
}

function answer_validieren(antwort) {
	console.log(number);
}
