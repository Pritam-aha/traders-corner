import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaChartLine, FaTimes } from 'react-icons/fa';
import './StockGraph.css';

const StockGraph = ({ stock, onClose, data, isInline = false, isFloating = false, showCloseButton = true }) => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);

  const generateMarketData = useCallback((currentPrice, changePercent) => {
    const dataPoints = [];
    const basePrice = currentPrice / (1 + changePercent / 100);
    const totalPoints = 50; // Reduced for better performance
    const volatility = Math.abs(changePercent) * 0.045 + 0.05;
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

        const randomComponent = (Math.random() - 0.48) * sessionVolatility;
        momentum = momentum * 0.8 + randomComponent * 0.2;

        let change = sessionMomentum + momentum + randomComponent;
        
        if (Math.random() < 0.04) {
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
    if (!canvas || !stock || !canvasReady) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;

    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale the context to ensure correct drawing
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    const data = generateMarketData(stock.price, stock.changePercent);
    const isPositive = stock.change >= 0;
    const chartColor = isPositive ? '#00c853' : '#ff5252';

    if (data.length < 2) return;

    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));
    const range = Math.max(maxY - minY, stock.price * 0.01);
    const padding = range * 0.2;

    const scaleX = width / (data.length - 1);
    const scaleY = height / (range + padding * 2);

    // Draw the line
    ctx.strokeStyle = chartColor;
    ctx.lineWidth = Math.max(1, Math.min(2, width / 200)); // Responsive line width
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
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

    // Draw the end point
    const lastPoint = data[data.length - 1];
    const currentX = lastPoint.x * scaleX;
    const currentY = height - ((lastPoint.y - minY + padding) * scaleY);
    
    ctx.fillStyle = chartColor;
    ctx.beginPath();
    ctx.arc(currentX, currentY, Math.max(2, Math.min(4, width / 100)), 0, 2 * Math.PI);
    ctx.fill();
  }, [stock, generateMarketData, canvasReady]);

  const handleResize = useCallback(() => {
    // Debounce resize events
    const timeoutId = setTimeout(() => {
    drawChart();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [drawChart]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCanvasReady(true);
    }
  }, []);

  // Draw chart when canvas is ready or stock changes
  useEffect(() => {
    if (canvasReady && stock) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
    drawChart();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [canvasReady, stock, drawChart]);

  // Handle resize events
  useEffect(() => {
    if (canvasReady) {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }
  }, [handleResize, canvasReady]);

  if (!stock) return null;

  const isPositive = stock.change >= 0;

  // If floating overlay, render a compact version that floats over the card
  if (isFloating) {
    return (
      <div className={`floating-stock-graph ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="floating-graph-header">
          <div className="floating-stock-info">
            <h4>{stock.name}</h4>
            <div className="floating-price-info">
              <span className="floating-price">₹{stock.price.toFixed(2)}</span>
              <span className={`floating-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          {showCloseButton && (
            <button className="floating-close-btn" onClick={handleClose}>
              <FaTimes />
            </button>
          )}
        </div>

        <div className="floating-chart-container">
          <canvas
            ref={canvasRef}
            className="floating-stock-chart"
          />
        </div>
      </div>
    );
  }

  // If inline, render a simplified version without overlay
  if (isInline) {
    return (
      <div className={`inline-stock-graph ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="inline-chart-container">
          <canvas
            ref={canvasRef}
            className="inline-stock-chart"
          />
        </div>
      </div>
    );
  }

  // Original modal overlay version
  return (
    <div className={`stock-graph-overlay ${isVisible ? 'visible' : 'hidden'}`} onClick={handleClose}>
      <div className="stock-graph-container floating-card" onClick={(e) => e.stopPropagation()}>
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
          <button className="close-btn" onClick={handleClose}>
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
      </div>
    </div>
  );
};

export default StockGraph; 