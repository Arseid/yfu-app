import React, {useEffect, useState} from "react";
import SpriteImage from "../SpriteImage";

const ClothingSprite = ({ cloth, face = 'front' }) => {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
      if (cloth){
          let imageUrl;
          if (face === "front") {
              imageUrl = cloth["front-url"];
          } else if (face === "back") {
              imageUrl = cloth["back-url"];
          } else if (face === "left") {
              imageUrl = cloth["left-url"];
          } else if (face === "right") {
              imageUrl = cloth["right-url"];
          }
          setSprite(imageUrl);
      }
  }, [cloth, face]);

  if (!sprite)
    return <div></div>

  return (
    <SpriteImage
      src={sprite}
    />
  );
};

export default ClothingSprite;