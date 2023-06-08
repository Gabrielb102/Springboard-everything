import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import chickenDinner from "./Chicken\ Dinner.jpeg";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// Makes a random assortement of true/falses as needed fo the game
const makeCols = (colsRange, chanceLightStartsOn = .49) => {
  let cols = colsRange.map((n) => Math.random() < chanceLightStartsOn ? true : false)
  return cols;
}

/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
const createBoard = (nrows, ncols, chanceLightStartsOn) => {
  const rowsRange = Array.from({length: nrows}, (x, i) => i);
  const colsRange = Array.from({length: ncols}, (x, i) => i);
  
  let rows = rowsRange.map((n) => makeCols(colsRange, chanceLightStartsOn));

  const initialBoard = rows;
  return initialBoard;
}

// if this coord is actually on board, flip it
const flipCell = (y, x, boardCopy) => {
  if (x < 0 || y < 0 || y >= boardCopy.length || x >= boardCopy[0].length) {
    return boardCopy
  }

  boardCopy[y][x] = !boardCopy[y][x];
  return boardCopy;
};

const hasWon = (board) => {
  for (let row of board) {
    for (let cell of row) {
      if (cell === false) {
        console.log("not winner yet");
        return false;
      }
    }
  }
  console.log("winner");
  return true;
}

//Board Component
const Board = ({ nrows = 12, ncols = 20, chanceLightStartsOn }) => {
  const [board, setBoard] = useState(createBoard(nrows = 10, ncols = 15, chanceLightStartsOn = .49));

  // function to flip cells, made with state
  const flipCellsAround = (xCord, yCord) => {
    setBoard(board => {
      
      // Make a (deep) copy of the oldBoard
      const oldBoard = JSON.parse(JSON.stringify(board));
      // in the copy, flip this cell and the cells around it
      var newBoard = flipCell(yCord, xCord, oldBoard);
      newBoard = flipCell(yCord - 1, xCord, newBoard);
      newBoard = flipCell(yCord + 1, xCord, newBoard);
      newBoard = flipCell(yCord, xCord - 1, newBoard);
      newBoard = flipCell(yCord, xCord + 1, newBoard);
      // return the copy
      return newBoard
    });
  }

  // function to make new board
  const startNewGame = () => setBoard(createBoard(nrows = 10, ncols = 15, chanceLightStartsOn = .49));
  
  // make table board
  const gameBoard = board.map((row, rIdx) => {

    const cells = row.map((col, cIdx) => {
      return <Cell isLit={col} key={`${cIdx}-${rIdx}`} flipCellsAroundMe={() => flipCellsAround(cIdx, rIdx)}/>
    })
    return <tr>{cells}</tr>
  });

  // if player has won, display winner banner, if not show board
  if (hasWon(board)) {
    return <div className="Board">
      <h1>WINNER WINNER CHICKEN DINNER!!</h1>
      <img src={chickenDinner}></img>
      <button onClick={startNewGame}>Play Again</button>
    </div>
  } 

  // render board
  return <>
    <table className="Board">
      <tbody>
      {gameBoard}
      </tbody>
    </table>
  </>
}

export default Board;