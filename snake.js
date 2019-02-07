var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // snelheid van de slang
    dx: grid,
    dy: 0,
    cells: [],

    // lengte van de slang bij het eten van appels
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// snelheid van de slang
function loop() {
    requestAnimationFrame(loop);
    if (++count < 6) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    // velocity van de slang
    snake.x += snake.dx;
    snake.y += snake.dy;
    // horizontall einde van het scherm
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // verticaal einde van het scherm
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // de appel
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);
    var fruit = document.createElement("img");
    fruit.setAttribute("src", "img/food.png");
    document.body.appendChild(fruit)
    // de slang die per aantal pixels beweegt
    context.fillStyle = 'lime';
    snake.cells.forEach(function(cell, index) {

        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        // slang eet appel
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            // canvas is 400x400 dat is 25x25 grids dat is ook even groot als een appel
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i++) {

            // als de slang zich zelf raakt restart het spel
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}
// zorgt ervoor dat de slang op  toetsenbord reageert
document.addEventListener('keydown', function(e) {
    // links
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // boven
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // rechts
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // beneden
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
// start
requestAnimationFrame(loop);