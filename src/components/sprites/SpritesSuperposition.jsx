import React from "react";
import { Box } from "@mui/material";

const SpritesSuperposition = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      {React.Children.map(children, (child) => (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default SpritesSuperposition;
