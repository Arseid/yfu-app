import React, { useState, useContext } from "react";
import { Grid, Button, Stack, Box, Paper } from "@mui/material";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";
import UserContext from "../../context/UserContext";
import {
  Close as CrossIcon,
  FavoriteBorder,
  OfflineBolt,
} from "@mui/icons-material";

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
            .put(`${process.env.REACT_APP_YFU_SERVER_URL}/users/${user["uid"]}`, {
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
      <Paper
        sx={{
          px: "3rem",
          py: "1rem",
          borderRadius: "2rem",
          position: "absolute",
          top:'2rem',
          zIndex:'1'
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            position: "relative",
          }}
        >
          <Box sx={{ fontSize: "1.25rem" }}>Your coins</Box>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            direction={"row"}
          >
            <Box
              sx={{
                fontSize: "2rem",
                lineHeight: "2rem",
              }}
            >
              {userData["coins"]}&nbsp;
            </Box>
            <OfflineBolt
              sx={{
                color: "orange",
                fontSize: "2rem",
              }}
            />
          </Stack>
        </Stack>
      </Paper>
      <Box sx={{position:'absolute'}}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{
            width: { xs: "400px", sm: "500px" },
            height: { xs: "400px", sm: "500px" },
          }}
        >
          {board.map((cell, index) => (
            <Grid item key={index} xs={4}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleClick(index)}
                disabled={!!(cell || winner)}
                fullWidth
                sx={{
                  position: "relative",
                  bgcolor: index % 2 === 0 ? "#F7F" : "#FAF",
                  borderRadius: { xs: "1.5rem", sm: "2rem" },
                  border: "0.25rem solid #FFF",
                  height: "100%",
                  boxSizing: "border-box",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: index % 2 === 0 ? "#F7F" : "#FAF",
                    border: "none",
                  },
                  "&:disabled": {
                    bgcolor: index % 2 === 0 ? "#F7F" : "#FAF",
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
            p: "1rem",
            m: "2rem",
            width: "50%",
            maxWidth: "800px",
            borderRadius: "4rem",
            zIndex: "1",
            boxShadow: "0 0 20px 10px #F7F5",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            {winner === "draw" && <>It's a draw!</>}

            {winner === "O" && (
              <>
                You win! You gain a coin, you now have {userData["coins"]}&nbsp;
                coins! Good luck for your draws!
              </>
            )}

            {winner === "X" && <>You lose! Better luck next time!</>}
          </Box>
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
