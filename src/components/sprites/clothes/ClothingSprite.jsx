import React, {useEffect, useState} from "react";
import SpriteImage from "../SpriteImage";
import axios from "axios";

const ClothingSprite = ({ category, name, face = 'front' }) => {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    axios
        .get("http://localhost:5000/clothes")
        .then((response) => {
          const data = response.data;
          const selectedSprite = data.find((cloth) => cloth["name"] === name && cloth["type"] === category);
          if (selectedSprite) {
            let imageUrl;

            if (face === "front") {
              imageUrl = selectedSprite["front-url"];
            } else if (face === "back") {
              imageUrl = selectedSprite["back-url"];
            } else if (face === "left") {
              imageUrl = selectedSprite["left-url"];
            } else if (face === "right") {
              imageUrl = selectedSprite["right-url"];
            }

            setSprite(imageUrl);
          }
        })
        .catch((error) => console.error(error));
  }, [category, face, name]);

  if (!sprite)
    return <div>Loading...</div>

  return (
    <SpriteImage
      src={sprite}
    />
  );
};

export default ClothingSprite;