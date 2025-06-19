import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import AllIndexes from './components/AllIndexes';
import Footer from './components/Footer';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import MarketStatus from './components/MarketStatus';
import Notification from './components/Notification';
import Statistics from './components/Statistics';

function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [marketData, setMarketData] = useState({
    majorIndexes: [],
    sectorIndexes: [],
    marketStats: {
      total: 0,
      gainers: 0,
      losers: 0,
      avgChange: '0.00'
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Generate simulated data for fallback
  const generateSimulatedData = useCallback(() => {
    const majorIndexes = [
      {
        symbol: 'NIFTY50',
        name: 'NIFTY 50',
        price: 19500 + Math.random() * 500,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 19500,
        type: 'major',
        logo: 'nifty-logo',
        source: 'Simulated'
      },
      {
        symbol: 'SENSEX',
        name: 'S&P BSE SENSEX',
        price: 65000 + Math.random() * 2000,
        change: (Math.random() - 0.5) * 600,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 65000,
        type: 'major',
        logo: 'sensex-logo',
        source: 'Simulated'
      },
      {
        symbol: 'BANKNIFTY',
        name: 'NIFTY BANK',
        price: 44000 + Math.random() * 1000,
        change: (Math.random() - 0.5) * 300,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 44000,
        type: 'major',
        logo: 'bank-logo',
        source: 'Simulated'
      }
    ];

    const sectorIndexes = [
      {
        symbol: 'NIFTYIT',
        name: 'NIFTY IT',
        price: 32000 + Math.random() * 2000,
        change: (Math.random() - 0.5) * 400,
        changePercent: (Math.random() - 0.5) * 3,
        previousClose: 32000,
        type: 'sector',
        logo: 'it-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYPHARMA',
        name: 'NIFTY PHARMA',
        price: 12000 + Math.random() * 1000,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 12000,
        type: 'sector',
        logo: 'pharma-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYAUTO',
        name: 'NIFTY AUTO',
        price: 18000 + Math.random() * 1500,
        change: (Math.random() - 0.5) * 300,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 18000,
        type: 'sector',
        logo: 'auto-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYFMCG',
        name: 'NIFTY FMCG',
        price: 50000 + Math.random() * 3000,
        change: (Math.random() - 0.5) * 500,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 50000,
        type: 'sector',
        logo: 'fmcg-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYMETAL',
        name: 'NIFTY METAL',
        price: 7000 + Math.random() * 800,
        change: (Math.random() - 0.5) * 150,
        changePercent: (Math.random() - 0.5) * 3,
        previousClose: 7000,
        type: 'sector',
        logo: 'metal-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYREALTY',
        name: 'NIFTY REALTY',
        price: 450 + Math.random() * 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 4,
        previousClose: 450,
        type: 'sector',
        logo: 'realty-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYPSUBANK',
        name: 'NIFTY PSU BANK',
        price: 4000 + Math.random() * 400,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 3,
        previousClose: 4000,
        type: 'sector',
        logo: 'psu-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYPVTBANK',
        name: 'NIFTY PVT BANK',
        price: 22000 + Math.random() * 2000,
        change: (Math.random() - 0.5) * 400,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 22000,
        type: 'sector',
        logo: 'private-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYFIN',
        name: 'NIFTY FIN SERVICE',
        price: 19000 + Math.random() * 1500,
        change: (Math.random() - 0.5) * 300,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 19000,
        type: 'sector',
        logo: 'fin-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYENERGY',
        name: 'NIFTY ENERGY',
        price: 25000 + Math.random() * 2000,
        change: (Math.random() - 0.5) * 400,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 25000,
        type: 'sector',
        logo: 'energy-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYINFRA',
        name: 'NIFTY INFRA',
        price: 3500 + Math.random() * 300,
        change: (Math.random() - 0.5) * 80,
        changePercent: (Math.random() - 0.5) * 3,
        previousClose: 3500,
        type: 'sector',
        logo: 'infra-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYCONSUMER',
        name: 'NIFTY CONSUMER',
        price: 8500 + Math.random() * 600,
        change: (Math.random() - 0.5) * 120,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 8500,
        type: 'sector',
        logo: 'consumer-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYMEDIA',
        name: 'NIFTY MEDIA',
        price: 1800 + Math.random() * 200,
        change: (Math.random() - 0.5) * 40,
        changePercent: (Math.random() - 0.5) * 4,
        previousClose: 1800,
        type: 'sector',
        logo: 'media-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYOIL',
        name: 'NIFTY OIL & GAS',
        price: 9000 + Math.random() * 800,
        change: (Math.random() - 0.5) * 160,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 9000,
        type: 'sector',
        logo: 'oil-logo',
        source: 'Simulated'
      },
      {
        symbol: 'NIFTYHEALTH',
        name: 'NIFTY HEALTHCARE',
        price: 11000 + Math.random() * 1000,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 2,
        previousClose: 11000,
        type: 'sector',
        logo: 'health-logo',
        source: 'Simulated'
      }
    ];

    // Calculate market stats
    const allIndexes = [...majorIndexes, ...sectorIndexes];
    const gainers = allIndexes.filter(index => index.change >= 0).length;
    const losers = allIndexes.filter(index => index.change < 0).length;
    const avgChange = (allIndexes.reduce((sum, index) => sum + index.changePercent, 0) / allIndexes.length).toFixed(2);

    return {
      majorIndexes,
      sectorIndexes,
      marketStats: {
        total: allIndexes.length,
        gainers,
        losers,
        avgChange
      }
    };
  }, []);

  // Fetch market data from backend
  const fetchMarketData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/market-data');
      const data = await response.json();
      
      if (data.success) {
        setMarketData(data.data);
        setLastUpdate(new Date());
        showNotification('Data updated successfully!', 'success');
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      showNotification('Failed to fetch market data. Using simulated data.', 'warning');
      
      // Fallback to simulated data
      const simulatedData = generateSimulatedData();
      setMarketData(simulatedData);
      setLastUpdate(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [generateSimulatedData]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleRefresh = () => {
    fetchMarketData();
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <MarketOverview 
            majorIndexes={marketData.majorIndexes}
            sectorIndexes={marketData.sectorIndexes}
            marketStats={marketData.marketStats}
          />
        );
      case 'all-indexes':
        return (
          <AllIndexes 
            majorIndexes={marketData.majorIndexes}
            sectorIndexes={marketData.sectorIndexes}
          />
        );
      case 'market-status':
        return (
          <MarketStatus 
            majorIndexes={marketData.majorIndexes}
            sectorIndexes={marketData.sectorIndexes}
            lastUpdate={lastUpdate}
          />
        );
      case 'statistics':
        return (
          <Statistics 
            majorIndexes={marketData.majorIndexes}
            sectorIndexes={marketData.sectorIndexes}
            marketStats={marketData.marketStats}
          />
        );
      default:
        return (
          <MarketOverview 
            majorIndexes={marketData.majorIndexes}
            sectorIndexes={marketData.sectorIndexes}
            marketStats={marketData.marketStats}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        lastUpdate={lastUpdate}
      />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App; 