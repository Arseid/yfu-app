import React from "react";
import SpriteImage from "../SpriteImage";

const ClothingSprite = ({ category, name, face }) => {
  return (
    <SpriteImage
      src={require(`../../../assets/clothes/${category}/${name}/${face}.png`)}
    />
  );
};

export default ClothingSprite;