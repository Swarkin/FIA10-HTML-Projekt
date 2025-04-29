$("document").ready(bereit);

var app;
let start_screen;
let game_screen;
let end_screen;

function bereit() {
	app = $("#app");
	start_screen = $("#start_screen");
	game_screen = $("#game_screen");
	end_screen = $("#end_screen");

	template_auswechseln(start_screen);
}

function template_auswechseln(template) {
	document.startViewTransition(() => {
		app.empty();
		template.contents().clone().appendTo(app);
	});
}
