import React, { useState } from "react";
import { Grid, Button } from "@mui/material";

function Minigames() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    checkWinner(newBoard, player);

    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setWinner("draw");
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ height: "500px", width: "500px" }}
      >
        {board.map((cell, index) => (
          <Grid item key={index} xs={4}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleClick(index)}
              disabled={cell || winner}
              fullWidth
              sx={{ height: "100%" }}
            >
              {cell}
            </Button>
          </Grid>
        ))}
      </Grid>
      {winner && (
        <div>
          {winner === "draw" ? (
            <p>It's a draw!</p>
          ) : (
            <p>Player {winner} wins!</p>
          )}
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

export default Minigames;
