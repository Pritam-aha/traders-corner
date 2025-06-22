import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ marketData }) => {
  const { marketStats = {} } = marketData || {};

  return (
    <div className="home-page page-transition">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918116745880?text=Hello%20Sir%20I%20want%20investing%20related%20guidance"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Get Market Tips on WhatsApp"
      >
        <FaWhatsapp />
        <span className="whatsapp-text">Need Tips?</span>
      </a>

      {/* Hero Section */}
      <div className="hero-section reveal-on-scroll" data-animation="scale-up">
        <h1 className="hero-title floating-enhanced">
          Indian Stock Market Tracker
        </h1>
        <p className="hero-subtitle">
          Your comprehensive guide to real-time Indian stock market performance
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">{marketStats.total || 0}</span>
            <span className="stat-label">Total Indexes</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number text-success">{marketStats.gainers || 0}</span>
            <span className="stat-label">Gainers</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number text-danger">{marketStats.losers || 0}</span>
            <span className="stat-label">Losers</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions reveal-on-scroll" data-animation="slide-left">
        <h2 className="section-title floating-enhanced">Quick Actions</h2>
        <div className="action-cards">
          <Link to="/market-overview" className="action-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
            <div className="action-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Overview</h3>
            <p>Browse and search through all market indexes with real-time data</p>
          </Link>

          <Link to="/graphs" className="action-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
            <div className="action-icon">
              <i className="fas fa-chart-area"></i>
            </div>
            <h3>Index Graphs</h3>
            <p>View detailed charts and graphs for all market indexes</p>
          </Link>

          <Link to="/market-status" className="action-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
            <div className="action-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <h3>Market Status</h3>
            <p>Check current market status and trading information</p>
          </Link>

          <Link to="/statistics" className="action-card floating-card reveal-on-scroll stagger-4" data-animation="scale-up">
            <div className="action-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Statistics</h3>
            <p>Detailed market statistics and performance analysis</p>
          </Link>

          <Link to="/about" className="action-card floating-card reveal-on-scroll stagger-5" data-animation="scale-up">
            <div className="action-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>About Us</h3>
            <p>Learn more about our team and mission</p>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section reveal-on-scroll" data-animation="slide-right">
        <h2 className="section-title floating-enhanced">Why Choose Our Tracker?</h2>
        <div className="features-grid">
          <div className="feature-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Real-Time Data</h3>
            <p>Get live updates on market performance with real-time data feeds</p>
          </div>

          <div className="feature-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Friendly</h3>
            <p>Access market data on any device with our responsive design</p>
          </div>

          <div className="feature-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
            <div className="feature-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3>Comprehensive Analysis</h3>
            <p>Detailed charts and analysis for informed decision making</p>
          </div>

          <div className="feature-card floating-card reveal-on-scroll stagger-4" data-animation="scale-up">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Reliable & Secure</h3>
            <p>Trusted data sources with secure and reliable information</p>
          </div>
        </div>
      </div>

      {/* Market Summary */}
      <div className="market-summary reveal-on-scroll" data-animation="slide-left">
        <h2 className="section-title floating-enhanced">Market Summary</h2>
        <div className="summary-cards">
          <div className="summary-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
            <h3>Average Change</h3>
            <div className="summary-value">
              <span className={parseFloat(marketStats.avgChange || 0) >= 0 ? 'text-success' : 'text-danger'}>
                {parseFloat(marketStats.avgChange || 0) >= 0 ? '+' : ''}{marketStats.avgChange || '0.00'}%
              </span>
            </div>
          </div>

          <div className="summary-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
            <h3>Market Sentiment</h3>
            <div className="summary-value">
              <span className={marketStats.gainers > marketStats.losers ? 'text-success' : 'text-danger'}>
                {marketStats.gainers > marketStats.losers ? 'Bullish' : 'Bearish'}
              </span>
            </div>
          </div>

          <div className="summary-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
            <h3>Last Updated</h3>
            <div className="summary-value">
              <span>{marketStats.lastUpdate ? new Date(marketStats.lastUpdate).toLocaleTimeString() : 'Loading...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section reveal-on-scroll" data-animation="scale-up">
        <h2 className="section-title floating-enhanced">Ready to Explore?</h2>
        <p>Start your market analysis journey with our comprehensive tools</p>
        <div className="cta-buttons">
          <Link to="/market-overview" className="cta-button primary">
            <i className="fas fa-chart-line"></i>
            View Overview
          </Link>
          <Link to="/graphs" className="cta-button secondary">
            <i className="fas fa-chart-area"></i>
            View Index Graphs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 