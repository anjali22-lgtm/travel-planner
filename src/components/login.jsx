// src/components/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Here you can add validation or authentication later
    navigate("/plan"); // Go to trip planner
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <p>Click below to start planning your trip.</p>
      <button onClick={handleStart} className="start-button">Start Planning</button>
    </div>
  );
};

export default Login;
