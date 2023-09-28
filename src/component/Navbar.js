import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login"; // Import the Login component
import Signup from "./Signup"; // Import the Signup component
import { isAuthenticated, signout } from "../helper/user";

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


  const handleCloseOverlay = () => {
    setShowLoginOverlay(false);
    setShowSignupOverlay(false);
  };

  return (
    <nav className="navbar">
      <div className="containerN">
      <NavLink to="/">
        <div style={{fontFamily:"Dancing Script, cursive",fontSize:"2rem",fontWeight:"bold"}}>
          Eatery
        </div></NavLink>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {/* Add your hamburger menu icon */}
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li className="homet">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/bill"><span className="homet">Current</span> Bill</NavLink>
            </li>
          </ul>
        </div>
        <div className="user-login">{
          isAuthenticated()? <button className="login-button" style={{backgroundColor:"red"}} onClick={()=>(signout(() => {
            // console.log("signinout")
            window.location.href = "/";})
          )}>
          Signout
        </button>  :
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
