set_text();
var screen_done = false;

function set_text() 
{
	var seconds = localStorage['seconds'];
	localStorage.removeItem('seconds');

	var minutes = localStorage['minutes'];
	localStorage.removeItem('minutes');

	var score = localStorage['score'];
	localStorage.removeItem('score');

	var gamemode = localStorage['gamemode'];
	localStorage.removeItem('gamemode');

	if (seconds === undefined) seconds = 0;
	if (score === undefined) score = -1;
	if (gamemode === undefined) gamemode = 3;
	if (minutes === undefined) minutes = 0;

	var second_text = seconds < 10 ? "0" + seconds: seconds
	var minute_text = minutes < 10 ? "0" + minutes: minutes;
	var time_game = minute_text + ":" + second_text;
	var res_obj = document.getElementById("result");
	res_obj.innerHTML = "Игра окончена, вы набрали " + score +
						" за " + time_game + " в режиме игры " + 
						gamemode + " на " + gamemode;
	set_records(gamemode, score, time_game);
}

function back_to_menu()
{
	document.location.assign("index.html");
}

function screen() {

	if (!screen_done)
		{
			document.getElementById("hide_text").style.display = "block";

		    html2canvas(document.querySelector("#result")).then(canvas => {
		    	var container = document.getElementsByClassName("container");
		    	container[0].appendChild(canvas)
			});
			screen_done = true;
	}
}

function set_records(mod, score, time)
{
	var rec = localStorage['records'];
	localStorage.removeItem('records');

	if (rec === undefined)
	{
		var rec = {
			3: [0, " "],
			4: [0, " "],
			5: [0, " "],
			6: [0, " "],
			7: [0, " "]
		}
	}

	else rec = JSON.parse(rec);

	if (score > rec[mod][0])
	{
		rec[mod][0] = score;
		rec[mod][1] = time;
	}
	else if (score == rec[mod][0] && (time < rec[mod][1] || rec[mod][1] == " "))
	{
		rec[mod][1] = time;
	}

	localStorage.setItem('records', JSON.stringify(rec));
}

function save_results_to_file()
{
	var file_name = "records.txt";
	var text_in_file = set_text_records(),
	blob = new Blob([text_in_file], {type: 'text/plain'}),
	anchor = document.createElement('a');;

	anchor.download = file_name;
	anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
	anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
	anchor.click();
}

function set_text_records()
{
	var rec = localStorage['records'];

	rec = JSON.parse(rec);

	var text = "Ваши рекорды в игре Квадратики:\n";

	for (var i = 3; i < 8; i++)
	{
		text += "\t Режим " + i + " на " + i + ": ";

		if (rec[i][1] == " ")
		{
			text += "режим ещё не пройден \n";
		} else text += rec[i][0] + " очков за " + rec[i][1] + "\n";
	}

	return text;
}