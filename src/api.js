const Url = "https://score.swarkin.dev"

function get_scores(schwierigkeit) {
	return $.get(Url+"/score?difficulty="+schwierigkeit);
}

function post_scores(schwierigkeit, name, score) {
    let data = {"difficulty": schwierigkeit, "name": name, "score": score};
	return $.post(Url+"/score", data);
}
