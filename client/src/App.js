import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutUsPage from './pages/AboutUsPage';
import GraphPage from './pages/GraphPage';
import HomePage from './pages/HomePage';
import MarketOverviewPage from './pages/MarketOverviewPage';
import MarketStatusPage from './pages/MarketStatusPage';
import StatisticsPage from './pages/StatisticsPage';
import { generateSimulatedData } from './utils/data';

function App() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize data
    const initialData = generateSimulatedData();
    setMarketData(initialData);
    setLoading(false);

    const interval = setInterval(() => {
      setMarketData(generateSimulatedData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll reveal effect with multiple animation types
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Add specific animation classes based on data attributes
          if (entry.target.dataset.animation) {
            entry.target.classList.add(entry.target.dataset.animation);
          }
          
          // Add staggered animations for grid items
          if (entry.target.dataset.stagger) {
            entry.target.classList.add(`stagger-${entry.target.dataset.stagger}`);
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Scroll indicator effect
  useEffect(() => {
    const updateScrollIndicator = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Update CSS custom property for the scroll indicator
      document.documentElement.style.setProperty('--scroll-percent', `${scrollPercent}%`);
    };

    window.addEventListener('scroll', updateScrollIndicator);
    return () => window.removeEventListener('scroll', updateScrollIndicator);
  }, []);

  // Parallax effect for background elements
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Section fade-in effect
  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    const sections = document.querySelectorAll('.section-fade-in');
    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      sections.forEach(section => sectionObserver.unobserve(section));
  };
  }, []);

  // Scroll-based color transitions
  useEffect(() => {
    const handleScrollColor = () => {
      const scrolled = window.pageYOffset;
      const colorElements = document.querySelectorAll('.scroll-color-transition');
      
      colorElements.forEach(element => {
        if (scrolled > 100) {
          element.classList.add('scrolled');
        } else {
          element.classList.remove('scrolled');
        }
      });
    };

    window.addEventListener('scroll', handleScrollColor);
    return () => window.removeEventListener('scroll', handleScrollColor);
  }, []);

  if (loading) {
        return (
      <div className="App">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading market data...</p>
        </div>
        <Footer />
      </div>
        );
    }

  return (
    <div className="App">
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator"></div>
      
      {/* Floating Background Elements */}
      <div className="parallax-bg parallax-element" data-speed="0.3"></div>
      <div className="floating-particles">
        <div className="particle parallax-element" data-speed="0.1"></div>
        <div className="particle parallax-element" data-speed="0.2"></div>
        <div className="particle parallax-element" data-speed="0.15"></div>
        <div className="particle parallax-element" data-speed="0.25"></div>
        <div className="particle parallax-element" data-speed="0.1"></div>
        <div className="particle parallax-element" data-speed="0.2"></div>
        <div className="particle parallax-element" data-speed="0.15"></div>
        <div className="particle parallax-element" data-speed="0.25"></div>
        <div className="particle parallax-element" data-speed="0.1"></div>
      </div>

      <Header />
      
      <main className="main-container scroll-color-transition">
        <Routes>
          <Route path="/" element={<HomePage marketData={marketData} />} />
          <Route path="/market-overview" element={<MarketOverviewPage marketData={marketData} />} />
          <Route path="/all-indexes" element={<Navigate to="/market-overview" replace />} />
          <Route path="/graphs" element={<GraphPage marketData={marketData} />} />
          <Route path="/market-status" element={<MarketStatusPage marketData={marketData} />} />
          <Route path="/statistics" element={<StatisticsPage marketData={marketData} />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App; 