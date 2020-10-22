import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import Board from "./Board";

const styles = {
  width: "100px",
  margin: "20px auto",
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    let tempSquares = squares.slice(0);
    // If user click an occupied square or if game is won, return
    if (winner || squares[i]) return;
    // Put an X or an O in the clicked square
    tempSquares[i] = xIsNext ? "X" : "O";
    setSquares(tempSquares);
    setXisNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
  };

  return (
    <>
      <Board squares={squares} onClick={handleClick} />
      <div style={styles}>
        {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
        <button onClick={handleRestart}>Restart</button>
      </div>
    </>
  );
};

export default Game;
