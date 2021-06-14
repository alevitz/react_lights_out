import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

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

function Board({
  nrows = 3,
  ncols = 3,
  chanceLightStartsOn
}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let k = 0; k < ncols; k++) {
        let randomNum = Math.random();
        randomNum < 0.5 ? row.push(true) : row.push(false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

   function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      let oldBoardCopy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y,x, oldBoardCopy);
      flipCell(y-1,x, oldBoardCopy);
      flipCell(y+1,x, oldBoardCopy);
      flipCell(y,x-1, oldBoardCopy);
      flipCell(y,x+1, oldBoardCopy);
      


      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === true) {
          return false;
        }
      }
    }
    return true;
  }


  // if the game is won, just show a winning msg & render nothing else

  // TODO

  let won = hasWon();
  console.log(won)
  // make table board

  // TODO

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      )
    }
    tblBoard.push(<tr key={y}>{row}</tr>)
  }

  return <div>
    {won === true ?
      <h2>You win!!!</h2>
      :
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    }

  </div>



}

export default Board;
