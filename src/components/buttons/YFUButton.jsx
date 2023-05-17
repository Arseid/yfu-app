import { Button } from "@mui/material";
import React from "react";

const YFUButton = ({ variant = "contained", children }) => {
  return (
    <Button
      variant={variant}
      sx={{
        fontFamily: "'Baloo 2', cursive;",
        fontSize: "16px",
      }}
    >
      {children}
    </Button>
  );
};

export default YFUButton;
