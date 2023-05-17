import {
  Box,
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
} from "@mui/material";
import React from "react";
import Character from "../../components/characters/Character";
import CharacterHeadButton from "./../../components/characters/CharacterHeadButton";

const Home = () => {
  return (
    <Stack alignItems={"center"} sx={{ height: "100%" }}>
      <Paper
        className="characters-list"
        sx={{
          height: "80px",
          borderRadius: "1rem",
          maxWidth: "600px",
          width: "100%",
          mb: "2rem",
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
      </Paper>

      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid item xs={4}>
          <Stack
            className="menu"
            justifyContent={"space-between"}
            sx={{
              height: "100%",
              width: "100%",
              pr: "30%",
              boxSizing: "border-box",
            }}
          >
            <Paper
              className="character-info"
              sx={{
                zIndex: 1,
                p: "0.75rem",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                boxShadow: "none",
                bgcolor: "#FFF8",
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  lineHeight: "3rem",
                }}
              >
                Lesley
              </Box>
              <Box>
                <Box>
                  <b>Height :</b> 164cm
                </Box>
                <Box>
                  <b>Likes :</b> Chocolate, Travel
                </Box>
                <Box>
                  <b>Skills :</b> Dances, Sings
                </Box>
              </Box>
              <Box
                sx={{
                  p: "0.5rem",
                  mt: "0.5rem",
                  bgcolor: "#FFF",
                  borderRadius: "0.5rem",
                  overflowY: "auto",
                  overflowX: "hidden",
                  minHeight:"50px"
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Box>
            </Paper>
            <Box>
              <MenuList dense sx={{ fontSize: "2rem" }}>
                <MenuItem>
                  <ListItemText>► Hats</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Glasses</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Tops</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Overcoats</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Bottoms</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Glasses</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>► Glasses</ListItemText>
                </MenuItem>
              </MenuList>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack
            className="character"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Character name="lesley" />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Box
            className="info"
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
