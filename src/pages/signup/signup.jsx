import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Box, Grid, Stack } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      const response = await axios.post("http://localhost:5000/users", {
        id: user.uid,
        username: username,
      });
      console.log("User created", response.data);
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      className="Login"
      sx={{ width: "100%", height: "100%" }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          sx={{ width: "100%", height: "100%" }}
        >
          <Box sx={{fontSize:'2.5rem'}}>Signing up</Box>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              backgroundColor: "white",
              borderRadius: "5rem",
              padding: "1rem",
              border: "none",
              fontSize: "1.5rem",
              width: "50%",
              maxWidth: "500px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              backgroundColor: "white",
              borderRadius: "5rem",
              padding: "1rem",
              border: "none",
              fontSize: "1.5rem",
              width: "50%",
              maxWidth: "500px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              backgroundColor: "white",
              borderRadius: "5rem",
              padding: "1rem",
              border: "none",
              fontSize: "1.5rem",
              width: "50%",
              maxWidth: "500px",
              boxSizing: "border-box",
            }}
          />
          <Grid
            container
            sx={{
              width: "50%",
              maxWidth: "500px",
            }}
          >
            <Grid item xs={12} md={5.5}>
              <button
                type="submit"
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#F7F",
                  padding: "0.5rem",
                  border: "4px solid #FFF",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            </Grid>
            <Grid item xs={0} md={1} sx={{ height: "1rem" }}>
              &nbsp;
            </Grid>
            <Grid item xs={12} md={5.5}>
              <Link to="/">
                <button
                  type="submit"
                  style={{
                    borderRadius: "1rem",
                    backgroundColor: "#FFF",
                    padding: "0.5rem",
                    border: "4px solid #F7F",
                    color: "#F7F",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  Already have an account? Log in
                </button>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Stack>
  );
};

export default Signup;
