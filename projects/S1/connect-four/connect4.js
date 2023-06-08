/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])


const makeBoard = () => {
  for (let y = 0; y < HEIGHT; y++) {
    const jsrow = [];
    for (let x = 0; x < WIDTH; x++) {
      jsrow.push(null);
    }
    board.push(jsrow);
  }
  return board;
}

const makeHtmlBoard = () => {
  const htmlBoard = document.getElementById("board");

  // create column selector as the header of the html table
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // create a different cell for every column at the top
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create a table HEIGHT tall and WIDTH wide with an id of the x and y coordinates
  for (let y = HEIGHT - 1; y >= 0; y--) {
    const row = document.createElement("tr");
    row.setAttribute("id", y);
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = x => {
  for (y = 0; y < HEIGHT; y++) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  const piece = document.createElement("div");
  piece.className = `piece p${currPlayer}`;
  const cell = document.getElementById(`${y}-${x}`)
  cell.appendChild(piece);
}

/** endGame: announce game end */
const endGame = (msg) => {
  alert(msg);
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
    }
  }
  let allPiecesHTML = document.querySelectorAll(".piece");
  for (let piece of allPiecesHTML) {
    piece.remove();
  }
}

//check if board is full Peter's rec: just check the top row, the bottom will have to be full anyway, just use every, don't need a full function
const isTruthy = (input) => input ? true : false;
const isFull = () => {
  console.log("checking if full")
  for (let row of board) {
    let full = row.every(isTruthy)
    if (full) {
      continue;
    } else {
      return;
    }
  }
  return endGame("TIE GAME");
}

/** HANDLECLICK: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win Peter's rec: do it before you switch players
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  } else if (isFull()) {
    return endGame("TIEGAME");
  }  
  
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // for each cell:
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //check that the four adjacent cells are also the current player's, and then in each direction
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
