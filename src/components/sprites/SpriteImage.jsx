import React from "react";

const SpriteImage = ({ src }) => {
  return (
    <img
      src={src}
      alt="character"
      height="98%"
      sx={{
        maxWidth: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default SpriteImage;
