import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login"; // Import the Login component
import Signup from "./Signup"; // Import the Signup component
import { isAuthenticated } from "../helper/user";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignupOverlay, setShowSignupOverlay] = useState(false);

  const { user } = isAuthenticated();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLoginClick = () => {
    setShowLoginOverlay(true);
    setShowSignupOverlay(false);
  };

  const handleSignupClick = () => {
    setShowSignupOverlay(true);
    setShowLoginOverlay(false);
  };
  // const [user, setUser] = useState(null);

  // const handleLoginSuccess = (username) => {
  //   setUser({ username });
  // };

  // const handleSignupSuccess = (username) => {
  //   setUser({ username });
  // };

  const handleCloseOverlay = () => {
    setShowLoginOverlay(false);
    setShowSignupOverlay(false);
  };

  return (
    <nav className="navbar">
      <div className="containerN">
        <div className="logo">
          <img src="/path/to/your/logo.png" alt="Logo" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {/* Add your hamburger menu icon */}
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/bill">Current Bill</NavLink>
            </li>
          </ul>
        </div>
        <div className="user-login">{
          isAuthenticated()? user.username :
          <div>
           {showLoginOverlay && <Login  onClose={handleCloseOverlay}  />}
          {showSignupOverlay && <Signup  onClose={handleCloseOverlay}  />}
          {!showLoginOverlay && !showSignupOverlay && (
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
          )}
          </div>
        }
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
