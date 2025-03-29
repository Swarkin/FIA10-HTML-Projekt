$("document").ready(bereit);

function bereit() {
    $("#start").click(starten);
}

function starten() {
    template_auswechseln(game_screen);
}
