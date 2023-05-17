import React from "react";
import SpriteImage from "../SpriteImage";

const CharacterSprite = ({ name, face }) => {
  return (
    <SpriteImage
      src={require(`../../../assets/characters/${name}/full/${face}.png`)}
    />
  );
};

export default CharacterSprite;
