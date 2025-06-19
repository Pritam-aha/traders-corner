# Indian Stock Market Tracker - MERN Stack

A modern, real-time Indian stock market tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Track NIFTY, SENSEX, and sectoral indices with live data updates and beautiful UI.

## 🚀 Features

### Real-time Data
- Live stock prices for major Indian indices (NIFTY 50, SENSEX, BANK NIFTY)
- Sectoral indices tracking (IT, Pharma, Auto, FMCG, etc.)
- Real-time updates via WebSocket connections
- Multiple data sources with fallback mechanisms

### Modern UI/UX
- Responsive design that works on all devices
- Dark theme with beautiful gradients
- Smooth animations and transitions
- Interactive charts and statistics
- Search and filter functionality

### Market Analytics
- Market overview with key statistics
- Top gainers and losers tracking
- Performance distribution analysis
- Sector-wise performance breakdown
- Market sentiment analysis

### Technical Features
- RESTful API with Express.js
- MongoDB database for data persistence
- Socket.IO for real-time updates
- React with hooks and modern patterns
- Framer Motion for animations
- Error handling and notifications

## 📊 Tracked Indices

### Major Indices
- **NIFTY 50** - Benchmark index of NSE
- **SENSEX** - Benchmark index of BSE
- **BANK NIFTY** - Banking sector index

### Sectoral Indices
- NIFTY IT, NIFTY Pharma, NIFTY Auto
- NIFTY FMCG, NIFTY Metal, NIFTY Realty
- NIFTY PSU Bank, NIFTY Private Bank
- NIFTY Financial Services, NIFTY Energy
- NIFTY Infrastructure, NIFTY Consumer Durables
- NIFTY Media, NIFTY Oil & Gas, NIFTY Healthcare
- NIFTY Commodities, NIFTY MNC, NIFTY Growth Sectors 15

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time communication
- **Axios** - HTTP client
- **Node-cron** - Task scheduling

### Frontend
- **React.js** - UI library
- **React Hooks** - State management
- **Framer Motion** - Animations
- **Socket.IO Client** - Real-time updates
- **Axios** - API calls
- **React Icons** - Icon library

### Development Tools
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-stock-market-mern
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment file
   cp config.env .env

   # Edit .env file with your configuration
   MONGODB_URI=mongodb://localhost:27017/stock-market
   ALPHA_VANTAGE_API_KEY=your_api_key_here
   FINNHUB_API_KEY=your_api_key_here
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev

   # Or run separately:
   # Terminal 1 - Start server
   npm run server

   # Terminal 2 - Start client
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 API Endpoints

### Stock Data
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/major` - Get major indices only
- `GET /api/stocks/sector` - Get sectoral indices only
- `GET /api/stats` - Get market statistics

### Health Check
- `GET /api/health` - API health status

## 📱 Application Structure

```
indian-stock-market-mern/
├── server.js                 # Main server file
├── package.json              # Server dependencies
├── config.env               # Environment variables
├── client/                  # React frontend
│   ├── public/
│   │   ├── src/
│   │   │   ├── components/      # React components
│   │   │   │   ├── Header.js
│   │   │   │   ├── MarketOverview.js
│   │   │   │   ├── AllIndexes.js
│   │   │   │   ├── MarketStatus.js
│   │   │   │   ├── Statistics.js
│   │   │   │   ├── StockCard.js
│   │   │   │   └── Notification.js
│   │   │   ├── App.js           # Main app component
│   │   │   ├── index.js         # React entry point
│   │   │   └── index.css        # Global styles
│   │   └── package.json         # Client dependencies
└── README.md               # This file
```

## 🔄 Data Sources

The application tries multiple data sources in order:

1. **Yahoo Finance** - Primary source (free, no API key required)
2. **Alpha Vantage** - Secondary source (requires API key)
3. **Finnhub** - Tertiary source (requires API key)
4. **Simulated Data** - Fallback for development/testing

### Getting API Keys

#### Alpha Vantage
1. Visit [Alpha Vantage](https://www.alphavantage.co/)
2. Sign up for a free account
3. Get your API key
4. Add to `.env`: `ALPHA_VANTAGE_API_KEY=your_key`

#### Finnhub
1. Visit [Finnhub](https://finnhub.io/)
2. Sign up for a free account
3. Get your API key
4. Add to `.env`: `FINNHUB_API_KEY=your_key`

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Add MongoDB addon (MongoDB Atlas)
5. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Vercel Deployment (Frontend)
1. Install Vercel CLI
2. Deploy client:
   ```bash
   cd client
   vercel
   ```

### Railway Deployment
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `ALPHA_VANTAGE_API_KEY` - Alpha Vantage API key
- `FINNHUB_API_KEY` - Finnhub API key
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)

### Customization
- Modify `server.js` to add more indices
- Update CSS variables in `client/src/index.css`
- Add new components in `client/src/components/`

## 📈 Features in Detail

### Market Overview
- Real-time market statistics
- Major indices performance
- Sector indices preview
- Quick market insights

### All Indexes
- Complete list of all tracked indices
- Search and filter functionality
- Sort by various criteria
- Refresh data manually

### Market Status
- Current market status (open/closed)
- Top gainers and losers
- Most active indices
- Market timing information

### Statistics
- Detailed market analytics
- Performance distribution
- Sector-wise breakdown
- Data source information
- Market sentiment analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Yahoo Finance for providing free stock data
- Alpha Vantage and Finnhub for additional data sources
- React and Node.js communities
- Font Awesome for icons

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- [ ] Historical data charts
- [ ] Price alerts and notifications
- [ ] Portfolio tracking
- [ ] News integration
- [ ] Technical indicators
- [ ] Mobile app version
- [ ] More international markets
- [ ] Advanced analytics
- [ ] Social features
- [ ] API rate limiting

---

**Note**: This application is for educational and informational purposes. Always verify data from official sources before making investment decisions. 