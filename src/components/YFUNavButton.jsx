import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import fi_rr_person_dress from "../assets/nav-icons/fi-rr-person-dress.svg";
import fi_sr_person_dress from "../assets/nav-icons/fi-sr-person-dress.svg";
import fi_rr_playing_cards from "../assets/nav-icons/fi-rr-playing-cards.svg";
import fi_sr_playing_cards from "../assets/nav-icons/fi-sr-playing-cards.svg";
import fi_rr_dice_alt from "../assets/nav-icons/fi-rr-dice-alt.svg";
import fi_sr_dice_alt from "../assets/nav-icons/fi-sr-dice-alt.svg";
import fi_sr_menu_burger from "../assets/nav-icons/fi-sr-menu-burger.svg";
import fi_rr_menu_burger from "../assets/nav-icons/fi-rr-menu-burger.svg";
import { useLocation } from "react-router-dom";

const YFUNavButton = ({ pathname = undefined, tooltip = undefined }) => {
  let icon;
  const icon_variant = useLocation().pathname === pathname ? 1 : 0;

  switch (pathname) {
    case "/" || "/home":
      icon = [fi_rr_person_dress, fi_sr_person_dress];
      break;
    case "/gacha":
      icon = [fi_rr_playing_cards, fi_sr_playing_cards];
      break;
    case "/minigames":
      icon = [fi_rr_dice_alt, fi_sr_dice_alt];
      break;
    default:
      icon = [fi_rr_menu_burger, fi_sr_menu_burger];
      break;
  }

  return (
    <Tooltip
      title={tooltip}
      sx={{
        "& .tooltipClasses.tooltip": {
          fontFamily: "'Baloo 2', cursive;",
          fontSize: "16px",
          bgcolor: "white",
        },
      }}
    >
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        disableRipple
        sx={{
          background: `radial-gradient(362.07% 362.07% at 68.71% -130.74%, rgba(255, 134, 177, 0.74) 44.61%, rgba(255, 78, 245, 0.74) 55.34%, rgba(109, 42, 193, 0.74) 66.93%)`,
          borderRadius: "1rem 1rem 1rem 1rem",
          p: "0.75rem",
          "&:hover": {
            boxShadow: "0 0 0 0.25rem white",
          },
        }}
      >
        <img src={icon[icon_variant]} height="40px" />
      </IconButton>
    </Tooltip>
  );
};

export default YFUNavButton;
