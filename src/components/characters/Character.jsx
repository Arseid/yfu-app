import React from "react";
import Lesley from "./Lesley";

const Character = ({ name, face }) => {
  switch (name) {
    case "lesley":
      return <Lesley face={face} />;
    case "tiva":
      return <>Tiva n'existe pas encore</>;
    default:
      return <>Nom de personnage non valide</>;
  }
};

export default Character;
