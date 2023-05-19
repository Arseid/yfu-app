import { Box, Button, Grid, NativeSelect, Paper, Stack } from "@mui/material";
import React from "react";
import CharacterHeadButton from "../../components/sprites/characters/CharacterHeadButton";
import DressingView from "../../components/sprites/DressingView";
import { useState } from "react";

const clotheTypes = [
  "hats",
  "glasses",
  "tops",
  "overcoats",
  "bottoms",
  "hosiery",
  "shoes",
  "dresses",
];

const clotheTypesSingular = [
  "hat",
  "glasses",
  "top",
  "overcoat",
  "bottom",
  "hosiery",
  "shoe",
  "dress",
];

const faces = ["front", "right", "back", "left"];

function getNextFace(face) {
  const faceIndex = faces.indexOf(face);
  if (faceIndex === 3) return faces[0];
  else return faces[faceIndex + 1];
}

function getPreviousFace(face) {
  const faceIndex = faces.indexOf(face);
  if (faceIndex === 0) return faces[3];
  else return faces[faceIndex - 1];
}

const Home = () => {
  const [currentCharacter, setCurrentCharacter] = useState("lesley");
  const [currentFace, setCurrentFace] = useState("front");

  return (
    <Stack alignItems={"center"} sx={{ height: "100%", overflow: "hidden" }}>
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
          <CharacterHeadButton
            name={"lesley"}
            onClick={() => setCurrentCharacter("lesley")}
          />
          <CharacterHeadButton
            name={"tiva"}
            onClick={() => setCurrentCharacter("tiva")}
          />
        </Stack>
      </Paper>

      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            height: "100%",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <Stack
            className="menu"
            spacing={"1rem"}
            sx={{
              height: "100%",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                lineHeight: "3rem",
              }}
            >
              ►&nbsp;Lesley
            </Box>
            <Box>
              <Box
                sx={{
                  fontSize: "2rem",
                }}
              >
                Outfit
              </Box>
              <Paper
                className="character-info"
                sx={{
                  p: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "none",
                  bgcolor: "#FFF8",
                }}
              >
                <Stack
                  direction={"row"}
                  spacing="1rem"
                  sx={{ height: "100%", overflow: "auto" }}
                >
                  {Array.from(clotheTypesSingular).map((type) => (
                    <Box key={type}>
                      {type}
                      <Paper sx={{ width: "100px", height: "100px" }}></Paper>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
            <Box className="character-info">
              <Box
                sx={{
                  fontSize: "2rem",
                }}
              >
                Info
              </Box>
              <Paper
                sx={{
                  zIndex: 1,
                  p: "0.75rem",
                  maxHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                  boxShadow: "none",
                  bgcolor: "#FFF8",
                }}
              >
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
                    height: "100%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Box>
              </Paper>
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            height: "100%",
            background: "radial-gradient(circle, #FFF 0%, #FFF 25%,#0000 50%)",
            backgroundClip: "content-box",
          }}
        >
          <Stack
            className="character"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: "100%",
              px: "1rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DressingView characterName={currentCharacter} face={currentFace} />
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setCurrentFace(getPreviousFace(currentFace))}
                sx={{
                  bgcolor: "#F7F",
                  bottom: "5rem",
                  left: "0",
                }}
              >
                ◄
              </Button>
              <Button
                variant="contained"
                onClick={() => setCurrentFace(getNextFace(currentFace))}
                sx={{
                  bgcolor: "#F7F",
                  bottom: "5rem",
                  right: "0",
                }}
              >
                ►
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            height: "100%",
            zIndex: 1,
          }}
        >
          <Stack
            className="inventory"
            sx={{
              height: "100%",
              width: "100%",
              boxSizing: "border-box",
              border: "0.25rem solid #FFF",
              bgcolor: "#FFF8",
              borderRadius: "1rem",
            }}
          >
            <Box
              sx={{
                fontSize: "2rem",
                textAlign: "center",
                bgcolor: "#FFF",
                px: "1rem",
                mb: "1rem",
              }}
            >
              <NativeSelect
                defaultValue={clotheTypes[0]}
                sx={{
                  p: 0,
                  border: "none",
                  fontSize: "2rem",
                  fontFamily: "'Baloo 2', cursive;",
                }}
              >
                {Array.from(clotheTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </NativeSelect>
            </Box>
            <Box sx={{ overflowY: "auto", px: "1rem" }}>
              <Grid container spacing={"1rem"}>
                {Array.from(Array(10).keys()).map((index) => (
                  <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
                    <Paper sx={{ height: "100px" }}>a</Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
