var obj_main = document.getElementById("main");
var obj_mod = document.getElementById("mod");
var obj_img = document.getElementById("imagesid");
var is_new_game;
setTimeout(paint_rect, 50);
// paint_rect();
hide_button_cont();

function hide_button_cont()
{
	if (localStorage['records'] === undefined)
	{
		is_new_game = true;
		var btn = document.getElementById("continue_btn");
		btn.style.display = "none";
	}
	else is_new_game = false;
}

function start()
{
	obj_main.className = "gamemode";
	obj_img.className = "gamemode";
	obj_mod.className = "container";
}

function back()
{
	obj_main.className = "container";
	obj_img.className = "images";
	obj_mod.className = "gamemode";
}

function start_new_game(gamemode = 1)
{
	localStorage.setItem('gamemode', gamemode);
	document.location.assign("game.html");
}

function new_game()
{
	if (!is_new_game)
	{
		var check = confirm("Вы уверены? Все предыдущие рекорды будут сброшены");
		if(check)
		{
			localStorage.removeItem('records');
			hide_button_cont();
			start();
		}
	}
	else (start())
}

function paint_rect()
{
	var rect_img = document.getElementsByClassName("square");
	var em = parseFloat(getComputedStyle(document.body).fontSize);
	rect_img[0].style.width = 210;
	rect_img[0].style.height = 210;
	paint_rect_by_id(rect_img[0], generateRect(3, 4));
	rect_img[1].style.width = 235 ;
	rect_img[1].style.height = 235;
	paint_rect_by_id(rect_img[1], generateRect(5, 5));
	rect_img[2].style.width = 245;
	rect_img[2].style.height = 245;
	paint_rect_by_id(rect_img[2], generateRect(7, 6));
	// rect_img[0].style.width = 210/em + 'em';
	// rect_img[0].style.height = 210/em + 'em';
	// paint_rect_by_id(rect_img[0], generateRect(3, 4));
	// rect_img[1].style.width = 235/em + 'em';
	// rect_img[1].style.height = 235/em + 'em';
	// paint_rect_by_id(rect_img[1], generateRect(5, 5));
	// rect_img[2].style.width = 245/em + 'em';
	// rect_img[2].style.height = 245/em + 'em';
	// paint_rect_by_id(rect_img[2], generateRect(7, 6));
}

function desc()
{
	document.location.assign("description.html");
}