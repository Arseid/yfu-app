import React from "react";
import SpritesSuperposition from "./SpritesSuperposition";
import Character from "./characters/CharacterSprite";
import ClothingPiece from "./clothes/ClothingSprite";

const DressingView = ({ characterName, outfit, face }) => {

  const zIndexes = {
    hats: 9,
    glasses: 4,
    tops: 7,
    overcoats: 8,
    bottoms: 5,
    hosiery: 2,
    shoes: 3,
    dresses: 6,
  };


  return (
    <SpritesSuperposition>
      <Character name={characterName} face={face} />
      {Object.entries(outfit)
        .sort((a, b) => zIndexes[b[0]] - zIndexes[a[0]])
        .map(([type, cloth]) => {
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
