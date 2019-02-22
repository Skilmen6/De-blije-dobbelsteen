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
var Wstones = 20;
var Bstones = 20;
var player = "W";
var jumpZ = false;
var jumpW = false;
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

var from = false;
var fromR = 1;
var fromI = 1;


function movePiece(elem){
  var jumpR = parseInt(checkJump()[0]);
  var jumpI = parseInt(checkJump()[1]);

  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && player == "W"){
    from = elem;
    console.log(player);
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && player == "W"){
    if (checkJump()){
      var posfrom = from.id.split(".");
      fromR = parseInt(posfrom[0]);
      fromI = parseInt(posfrom[1]);

      if (jumpR == fromR && jumpI == fromI){
        jumpPieceW(from, elem);
      }
      else{
        alert("U moet slaan");
        from = false;
      }
    }
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && isLegalMoveW(from, elem) && player == "W"){
    if (jumpPieceW(from, elem)){
      movePieceW(from, elem);
    }
    else{
      alert("u moet slaan");
    }
  }

  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && player == "Z"){
    console.log(player);
    from = elem;
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && player == "Z"){
    if (checkJump()){
      var posfrom = from.id.split(".");
      fromR = parseInt(posfrom[0]);
      fromI = parseInt(posfrom[1]);

      if (jumpR == fromR && jumpI == fromI){
        jumpPieceZ(from, elem);
      }
      else{
        alert("U moet slaan");
        from = false;
      }
    }
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && isLegalMoveZ(from, elem) && player == "Z"){
    if (jumpPieceZ(from, elem)){
      movePieceZ(from, elem);
    }
    else{
      alert("u moet slaan");
    }
  }
}

function isLegalMoveW(from, elem){
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

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

  if (toR == fromR + 1 && toI == fromI -1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" || toI == fromI +1 && toR == fromR + 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png"){
    return true;
  }
  else{
    return false;
  }
}

function movePieceW(from, elem){
  var container = document.getElementById("game-container");
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  board[toR].splice(toI, 1, "W");
  board[fromR].splice(fromI, 1, "b");
  console.log(jumpW);
  if (checkJump() && jumpW == true){
    player == "W";
    console.log(player);
  }
  else{
    player = "Z";
    jumpW = false;
  }
  from = false;
  clearChildren(container);
  createBoard();
}

function movePieceZ(from, elem){
  var container = document.getElementById("game-container");
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  board[toR].splice(toI, 1, "Z");
  board[fromR].splice(fromI, 1, "b");
  console.log(jumpZ);
  if (checkJump() && jumpZ == true){
    player == "Z";
    console.log(player);
  }
  else{
    jumpZ = false;
    player = "W";
  }
  from = false;
  clearChildren(container);
  createBoard();
}

function checkJump(){

  for (r=0; r < board.length; r++){

    for (i=0; i < board[r].length; i++){

      if (board[r][i] == "W" && player == "W"){

        if (board[r -1] && board[r -2] && board[r -1][i -1] == "Z" && board[r -2][i -2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "--";

          return rsisarr;
        }
        else if (board[r -1] && board[r -2] && board[r -1][i +1] == "Z" && board[r -2][i +2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "-+";

          return rsisarr;
          }
        else if (board[r +1] && board[r +2] && board[r +1][i -1] == "Z" && board[r +2][i -2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "+-";

          return rsisarr;
          }
        else if (board[r +1] && board[r +2] && board[r +1][i +1] == "Z" && board[r +2][i +2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "++";

          return rsisarr;
          }
        }
      else if (board[r][i] == "Z" && player == "Z"){

        if ( board[r -1] && board[r -2] && board[r -1][i -1] == "W" && board[r -2][i -2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "--";

          return rsisarr;
        }
        else if (board[r -1] && board[r -2] && board[r -1][i +1] == "W" && board[r -2][i +2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "-+";

          return rsisarr;
          }
        else if (board[r +1] && board[r +2] && board[r +1][i -1] == "W" && board[r +2][i -2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "+-";

          return rsisarr;
          }
        else if (board[r +1] && board[r +2] && board[r +1][i +1] == "W" && board[r +2][i +2] == "b"){
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "++";

          return rsisarr;
          }
      }
    }
  }
  return false;
}

function jumpPieceW(from, elem){
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);


  switch (checkJump()[2]) {
    case "--":
      if(toR == fromR -2 && toI == fromI -2){
        board[fromR -1].splice(fromI -1, 1, "b");
        jumpW = true;
        movePieceW(from, elem);
      }
      else if (isLegalMoveW(from, elem)){
        from = false;
        return false;
      }
      break;
    case "-+":
      if(toR == fromR -2 && toI == fromI +2){
        board[fromR -1].splice(fromI +1, 1, "b");
        jumpW = true;
        movePieceW(from, elem);
      }
      else if (isLegalMoveW(from, elem)){
        from = false;
        return false;
      }
      break;
    case "+-":
      if(toR == fromR +2 && toI == fromI -2){
        board[fromR +1].splice(fromI -1, 1, "b");
        jumpW = true;
        movePieceW(from, elem);
      }
    else if (isLegalMoveW(from, elem)){
      from = false;
      return false;
      }
    break;
    case "++":
      if(toR == fromR +2 && toI == fromI +2){
        board[fromR +1].splice(fromI +1, 1, "b");
        jumpW = true;
        movePieceW(from, elem);
      }
    else if (isLegalMoveW(from, elem)){
      from = false;
      return false;
      }
    break;
  }
  return true;
}

function jumpPieceZ(from, elem){
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);


  switch (checkJump()[2]) {
    case "--":
      if(toR == fromR -2 && toI == fromI -2){
        board[fromR -1].splice(fromI -1, 1, "b");
        jumpZ = true;
        movePieceZ(from, elem);
      }
      else if (isLegalMoveZ(from, elem)){
        from = false;
        return false;
      }
      break;
    case "-+":
      if(toR == fromR -2 && toI == fromI +2){
        board[fromR -1].splice(fromI +1, 1, "b");
        jumpZ = true;
        movePieceZ(from, elem);
      }
      else if (isLegalMoveZ(from, elem)){
        from = false;
        return false;
      }
      break;
    case "+-":
      if(toR == fromR +2 && toI == fromI -2){
        board[fromR +1].splice(fromI -1, 1, "b");
        jumpZ = true;
        movePieceZ(from, elem);
      }
    else if (isLegalMoveZ(from, elem)){
      from = false;
      return false;
      }
    break;
    case "++":
      if(toR == fromR +2 && toI == fromI +2){
        board[fromR +1].splice(fromI +1, 1, "b");
        jumpZ = true;
        movePieceZ(from, elem);
      }
    else if (isLegalMoveZ(from, elem)){
      from = false;
      return false;
      }
    break;
  }
  return true;
}
