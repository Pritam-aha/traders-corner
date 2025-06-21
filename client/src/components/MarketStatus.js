import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaHashtag } from 'react-icons/fa';
import './MarketStatus.css';

const MarketStatus = ({ majorIndexes, sectorIndexes, lastUpdate }) => {
  if (!majorIndexes || !sectorIndexes) {
    return null; // Or a loading spinner
  }
  const allIndexes = [...majorIndexes, ...sectorIndexes];

  const getMarketSentiment = () => {
    if (allIndexes.length === 0) return { status: 'Neutral', color: 'text-gray-500', icon: FaHashtag };
    const gainers = allIndexes.filter(index => index.change >= 0).length;
    const losers = allIndexes.length - gainers;
    
    if (gainers > losers) return { status: 'Bullish', color: 'text-green-400', icon: FaArrowUp };
    if (losers > gainers) return { status: 'Bearish', color: 'text-red-400', icon: FaArrowDown };
    return { status: 'Neutral', color: 'text-yellow-400', icon: FaHashtag };
  };

  const getTopPerformers = (type = 'gainers') => {
    return [...allIndexes]
      .sort((a, b) => type === 'gainers' 
        ? b.changePercent - a.changePercent 
        : a.changePercent - b.changePercent
      )
      .slice(0, 5);
  };
  
  const sentiment = getMarketSentiment();
  const topGainers = getTopPerformers('gainers');
  const topLosers = getTopPerformers('losers');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const PerformerItem = ({ stock, type }) => (
    <motion.div className="performer-item" variants={itemVariants}>
      <div className="performer-info">
        <div className={`performer-icon ${type}`}>
          {type === 'gainers' ? <FaArrowUp /> : <FaArrowDown />}
        </div>
        <div>
          <p className="performer-name">{stock.name}</p>
          <p className="performer-price">₹{stock.price.toFixed(2)}</p>
        </div>
      </div>
      <div className={`performer-change ${type}`}>
        <p>{stock.change.toFixed(2)}</p>
        <p>({stock.changePercent.toFixed(2)}%)</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="market-status-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="status-header" variants={itemVariants}>
        <h2 className="status-title"><FaChartLine /> Market Status</h2>
        <div className={`sentiment-badge ${sentiment.status.toLowerCase()}`}>
          <sentiment.icon />
          <span>{sentiment.status}</span>
        </div>
      </motion.div>
      
      <motion.div className="last-updated-time" variants={itemVariants}>
        <FaClock />
        <span>Last updated: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'N/A'}</span>
      </motion.div>
      
      <div className="performers-container">
        {/* Top Gainers */}
        <motion.div className="performers-list gainers" variants={itemVariants}>
          <h3 className="list-title">Top Gainers</h3>
          {topGainers.filter(s => s.change > 0).length > 0 ? (
            topGainers.filter(s => s.change > 0).map(stock => (
              <PerformerItem key={`gainer-${stock.symbol}`} stock={stock} type="gainers" />
            ))
          ) : (
            <p className="no-performers">No market gainers currently.</p>
          )}
        </motion.div>

        {/* Top Losers */}
        <motion.div className="performers-list losers" variants={itemVariants}>
          <h3 className="list-title">Top Losers</h3>
          {topLosers.filter(s => s.change < 0).length > 0 ? (
            topLosers.filter(s => s.change < 0).map(stock => (
              <PerformerItem key={`loser-${stock.symbol}`} stock={stock} type="losers" />
            ))
          ) : (
            <p className="no-performers">No market losers currently.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketStatus; 