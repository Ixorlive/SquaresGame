var size = localStorage['gamemode'];
localStorage.removeItem('gamemode');
var level = 1;
var correct_id_ans;
var colors = ['#12005e', '#e64a19', '#ac0800', '#1e88e5',
    '#43a047', '#5e35b1', '#d81b60', '#ffea00'];
var timer;
var score = 0;
var animation_now = false;
if (size >= 3 && size <= 7) 
    {
       start();
    }

function start() {
    //check_theme();
    // set_mode();
    set_onclick();
    level = 0;
    start_timer();
    next_level();
}

//array = [#4444, #2222, ..., #2222]
function generateRect(recSize, level) {

    var arr = [];
    var temp_col = shuffle(colors);
    var rnd_color;

    if (level >= colors.length)
    {
        level = colors.length;
    }
    for (var i = 0; i < level; i++)
    {
        arr.push(temp_col[i]);
    }
    if (level == 8) rnd_color = 1;
    else rnd_color = random(level, colors.length - 1);
    for (var i = level; i < recSize*recSize; i++)
    {
        arr.push(temp_col[rnd_color]);
    }

    return shuffle(arr);
}
//paint rect_doc with arr(colors array with size*size length)
function paint_rect_by_id(rect_doc, arr)
{
    var width_rect = rect_doc.offsetWidth;
    var value_div = Math.sqrt(arr.length);
    var em = parseFloat(getComputedStyle(document.body).fontSize);
    var a = width_rect / value_div - 2;
    for (var i = 0; i < arr.length; i++) {
        var part = document.createElement('div');
        part.style.backgroundColor = arr[i];
        part.style.width = a/em + 'em';
        part.style.height = a/em + 'em';
        part.style.border = 1/em + "em solid #000";
        part.style.display = 'flex';
        rect_doc.append(part);
    }
}

function paint_rect_answers(sample_col)
{
    var correct_ans = random(0, 7);
    var arr_cols = [];

    child_div = document.querySelectorAll('#rec_answers > *');

    for (var i = 0; i <= child_div.length; i++) {
        
        if (i == correct_ans)
        {
            arr_cols.push(sample_col);
        }

        rand_col = generateRect(size, level);
        var j = 0;
        while (j != i)
        {
            if (rand_col == arr_cols[j])
            {
                rand_col = generateRect(size, level);
                j = 0;
                continue;
            }
            j++;
        }
        arr_cols.push(rand_col);
    }
    correct_id_ans = ++correct_ans;
    for (var i = 0; i < child_div.length; i++) 
    {
        paint_rect_by_id(child_div[i], arr_cols[i]);
        child_div[i].style.transform = 'rotate(' + random(0, 10)*27 + 'deg)';
    }
}

function random(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function clean_rect() {

    var sample_rec = document.getElementById('sample_square');
    while (sample_rec.firstChild) {
        sample_rec.removeChild(sample_rec.firstChild);
    }

    child_div = document.querySelectorAll('#rec_answers > *');
    for (var i = 0; i < child_div.length; i++) 
    {
        while (child_div[i].firstChild) {
            child_div[i].removeChild(child_div[i].firstChild);
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function set_onclick()
{
    child_div = document.querySelectorAll('#rec_answers > *');
    for (var i = 0; i < child_div.length; i++) 
    {
        child_div[i].onclick = click_to_ans;
    }
}

function click_to_ans(e)
{
    if (!animation_now)
    {
        stop_bar();
        clearInterval(timer);
        var obj = e.target.closest('.square');
        var img_name;
        
        if (correct_id_ans == obj.id)
        {
            var score_obj = document.getElementById("score");
            score_obj.innerHTML = "Счёт: " + ++score;
            start_animation(obj, "correct");
        }
        else
        {   
            start_animation(obj, "wrong");
        }
        animation_now = !animation_now;
        setTimeout(next_level, 1200);
    }
    
}

function lose_game()
{
    next_level();
}

function next_level()
{
    animation_now = false;
    if (level == 10)
    {
        end_game()
        return;
    }
    level++;

    var rect_obj = document.getElementById('sample_square');
    clean_rect();
    var rec_color = generateRect(size, level);
    paint_rect_by_id(rect_obj, rec_color);
    paint_rect_answers(rec_color);
    clearInterval(timer);

    set_timer();
    
    var h2 = document.body.getElementsByTagName('h2');
    h2[0].innerHTML = level + "/10";
}

function start_animation(e, img, set = 1)
{
    if (set == 1)
    {
        img_correct = document.getElementById(img);
        var coords = e.getBoundingClientRect();
        img_correct.style.top = coords.top + pageYOffset + 'px';
        img_correct.style.left = coords.left + pageXOffset + 'px';
        img_correct.className = "correct_wrong_img2";

        setTimeout(start_animation, 1500, e, img, 0);
    }
    
    else
    {
        img_correct = document.getElementById(img);
        img_correct.className = "correct_wrong_img";
    }
}

function end_game()
{
    stop_timer();
    var time = get_sec_min();

    localStorage.setItem('score', score);
    localStorage.setItem('seconds', time[0]);
    localStorage.setItem('minutes', time[1]);
    localStorage.setItem('gamemode', size);
    document.location.assign("result.html");
}

function main_menu()
{
    document.location.replace("index.html");
}

function set_timer()
{
    var time_to_solve;
    if (level < 3)
    {
        time_to_solve = 3000;
    } else {
        if (level < 6){
            time_to_solve = 5000;
        }else {
            if (level < 8)
            {
                time_to_solve = 7000
            } else
            {
                time_to_solve = 10000;
            }
        }
    }
    start_progress_bar(time_to_solve / 100);
    timer = setTimeout(lose_game, time_to_solve);
}