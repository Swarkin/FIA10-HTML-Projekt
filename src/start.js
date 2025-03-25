$("document").ready(bereit);

function bereit() {
    $("#start").click(starten);
}

function starten() {
    template_laden(game_screen);
}
