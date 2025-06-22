import React, { useState } from 'react';
import StockCard from '../components/StockCard';
import './MarketOverviewPage.css';

const MarketOverviewPage = ({ marketData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract data from marketData prop
  const { majorIndexes = [], sectorIndexes = [], marketStats = {} } = marketData || {};

  // Combine all indexes
  const allIndexes = [...majorIndexes, ...sectorIndexes];

  // Filter indexes based on search term
  const filteredIndexes = allIndexes.filter(index => {
    const matchesSearch = index.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         index.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Show loading if no data
  if (!marketData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="market-overview-page page-transition">
      {/* Hero Section with Floating Effect */}
      <div className="section-header reveal-on-scroll" data-animation="scale-up">
        <h2 className="floating-enhanced">Overview</h2>
        <p>Real-time insights into the Indian stock market performance</p>
      </div>

      {/* Market Statistics with Floating Cards */}
      <div className="stats-grid reveal-on-scroll" data-animation="slide-left">
        <div className="stat-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>{marketStats.total || 0}</h3>
            <p>Total Indexes</p>
          </div>
        </div>
        
        <div className="stat-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
          <div className="stat-icon">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-green-500">{marketStats.gainers || 0}</h3>
            <p>Gainers</p>
          </div>
        </div>
        
        <div className="stat-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
          <div className="stat-icon">
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-red-500">{marketStats.losers || 0}</h3>
            <p>Losers</p>
          </div>
        </div>
        
        <div className="stat-card floating-card reveal-on-scroll stagger-4" data-animation="scale-up">
          <div className="stat-icon">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-content">
            <h3 className={parseFloat(marketStats.avgChange || 0) >= 0 ? 'text-success' : 'text-danger'}>
              {parseFloat(marketStats.avgChange || 0) >= 0 ? '+' : ''}{marketStats.avgChange || '0.00'}%
            </h3>
            <p>Avg Change</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section reveal-on-scroll" data-animation="slide-right">
        <div className="search-container">
          <div className="search-box floating-card">
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>
            <input
              type="text"
              placeholder="Search by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary reveal-on-scroll" data-animation="slide-left">
        <div className="results-info">
          <i className="fas fa-info-circle"></i>
          <span>
            Showing <strong>{filteredIndexes.length}</strong> of <strong>{allIndexes.length}</strong> indexes
            {searchTerm && (
              <span className="search-highlight">
                {' '}for "<strong>{searchTerm}</strong>"
              </span>
            )}
          </span>
        </div>
        </div>
        
      {/* All Indexes Grid */}
      <div className="indexes-grid reveal-on-scroll" data-animation="scale-up">
        {filteredIndexes.map((index, indexNum) => (
          <div key={index.symbol} className="floating-card card-float reveal-on-scroll" 
               data-animation="rotate-in" data-stagger={Math.min(indexNum + 1, 5)} 
               style={{ animationDelay: `${indexNum * 0.1}s` }}>
              <StockCard 
                stock={index}
              index={indexNum}
              isMajor={index.type === 'major'}
              />
            </div>
          ))}
        </div>

      {/* Empty State */}
      {filteredIndexes.length === 0 && (
        <div className="empty-state reveal-on-scroll" data-animation="scale-up">
          <div className="empty-icon">
            <i className="fas fa-search"></i>
          </div>
          <h3>No indexes found</h3>
          <p>
            {searchTerm 
              ? `No indexes match "${searchTerm}". Try a different search term.`
              : 'No indexes available at the moment.'
            }
          </p>
        </div>
      )}

      {/* Call to Action for Graphs */}
      <div className="cta-section reveal-on-scroll" data-animation="scale-up">
        <h2 className="section-title floating-enhanced">Want to See Detailed Charts?</h2>
        <p>Visit our dedicated graphs page to view interactive charts for all indexes</p>
        <div className="cta-buttons">
          <a href="/graphs" className="cta-button primary">
            <i className="fas fa-chart-area"></i>
            View Index Graphs
          </a>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="last-update reveal-on-scroll" data-animation="slide-left">
        <p className="update-text">
          Last updated: {marketStats.lastUpdate ? new Date(marketStats.lastUpdate).toLocaleString() : 'Loading...'}
        </p>
      </div>
    </div>
  );
};

export default MarketOverviewPage; 