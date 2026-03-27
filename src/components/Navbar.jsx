import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, userName, isAdmin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img 
            src="https://www.rockwellautomation.com/content/dam/rockwell-automation/sites/images/logos/2019_Logo_rgb_RA_Bug-LeftText_color.svg" 
            alt="Rockwell Logo" 
          />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </div>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-center">
          <a 
          href="https://www.rockwellautomation.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="nav-link"
        >
          About Rockwell
        </a>
        
        <Link to="/ranking" className="nav-link">
          Ranking
        </Link>

        {/* Able to play if logged */}
        {isLoggedIn && (
          <Link to="/game" className="nav-link">
            Videogame
          </Link>
        )}

        {isLoggedIn && isAdmin && (
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        )}
      </div>

      {/* Button for login or username*/}
      <div className="navbar-right">
        {isLoggedIn ? (
          <span className="welcome-text">Welcome, <strong>{userName}</strong>!</span>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;