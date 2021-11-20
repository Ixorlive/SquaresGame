var seconds = 0, minute = 0;
var time = document.getElementById("time");
time.innerHTML = "Время: 0:00";
var seconds_timer_id;

function timer() {
    if (seconds > 58) {
        seconds = 0;
        minute++;
        time.innerHTML = "Время: " + minute + ":00";
    } else {
        seconds++;
        if (seconds < 10) time.innerHTML = "Время: " + minute + ":0" + seconds;
        else time.innerHTML = "Время: " + minute + ":" + seconds;
    }
}

function stop_timer()
{
    clearInterval(seconds_timer_id);
}

function start_timer()
{
    seconds_timer_id = setInterval(timer, 1000);
}

function get_sec_min()
{
    var arr = [seconds, minute];
    return arr;
}