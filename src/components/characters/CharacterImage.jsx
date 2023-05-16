import React from "react";

const CharacterImage = ({ src }) => {
  return <img src={src} alt="character" style={{ maxHeight: "70vh" }} />;
};

export default CharacterImage;
