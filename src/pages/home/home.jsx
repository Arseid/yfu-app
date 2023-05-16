import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import Character from "../../components/characters/Character";
import CharacterHeadButton from "./../../components/characters/CharacterHeadButton";

const Home = () => {
  return (
    <Stack alignItems={"center"} sx={{ height: "100%" }}>
      <Box
        sx={{
          height: "80px",
          bgcolor: "#FFF",
          borderRadius: "1rem",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{ height: "100%" }}
          justifyContent={"center"}
        >
          <CharacterHeadButton name={"lesley"} />
          <CharacterHeadButton name={"tiva"} />
        </Stack>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid item xs={3}>
          <Box
            className="character"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            aaaaa
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Stack
            className="character"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Character name="lesley" />
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Box
            className="character"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            aaaaa
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
