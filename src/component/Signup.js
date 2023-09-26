import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignupSuccess, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/register", {
        username,
        email,
        password,
      });
      const userData = response.data;
      onSignupSuccess(userData.username);
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle signup failure (e.g., show an error message)
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-header">Signup</div>
        <form onSubmit={handleSignup} className="login-form">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Signup
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span className="signup-link" onClick={onClose}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
