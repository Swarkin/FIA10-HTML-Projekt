$("document").ready(bereit);

let app;
let start_screen;
let game_screen;

function bereit() {
    app = $("#app");
    start_screen = $("#start_screen");
    game_screen = $("#game_screen");

    template_laden(start_screen);
}

function template_laden(template) {
    app.empty();
    template.contents().clone().appendTo(app);
}
