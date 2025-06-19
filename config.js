// Configuration file for Indian Stock Market Tracker
// Add your API keys here to get real-time data

const CONFIG = {
    // Alpha Vantage API Key (Free tier available)
    // Get your free key at: https://www.alphavantage.co/support/#api-key
    ALPHA_VANTAGE_API_KEY: '', // Add your key here
    
    // Finnhub API Key (Free tier available)
    // Get your free key at: https://finnhub.io/register
    FINNHUB_API_KEY: '', // Add your key here
    
    // Yahoo Finance API (No key required - free)
    // This will work without any configuration
    
    // Update frequency in milliseconds (30 seconds = 30000)
    UPDATE_FREQUENCY: 30000,
    
    // Market hours (IST)
    MARKET_OPEN_HOUR: 9,
    MARKET_OPEN_MINUTE: 15,
    MARKET_CLOSE_HOUR: 15,
    MARKET_CLOSE_MINUTE: 30,
    
    // Features
    ENABLE_REAL_TIME_UPDATES: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_SOUND_ALERTS: false,
    
    // Display options
    CURRENCY_SYMBOL: '₹',
    DECIMAL_PLACES: 2,
    SHOW_PERCENTAGE_CHANGE: true,
    SHOW_ABSOLUTE_CHANGE: true,
    
    // Theme options
    THEME: 'auto', // 'light', 'dark', 'auto'
    ANIMATIONS_ENABLED: true,
    
    // Data sources priority (first one will be tried first)
    DATA_SOURCES: [
        'yahoo_finance',    // No API key required
        'alpha_vantage',    // Requires API key
        'finnhub'          // Requires API key
    ]
};

// Instructions for getting API keys:

/*
1. ALPHA VANTAGE API (Recommended for beginners):
   - Go to: https://www.alphavantage.co/support/#api-key
   - Sign up for a free account
   - Get your API key
   - Add it to ALPHA_VANTAGE_API_KEY above
   - Free tier: 5 API calls per minute, 500 per day

2. FINNHUB API:
   - Go to: https://finnhub.io/register
   - Sign up for a free account
   - Get your API key
   - Add it to FINNHUB_API_KEY above
   - Free tier: 60 API calls per minute

3. YAHOO FINANCE API:
   - No API key required
   - Works out of the box
   - May have rate limits

To use real data:
1. Get an API key from one of the above services
2. Add it to the CONFIG object above
3. Save this file
4. Refresh your website

The website will automatically try to use real data first,
then fall back to simulated data if APIs fail.
*/

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.STOCK_MARKET_CONFIG = CONFIG;
} 