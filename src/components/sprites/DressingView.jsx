import React from "react";
import SpritesSuperposition from "./SpritesSuperposition";
import Character from "./characters/CharacterSprite";
import ClothingPiece from "./clothes/ClothingSprite";

const DressingView = ({
  characterName,
    outfit,
  face,
}) => {

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
              />
          );
        }
        return null;
      })}
    </SpritesSuperposition>
  );
};

export default DressingView;
