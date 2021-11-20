var theme = "dark"

check_theme();

function switchTheme() {

	var ingame = false;
	var element = document.getElementById('theme');
	if (element === null)
	{
		var element = document.getElementById('theme_game');
		ingame = true;;
	}

	var strdark = ingame ? "css/style.css":"css/mainpage.css";
	var strlight = ingame ? "css/lightstyle.css": "css/lightmainpage.css";

	if (theme != "dark") {
	element.href = strdark;
	element.classList.remove('light')
	element.classList.add('dark');
	theme = "dark";

	} else {
	element.href = strlight;
	element.classList.remove('dark')
	element.classList.add('light');
	theme = "light";
	}

	localStorage.removeItem('theme');
	localStorage.setItem('theme', theme);
}

function check_theme()
{
	var temp_theme = localStorage['theme'];

	if (temp_theme === undefined) return;

	if (temp_theme == "light" && theme == "dark") 
	{
		switchTheme();
	};
	return;
}