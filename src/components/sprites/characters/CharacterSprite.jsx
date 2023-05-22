import React, {useContext, useEffect, useState} from "react";
import SpriteImage from "../SpriteImage";
import YfusContext from "../../../context/YfusContext";

const CharacterSprite = ({ name, face = 'front' }) => {
  const [sprite, setSprite] = useState(null);
  const yfus = useContext(YfusContext);

  useEffect(() => {

      const selectedSprite = yfus.find((yfu) => yfu["prenom"] === name);
      if (selectedSprite) {
        let imageUrl;

        if (face === "front") {
          imageUrl = selectedSprite["full-front-url"];
        } else if (face === "back") {
          imageUrl = selectedSprite["full-back-url"];
        } else if (face === "left") {
          imageUrl = selectedSprite["full-left-url"];
        } else if (face === "right") {
          imageUrl = selectedSprite["full-right-url"];
        }

        setSprite(imageUrl);
      }

  }, [name, face, yfus]);

  if (!sprite)
      return <div>Loading...</div>

  return <SpriteImage src={sprite} />;
};

export default CharacterSprite;
