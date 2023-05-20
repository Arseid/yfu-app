import React, { useEffect, useState } from "react";
import SpriteImage from "../SpriteImage";
import axios from "axios";

const CharacterSprite = ({ name, face = 'front' }) => {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    axios
        .get("http://localhost:5000/yfus")
        .then((response) => {
          const data = response.data;
          const selectedSprite = data.find((yfu) => yfu["prenom"] === name);
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
        })
        .catch((error) => console.error(error));
  }, [name, face]);

  if (!sprite)
      return <div>Loading...</div>

  return <SpriteImage src={sprite} />;
};

export default CharacterSprite;
