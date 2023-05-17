import React from "react";
import lesley_full_front from "../../assets/characters/lesley/full/lesley-full-front.png";
import lesley_full_right from "../../assets/characters/lesley/full/lesley-full-right.png";
import lesley_full_back from "../../assets/characters/lesley/full/lesley-full-back.png";
import lesley_full_left from "../../assets/characters/lesley/full/lesley-full-left.png";
import CharacterImage from "./CharacterImage";

const Lesley = ({ face = "front" }) => {
  let src;

  switch (face) {
    case "front":
      src = lesley_full_front;
      break;
    case "right":
      src = lesley_full_right;
      break;
    case "back":
      src = lesley_full_back;
      break;
    case "left":
      src = lesley_full_left;
      break;
    default:
      src = lesley_full_front;
      break;
  }

  return (
    <CharacterImage src={src}/>
  );
};

export default Lesley;
