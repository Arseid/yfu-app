import React from "react";
import SpritesSuperposition from "./SpritesSuperposition";
import Character from "./characters/CharacterSprite";
import ClothingPiece from "./clothes/ClothingSprite";

const DressingView = ({
  characterName = "lesley",
  clothingTop = 'white_t_shirt',
  clothingHats,
  clothingGlasses,
  clothingOvercoats,
  clothingBottoms,
  clothingHosiery,
  clothingShoes,
  clothingDresses,
  face = "front",
}) => {
  return (
    <SpritesSuperposition>
      <Character name={characterName} face={face} />
      {clothingTop && (
        <ClothingPiece
          category={'tops'}
          name={clothingTop}
          face={face}
          key={clothingTop}
        />
      )}
    </SpritesSuperposition>
  );
};

export default DressingView;
