import { motion } from 'framer-motion';
import React from 'react';
import './StockCard.css';

const StockCard = ({ stock, index, isMajor }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(change));
  };

  const getLogoClass = (logo) => {
    const logoMap = {
      'nifty-logo': 'fas fa-chart-line',
      'sensex-logo': 'fas fa-chart-line',
      'bank-logo': 'fas fa-university',
      'it-logo': 'fas fa-laptop-code',
      'pharma-logo': 'fas fa-pills',
      'auto-logo': 'fas fa-car',
      'fmcg-logo': 'fas fa-shopping-cart',
      'metal-logo': 'fas fa-industry',
      'realty-logo': 'fas fa-building',
      'psu-logo': 'fas fa-landmark',
      'private-logo': 'fas fa-university',
      'fin-logo': 'fas fa-chart-pie',
      'energy-logo': 'fas fa-bolt',
      'infra-logo': 'fas fa-road',
      'consumer-logo': 'fas fa-tv',
      'media-logo': 'fas fa-film',
      'oil-logo': 'fas fa-gas-pump',
      'health-logo': 'fas fa-heartbeat',
      'commodity-logo': 'fas fa-coins',
      'mnc-logo': 'fas fa-globe',
      'growth-logo': 'fas fa-rocket'
    };
    return logoMap[logo] || 'fas fa-chart-line';
  };

  // Determine if the stock is positive or negative
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'success' : 'danger';
  const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';
  const changePrefix = isPositive ? '+' : '-';

  return (
    <motion.div
      className={`stock-card ${isMajor ? 'major' : 'sector'} ${isPositive ? 'positive' : 'negative'}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.5
          }
        }
      }}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <div className="stock-logo">
          <i className={getLogoClass(stock.logo)}></i>
        </div>
        <div className="stock-info">
          <h3 className="stock-name">{stock.name}</h3>
          <p className="stock-symbol">{stock.symbol}</p>
        </div>
        <div className="stock-type">
          <span className={`type-badge ${stock.type}`}>
            {stock.type === 'major' ? 'Major' : 'Sector'}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="price-section">
          <div className="current-price">
            <span className="currency">₹</span>
            <span className="price">{formatPrice(stock.price)}</span>
          </div>
          
          <div className={`change-section ${changeColor}`}>
            <div className="change-amount">
              <i className={`fas fa-${changeIcon}`}></i>
              <span>{changePrefix}₹{formatChange(stock.change)}</span>
            </div>
            <div className="change-percent">
              <span>{changePrefix}{formatChange(stock.changePercent)}%</span>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="previous-close">
            <span>Prev Close: ₹{formatPrice(stock.previousClose)}</span>
          </div>
          <div className="data-source">
            <span className="source-badge">{stock.source}</span>
          </div>
        </div>
      </div>

      {/* Animated background gradient */}
      <div className={`card-bg-gradient ${changeColor}`}></div>
    </motion.div>
  );
};

export default StockCard; 