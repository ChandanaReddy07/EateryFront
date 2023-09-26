import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup"; // Import the Signup component
import { authenticate ,isAuthenticated} from "../helper/user";

// import { authenticate } from "../helper/user";


function Login({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false); // State to control the Signup overlay

  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const { user } = isAuthenticated();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("email",email,"password",password)
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      const userData = response.data;
  
      authenticate(userData, () => {
        setEmail("")
        setPassword("")
      });
    

  

      onClose(); // Close the overlay after successful login
    } catch (error) {
      setEmail("")
      setPassword("")
      console.error("Login failed:", error);
      setErrorMessage("Email or password is incorrect"); // Set error message
    }
  };

  const handleSignupClick = () => {
    // Show the Signup overlay when the "Sign Up" link is clicked
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    // Close the Signup overlay when called
    setShowSignup(false);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-header">Login</div>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="login-form">
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
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={handleSignupClick}>
            Sign Up
          </span>
        </p>
      </div>
      {showSignup && (
        <Signup
          onSignupSuccess={() => setShowSignup(false)}
          onClose={handleCloseSignup}
        />
      )}{" "}
      {/* Render the Signup overlay when showSignup is true */}
    </div>
  );
}

export default Login;
