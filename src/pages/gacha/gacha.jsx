import { OfflineBolt } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import React, { useState, useContext } from "react";
import ClothesContext from "../../context/ClothesContext";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ClothingSprite from "./../../components/sprites/clothes/ClothingSprite";

const Gacha = () => {
  const [gachaResult, setGachaResult] = useState({});
  const allClothes = useContext(ClothesContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const user = useContext(UserContext);

  const getRandomCloth = () => {
    const grade3Clothes = allClothes.filter((cloth) => cloth["grade"] === 3);
    const grade4Clothes = allClothes.filter((cloth) => cloth["grade"] === 4);
    const grade5Clothes = allClothes.filter((cloth) => cloth["grade"] === 5);

    const randomValue = Math.random();

    let selectedArray;
    if (randomValue < 0.6) {
      // 60% chance to select grade 3
      selectedArray = grade3Clothes;
    } else if (randomValue < 0.9) {
      // 30% chance to select grade 4
      selectedArray = grade4Clothes;
    } else {
      // 10% chance to select grade 5
      selectedArray = grade5Clothes;
    }

    // Randomly select an item from the chosen array
    const selectedCloth = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[selectedCloth];
  };

    const roll1time = () => {
        if (userData["coins"] === 0) alert("Not enough coins to roll.");
        else {
            const item = getRandomCloth();

            /* Ancient feature where the user gets compensated if he draws a duplicate
            let newCoinValue = userData["coins"];

            // Check if cloth already acquired
            if (userData["clothes"].includes(item["id"])) {
              // Increase coins based on grade if already acquired
              switch (item["grade"]) {
                case 3:
                  break;
                case 4:
                  newCoinValue += 1;
                  break;
                case 5:
                  newCoinValue += 2;
                  break;
                default:
                  console.error("Invalid item grade:", item["grade"]);
                  return;
              }
            } else {
              // Remove 1 coin and add the item to the user's clothes
              newCoinValue -= 1;
              userData["clothes"].push(item["id"]);
            }
             */

            let newCoinValue = userData["coins"] - 1;

            if (!userData["clothes"].includes(item["id"])) {
                userData["clothes"].push(item["id"]);
            }

            axios
                .put(`http://localhost:5000/users/${user["uid"]}`, {
                    coins: newCoinValue,
                    clothes: userData["clothes"],
                })
                .then(() => {
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        coins: newCoinValue,
                        clothes: userData["clothes"],
                    }));
                })
                .catch((error) => {
                    console.error("Failed to update user's data:", error);
                });

            setGachaResult(item);
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
          width: "600px",
          height: "600px",
          borderRadius: "600px",
          backgroundColor: "white",
        }}
      >
        <IconButton
          onClick={() => roll1time()}
          sx={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "#FCE",
            bottom: "0rem",
            left: "-5rem",
            boxShadow: "0 0 0 1.5rem #FFF",
            transition: "none",
            textTransform: "none",
            color: "inherit",
            "&:hover": {
              background: "linear-gradient(to bottom, #FCE, #F7F)",
            },
          }}
        >
          <Stack>
            <Box
              sx={{
                fontSize: "2rem",
                lineHeight: "2rem",
                fontWeight: "bold",
              }}
            >
              Draw !
            </Box>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                fontSize: "1.5rem",
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
            width: "200px",
            height: "200px",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            fontSize: "2rem",
            textAlign: "center",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Object.keys(gachaResult).length > 0 ? (
            <ClothingSprite cloth={gachaResult} face="front" />
          ) : (
            <>Press the "draw" button !</>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Gacha;
