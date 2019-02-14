var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    //snake snelheid. Elke grid lengte in x en y kant
    dx: grid,
    dy: 0,

    //kijkt bij fouten van snake
    cells: [],

    // lengte van de slang na het eten van een appel
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// game loop
function loop() {
    requestAnimationFrame(loop);
    // Snelheid van de slang
    if (++count < 6) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    // snelheid van de slang velocity
    snake.x += snake.dx;
    snake.y += snake.dy;
    // horzontally position van hoek van scherm
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // Verticaal position van hoek van scherm
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    //zien waar de slang is geweest
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // teken de appel
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);
    // tekent de slang 1 cell per keer
    context.fillStyle = 'lime';
    snake.cells.forEach(function(cell, index) {


        // tekent de 1px grid waardoor je kan zien hoelang de grid is.
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        // slang die de appel eet
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            // canvas is 400x400 elke grid is 25x25.
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // kijkt of de cells niet door elkaar heen gaan.
        for (var i = index + 1; i < snake.cells.length; i++) {

            // als de slang zich zelf raakt dan begin je opnieuw.
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
// zorgt ervoor dat de slang luistert op de toetsen
document.addEventListener('keydown', function(e) {

    // naar links
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // naar boven
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // naar rechts
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // naar beneden
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
//start de game.
requestAnimationFrame(loop);
