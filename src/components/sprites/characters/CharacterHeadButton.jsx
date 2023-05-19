import { Button } from "@mui/material";
import React from "react";
import CharacterHead from "./CharacterHead";

const CharacterHeadButton = ({ name, onClick }) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
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
