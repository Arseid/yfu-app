import { IconButton } from "@mui/material";
import React from "react";
import icon from "../assets/nav-icons/fi-sr-dice-alt.svg";

const YFUNavButton = () => {
  return (
    <IconButton color="primary" aria-label="upload picture" component="label">
      <img src={icon} height="32px" />
    </IconButton>
  );
};

export default YFUNavButton;
