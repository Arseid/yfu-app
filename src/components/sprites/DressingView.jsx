import React from "react";
import SpritesSuperposition from "./SpritesSuperposition";
import Character from "./characters/CharacterSprite";
import ClothingPiece from "./clothes/ClothingSprite";

const DressingView = ({ characterName, outfit, face }) => {

  const zIndexes = {
    hats: 7,
    glasses: 8,
    overcoats: 6,
    tops: 5,
    bottoms: 4,
    hosiery: 3,
    shoes: 2,
    dresses: 1,
  };


  return (
    <SpritesSuperposition>
      <Character name={characterName} face={face} />
      {Object.entries(outfit).map(([type, cloth]) => {
        if (cloth) {
          return (
              <ClothingPiece
                  key={`${type}-${cloth.name}`}
                  cloth={cloth}
                  face={face}
                  zIndex={zIndexes[type]}
              />
          );
        }
        return null;
      })}
    </SpritesSuperposition>
  );
};

export default DressingView;
