import { Box, Container, Paper } from "@mui/material";
import React from "react";
import logo from "../../assets/brand/svg/yfu-logo.svg";

const About = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt="logo"
        src={logo}
        height="150px"
        style={{ marginBottom: "2rem" }}
      />
      <Paper
        sx={{
          borderRadius: "2rem",
          px: "4rem",
          py: "2rem",
          boxShadow: "none",
          overflow: "auto",
          "& *": {
            fontSize: { xs: "1rem", md: "1.25rem" },
          },
        }}
      >
        <Box>
          <p>
            Introducing YFu, a game created in 2023 by&nbsp;
            <a
              href="https://github.com/Ryan-MARIN"
              style={{ textDecoration: "none" }}
            >
              Ryan Marin
            </a>
            &nbsp; and &nbsp;
            <a
              href="https://github.com/Arseid"
              style={{ textDecoration: "none" }}
            >
              Yves-Robert
            </a>
            &nbsp; Estrada as part of their development project at Ynov Sophia
            Campus. The name YFu is a combination of the "Y" from Ynov school
            and the Chinese word "Fu," which means luck, while also evoking the
            term "waifu."
          </p>

          <p>
            YFu is a fashion game where the objective is to win characters and
            clothing to dress them up in cute outfits. Immerse yourself in an
            adorable and retro atmosphere thanks to its pixel art aesthetics.
          </p>

          <p>
            To obtain new items like clothes, you can play mini-games to earn
            tokens. These tokens can then be used in the gacha for random draws,
            offering the chance to win new items.
          </p>

          <p>
            Please note that the copyright for the game belongs to Ryan Marin
            and Yves-Robert Estrada, the creators of the game in 2023. The
            background music used is "Kawaii!" by Bad Snacks, with support from
            RFM - NCM.&nbsp;
            <a href="https://bit.ly/3f1GFyN" style={{ textDecoration: "none" }}>
              You can listen to the music here.
            </a>
          </p>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
