import React, { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";
import UserContext from "../../context/UserContext";

function Minigames() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const user = useContext(UserContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard, player)) return;

    const emptyCells = newBoard
        .map((value, pos) => [value, pos])
        .filter(item => item[0] === null)
        .map(item => item[1]);

    const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    newBoard[aiMove] = player === "X" ? "O" : "X";
    setBoard(newBoard);

    checkWinner(newBoard, newBoard[aiMove]);
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

        // If player 'X' wins, increment coins
        if (player === 'X') {
          const newCoins = userData["coins"] + 1;
          setUserData(prevUserData => ({ ...prevUserData, coins: newCoins }));

          // Update coins in the backend
          axios.put(`http://localhost:5000/users/${user["uid"]}`, { coins: newCoins })
              .catch((error) => {
                console.error("Failed to update user's data:", error);
              });
        }

        return true;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setWinner("draw");
      return true;
    }

    return false;
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
            <p>You win! You gain a coin, you now have {userData["coins"]} coins! Good luck for your draws!</p>
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
