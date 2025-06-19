import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './AllIndexes.css';
import StockCard from './StockCard';

const AllIndexes = ({ majorIndexes, sectorIndexes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');

  // Combine all indexes
  const allIndexes = [...majorIndexes, ...sectorIndexes];

  // Filter indexes based on search term and type
  const filteredIndexes = allIndexes.filter(index => {
    const matchesSearch = index.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         index.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || index.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort indexes
  const sortedIndexes = [...filteredIndexes].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'change':
        return b.change - a.change;
      case 'changePercent':
        return b.changePercent - a.changePercent;
      case 'price':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
    <div className="all-indexes">
      {/* Header */}
      <motion.div 
        className="page-header"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="header-content">
          <h1>
            <i className="fas fa-list"></i>
            All Indian Indexes
          </h1>
          <p>Complete overview of all major and sectoral indexes</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{allIndexes.length}</span>
            <span className="stat-label">Total Indexes</span>
          </div>
          <div className="stat">
            <span className="stat-number">{majorIndexes.length}</span>
            <span className="stat-label">Major</span>
          </div>
          <div className="stat">
            <span className="stat-number">{sectorIndexes.length}</span>
            <span className="stat-label">Sector</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="filters-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search indexes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="major">Major Indexes</option>
              <option value="sector">Sector Indexes</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="change">Change (₹)</option>
              <option value="changePercent">Change (%)</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results Summary */}
      <motion.div 
        className="results-summary"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <p>
          Showing {filteredIndexes.length} of {allIndexes.length} indexes
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </motion.div>

      {/* Indexes Grid */}
      <motion.div 
        className="indexes-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedIndexes.map((index, indexNum) => (
          <StockCard 
            key={index.symbol} 
            stock={index} 
            index={indexNum}
            isMajor={index.type === 'major'}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredIndexes.length === 0 && (
        <motion.div 
          className="empty-state"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      )}
    </div>
  );
};

export default AllIndexes; 