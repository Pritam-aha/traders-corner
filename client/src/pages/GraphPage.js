import React, { useState } from 'react';
import StockGraph from '../components/StockGraph';
import './GraphPage.css';

const GraphPage = ({ marketData }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Extract data from marketData prop
  const { majorIndexes = [], sectorIndexes = [] } = marketData || {};

  // Combine all indexes
  const allIndexes = [...majorIndexes, ...sectorIndexes];

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleCloseGraph = () => {
    setSelectedIndex(null);
  };

  // Create a representative stock for the overall market graph
  const marketPerformanceStock = majorIndexes.length > 0 ? {
    name: 'Market Performance',
    symbol: 'MARKET_AVG',
    price: majorIndexes.reduce((acc, stock) => acc + stock.price, 0) / majorIndexes.length,
    change: majorIndexes.reduce((acc, stock) => acc + stock.change, 0) / majorIndexes.length,
    changePercent: majorIndexes.reduce((acc, stock) => acc + stock.changePercent, 0) / majorIndexes.length,
  } : null;

  return (
    <div className="graph-page page-transition">
      {/* Header */}
      <div className="section-header reveal-on-scroll" data-animation="scale-up">
        <h2 className="floating-enhanced">
          <i className="fas fa-chart-line"></i>
          Index Graphs
        </h2>
        <p>Interactive charts and graphs for all market indexes</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid reveal-on-scroll" data-animation="slide-left">
        <div className="stat-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
          <h3>{allIndexes.length}</h3>
          <p>Total Indexes</p>
        </div>
        <div className="stat-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
          <h3>{majorIndexes.length}</h3>
          <p>Major Indexes</p>
        </div>
        <div className="stat-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
          <h3>{sectorIndexes.length}</h3>
          <p>Sector Indexes</p>
        </div>
      </div>

      {/* Market Performance Overview */}
      <section className="market-overview-section reveal-on-scroll" data-animation="slide-left">
        <h3 className="section-title floating-enhanced">
          <i className="fas fa-chart-area"></i>
          Market Performance Overview
        </h3>
        <div className="market-graph-container floating-card">
          {marketPerformanceStock && (
            <StockGraph 
              stock={marketPerformanceStock} 
              onClose={handleCloseGraph}
            />
          )}
        </div>
      </section>

      {/* All Indexes Graphs Grid */}
      <section className="all-graphs-section reveal-on-scroll" data-animation="scale-up">
        <h3 className="section-title floating-enhanced">
          <i className="fas fa-chart-line"></i>
          All Indexes Charts
        </h3>
        <p className="section-subtitle">Click any chart to view in full screen</p>
        
        <div className="graphs-grid">
          {allIndexes.map((index, idx) => (
            <div 
              key={index.symbol} 
              className="graph-card floating-card"
              onClick={() => handleIndexSelect(index)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="graph-card-header">
                <div className="index-info">
                  <h4>{index.name}</h4>
                  <p>{index.symbol}</p>
                  <span className={`type-badge ${index.type}`}>
                    {index.type === 'major' ? 'Major' : 'Sector'}
                  </span>
                </div>
                <div className="index-price">
                  <div className="current-price">₹{index.price.toFixed(2)}</div>
                  <div className={`price-change ${index.change >= 0 ? 'positive' : 'negative'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              
              <div className="graph-container">
                <StockGraph 
                  stock={index} 
                  onClose={handleCloseGraph}
                  isInline={true}
                />
              </div>
              
              <div className="graph-overlay">
                <i className="fas fa-expand"></i>
                <span>Click to expand</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Index Full Screen Graph */}
      {selectedIndex && (
        <div className="fullscreen-graph-overlay" onClick={handleCloseGraph}>
          <div className="fullscreen-graph-content" onClick={(e) => e.stopPropagation()}>
            <div className="fullscreen-graph-header">
              <h3 className="section-title floating-enhanced">
                <i className="fas fa-chart-line"></i>
                {selectedIndex.name} - Full Screen Chart
              </h3>
              <button className="close-graph-btn" onClick={handleCloseGraph}>
                <i className="fas fa-times"></i>
                Close
              </button>
            </div>
            <div className="fullscreen-graph-container">
              <StockGraph 
                stock={selectedIndex} 
                onClose={handleCloseGraph}
              />
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions-section reveal-on-scroll" data-animation="slide-up">
        <div className="instructions-card floating-card">
          <h3>
            <i className="fas fa-info-circle"></i>
            How to Use
          </h3>
          <ul>
            <li>All index charts are displayed in the grid above</li>
            <li>Click any chart to view it in full screen mode</li>
            <li>Charts show real-time simulated data with market patterns</li>
            <li>Click the close button or outside the chart to return</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphPage; 