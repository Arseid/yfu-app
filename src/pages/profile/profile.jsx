import { Avatar, Box, Paper, Stack } from "@mui/material";
import React from "react";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { OfflineBolt, Person } from "@mui/icons-material";

const Profile = () => {
  const user = useContext(UserContext);
  return (
    <Stack spacing={3} justifyContent={"center"} alignItems={"center"}>
      <Box sx={{ fontSize: "4rem" }}>Your profile</Box>
      <Paper
        sx={{
          p: "4rem",
          borderRadius: "2rem",
          width: "50%",
          maxWidth: "700px",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            fontSize: "3rem",
            lineHeight: "3rem",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.displayName}
        </Box>
        <Box
          sx={{
            fontSize: "2rem",
            lineHeight: "2rem",
            opacity: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          #user.id
        </Box>
        <Box
          sx={{
            fontSize: "1.5rem",
            lineHeight: "1.5rem",
            opacity: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.email}
        </Box>
        <Avatar
          sx={{
            height: { xs: "4rem", md: "6rem" },
            width: { xs: "4rem", md: "6rem" },
            position: "absolute",
            top: "4rem",
            right: "4rem",
          }}
        >
          <Person sx={{ fontSize: "3rem" }} />
        </Avatar>
      </Paper>
      <Paper
        sx={{
          px: "3rem",
          py: "1rem",
          borderRadius: "2rem",
          maxWidth: "700px",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            position: "relative",
          }}
        >
          <Box sx={{ fontSize: "1.25rem" }}>Your coins</Box>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            direction={"row"}
          >
            <Box
              sx={{
                fontSize: "3rem",
                lineHeight: "3rem",
              }}
            >
              450&nbsp;
            </Box>
            <OfflineBolt
              sx={{
                color: "orange",
                fontSize: "2rem",
              }}
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Profile;
