import React from "react";

const SpriteImage = ({ src, zIndex }) => {
  return (
    <img
      src={src}
      alt="character"
      height="98%"
      style={{
        zIndex: zIndex
      }}
    />
  );
};

export default SpriteImage;
