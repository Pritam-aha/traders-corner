import { motion } from 'framer-motion';
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-chart-line"></i>
              <h3>Indian Stock Market Tracker</h3>
            </div>
            <p className="footer-description">
              Real-time tracking of all major Indian stock market indexes with comprehensive 
              market analysis and professional insights.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#overview">Market Overview</a></li>
              <li><a href="#all-indexes">All Indexes</a></li>
              <li><a href="#market-status">Market Status</a></li>
              <li><a href="#statistics">Statistics</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@indianstocktracker.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-mobile-alt"></i>
                <span>+91 87654 32109</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Market Hours</h4>
            <div className="market-hours">
              <div className="hours-item">
                <span className="day">Monday - Friday</span>
                <span className="time">9:00 AM - 3:30 PM IST</span>
              </div>
              <div className="hours-item">
                <span className="day">Saturday - Sunday</span>
                <span className="time">Closed</span>
              </div>
            </div>
            <div className="disclaimer">
              <p>Data is for informational purposes only. Please consult financial advisors before making investment decisions.</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Indian Stock Market Tracker. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>

        {/* Creator Attribution */}
        <motion.div 
          className="creator-attribution"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="creator-content">
            <div className="creator-info">
              <i className="fas fa-code"></i>
              <span>Developed with ❤️ by</span>
            </div>
            <div className="creator-name">
              <h3>Pritam Saha</h3>
              <p>Full Stack Developer</p>
            </div>
            <div className="creator-links">
              <a href="mailto:pritam.saha@example.com" className="creator-link">
                <i className="fas fa-envelope"></i>
                pritam.saha@example.com
              </a>
              <a href="tel:+919876543210" className="creator-link">
                <i className="fas fa-phone"></i>
                +91 98765 43210
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 