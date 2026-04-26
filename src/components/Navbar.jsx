import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext.jsx';
import { logoutSession } from '../services/session.js';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = user !== null;
  const userName = user?.username || '';
  const isAdmin = user?.isAdmin || false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!isUserMenuOpen) {
      return undefined;
    }

    const closeMenuOnOutsideClick = (event) => {
      if (!userMenuRef.current?.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', closeMenuOnOutsideClick);
    };
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    await logoutSession();
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
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
          <div className="user-menu" ref={userMenuRef}>
            <button
              type="button"
              className="welcome-text user-menu-trigger"
              onClick={() => setIsUserMenuOpen((current) => !current)}
            >
              Welcome, <strong>{userName}</strong>!
            </button>

            {isUserMenuOpen && (
              <div className="user-menu-dropdown" role="menu" aria-label="User menu">
                <Link
                  to="/user"
                  className="user-menu-item"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button type="button" className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
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