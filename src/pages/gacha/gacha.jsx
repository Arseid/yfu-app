import { OfflineBolt } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import React, { useState, useContext } from "react";
import ClothesContext from "../../context/ClothesContext";

const Gacha = () => {
  const [gachaResult, setGachaResult] = useState({});
  const [coins, setCoins] = useState(50);
  const allClothes = useContext(ClothesContext);

    const getRandomCloth = () => {
        const grade3Clothes = allClothes.filter(cloth => cloth["grade"] === 3);
        const grade4Clothes = allClothes.filter(cloth => cloth["grade"] === 4);
        const grade5Clothes = allClothes.filter(cloth => cloth["grade"] === 5);

        const randomValue = Math.random();

        let selectedArray;
        if (randomValue < 0.6) { // 60% chance to select grade 3
            selectedArray = grade3Clothes;
        } else if (randomValue < 0.9) { // 30% chance to select grade 4
            selectedArray = grade4Clothes;
        } else { // 10% chance to select grade 5
            selectedArray = grade5Clothes;
        }

        // Randomly select an item from the chosen array
        const selectedCloth = Math.floor(Math.random() * selectedArray.length);
        return selectedArray[selectedCloth];
    };

    const roll1time = () => {
      if (coins === 0) alert("Not enough coins to roll.")
      else {
          const item = getRandomCloth();
          setGachaResult(item);
          setCoins(coins - 1);
      }
    };

  return (
    <Box
      className="Gacha"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          minWidth: "600px",
          minHeight: "600px",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      >
        <IconButton
          onClick={() => roll1time()}
          sx={{
            position: "absolute",
            minWidth: "250px",
            minHeight: "250px",
            borderRadius: "50%",
            background: "#FCE",
            bottom: "0rem",
            left: "-5rem",
            boxShadow: "0 0 0 1.5rem #FFF",
            "&:hover": {
              background: "linear-gradient(to bottom, #FCE, #F7F)",
            },
          }}
        >
          <Stack
            alignItems={"center"}
            sx={{
              fontWeight: "bold",
              color: "black",
              position: "relative",
              height: "100%",
            }}
          >
            <Box sx={{ fontSize: "3rem" }}>Draw !</Box>
            <Stack
              direction="row"
              alignItems={"center"}
              sx={{
                fontSize: "1.5rem",
                position: "absolute",
                bottom: "-1rem",
              }}
            >
              -1&nbsp;
              <OfflineBolt
                sx={{
                  color: "orange",
                  bgcolor: "#FFF",
                  borderRadius: "100px",
                }}
              />
            </Stack>
          </Stack>
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            minWidth: "250px",
            minHeight: "250px",
            borderRadius: "50%",
            bottom: "0rem",
            right: "-5rem",
            boxShadow: "0 0 0 1.5rem #FFF",
            border: "1rem solid #FCE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#FFF",
            boxSizing: "border-box",
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
                  fontSize: "3rem",
                  lineHeight: "3rem",
                }}
              >
                  {coins}&nbsp;
              </Box>
              <OfflineBolt
                sx={{
                  color: "orange",
                  fontSize: "2rem",
                }}
              />
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ fontSize: "6rem" }}>
          {gachaResult ? gachaResult["name"] : ""}
        </Box>
      </Stack>
    </Box>
  );
};

export default Gacha;
