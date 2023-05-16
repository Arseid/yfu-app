import { Button } from "@mui/material";
import React from "react";
import CharacterHead from "./CharacterHead";

const CharacterHeadButton = ({ name }) => {
  return (
    <Button
      disableRipple
      sx={{
        "&:hover": {
          bgcolor: "#FCE",
        },
      }}
    >
      <CharacterHead name={name} />
    </Button>
  );
};

export default CharacterHeadButton;
