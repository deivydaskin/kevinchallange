import React, { useState, useEffect } from "react";
import { calculateWinner } from "../helpers";
import Board from "./Board";
import { postReq, getReq } from "./ApiRequests";
import { logReq, getLogs } from "./LogApi";

const styles = {
  div1: {
    width: "100px",
    margin: "20px auto",
  },
  div2: {
    width: "400px",
    margin: "auto",
  },
  button: {
    width: "100px",
    margin: "20px auto auto 0px",
    height: "30px",
  },
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(squares);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getReq().then((data) => {
      setSquares(data);
    });
  }, []);

  useEffect(() => {
    getLogs().then((data) => {
      setHistory(data);

      if (data[0].text.slice(0, 1) === "O") {
        setXisNext(true);
      } else if (data[0].text.slice(0, 1) === "X") {
        setXisNext(false);
      }
    });
  }, [squares]);

  const handleClick = (i) => {
    let tempSquares = squares.slice(0);
    // If user click an occupied square or if game is won, return
    if (winner || squares[i]) return;
    // Put an X or an O in the clicked square
    tempSquares[i] = xIsNext ? "X" : "O";
    postReq(tempSquares);
    logReq(tempSquares[i], i);
    setSquares(tempSquares);
    //setXisNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
    postReq(Array(9).fill(null));
    logReq("restart", null);
  };

  return (
    <>
      <Board squares={squares} onClick={handleClick} />
      <div style={styles.div1}>
        {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
        <button style={styles.button} onClick={handleRestart}>
          Restart
        </button>
      </div>
      <div style={styles.div2}>
        {history
          ? history.map((log) => (
              <div key={log._id}>
                {log.date} <b>{log.text}</b>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Game;
