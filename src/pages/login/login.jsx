import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Link } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import logo from '../../assets/brand/svg/yfu-logo.svg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in", user);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      className="Login"
      sx={{ width: "100%", height: "100%" }}
    >
      <img alt="logo" src={logo} height='150px' style={{marginBottom:'4rem'}} />
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          sx={{ width: "100%", height: "100%" }}
        >
          <Box sx={{ fontSize: "2rem", fontWeight:'bold' }}>Logging in</Box>
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
                Log In
              </button>
            </Grid>
            <Grid item xs={0} md={1} sx={{ height: "1rem" }}>
              &nbsp;
            </Grid>
            <Grid item xs={12} md={5.5}>
              <Link to="/signup">
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
                  Create an account
                </button>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
