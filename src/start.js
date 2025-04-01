$("document").ready(bereit);

function bereit() {
    let start = $("#start");
    start.click(starten);
    start.focus();
}

function starten() {
    template_auswechseln(game_screen);
}
