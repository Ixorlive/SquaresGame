var line_obj = document.getElementById('line');
var id;
var width = 100;

function start_progress_bar(w = 100)
{
	width = w;
	progress_bar();
}

function progress_bar()
{
	clearInterval(id);
	id = setInterval(fun, 10);
}

function fun()
{
	if (width == 0)
	{
		clearInterval(id)
		i = 0;
	}
	else
	{
		width -= 0.1;
		line_obj.style.width = width + '%';
	}
}

function stop_bar()
{
	clearInterval(id);
	line_obj.style.width = 0 + '%';
}