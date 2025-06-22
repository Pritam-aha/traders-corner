import React, { useEffect, useState } from 'react';
import { FaBars, FaChartBar, FaChartLine, FaCoins, FaHome, FaInfoCircle, FaSignal, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div 
        className="scroll-indicator" 
        style={{ '--scroll-width': `${scrollProgress}%` }}
      ></div>
      <header className="header">
        <div className="header-container">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon">
              <FaChartLine className="logo-chart" />
              <FaCoins className="logo-coins" />
            </div>
            <div className="logo-text">
              <h1>Traders Corner</h1>
              <p className="logo-tagline">Your Financial Compass</p>
            </div>
          </NavLink>

          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              <i><FaHome /></i>
              <span>Home</span>
            </NavLink>
            <NavLink to="/market-overview" className="nav-link" onClick={closeMenu}>
              <i><FaChartBar /></i>
              <span>Overview</span>
            </NavLink>
            <NavLink to="/graphs" className="nav-link" onClick={closeMenu}>
              <i><FaChartLine /></i>
              <span>Graphs</span>
            </NavLink>
            <NavLink to="/market-status" className="nav-link" onClick={closeMenu}>
              <i><FaSignal /></i>
              <span>Market Status</span>
            </NavLink>
            <NavLink to="/statistics" className="nav-link" onClick={closeMenu}>
              <i><FaChartLine /></i>
              <span>Statistics</span>
            </NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMenu}>
              <i><FaInfoCircle /></i>
              <span>About Us</span>
            </NavLink>
          </nav>

          <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header; 