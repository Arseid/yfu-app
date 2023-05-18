import { OfflineBolt } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import React from "react";

const Gacha = () => {
  const [gachaResult, setGachaResult] = React.useState(null);

  const listTops = [
    { name: "Tshirt", probability: 0.6 },
    { name: "Sweater", probability: 0.3 },
    { name: "Turtleneck", probability: 0.1 },
  ];
  // const listBots = ["Jean","Sweat Pants","Costume Pants"];
  // const listShoes = ["Airforce 1","Doc Martens","Stan Smith"];
  // const listAll = [listTops,listBots,listShoes];

  const letsGacha = (itemList) => {
    const chance = Math.random();
    let cumulativeProbability = 0;
    for (const item of itemList) {
      cumulativeProbability += item["probability"];
      if (chance <= cumulativeProbability) {
        return item;
      }
    }
  };

  const roll1time = () => {
    const item = letsGacha(listTops);
    setGachaResult(item);
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
                450&nbsp;
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
