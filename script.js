
if(typeof(localStorage.getItem("highscore"))=='undefined'){
    localStorage.setItem('highscore',0);
}
if(typeof(localStorage.getItem("top1"))=='undefined') {
    localStorage.setItem('top1', 0);
}
if(typeof(localStorage.getItem("top2"))=='undefined') {
    localStorage.setItem('top2', 0);
}
if(typeof(localStorage.getItem("top3"))=='undefined') {
    localStorage.setItem('top3', 0);
}


var

    COLS = 26,
    ROWS = 26,
    EMPTY = 0,
    SNAKE = 1,
    FRUIT = 2,
    LEFT = 0,
    UP = 1,
    RIGHT = 2,
    DOWN = 3,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,

    canvas,
    ctx,
    keystate,
    frames,
    score,
    highscore = localStorage.getItem('highscore');

grid = {
    width: null,
    height: null,
    _grid: null,

    init: function (d, c, r) {
        this.width = c;
        this.height = r;
        this._grid = [];
        for (var x = 0; x < c; x++) {
            this._grid.push([]);
            for (var y = 0; y < r; y++) {
                this._grid[x].push(d);
            }
        }
    },

    set: function (val, x, y) {
        this._grid[x][y] = val;
    },

    get: function (x, y) {
        return this._grid[x][y];
    }
}

snake = {
    direction: null,
    last: null,
    _queue: null,

    init: function (d, x, y) {
        this.direction = d;
        this._queue = [];
        this.insert(x, y);
    },

    insert: function (x, y) {

        this._queue.unshift({x: x, y: y});
        this.last = this._queue[0];
    },

    remove: function () {
        // pop returns the last element of an array
        return this._queue.pop();
    }
};

function setFood() {
    var empty = [];
    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            if (grid.get(x, y) === EMPTY) {
                empty.push({x: x, y: y});
            }
        }
    }
    // chooses a random cell
    var randpos = empty[Math.round(Math.random() * (empty.length - 1))];
    grid.set(FRUIT, randpos.x, randpos.y);
}

/**
 * Starts the game
 */
var background = new Image();

function main() {

    canvas = document.createElement("canvas");
    canvas.width = COLS*20;
    canvas.height = ROWS*20;
    ctx = canvas.getContext("2d");
    // add the canvas element to the body of the document
    document.body.appendChild(canvas);
    ctx.font = "12px Helvetica";
    frames = 0;
    keystate = {};
    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
        delete keystate[evt.keyCode];
    });


    background.src = "img/gras2.jpg";

// Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        init();
        loop();
    }

}
/**
 * Resets
 */
function init() {
    score = 0;
    grid.init(EMPTY, COLS, ROWS);
    var sp = {x:Math.floor(COLS/2), y:ROWS-1};
    snake.init(UP, sp.x, sp.y);
    grid.set(SNAKE, sp.x, sp.y);
    setFood();
}
/**
 * The game loop function
 */
function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop, canvas);
}

function update() {
    frames++;

    if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
        snake.direction = LEFT;
    }
    if (keystate[KEY_UP] && snake.direction !== DOWN) {
        snake.direction = UP;
    }
    if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
        snake.direction = RIGHT;
    }
    if (keystate[KEY_DOWN] && snake.direction !== UP) {
        snake.direction = DOWN;
    }
    if (frames%5 === 0) {
        // pop the last element from the snake
        // head
        var nx = snake.last.x;
        var ny = snake.last.y;
        // updates the position
        switch (snake.direction) {
            case LEFT:
                nx--;
                break;
            case UP:
                ny--;
                break;
            case RIGHT:
                nx++;
                break;
            case DOWN:
                ny++;
                break;
        }
        if (0 > nx || nx > grid.width-1  ||
            0 > ny || ny > grid.height-1 ||
            grid.get(nx, ny) === SNAKE
        ) {
            // hier begint leaderboard
            if(score > highscore) {
                // console.log(score);
                // console.log(highscore);
                // console.log(localStorage.getItem('highscore'));
                highscore = score;
                localStorage.setItem('highscore', score);
                console.log("top1="+localStorage.getItem('top1'))
                console.log("top2="+localStorage.getItem('top2'))
                console.log("top3="+localStorage.getItem('top3'))
            }
            if(score > localStorage.getItem('top1')){
                localStorage.setItem('top1', score);
            }
            else if(score > localStorage.getItem('top2')){
                localStorage.setItem('top2', score);
            }
            else if(score > localStorage.getItem('top3')){
                localStorage.setItem('top3', score);
            }
            document.getElementById('top1').innerHTML = "top1="+localStorage.getItem('top1');
            document.getElementById('top2').innerHTML = "top2="+localStorage.getItem('top2');
            document.getElementById('top3').innerHTML = "top3="+localStorage.getItem('top3');

            // if (score > localstorage.getItem('highscore')){
            //     localstorage.setItem('highscore', score)
            // }
            alert('je bent af klik op de "ok" knop om opnieuw te beginnen')
            return init();
        }
        if (grid.get(nx, ny) === FRUIT) {
            // New position for Food
            score++;
            setFood();
        } else {

            var tail = snake.remove();
            grid.set(EMPTY, tail.x, tail.y);
        }

        grid.set(SNAKE, nx, ny);
        snake.insert(nx, ny);
    }
}

function draw() {

    var tw = canvas.width/grid.width;
    var th = canvas.height/grid.height;

    for (var x=0; x < grid.width; x++) {
        for (var y=0; y < grid.height; y++) {

            switch (grid.get(x, y)) {
                case EMPTY:
                    ctx.fillStyle = "#3c702c";
                    break;
                case SNAKE:
                    ctx.fillStyle = "#1fa327";
                    break;
                case FRUIT:
                    ctx.fillStyle = "#f00";
                    break;
            }
            ctx.fillRect(x*tw, y*th, tw, th);
        }
    }
    // message to the canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE: " + score, 10, canvas.height-10);
    ctx.fillText("HIGH SCORE: " + highscore, canvas.width - 100, canvas.height-10);
}
// start and run the game
main()
var record = 100;


var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}




