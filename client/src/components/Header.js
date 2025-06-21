import { motion } from 'framer-motion';
import React from 'react';
import './Header.css';

const Header = ({ onViewChange, onRefresh, currentView }) => {
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <motion.h1 
              className="header-title"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-chart-line"></i>
              Indian Stock Market Tracker
            </motion.h1>
            <p className="header-subtitle">
              Real-time tracking of NIFTY, SENSEX & Sectoral Indices
            </p>
          </div>
          
          <div className="header-right">
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${currentView === 'overview' ? 'active' : ''}`}
                onClick={() => onViewChange('overview')}
              >
                Dashboard
              </button>
              <button 
                className={`toggle-btn ${currentView === 'about' ? 'active' : ''}`}
                onClick={() => onViewChange('about')}
              >
                About Us
              </button>
            </div>
            <div className="market-status-container">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Live</span>
              </div>
              <div className="current-time">
                <i className="fas fa-clock"></i>
                <span>{currentTime} IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 