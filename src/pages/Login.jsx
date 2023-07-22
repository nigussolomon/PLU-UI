import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const naviagte = useNavigate();
  return (
    <div
      className="login"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TextField
        style={{ width: "20%" }}
        label="Email"
        type="email"
        variant="outlined"
      />
      <br />
      <TextField
        style={{ width: "20%" }}
        label="Password"
        type="password"
        variant="outlined"
      />
      <br />
      <Button onClick={() => naviagte("/ps")} style={{ width: "20%", padding: ".8%", backgroundColor: "#04184B", }} variant="contained">
        Login
      </Button>
    </div>
  );
}
