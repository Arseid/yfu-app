import React from "react";
import GenericItemImage from "./GenericItemImage";

const Character = ({ name, face }) => {
  return (
    <GenericItemImage
      src={require(`../../assets/characters/${name}/full/${face}.png`)}
    />
  );
};

export default Character;
