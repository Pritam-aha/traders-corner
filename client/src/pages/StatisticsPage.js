import React from 'react';
import './StatisticsPage.css';

const StatisticsPage = ({ marketData }) => {
  // Extract data from marketData prop
  const { majorIndexes = [], sectorIndexes = [], marketStats = {} } = marketData || {};
  const stocks = [...majorIndexes, ...sectorIndexes];

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
    <div className="statistics-page page-transition">
      {/* Header */}
      <div className="section-header reveal-on-scroll">
        <h2 className="floating">Market Statistics</h2>
        <p>Comprehensive analysis of market performance and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="stats-summary reveal-on-scroll">
        <div className="summary-card total floating-card">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.total || 0}</h3>
            <p>Total Indexes Tracked</p>
          </div>
        </div>

        <div className="summary-card gainers floating-card">
          <div className="card-icon">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.gainers || 0}</h3>
            <p>Gaining Indexes</p>
          </div>
        </div>

        <div className="summary-card losers floating-card">
          <div className="card-icon">
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.losers || 0}</h3>
            <p>Declining Indexes</p>
          </div>
        </div>

        <div className="summary-card unchanged floating-card">
          <div className="card-icon">
            <i className="fas fa-minus"></i>
          </div>
          <div className="card-content">
            <h3>{marketStats.unchanged || 0}</h3>
            <p>Unchanged Indexes</p>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="detailed-stats reveal-on-scroll">
        <div className="stats-grid">
          {/* Sector Performance */}
          <div className="stat-section sector-performance floating-card">
            <h3 className="floating">
              <i className="fas fa-industry"></i>
              Sector Performance
            </h3>
            <div className="sector-list">
              {sectorBreakdown.slice(0, 8).map((sector, index) => (
                <div key={sector.name} className="sector-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="sector-name">{sector.name}</div>
                  <div className={`sector-change ${sector.avgChange >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatPercentage(sector.avgChange)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="stat-section performance-distribution floating-card">
            <h3 className="floating">
              <i className="fas fa-chart-pie"></i>
              Performance Distribution
            </h3>
            <div className="distribution-list">
              {performanceDistribution.map((range, index) => (
                <div key={index} className="distribution-item" style={{ animationDelay: `${index * 0.1}s` }}>
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
          </div>

          {/* Data Sources */}
          <div className="stat-section data-sources floating-card">
            <h3 className="floating">
              <i className="fas fa-database"></i>
              Data Sources
            </h3>
            <div className="sources-list">
              {dataSources.map((source, index) => (
                <div key={source.source} className="source-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="source-name">{source.source}</div>
                  <div className="source-count">{source.count} indexes</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage; 