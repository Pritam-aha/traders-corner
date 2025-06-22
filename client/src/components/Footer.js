import React from 'react';
import { FaFacebook, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>Traders Corner</h3>
          <p>Your one-stop destination for real-time Indian stock market data. Empowering traders with smart insights, accurate analytics, and comprehensive market information for informed decision-making.</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/market-overview">Overview</Link></li>
            <li><Link to="/graphs">Index Graphs</Link></li>
            <li><Link to="/market-status">Market Status</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
           
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: pritamsaha7120@gmail.com</p>
          <p>Phone: +91 8116745880</p>
          <p className="location-info">
            <FaMapMarkerAlt className="location-icon" />
            Kolkata 700102
          </p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/traderscorner" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com/traderscorner" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/traderscorner" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/traderscorner" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.github.com/traderscorner" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Traders Corner. All Rights Reserved.</p>
          <div className="creator-credit">
            <span>Created with</span>
            <FaHeart className="heart-icon" />
            <span>by</span>
            <a href="https://github.com/pritamsaha" target="_blank" rel="noopener noreferrer" className="creator-link">
              Pritam Saha
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 