import React from "react";
import lesley_head from "../../assets/characters/heads/lesley-head.png";
import tiva_head from "../../assets/characters/heads/tiva-head.png";

const CharacterHead = ({ name }) => {
  switch (name) {
    case "lesley":
      return <img src={lesley_head} alt="head" style={{ height: "100%" }} />;
    case "tiva":
      return <img src={tiva_head} alt="head" style={{ height: "100%" }} />;
    default:
      return <>Nom de personnage non valide</>;
  }
};

export default CharacterHead;
