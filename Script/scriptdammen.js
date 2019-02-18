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
          var empty = createEmptyW();
          empty.setAttribute("id", r + "." + i);
          row.appendChild(empty);
          break;

        case "Z":
          var empty = row.appendChild(createEmptyW());
          var black = createBlack();
          black.setAttribute("id", r + "." + i);
          empty.appendChild(black);
          break;

        case "b":
          var empty = createEmptyZ();
          empty.setAttribute("id", r + "." + i);
          row.appendChild(empty);
          break;

        case "W":
          var empty = row.appendChild(createEmptyW());
          var white = createWhite();
          white.setAttribute("id", r + "." + i);
          empty.appendChild(white);
          break;
      }
    }
  }
}



function createBlack(){
  var black = document.createElement("img");
  black.setAttribute("src", "Img/Zwartesteen.png");

  black.addEventListener("click", function(){
    movePiece(this);
  });
  return black;
}

function createWhite(){
  var white = document.createElement("img");
  white.setAttribute("src", "Img/wittesteen.png");

  white.addEventListener("click", function(){
    movePiece(this);
  });
  return white;
}

function createRow(){
  var row = document.createElement("div");
  row.setAttribute("class", "row-container");
  return row;
}

function createEmptyW(){
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");
  return empty;
}

function createEmptyZ(){
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");

  empty.addEventListener("click", function(){
    movePiece(this);
  });
  return empty;
}

function clearChildren(p){
  while(p.firstChild) {
    p.removeChild(p.firstChild)
  }
}

from = false;

function movePiece(elem){
  console.log(elem);
  var container = document.getElementById("game-container");
  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png"){
    from = elem;
  }
  else if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && isLegalMoveW(from, elem)){
    var posfrom = from.id.split(".");
    var posto = elem.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);

    var toR = parseInt(posto[0]);
    var toI = parseInt(posto[1]);

    console.log(toR);
    console.log(board[toR][toI]);

    board[toR].splice(toI, 1, "W");
    board[fromR].splice(fromI, 1, "b");


    from = false;
    clearChildren(container);
    createBoard();
  }

  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png"){
    from = elem;
  }
  else if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && isLegalMoveZ(from, elem)){
    var posfrom = from.id.split(".");
    var posto = elem.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);

    var toR = parseInt(posto[0]);
    var toI = parseInt(posto[1]);

    console.log(toR);
    console.log(board[toR][toI]);

    board[toR].splice(toI, 1, "Z");
    board[fromR].splice(fromI, 1, "b");


    from = false;
    clearChildren(container);
    createBoard();
  }
}

function isLegalMoveW(from, elem){
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  console.log(fromR);
  console.log(fromI);
  console.log(toR);
  console.log(toI);

  if (toR == fromR - 1 && toI == fromI -1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" || toI == fromI +1 && toR == fromR - 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png"){
    return true;
  }
  else{
    return false;
  }
}

function isLegalMoveZ(from, elem){
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  console.log(fromR);
  console.log(fromI);
  console.log(toR);
  console.log(toI);

  if (toR == fromR + 1 && toI == fromI -1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" || toI == fromI +1 && toR == fromR + 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png"){
    return true;
  }
  else{
    return false;
  }
}
