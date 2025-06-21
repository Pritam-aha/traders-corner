import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef } from 'react';
import { FaChartLine, FaTimes } from 'react-icons/fa';
import './StockGraph.css';

const StockGraph = ({ stock, onClose }) => {
  const canvasRef = useRef(null);

  const generateMarketData = useCallback((currentPrice, changePercent) => {
    const dataPoints = [];
    const basePrice = currentPrice / (1 + changePercent / 100);
    const totalPoints = 70; // More data points for a more detailed, jagged line
    const volatility = Math.abs(changePercent) * 0.045 + 0.05; // Base volatility, with a floor
    const trend = changePercent / 100;

    let currentValue = basePrice;
    let momentum = 0;

    const sessionPatterns = [
        { start: 0, end: 0.15, volatility: 1.9, momentumFactor: 0.5 },
        { start: 0.15, end: 0.4, volatility: 1.0, momentumFactor: 0.2 },
        { start: 0.4, end: 0.6, volatility: 0.6, momentumFactor: 0.1 },
        { start: 0.6, end: 0.85, volatility: 1.3, momentumFactor: 0.25 },
        { start: 0.85, end: 1.0, volatility: 1.8, momentumFactor: 0.4 }
    ];

    for (let i = 0; i < totalPoints; i++) {
        const progress = i / (totalPoints - 1);
        const currentPattern = sessionPatterns.find(p => progress >= p.start && progress <= p.end) || { volatility: 1, momentumFactor: 0.2 };

        const sessionVolatility = volatility * currentPattern.volatility;
        const sessionMomentum = trend * currentPattern.momentumFactor * 0.1;

        const randomComponent = (Math.random() - 0.48) * sessionVolatility; // Slightly biased upward
        momentum = momentum * 0.8 + randomComponent * 0.2; // Less momentum smoothing

        let change = sessionMomentum + momentum + randomComponent;
        
        if (Math.random() < 0.04) { // 4% chance of a sharp move
            change += (Math.random() - 0.5) * sessionVolatility * 4;
        }

        let newPrice = currentValue + change * basePrice * 0.1;

        const reversion = (basePrice * (1 + trend * progress) - newPrice) * 0.001;
        newPrice += reversion;

        dataPoints.push({ x: i, y: newPrice });
        currentValue = newPrice;
    }

    const finalGeneratedPrice = dataPoints[dataPoints.length - 1].y;
    const adjustmentFactor = currentPrice / finalGeneratedPrice;
    
    for(let i = 0; i < dataPoints.length; i++) {
        const progress = i / (dataPoints.length - 1);
        const scaling = (1 - progress) + (adjustmentFactor * progress);
        dataPoints[i].y *= scaling;
    }
    
    return dataPoints;
  }, []);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stock) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const data = generateMarketData(stock.price, stock.changePercent);
    const isPositive = stock.change >= 0;
    const chartColor = isPositive ? '#00c853' : '#ff5252';

    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));
    const range = Math.max(maxY - minY, stock.price * 0.01);
    const padding = range * 0.2;

    const scaleX = width / (data.length - 1);
    const scaleY = height / (range + padding * 2);

    ctx.strokeStyle = chartColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'miter'; // Use miter for sharp corners
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = point.x * scaleX;
      const y = height - ((point.y - minY + padding) * scaleY);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    const lastPoint = data[data.length - 1];
    const currentX = lastPoint.x * scaleX;
    const currentY = height - ((lastPoint.y - minY + padding) * scaleY);
    
    ctx.strokeStyle = chartColor;
    ctx.lineWidth = 2;
    ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--card-bg');
    
    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }, [stock, generateMarketData]);

  const handleResize = useCallback(() => {
    drawChart();
  }, [drawChart]);

  useEffect(() => {
    drawChart();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawChart, handleResize]);

  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <AnimatePresence>
      <motion.div
        className="stock-graph-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="stock-graph-container"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="graph-header">
            <div className="stock-info">
              <div className="stock-logo">
                <FaChartLine />
              </div>
              <div>
                <h3>{stock.name}</h3>
                <p>{stock.symbol}</p>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="price-display">
            <div className="current-price">
              <span className="price">{stock.price.toFixed(2)}</span>
            </div>
            <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
              <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
              <span className="time-frame">1D</span>
            </div>
          </div>

          <div className="chart-container">
            <canvas
              ref={canvasRef}
              className="stock-chart"
            />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StockGraph; 