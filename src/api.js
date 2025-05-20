const Url = "https://score.swarkin.dev"

function get_scores(schwierigkeit, n = 10) {
	return $.get(Url+"/score?difficulty="+schwierigkeit+"&n="+n);
}

function post_scores(schwierigkeit, name, score) {
	let data = {"difficulty": schwierigkeit, "name": name, "score": parseInt(score)};
	return $.post(Url+"/score", JSON.stringify(data));
}
