import { motion } from 'framer-motion';
import React from 'react';
import './MarketStatus.css';

const MarketStatus = ({ majorIndexes, sectorIndexes, lastUpdate }) => {
  const formatTime = (date) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const getMarketStatus = () => {
    const allIndexes = [...majorIndexes, ...sectorIndexes];
    const gainers = allIndexes.filter(index => index.change >= 0).length;
    const losers = allIndexes.filter(index => index.change < 0).length;
    
    if (gainers > losers) {
      return { status: 'Bullish', color: 'success', icon: 'fas fa-arrow-up' };
    } else if (losers > gainers) {
      return { status: 'Bearish', color: 'danger', icon: 'fas fa-arrow-down' };
    } else {
      return { status: 'Neutral', color: 'warning', icon: 'fas fa-minus' };
    }
  };

  const getTopPerformers = (type = 'gainers', count = 5) => {
    const allIndexes = [...majorIndexes, ...sectorIndexes];
    return allIndexes
      .filter(index => type === 'gainers' ? index.change >= 0 : index.change < 0)
      .sort((a, b) => type === 'gainers' ? b.changePercent - a.changePercent : a.changePercent - b.changePercent)
      .slice(0, count);
  };

  const marketStatus = getMarketStatus();
  const topGainers = getTopPerformers('gainers', 5);
  const topLosers = getTopPerformers('losers', 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="market-status">
      {/* Market Status Overview */}
      <motion.div 
        className="status-overview"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="status-header">
          <h2>
            <i className="fas fa-chart-line"></i>
            Market Status
          </h2>
          <div className={`status-indicator ${marketStatus.color}`}>
            <i className={marketStatus.icon}></i>
            <span>{marketStatus.status}</span>
          </div>
        </div>
        
        <div className="status-details">
          <div className="detail-item">
            <span className="label">Last Update:</span>
            <span className="value">{formatTime(lastUpdate)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Total Indexes:</span>
            <span className="value">{majorIndexes.length + sectorIndexes.length}</span>
          </div>
          <div className="detail-item">
            <span className="label">Market Sentiment:</span>
            <span className={`value ${marketStatus.color}`}>
              <i className={marketStatus.icon}></i>
              {marketStatus.status}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div 
        className="performers-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="performers-grid">
          {/* Top Gainers */}
          <motion.div 
            className="performers-card gainers"
            variants={itemVariants}
          >
            <div className="card-header">
              <h3>
                <i className="fas fa-arrow-up"></i>
                Top Gainers
              </h3>
            </div>
            <div className="performers-list">
              {topGainers.map((index, idx) => (
                <div key={index.symbol} className="performer-item">
                  <div className="performer-info">
                    <span className="performer-name">{index.name}</span>
                    <span className="performer-symbol">{index.symbol}</span>
                  </div>
                  <div className="performer-change success">
                    <span className="change-amount">+₹{Math.abs(index.change).toFixed(2)}</span>
                    <span className="change-percent">+{index.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              ))}
              {topGainers.length === 0 && (
                <div className="no-data">No gainers available</div>
              )}
            </div>
          </motion.div>

          {/* Top Losers */}
          <motion.div 
            className="performers-card losers"
            variants={itemVariants}
          >
            <div className="card-header">
              <h3>
                <i className="fas fa-arrow-down"></i>
                Top Losers
              </h3>
            </div>
            <div className="performers-list">
              {topLosers.map((index, idx) => (
                <div key={index.symbol} className="performer-item">
                  <div className="performer-info">
                    <span className="performer-name">{index.name}</span>
                    <span className="performer-symbol">{index.symbol}</span>
                  </div>
                  <div className="performer-change danger">
                    <span className="change-amount">-₹{Math.abs(index.change).toFixed(2)}</span>
                    <span className="change-percent">-{Math.abs(index.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
              ))}
              {topLosers.length === 0 && (
                <div className="no-data">No losers available</div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Market Summary */}
      <motion.div 
        className="market-summary"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h3>Market Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="summary-content">
              <span className="summary-value">{majorIndexes.length}</span>
              <span className="summary-label">Major Indexes</span>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-icon">
              <i className="fas fa-industry"></i>
            </div>
            <div className="summary-content">
              <span className="summary-value">{sectorIndexes.length}</span>
              <span className="summary-label">Sector Indexes</span>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-icon">
              <i className="fas fa-arrow-up"></i>
            </div>
            <div className="summary-content">
              <span className="summary-value success">{topGainers.length}</span>
              <span className="summary-label">Gainers</span>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-icon">
              <i className="fas fa-arrow-down"></i>
            </div>
            <div className="summary-content">
              <span className="summary-value danger">{topLosers.length}</span>
              <span className="summary-label">Losers</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketStatus; 