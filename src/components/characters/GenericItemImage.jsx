import { Box } from "@mui/material";
import React from "react";

const GenericItemImage = ({ src }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: '100%',
        }}
      >
        <img
          src={src}
          alt="character"
          height='98%'
          sx={{
            maxWidth: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default GenericItemImage;
