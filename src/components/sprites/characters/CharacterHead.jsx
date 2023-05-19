import React from "react";

const CharacterHead = ({ name }) => {
  return (
    <img
      src={require(`../../../assets/characters/heads/${name}-head.png`)}
      alt="head"
      style={{ height: "100%" }}
    />
  );
};

export default CharacterHead;
