/**
 * 
 */


// myCanvas 영역
let canvas = $('#myCanvas')[0];

let ctx = canvas.getContext('2d');
let w = $('#myCanvas').width();
let h = $('#myCanvas').height();


// 뱀&먹이 크기
let sq = 15;

let food;
let snake;


// 게임 시작 후 처음 움직이는 방향 설정
let d = 'RIGHT';


// 먹이 위치 랜덤 추출
function placeFood() {
    food = {
        x : Math.round(Math.random() * (w-sq) / sq),
        y : Math.round(Math.random() * (h-sq) / sq)
    }
}


// 뱀 위치 랜덤 추출
function placeSnake() {
    snake = {
        x : Math.round(Math.random() * (w-sq) / sq),
        y : Math.round(Math.random() * (h-sq) / sq)
    }

    // x, y축 라인에 붙어서 나왔을 때 움직이는 방향 설정
    if (snake.x == (w-sq)/sq) {
        d = 'LEFT';
    } else if (snake.y == 0) {
        d = 'DOWN';
    } else if (snake.y == (h-sq)/sq) {
        d = 'UP';
    }
}


// 위치에 맞춰 색 넣기
function paint_cell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq);

    // 가장자리 스트로크
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x * sq, y * sq, sq, sq);
}


// 먹이와 뱀 call
placeFood();
placeSnake();


// current score 선언
let current = parseInt($('#current').text());

// 0.1초마다 update 호출
let gameloop = setInterval(update, 200);
// levelUp();

// // 레벨업(속도향상)
// function levelUp() {
//     if (current > 1) {
//         gameloop = setInterval(update, 100);
//     } else if (current > 2) {
//         gameloop = setInterval(update, 90);
//     }
// }

function update() {
    if (d == 'RIGHT') {
        snake.x = snake.x + 1;
    } else if (d == 'LEFT') {
        snake.x = snake.x - 1;
    } else if (d == 'UP') {
        snake.y = snake.y - 1;
    } else if (d == 'DOWN') {
        snake.y = snake.y + 1;
    }

    // 뱀이 지나간 위치 검은색으로 채우기
    blank();

    paint_cell(food.x, food.y, 'gray');
    paint_cell(snake.x, snake.y, 'cornflowerblue');

    // 경계선에 닿을 시 게임 종료
    check_borders();
    check_food();
}


function blank() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
}

function check_borders() {
    if (snake.x <= 0 || snake.x >= (w-sq)/sq
        || snake.y <= 0 || snake.y >= (h-sq)/sq) {

        clearInterval(gameloop);
        showGameOver();
    }
}

function showGameOver(){
	let current = $('#current').text();
	$('#final').text(current);
	$("#gameover").fadeIn();
	$("#restart").fadeIn();
}


// keyboard Controller
$(document).keydown(function (e) {
    // 39 : RIGHT
    // 37 : LEFT
    // 38 : UP
    // 40 : DOWN

    let key = e.which;
    if (key == 37) {
        snake.x -= 1;
        d = 'LEFT';
    } else if (key == 38) {
        snake.y -= 1;
        d = 'UP';
    } else if (key == 39) {
        snake.x += 1;
        d = 'RIGHT';
    } else if (key == 40) {
        snake.y += 1;
        d = 'DOWN';
    }

    check_food();

});

function check_food() {
    if (food.x == snake.x && food.y == snake.y) {
        current += 1;
        $('#current').text(current);
        placeFood();
        }
}