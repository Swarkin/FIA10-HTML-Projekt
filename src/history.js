$("document").ready(bereit);

var grid;
var table_template;

function bereit() {
	grid = $("#grid");
	table_template = $("#table_template");

	let gesamthistorie = localStorage.getItem("gesamthistorie");
	if (!gesamthistorie) {
		gesamthistorie = "[]";
	}
	gesamthistorie = JSON.parse(gesamthistorie);

	for (let i = 0; i < gesamthistorie.length; i++) {
		const durchlauf = gesamthistorie[i];
		let html = "";

		for (let j = 0; j < durchlauf.length - 1; j++) {
			const aufgabe = durchlauf[j];
			let aufgabe_text = aufgabe["aufgabe"].join(" ");
			html += "<tr><td>"+aufgabe_text+"</td><td>"+aufgabe["antwort"]+"</td><td>"+aufgabe["score"]+"</td></tr>";
		}

		let table = table_template.contents().clone().appendTo(grid);
		$("tbody", table).html(html);
	}
}
