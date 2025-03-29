$("document").ready(bereit);

let app;
let start_screen;
let game_screen;

function bereit() {
	app = $("#app");
	start_screen = $("#start_screen");
	game_screen = $("#game_screen");

	template_auswechseln(start_screen);
}

function template_auswechseln(template) {
	const auswechseln = () => {
		app.empty();
		template.contents().clone().appendTo(app);
	};

	if (!document.startViewTransition) {
		auswechseln();
	} else {
		document.startViewTransition(auswechseln);
	}
}
