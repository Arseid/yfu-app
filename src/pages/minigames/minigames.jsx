import React, { useState, useContext } from "react";
import { Grid, Button, Stack, Box } from "@mui/material";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Close as CrossIcon, FavoriteBorder } from "@mui/icons-material";

function Minigames() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("O");
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
      .filter((item) => item[0] === null)
      .map((item) => item[1]);

    const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    newBoard[aiMove] = player === "O" ? "X" : "O";
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

        // If player 'O' wins, increment coins
        if (player === "O") {
          const newCoins = userData["coins"] + 1;
          setUserData((prevUserData) => ({ ...prevUserData, coins: newCoins }));

          // Update coins in the backend
          axios
            .put(`http://localhost:5000/users/${user["uid"]}`, {
              coins: newCoins,
            })
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
    setPlayer("O");
    setWinner(null);
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <Box>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ width: "500px", height: "500px" }}
        >
          {board.map((cell, index) => (
            <Grid item key={index} xs={4}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleClick(index)}
                disabled={cell || winner}
                fullWidth
                sx={{
                  position: "relative",
                  bgcolor: index % 2 === 0 ? "#F7F" : "#FCE",
                  borderRadius: "2rem",
                  border: "0.25rem solid #FFF",
                  height: "100%",
                  boxSizing: "border-box",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: index % 2 === 0 ? "#F7F" : "#FCE",
                    border: "none",
                  },
                  "&:disabled": {
                    bgcolor: index % 2 === 0 ? "#F7F" : "#FCE",
                    border: "none",
                    color: "white",
                  },
                }}
              >
                <Box sx={{ position: "absolute", fontSize: "3rem" }}>
                  {cell && (cell === "X" ? <CrossIcon /> : <FavoriteBorder />)}
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {winner && (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#FFF",
            pb: "1rem",
            m: "2rem",
            width: "50%",
            maxWidth: "800px",
            borderRadius:'4rem'
          }}
        >
          {winner === "draw" ? (
            <p>It's a draw!</p>
          ) : winner === "O" ? (
            <p>
              You win! You gain a coin, you now have {userData["coins"]} coins!
              Good luck for your draws!
            </p>
          ) : (
            <p>You lose! Better luck next time!</p>
          )}
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{
              bgcolor: "#F7F",
              fontFamily: "inherit",
              fontSize: "1.5rem",
              py: "0",
              textTransform: "none",
              boxShadow: "none",
              borderRadius: "100px",
              maxWidth: "10rem",
              "&:hover": {
                bgcolor: "#F7F",
                boxShadow: "0 0 0 0.25rem #FFF",
              },
            }}
          >
            Reset
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default Minigames;
