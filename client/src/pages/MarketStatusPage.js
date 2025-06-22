import React from 'react';
import { FaArrowDown, FaArrowUp, FaChartBar, FaChartLine, FaClock, FaExclamationTriangle, FaHashtag, FaShieldAlt, FaTachometerAlt, FaThermometerHalf } from 'react-icons/fa';
import './MarketStatusPage.css';

const MarketStatusPage = ({ marketData }) => {
  // Extract data from marketData prop
  const { majorIndexes = [], sectorIndexes = [], marketStats = {} } = marketData || {};
  
  if (!majorIndexes || !sectorIndexes) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading market data...</p>
      </div>
    );
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

  // Calculate Fear & Greed Index
  const calculateFearIndex = () => {
    const avgChange = Math.abs(parseFloat(marketStats.avgChange || 0));
    const gainersRatio = (marketStats.gainers || 0) / (marketStats.total || 1);
    const volatility = Math.random() * 30 + 10; // Simulated volatility
    
    let fearScore = 0;
    
    // Based on average change
    if (avgChange > 2) fearScore += 25;
    else if (avgChange > 1) fearScore += 15;
    else if (avgChange > 0.5) fearScore += 10;
    
    // Based on gainers ratio
    if (gainersRatio < 0.3) fearScore += 30;
    else if (gainersRatio < 0.5) fearScore += 20;
    else if (gainersRatio > 0.7) fearScore -= 15;
    
    // Based on volatility
    if (volatility > 25) fearScore += 20;
    else if (volatility > 15) fearScore += 10;
    
    fearScore = Math.max(0, Math.min(100, fearScore));
    
    let level = 'Extreme Fear';
    let color = '#ff4444';
    
    if (fearScore < 25) {
      level = 'Extreme Greed';
      color = '#00ff00';
    } else if (fearScore < 45) {
      level = 'Greed';
      color = '#44ff44';
    } else if (fearScore < 55) {
      level = 'Neutral';
      color = '#ffff00';
    } else if (fearScore < 75) {
      level = 'Fear';
      color = '#ff8844';
    }
    
    return { score: fearScore, level, color, volatility: volatility.toFixed(1) };
  };

  // Calculate Market Breadth
  const calculateMarketBreadth = () => {
    const gainers = allIndexes.filter(index => index.change > 0).length;
    const losers = allIndexes.filter(index => index.change < 0).length;
    const unchanged = allIndexes.length - gainers - losers;
    
    const breadthRatio = gainers / (gainers + losers);
    const advanceDeclineRatio = gainers / Math.max(losers, 1);
    
    return {
      gainers,
      losers,
      unchanged,
      breadthRatio: (breadthRatio * 100).toFixed(1),
      advanceDeclineRatio: advanceDeclineRatio.toFixed(2)
    };
  };

  // Calculate Volatility Index
  const calculateVolatilityIndex = () => {
    const changes = allIndexes.map(index => Math.abs(index.changePercent));
    const avgVolatility = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const maxVolatility = Math.max(...changes);
    
    let volatilityLevel = 'Low';
    let color = '#00ff00';
    
    if (avgVolatility > 3) {
      volatilityLevel = 'Extreme';
      color = '#ff0000';
    } else if (avgVolatility > 2) {
      volatilityLevel = 'High';
      color = '#ff8800';
    } else if (avgVolatility > 1) {
      volatilityLevel = 'Moderate';
      color = '#ffff00';
    }
    
    return {
      average: avgVolatility.toFixed(2),
      maximum: maxVolatility.toFixed(2),
      level: volatilityLevel,
      color
    };
  };

  // Calculate Market Momentum
  const calculateMomentum = () => {
    const positiveMomentum = allIndexes.filter(index => index.change > 0).length;
    const negativeMomentum = allIndexes.filter(index => index.change < 0).length;
    const momentumScore = ((positiveMomentum - negativeMomentum) / allIndexes.length) * 100;
    
    let momentumLevel = 'Neutral';
    let color = '#ffff00';
    
    if (momentumScore > 30) {
      momentumLevel = 'Strong Bullish';
      color = '#00ff00';
    } else if (momentumScore > 10) {
      momentumLevel = 'Bullish';
      color = '#44ff44';
    } else if (momentumScore < -30) {
      momentumLevel = 'Strong Bearish';
      color = '#ff0000';
    } else if (momentumScore < -10) {
      momentumLevel = 'Bearish';
      color = '#ff4444';
    }
    
    return {
      score: momentumScore.toFixed(1),
      level: momentumLevel,
      color
    };
  };

  // Calculate Put-Call Ratio
  const calculatePutCallRatio = () => {
    // Simulate put-call ratio based on market conditions
    const avgChange = parseFloat(marketStats.avgChange || 0);
    const gainersRatio = (marketStats.gainers || 0) / (marketStats.total || 1);
    
    // Base ratio around 0.8 (typical market conditions)
    let putCallRatio = 0.8;
    
    // Adjust based on market sentiment
    if (avgChange < -1) {
      // Bearish market - more puts
      putCallRatio = 0.8 + Math.random() * 0.6; // 0.8 to 1.4
    } else if (avgChange > 1) {
      // Bullish market - more calls
      putCallRatio = 0.4 + Math.random() * 0.4; // 0.4 to 0.8
    } else {
      // Neutral market
      putCallRatio = 0.6 + Math.random() * 0.4; // 0.6 to 1.0
    }
    
    // Adjust based on gainers ratio
    if (gainersRatio < 0.3) {
      putCallRatio += 0.2; // More puts in bearish market
    } else if (gainersRatio > 0.7) {
      putCallRatio -= 0.2; // More calls in bullish market
    }
    
    putCallRatio = Math.max(0.2, Math.min(2.0, putCallRatio));
    
    let sentiment = 'Neutral';
    let color = '#ffff00';
    let interpretation = 'Balanced options activity';
    
    if (putCallRatio > 1.2) {
      sentiment = 'Bearish';
      color = '#ff4444';
      interpretation = 'High put activity - fear in market';
    } else if (putCallRatio > 0.9) {
      sentiment = 'Slightly Bearish';
      color = '#ff8844';
      interpretation = 'Moderate put activity';
    } else if (putCallRatio < 0.6) {
      sentiment = 'Bullish';
      color = '#00ff00';
      interpretation = 'High call activity - optimism';
    } else if (putCallRatio < 0.8) {
      sentiment = 'Slightly Bullish';
      color = '#44ff44';
      interpretation = 'Moderate call activity';
    }
    
    return {
      ratio: putCallRatio.toFixed(2),
      sentiment,
      color,
      interpretation,
      calls: Math.floor(1000 / putCallRatio),
      puts: Math.floor(1000 * putCallRatio)
    };
  };

  // Calculate Volume Analysis
  const calculateVolumeAnalysis = () => {
    // Simulate volume data based on market conditions
    const avgChange = Math.abs(parseFloat(marketStats.avgChange || 0));
    const gainersRatio = (marketStats.gainers || 0) / (marketStats.total || 1);
    
    // Base volume (in millions)
    let totalVolume = 500 + Math.random() * 1000; // 500M to 1.5B
    
    // Adjust volume based on market activity
    if (avgChange > 2) {
      totalVolume *= 1.5; // High volatility = higher volume
    } else if (avgChange > 1) {
      totalVolume *= 1.2; // Moderate volatility = moderate volume
    }
    
    // Adjust based on market breadth
    if (gainersRatio < 0.3 || gainersRatio > 0.7) {
      totalVolume *= 1.3; // Extreme market conditions = higher volume
    }
    
    // Calculate volume metrics
    const avgVolume = totalVolume / allIndexes.length;
    const highVolumeStocks = Math.floor(allIndexes.length * 0.3); // 30% of stocks
    const lowVolumeStocks = Math.floor(allIndexes.length * 0.2); // 20% of stocks
    
    // Volume trend analysis
    let volumeTrend = 'Normal';
    let color = '#2196f3';
    let interpretation = 'Standard trading activity';
    
    if (totalVolume > 1200) {
      volumeTrend = 'High';
      color = '#ff9800';
      interpretation = 'Above average trading volume';
    } else if (totalVolume > 800) {
      volumeTrend = 'Above Average';
      color = '#4caf50';
      interpretation = 'Increased trading activity';
    } else if (totalVolume < 400) {
      volumeTrend = 'Low';
      color = '#9e9e9e';
      interpretation = 'Below average trading volume';
    }
    
    // Volume distribution
    const volumeDistribution = {
      high: highVolumeStocks,
      normal: allIndexes.length - highVolumeStocks - lowVolumeStocks,
      low: lowVolumeStocks
    };
    
    return {
      totalVolume: Math.floor(totalVolume),
      avgVolume: Math.floor(avgVolume),
      volumeTrend,
      color,
      interpretation,
      distribution: volumeDistribution,
      volumeChange: (Math.random() * 40 - 20).toFixed(1) // -20% to +20%
    };
  };
  
  const sentiment = getMarketSentiment();
  const topGainers = getTopPerformers('gainers');
  const topLosers = getTopPerformers('losers');
  const fearIndex = calculateFearIndex();
  const marketBreadth = calculateMarketBreadth();
  const volatilityIndex = calculateVolatilityIndex();
  const momentum = calculateMomentum();
  const putCallRatio = calculatePutCallRatio();
  const volumeAnalysis = calculateVolumeAnalysis();

  const PerformerItem = ({ stock, type }) => (
    <div className="performer-item floating-card">
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
    </div>
  );

  const MetricCard = ({ title, value, subtitle, icon: Icon, color, className = '' }) => (
    <div className={`metric-card floating-card ${className}`}>
      <div className="metric-header">
        <Icon style={{ color }} />
        <h3>{title}</h3>
      </div>
      <div className="metric-value" style={{ color }}>
        {value}
      </div>
      {subtitle && <div className="metric-subtitle">{subtitle}</div>}
    </div>
  );

  return (
    <div className="market-status-page page-transition">
      {/* Header */}
      <div className="section-header reveal-on-scroll">
        <h2 className="floating">
          <FaChartLine /> Market Status
        </h2>
        <p>Comprehensive market analysis with advanced indicators</p>
      </div>

      {/* Market Sentiment */}
      <div className="sentiment-section reveal-on-scroll">
        <div className="sentiment-card floating-card">
          <div className={`sentiment-badge ${sentiment.status.toLowerCase()}`}>
            <sentiment.icon />
            <span>{sentiment.status}</span>
          </div>
          <p>Market Sentiment</p>
        </div>
        
        <div className="last-updated-time floating-card">
          <FaClock />
          <span>Last updated: {marketStats.lastUpdate ? new Date(marketStats.lastUpdate).toLocaleTimeString() : 'N/A'}</span>
        </div>
      </div>

      {/* Advanced Market Indicators */}
      <div className="indicators-grid reveal-on-scroll">
        <MetricCard
          title="Fear & Greed Index"
          value={fearIndex.score}
          subtitle={fearIndex.level}
          icon={FaThermometerHalf}
          color={fearIndex.color}
          className="fear-index"
        />
        
        <MetricCard
          title="Market Breadth"
          value={`${marketBreadth.breadthRatio}%`}
          subtitle={`${marketBreadth.gainers}↑ ${marketBreadth.losers}↓`}
          icon={FaChartBar}
          color="#2196f3"
          className="market-breadth"
        />
        
        <MetricCard
          title="Volatility Index"
          value={volatilityIndex.average}
          subtitle={volatilityIndex.level}
          icon={FaExclamationTriangle}
          color={volatilityIndex.color}
          className="volatility-index"
        />
        
        <MetricCard
          title="Market Momentum"
          value={`${momentum.score}%`}
          subtitle={momentum.level}
          icon={FaTachometerAlt}
          color={momentum.color}
          className="momentum-index"
        />

        <MetricCard
          title="Put-Call Ratio"
          value={putCallRatio.ratio}
          subtitle={putCallRatio.sentiment}
          icon={FaShieldAlt}
          color={putCallRatio.color}
          className="put-call-ratio"
        />

        <MetricCard
          title="Trading Volume"
          value={`${(volumeAnalysis.totalVolume / 1000).toFixed(1)}B`}
          subtitle={volumeAnalysis.volumeTrend}
          icon={FaChartBar}
          color={volumeAnalysis.color}
          className="volume-indicator"
        />
      </div>

      {/* Volume Analysis Details */}
      <div className="volume-details reveal-on-scroll">
        <div className="volume-card floating-card">
          <h3><FaChartBar /> Volume Analysis</h3>
          <div className="volume-overview">
            <div className="volume-metrics">
              <div className="volume-metric">
                <div className="metric-label">Total Volume</div>
                <div className="metric-value" style={{ color: volumeAnalysis.color }}>
                  {volumeAnalysis.totalVolume.toLocaleString()}M
                </div>
                <div className="metric-change">
                  {volumeAnalysis.volumeChange > 0 ? '+' : ''}{volumeAnalysis.volumeChange}%
                </div>
              </div>
              <div className="volume-metric">
                <div className="metric-label">Average Volume</div>
                <div className="metric-value">
                  {volumeAnalysis.avgVolume.toLocaleString()}M
                </div>
                <div className="metric-subtitle">per index</div>
              </div>
            </div>
            <div className="volume-distribution">
              <h4>Volume Distribution</h4>
              <div className="distribution-bars">
                <div className="dist-bar high">
                  <div className="bar-fill" style={{ width: `${(volumeAnalysis.distribution.high / allIndexes.length) * 100}%` }}></div>
                  <span className="bar-label">High: {volumeAnalysis.distribution.high}</span>
                </div>
                <div className="dist-bar normal">
                  <div className="bar-fill" style={{ width: `${(volumeAnalysis.distribution.normal / allIndexes.length) * 100}%` }}></div>
                  <span className="bar-label">Normal: {volumeAnalysis.distribution.normal}</span>
                </div>
                <div className="dist-bar low">
                  <div className="bar-fill" style={{ width: `${(volumeAnalysis.distribution.low / allIndexes.length) * 100}%` }}></div>
                  <span className="bar-label">Low: {volumeAnalysis.distribution.low}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="volume-interpretation">
            <div className="interpretation-badge" style={{ backgroundColor: volumeAnalysis.color + '20', borderColor: volumeAnalysis.color }}>
              <span style={{ color: volumeAnalysis.color }}>
                {volumeAnalysis.interpretation}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Options Activity Details */}
      <div className="options-details reveal-on-scroll">
        <div className="options-card floating-card">
          <h3><FaShieldAlt /> Options Activity Analysis</h3>
          <div className="put-call-breakdown">
            <div className="ratio-display">
              <div className="ratio-value" style={{ color: putCallRatio.color }}>
                {putCallRatio.ratio}
              </div>
              <div className="ratio-label">Put-Call Ratio</div>
              <div className="ratio-interpretation">{putCallRatio.interpretation}</div>
            </div>
            <div className="options-stats">
              <div className="option-stat calls">
                <div className="option-icon">📈</div>
                <div className="option-info">
                  <span className="option-label">Call Options</span>
                  <span className="option-value">{putCallRatio.calls.toLocaleString()}</span>
                </div>
              </div>
              <div className="option-stat puts">
                <div className="option-icon">📉</div>
                <div className="option-info">
                  <span className="option-label">Put Options</span>
                  <span className="option-value">{putCallRatio.puts.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="options-sentiment">
            <div className="sentiment-indicator" style={{ backgroundColor: putCallRatio.color + '20', borderColor: putCallRatio.color }}>
              <span className="sentiment-text" style={{ color: putCallRatio.color }}>
                {putCallRatio.sentiment} Sentiment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Breadth Details */}
      <div className="breadth-details reveal-on-scroll">
        <div className="breadth-card floating-card">
          <h3><FaChartBar /> Market Breadth Analysis</h3>
          <div className="breadth-stats">
            <div className="breadth-stat">
              <span className="stat-label">Advancing</span>
              <span className="stat-value advancing">{marketBreadth.gainers}</span>
            </div>
            <div className="breadth-stat">
              <span className="stat-label">Declining</span>
              <span className="stat-value declining">{marketBreadth.losers}</span>
            </div>
            <div className="breadth-stat">
              <span className="stat-label">Unchanged</span>
              <span className="stat-value unchanged">{marketBreadth.unchanged}</span>
            </div>
            <div className="breadth-stat">
              <span className="stat-label">A/D Ratio</span>
              <span className="stat-value">{marketBreadth.advanceDeclineRatio}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="performers-container reveal-on-scroll">
        {/* Top Gainers */}
        <div className="performers-list gainers">
          <h3 className="list-title floating">Top Gainers</h3>
          <div className="performers-grid">
            {topGainers.filter(s => s.change > 0).length > 0 ? (
              topGainers.filter(s => s.change > 0).map((stock, idx) => (
                <div key={`gainer-${stock.symbol}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <PerformerItem stock={stock} type="gainers" />
                </div>
              ))
            ) : (
              <div className="no-performers floating-card">
                <p>No market gainers currently.</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Losers */}
        <div className="performers-list losers">
          <h3 className="list-title floating">Top Losers</h3>
          <div className="performers-grid">
            {topLosers.filter(s => s.change < 0).length > 0 ? (
              topLosers.filter(s => s.change < 0).map((stock, idx) => (
                <div key={`loser-${stock.symbol}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <PerformerItem stock={stock} type="losers" />
                </div>
              ))
            ) : (
              <div className="no-performers floating-card">
                <p>No market losers currently.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStatusPage; 
 