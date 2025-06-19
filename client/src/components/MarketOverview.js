import { motion } from 'framer-motion';
import React from 'react';
import './MarketOverview.css';
import StockCard from './StockCard';

const MarketOverview = ({ majorIndexes, sectorIndexes, marketStats }) => {
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
    <div className="market-overview">
      {/* Market Statistics */}
      <motion.div 
        className="market-stats-overview"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3>{marketStats.total}</h3>
              <p>Total Indexes</p>
            </div>
          </div>
          
          <div className="stat-card gainers">
            <div className="stat-icon">
              <i className="fas fa-arrow-up"></i>
            </div>
            <div className="stat-content">
              <h3>{marketStats.gainers}</h3>
              <p>Gainers</p>
            </div>
          </div>
          
          <div className="stat-card losers">
            <div className="stat-icon">
              <i className="fas fa-arrow-down"></i>
            </div>
            <div className="stat-content">
              <h3>{marketStats.losers}</h3>
              <p>Losers</p>
            </div>
          </div>
          
          <div className="stat-card avg-change">
            <div className="stat-icon">
              <i className="fas fa-percentage"></i>
            </div>
            <div className="stat-content">
              <h3 className={parseFloat(marketStats.avgChange) >= 0 ? 'text-success' : 'text-danger'}>
                {parseFloat(marketStats.avgChange) >= 0 ? '+' : ''}{marketStats.avgChange}%
              </h3>
              <p>Avg Change</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Major Indexes */}
      <motion.div 
        className="section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="section-header">
          <h2>
            <i className="fas fa-star"></i>
            Major Indexes
          </h2>
          <p>Key market indicators</p>
        </div>
        
        <motion.div 
          className="stocks-grid major"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {majorIndexes.map((stock, index) => (
            <StockCard 
              key={stock.symbol} 
              stock={stock} 
              index={index}
              isMajor={true}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* All Sector Indexes */}
      <motion.div 
        className="section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="section-header">
          <h2>
            <i className="fas fa-industry"></i>
            Sector Indexes
          </h2>
          <p>All sectoral performance indicators</p>
        </div>
        
        <motion.div 
          className="stocks-grid sector"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sectorIndexes.map((stock, index) => (
            <StockCard 
              key={stock.symbol} 
              stock={stock} 
              index={index}
              isMajor={false}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketOverview; 