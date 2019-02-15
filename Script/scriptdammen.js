var board = [
  ["c", "Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z"],
  ["Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z", "c"],
  ["c", "Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z"],
  ["Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "W", "c", "W", "c", "W", "c", "W", "c", "W"],
  ["W", "c", "W", "c", "W", "c", "W", "c", "W", "c"],
  ["c", "W", "c", "W", "c", "W", "c", "W", "c", "W"],
  ["W", "c", "W", "c", "W", "c", "W", "c", "W", "c"]
]

createBoard();

function createBoard(){
  var container = document.getElementById("game-container");

  for (r=0; r < board.length; r++){
    var row = createRow();
    container.appendChild(row);

    for (i=0; i < board[r].length; i++){

      switch(board[r][i]){
        case "c":;
          row.appendChild(createEmpty());
          break;

        case "Z":
          var empty = row.appendChild(createEmpty());
          empty.appendChild(createBlack());
          break;

        case "b":
          row.appendChild(createEmpty());
          break;

        case "W":
          var empty = row.appendChild(createEmpty());
          empty.appendChild(createWhite());
          break;
      }
    }
  }
}

function createBlack(){
  var black = document.createElement("img");
  black.setAttribute("src", "Img/Zwartesteen.png");
  return black;
}

function createWhite(){
  var white = document.createElement("img");
  white.setAttribute("src", "Img/wittesteen.png");
  return white;
}

function createRow(){
  var row = document.createElement("div");
  row.setAttribute("class", "row-container");
  return row;
}

function createEmpty(){
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");
  return empty;
}

function createSpace(){
  var space = document.createElement("br");
  return space;
}
