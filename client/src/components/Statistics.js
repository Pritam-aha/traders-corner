import { motion } from 'framer-motion';
import React from 'react';
import './Statistics.css';

const Statistics = ({ stocks, marketStats }) => {
  const getSectorBreakdown = () => {
    const sectorStocks = stocks.filter(stock => stock.type === 'sector');
    const sectorStats = {};
    
    sectorStocks.forEach(stock => {
      if (!sectorStats[stock.name]) {
        sectorStats[stock.name] = {
          count: 0,
          totalChange: 0,
          avgChange: 0
        };
      }
      sectorStats[stock.name].count++;
      sectorStats[stock.name].totalChange += stock.changePercent;
    });

    // Calculate averages
    Object.keys(sectorStats).forEach(sector => {
      sectorStats[sector].avgChange = sectorStats[sector].totalChange / sectorStats[sector].count;
    });

    return Object.entries(sectorStats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => Math.abs(b.avgChange) - Math.abs(a.avgChange));
  };

  const getPerformanceDistribution = () => {
    const ranges = [
      { label: 'Strong Gain (>2%)', min: 2, max: Infinity, color: 'success' },
      { label: 'Moderate Gain (0.5-2%)', min: 0.5, max: 2, color: 'success' },
      { label: 'Slight Gain (0-0.5%)', min: 0, max: 0.5, color: 'success' },
      { label: 'Slight Loss (0-0.5%)', min: -0.5, max: 0, color: 'danger' },
      { label: 'Moderate Loss (0.5-2%)', min: -2, max: -0.5, color: 'danger' },
      { label: 'Strong Loss (>2%)', min: -Infinity, max: -2, color: 'danger' }
    ];

    return ranges.map(range => {
      const count = stocks.filter(stock => 
        stock.changePercent > range.min && stock.changePercent <= range.max
      ).length;
      
      return {
        ...range,
        count,
        percentage: ((count / stocks.length) * 100).toFixed(1)
      };
    });
  };

  const getDataSources = () => {
    const sources = {};
    stocks.forEach(stock => {
      sources[stock.source] = (sources[stock.source] || 0) + 1;
    });
    return Object.entries(sources).map(([source, count]) => ({ source, count }));
  };

  const sectorBreakdown = getSectorBreakdown();
  const performanceDistribution = getPerformanceDistribution();
  const dataSources = getDataSources();

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="statistics">
      {/* Summary Cards */}
      <div className="stats-summary">
        <motion.div 
          className="summary-card total"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.total}</h3>
            <p>Total Indexes Tracked</p>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card gainers"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-icon">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.gainers}</h3>
            <p>Gaining Indexes</p>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card losers"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-icon">
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.losers}</h3>
            <p>Declining Indexes</p>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card unchanged"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-icon">
            <i className="fas fa-minus"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.unchanged}</h3>
            <p>Unchanged Indexes</p>
          </div>
        </motion.div>
      </div>

      {/* Detailed Statistics */}
      <div className="detailed-stats">
        <div className="stats-grid">
          {/* Sector Performance */}
          <motion.div 
            className="stat-section sector-performance"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>
              <i className="fas fa-industry"></i>
              Sector Performance
            </h3>
            <div className="sector-list">
              {sectorBreakdown.slice(0, 8).map((sector, index) => (
                <div key={sector.name} className="sector-item">
                  <div className="sector-name">{sector.name}</div>
                  <div className={`sector-change ${sector.avgChange >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatPercentage(sector.avgChange)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Distribution */}
          <motion.div 
            className="stat-section performance-distribution"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3>
              <i className="fas fa-chart-pie"></i>
              Performance Distribution
            </h3>
            <div className="distribution-list">
              {performanceDistribution.map((range, index) => (
                <div key={index} className="distribution-item">
                  <div className="range-info">
                    <span className="range-label">{range.label}</span>
                    <span className="range-count">{range.count} indexes</span>
                  </div>
                  <div className="range-bar">
                    <div 
                      className={`bar-fill ${range.color}`}
                      style={{ width: `${range.percentage}%` }}
                    ></div>
                  </div>
                  <span className="range-percentage">{range.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Sources */}
          <motion.div 
            className="stat-section data-sources"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>
              <i className="fas fa-database"></i>
              Data Sources
            </h3>
            <div className="sources-list">
              {dataSources.map((source, index) => (
                <div key={source.source} className="source-item">
                  <div className="source-name">{source.source}</div>
                  <div className="source-count">{source.count} indexes</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market Sentiment */}
          <motion.div 
            className="stat-section market-sentiment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3>
              <i className="fas fa-brain"></i>
              Market Sentiment
            </h3>
            <div className="sentiment-analysis">
              <div className="sentiment-item">
                <span className="sentiment-label">Bullish Indexes</span>
                <span className="sentiment-value text-success">{marketStats.gainers}</span>
              </div>
              <div className="sentiment-item">
                <span className="sentiment-label">Bearish Indexes</span>
                <span className="sentiment-value text-danger">{marketStats.losers}</span>
              </div>
              <div className="sentiment-item">
                <span className="sentiment-label">Neutral Indexes</span>
                <span className="sentiment-value text-warning">{marketStats.unchanged}</span>
              </div>
              <div className="sentiment-summary">
                <span className="summary-label">Overall Sentiment</span>
                <span className={`summary-value ${marketStats.gainers > marketStats.losers ? 'text-success' : 'text-danger'}`}>
                  {marketStats.gainers > marketStats.losers ? 'Bullish' : 'Bearish'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 