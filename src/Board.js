import React, { useState } from "react";
import Cell from "./Cell.js";
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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createDataObject(Array, indexY, indexX) {
    for (let i = 0; i < indexX; i++) {
      let obj = {
        coord: `${indexY}-${i}`,
        isLit: Math.random() <= chanceLightStartsOn,
      };
      Array.push(obj);
    }
  }

  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () => []);
    initialBoard.forEach((row, indexY) => createDataObject(row, indexY, ncols));
    return initialBoard;
  }


  function hasWon() {
    return board.every((row) => row.every((col) => col.isLit === false))
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x].isLit = !boardCopy[y][x].isLit;
        }
        return boardCopy
      };

      console.log(oldBoard)
      const boardCopy = oldBoard.map(row=> [...row] )
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);


      console.log(boardCopy)
    
      
      
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return(
      <div> You won!!</div>
    )
  }

  // TODO
  else{
    return (
      <div className={hasWon() ? "Hidden" : "Board"}>
        <table>
          <thead>
            <tr>
              <th>New Board</th>
            </tr>
          </thead>
          <tbody>
            {board.map((row, i) => (
              <tr key={i}>
                {row.map((col, i) => (
                  <Cell key={col.coord} isLit={col.isLit} flipCellsAroundMe={() => flipCellsAround(col.coord)} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Board;
