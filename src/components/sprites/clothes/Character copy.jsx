import React from "react";
import SpriteImage from "../SpriteImage";

const ClothingPiece = ({ category, name, face }) => {
  return (
    <SpriteImage
      src={require(`../../../assets/clothes/${category}/${name}/${face}.png`)}
    />
  );
};

export default ClothingPiece;