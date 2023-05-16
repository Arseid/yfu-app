import React from "react";
import tiva_full_front from "../../assets/characters/tiva/full/lesley-full-front.png";
import tiva_full_right from "../../assets/characters/tiva/full/lesley-full-right.png";
import tiva_full_back from "../../assets/characters/tiva/full/lesley-full-back.png";
import tiva_full_left from "../../assets/characters/tiva/full/lesley-full-left.png";
import CharacterImage from "./CharacterImage";

const Tiva = ({ face = "front" }) => {
  let src;

  switch (face) {
    case "front":
      src = tiva_full_front;
      break;
    case "right":
      src = tiva_full_right;
      break;
    case "back":
      src = tiva_full_back;
      break;
    case "left":
      src = tiva_full_left;
      break;
    default:
      src = tiva_full_front;
      break;
  }

  return (
    <CharacterImage src={src}/>
  );
};

export default Tiva;
