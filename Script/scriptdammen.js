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
var Zstones = 20;
var player = "W";
var jumpZ = false;
var jumpW = false;
createBoard();

function createBoard() {
  var container = document.getElementById("game-container");

  for (r = 0; r < board.length; r++) {
    var row = createRow();
    container.appendChild(row);

    for (i = 0; i < board[r].length; i++) {

      switch (board[r][i]) {
        case "c":
          ;
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

function createBlack() {
  var black = document.createElement("img");
  black.setAttribute("src", "Img/Zwartesteen.png");

  black.addEventListener("click", function() {
    movePiece(this);
  });
  return black;
}

function createWhite() {
  var white = document.createElement("img");
  white.setAttribute("src", "Img/wittesteen.png");

  white.addEventListener("click", function() {
    movePiece(this);
  });
  return white;
}

function createRow() {
  var row = document.createElement("div");
  row.setAttribute("class", "row-container");
  return row;
}

function createEmptyW() {
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");
  return empty;
}

function createEmptyZ() {
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");

  empty.addEventListener("click", function() {
    movePiece(this);
  });
  return empty;
}

function clearChildren(p) {
  while (p.firstChild) {
    p.removeChild(p.firstChild)
  }
}

var from = false;
var fromR = 1;
var fromI = 1;
var jumpArrW = [];
var jumpArrZ = [];
var lastPosW = false;
var lastPosZ = false;
var lastPosJumpW = [];
var lastPosJumpZ = [];
var lastJumpW = true;
var lastJumpZ = true;

function movePiece(elem) {
  if (Zstones == 0){
    alert("Wit heeft gewonnen");
    return true;
  }
  if (Wstones == 0){
    alert("Zwart heeft gewonnen");
    return true;
  }
  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && player == "W") {
    if (from){
      from.style.border = "none";
    }
    from = elem;
    from.style.border = "1px solid red";
    console.log(player);
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && player == "W") {
    checkJump();
    // jumpOptW();
    console.log(lastPosW);
    if (lastPosW) {
      lastPosCheck();
      if (lastPosJumpW[0]) {
        for (i = 0; i < lastPosJumpW.length; i++) {
          if (lastPosJumpW[i]) {
            var jumpR = parseInt(lastPosJumpW[i][0]);
            var jumpI = parseInt(lastPosJumpW[i][1]);
            console.log(lastPosJumpW);

            var posfrom = from.id.split(".");
            fromR = parseInt(posfrom[0]);
            fromI = parseInt(posfrom[1]);

            if (jumpR == fromR && jumpI == fromI) {
              jumpPieceW(from, elem);
            } else if (jumpR !== fromR && jumpI !== fromI) {
              alert("U moet slaan");
              from = false;
              jumpArrW = [];
            }
          }
        }
      } else {
        player = "Z";
      }
      if (lastPosJumpW[0]){
        lastJumpW = false;
      } else {
        lastPosW = false;
        lastJumpW = true;
      }
    }
    for (i = 0; i < jumpArrW.length; i++) {
      if (jumpArrW[i] && lastJumpW) {
        var jumpR = parseInt(jumpArrW[i][0]);
        var jumpI = parseInt(jumpArrW[i][1]);

        var posfrom = from.id.split(".");
        fromR = parseInt(posfrom[0]);
        fromI = parseInt(posfrom[1]);

        console.log(i);
        console.log(jumpArrW);
        console.log(jumpR);
        console.log(fromR);
        console.log(jumpI);
        console.log(fromI);
        if (jumpR == fromR && jumpI == fromI) {
          jumpPieceW(from, elem);
        } else if (jumpR !== fromR && jumpI !== fromI) {
          alert("U moet slaan");
          from = false;
          jumpArrW = [];
        }
      }
    }
    lastPosJumpW = [];
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" && isLegalMoveW(from, elem) && player == "W") {
    if (jumpPieceW(from, elem) && lastPosJumpW[0] !== true) {
      movePieceW(from, elem);
    } else {
      alert("u moet slaan");
    }
  }

  if (elem.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && player == "Z") {
    console.log(player);
    if (from){
      from.style.border = "none";
    }
    from = elem;
    from.style.border = "1px solid red";
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && player == "Z") {
    checkJump();
    // jumpOptZ();
    console.log(lastPosZ);
    if (lastPosZ) {
      lastPosCheck();
      console.log(lastPosJumpZ);
      if (lastPosJumpZ[0]) {
        for (i = 0; i < lastPosJumpZ.length; i++) {
          if (lastPosJumpZ[i]) {
            var jumpR = parseInt(lastPosJumpZ[i][0]);
            var jumpI = parseInt(lastPosJumpZ[i][1]);
            console.log(lastPosJumpZ);

            var posfrom = from.id.split(".");
            fromR = parseInt(posfrom[0]);
            fromI = parseInt(posfrom[1]);
            if (jumpR == fromR && jumpI == fromI) {
              jumpPieceZ(from, elem);
            } else if (jumpR !== fromR && jumpI !== fromI) {
              alert("U moet slaan");
              from = false;
              jumpArrZ = [];
            }
          }
        }
      } else {
        player = "W";
      }
      if (lastPosJumpZ[0]){
        lastJumpZ = false;
      } else {
        lastPosZ = false;
        lastJumpZ = true;
      }
    }
    for (i = 0; i < jumpArrZ.length; i++) {
      if (jumpArrZ[i] && lastJumpZ) {
        var jumpR = parseInt(jumpArrZ[i][0]);
        var jumpI = parseInt(jumpArrZ[i][1]);

        var posfrom = from.id.split(".");
        fromR = parseInt(posfrom[0]);
        fromI = parseInt(posfrom[1]);
        console.log(jumpArrZ[i]);
        console.log(jumpR);
        console.log(fromR);
        console.log(jumpI);
        console.log(fromI);
        if (jumpR == fromR && jumpI == fromI) {
          jumpPieceZ(from, elem);
        } else if (jumpR !== fromR && jumpI !== fromI) {
          alert("U moet slaan");
          from = false;
          jumpArrZ = [];
        }
      }
    }
    lastPosJumpZ = [];
  }
  if (from.src == "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" && isLegalMoveZ(from, elem) && player == "Z") {
    if (jumpPieceZ(from, elem) && lastPosJumpZ[0] !== true) {
      movePieceZ(from, elem);
    } else {
      alert("u moet slaan");
    }
  }
}

function isLegalMoveW(from, elem) {
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  if (toR == fromR - 1 && toI == fromI - 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png" || toI == fromI + 1 && toR == fromR - 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/Zwartesteen.png") {
    return true;
  } else {
    return false;
  }
}

function isLegalMoveZ(from, elem) {
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  if (toR == fromR + 1 && toI == fromI - 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png" || toI == fromI + 1 && toR == fromR + 1 && elem.src !== "http://localhost/Github/De-blije-dobbelsteen/Img/wittesteen.png") {
    return true;
  } else {
    return false;
  }
}

function movePieceW(from, elem) {
  jumpArrW = [];
  var container = document.getElementById("game-container");
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  board[toR].splice(toI, 1, "W");
  board[fromR].splice(fromI, 1, "b");
  checkJump();
  // console.log(jumpW);
  // console.log(jumpArrW[0])
  console.log(lastPosJumpW);
  if (jumpArrW[0] && jumpW == true) {
    player = "W";
    console.log(player);
    jumpArrW = [];
    lastPosW = elem;
  }
  lastPosJumpW = [];
  lastPosCheck();
  if (lastPosJumpW[0]) {
    player = "W";
    console.log(player);
    jumpArrW = [];
    lastPosW = elem;
  } else {
    lastPosW = false;
    jumpArrW = [];
    lastPosJumpW = [];
    player = "Z";
    jumpW = false;
  }
  from = false;
  clearChildren(container);
  createBoard();
}

function movePieceZ(from, elem) {
  jumpArrZ = [];
  var container = document.getElementById("game-container");
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  board[toR].splice(toI, 1, "Z");
  board[fromR].splice(fromI, 1, "b");
  checkJump();
  // console.log(jumpZ);
  // console.log(jumpArrZ[0])
  console.log(lastPosJumpZ);
  if (jumpArrZ[0] && jumpZ == true) {
    player = "Z";
    console.log(player);
    jumpArrZ = [];
    lastPosZ = elem;
  }
  lastPosJumpZ = [];
  lastPosCheck();
  if (lastPosJumpZ[0]) {
    player = "Z";
    console.log(player);
    jumpArrZ = [];
    lastPosZ = elem;
  } else {
    lastPosZ = false;
    jumpArrZ = [];
    lastPosJumpZ = [];
    player = "W";
    jumpZ = false;
  }
  from = false;
  clearChildren(container);
  createBoard();
}

function checkJump() {

  for (r = 0; r < board.length; r++) {

    for (i = 0; i < board[r].length; i++) {

      if (board[r][i] == "W" && player == "W") {

        if (board[r - 1] && board[r - 2] && board[r - 1][i - 1] == "Z" && board[r - 2][i - 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "--";
          jumpArrW.push(rsisarr);
          console.log(jumpArrW);

        }
        if (board[r - 1] && board[r - 2] && board[r - 1][i + 1] == "Z" && board[r - 2][i + 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "-+";
          jumpArrW.push(rsisarr);
          console.log(jumpArrW);

        }
        if (board[r + 1] && board[r + 2] && board[r + 1][i - 1] == "Z" && board[r + 2][i - 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "+-";
          jumpArrW.push(rsisarr);
          console.log(jumpArrW);

        }
        if (board[r + 1] && board[r + 2] && board[r + 1][i + 1] == "Z" && board[r + 2][i + 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "++";
          jumpArrW.push(rsisarr);
          console.log(jumpArrW);

        }
      } else if (board[r][i] == "Z" && player == "Z") {

        if (board[r - 1] && board[r - 2] && board[r - 1][i - 1] == "W" && board[r - 2][i - 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "--";
          jumpArrZ.push(rsisarr);
          //console.log(jumpArrZ);

        }
        if (board[r - 1] && board[r - 2] && board[r - 1][i + 1] == "W" && board[r - 2][i + 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "-+";
          jumpArrZ.push(rsisarr);
          //console.log(jumpArrZ);

        }
        if (board[r + 1] && board[r + 2] && board[r + 1][i - 1] == "W" && board[r + 2][i - 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "+-";
          jumpArrZ.push(rsisarr);
          //console.log(jumpArrZ);

        }
        if (board[r + 1] && board[r + 2] && board[r + 1][i + 1] == "W" && board[r + 2][i + 2] == "b") {
          var rs = r.toString();
          var is = i.toString();

          var rsis = rs + "." + is;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "++";
          jumpArrZ.push(rsisarr);
          //console.log(jumpArrZ);

        }
      }
    }
  }
}

function jumpPieceW(from, elem) {
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);
  for (i = 0; i < jumpArrW.length; i++) {
    if (jumpArrW[i]) {
      switch (jumpArrW[i][2]) {
        case "--":
          if (toR == fromR - 2 && toI == fromI - 2) {
            board[fromR - 1].splice(fromI - 1, 1, "b");
            jumpW = true;
            Zstones = Zstones -1;
            movePieceW(from, elem);
          } else if (isLegalMoveW(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "-+":
          if (toR == fromR - 2 && toI == fromI + 2) {
            board[fromR - 1].splice(fromI + 1, 1, "b");
            jumpW = true;
            Zstones = Zstones -1;
            movePieceW(from, elem);
          } else if (isLegalMoveW(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "+-":
          if (toR == fromR + 2 && toI == fromI - 2) {
            board[fromR + 1].splice(fromI - 1, 1, "b");
            jumpW = true;
            Zstones = Zstones -1;
            movePieceW(from, elem);
          } else if (isLegalMoveW(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "++":
          if (toR == fromR + 2 && toI == fromI + 2) {
            board[fromR + 1].splice(fromI + 1, 1, "b");
            jumpW = true;
            Zstones = Zstones -1;
            movePieceW(from, elem);
          } else if (isLegalMoveW(from, elem)) {
            from = false;
            return false;
          }
          break;
      }
    }
  }
  jumpArrW = [];
  return true;
}

function jumpPieceZ(from, elem) {
  var posfrom = from.id.split(".");
  var posto = elem.id.split(".");

  var fromR = parseInt(posfrom[0]);
  var fromI = parseInt(posfrom[1]);

  var toR = parseInt(posto[0]);
  var toI = parseInt(posto[1]);

  for (i = 0; i < jumpArrZ.length; i++) {
    if (jumpArrZ[i]) {
      switch (jumpArrZ[i][2]) {
        case "--":
          if (toR == fromR - 2 && toI == fromI - 2) {
            board[fromR - 1].splice(fromI - 1, 1, "b");
            jumpZ = true;
            Wstones = Wstones -1;
            movePieceZ(from, elem);
          } else if (isLegalMoveZ(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "-+":
          if (toR == fromR - 2 && toI == fromI + 2) {
            board[fromR - 1].splice(fromI + 1, 1, "b");
            jumpZ = true;
            Wstones = Wstones -1;
            movePieceZ(from, elem);
          } else if (isLegalMoveZ(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "+-":
          if (toR == fromR + 2 && toI == fromI - 2) {
            board[fromR + 1].splice(fromI - 1, 1, "b");
            jumpZ = true;
            Wstones = Wstones -1;
            movePieceZ(from, elem);
          } else if (isLegalMoveZ(from, elem)) {
            from = false;
            return false;
          }
          break;
        case "++":
          if (toR == fromR + 2 && toI == fromI + 2) {
            board[fromR + 1].splice(fromI + 1, 1, "b");
            jumpZ = true;
            Wstones = Wstones -1;
            movePieceZ(from, elem);
          } else if (isLegalMoveZ(from, elem)) {
            from = false;
            return false;
          }
          break;
      }
    }
  }
  jumpArrZ = [];
  return true;
}

function lastPosCheck() {
  if (lastPosW && player == "W") {
    var posfrom = lastPosW.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);
    if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI - 1] == "Z" && board[fromR - 2][fromI - 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "--";
      lastPosJumpW.push(rsisarr);
      console.log(lastPosJumpW);

    }
    if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI + 1] == "Z" && board[fromR - 2][fromI + 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "-+";
      lastPosJumpW.push(rsisarr);
      console.log(lastPosJumpW);

    }
    if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI - 1] == "Z" && board[fromR + 2][fromI - 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "+-";
      lastPosJumpW.push(rsisarr);
      console.log(lastPosJumpW);

    }
    if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI + 1] == "Z" && board[fromR + 2][fromI + 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "++";
      lastPosJumpW.push(rsisarr);
      console.log(lastPosJumpW);

    }
  } else if (lastPosZ && player == "Z") {
    var posfrom = lastPosZ.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);
    if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI - 1] == "W" && board[fromR - 2][fromI - 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "--";
      lastPosJumpZ.push(rsisarr);
      console.log(lastPosJumpZ);

    }
    if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI + 1] == "W" && board[fromR - 2][fromI + 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "-+";
      lastPosJumpZ.push(rsisarr);
      console.log(lastPosJumpZ);

    }
    if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI - 1] == "W" && board[fromR + 2][fromI - 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "+-";
      lastPosJumpZ.push(rsisarr);
      console.log(lastPosJumpZ);

    }
    if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI + 1] == "W" && board[fromR + 2][fromI + 2] == "b") {
      var rsis = fromR + "." + fromI;
      var rsisarr = rsis.split(".");
      rsisarr[2] = "++";
      lastPosJumpZ.push(rsisarr);
      console.log(lastPosJumpZ);

    }
  }
}
