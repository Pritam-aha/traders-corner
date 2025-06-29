import React from 'react';
import { FaBolt, FaChartLine, FaClock, FaEnvelope, FaEye, FaGithub, FaLinkedin, FaMobileAlt, FaPhone, FaRocket, FaShieldAlt, FaUsers } from 'react-icons/fa';
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="about-us-page page-transition">
            {/* Hero Section */}
            <div className="about-hero reveal-on-scroll" data-animation="scale-up">
                    <div className="about-hero-content">
                    <h1 className="about-hero-title floating-enhanced">About Our Platform</h1>
                    <p className="about-hero-subtitle">
                        Empowering investors with real-time market insights and comprehensive stock market data for informed decision-making.
                    </p>
                    </div>
                </div>

            {/* Mission & Vision Section */}
            <div className="about-section mission-vision reveal-on-scroll" data-animation="slide-left">
                <div className="about-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
                        <h2><FaRocket /> Our Mission</h2>
                        <p>To democratize access to financial market information by providing a real-time, accurate, and beautifully designed platform for investors of all levels. We aim to make market analysis accessible, intuitive, and engaging for everyone.</p>
                    </div>
                <div className="about-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
                        <h2><FaEye /> Our Vision</h2>
                        <p>To be the most trusted and go-to platform for tracking the Indian stock market. We envision a future where every investor, from novice to expert, has the tools and data they need to make confident financial decisions.</p>
                    </div>
                </div>

            {/* Features Section */}
            <div className="features-section reveal-on-scroll" data-animation="slide-right">
                <h2 className="section-title floating-enhanced">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card floating-card reveal-on-scroll stagger-1" data-animation="scale-up">
                        <div className="feature-icon"><FaBolt /></div>
                        <h3>Real-Time Data</h3>
                        <p>Live market updates with minimal latency, so you never miss a beat.</p>
                    </div>
                    <div className="feature-card floating-card reveal-on-scroll stagger-2" data-animation="scale-up">
                        <div className="feature-icon"><FaChartLine /></div>
                        <h3>Comprehensive Coverage</h3>
                        <p>Track all major Indian stock market indexes, including NIFTY, SENSEX, and more.</p>
                    </div>
                    <div className="feature-card floating-card reveal-on-scroll stagger-3" data-animation="scale-up">
                        <div className="feature-icon"><FaMobileAlt /></div>
                        <h3>Modern & Responsive</h3>
                        <p>A seamless, intuitive experience on your desktop, tablet, and mobile devices.</p>
                    </div>
                    <div className="feature-card floating-card reveal-on-scroll stagger-4" data-animation="scale-up">
                        <div className="feature-icon"><FaShieldAlt /></div>
                        <h3>Reliable Sources</h3>
                        <p>Data sourced from multiple trusted financial APIs with fallbacks for stability.</p>
                    </div>
                    <div className="feature-card floating-card reveal-on-scroll stagger-5" data-animation="scale-up">
                        <div className="feature-icon"><FaUsers /></div>
                        <h3>Beautifully Simple</h3>
                        <p>An intuitive interface designed for both beginners and experienced investors.</p>
                    </div>
                    <div className="feature-card floating-card reveal-on-scroll stagger-6" data-animation="scale-up">
                        <div className="feature-icon"><FaClock /></div>
                        <h3>24/7 Availability</h3>
                        <p>Round-the-clock access to market data and statistics, even outside trading hours.</p>
                    </div>
                    </div>
                </div>

            {/* Team Section */}
            <div className="team-section reveal-on-scroll" data-animation="slide-left">
                <h2 className="section-title floating-enhanced">Meet the Creator</h2>
                <div className="creator-card floating-card reveal-on-scroll" data-animation="scale-up">
                        <div className="creator-avatar">
                            <span>PS</span>
                        </div>
                        <h3 className="creator-name">Pritam Saha</h3>
                        <p className="creator-title">Full Stack Developer & Finance Enthusiast</p>
                        <p className="creator-bio">
                            A dedicated developer with a passion for building innovative solutions that bridge the gap between technology and finance. Specializing in real-time data applications and beautiful user experiences.
                        </p>
                        <div className="creator-socials">
                        <a href="mailto:pritamsaha@email.com" aria-label="Email" className="social-link">
                            <FaEnvelope />
                        </a>
                        <a href="tel:+919876543210" aria-label="Phone" className="social-link">
                            <FaPhone />
                        </a>
                        <a href="https://linkedin.com/in/pritamsaha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/pritamsaha" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage; 