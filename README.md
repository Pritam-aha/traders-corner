# Indian Stock Market Tracker - React Frontend

A modern, responsive Indian stock market tracking application built with React.js. Track NIFTY, SENSEX, and sectoral indices with simulated real-time data updates and beautiful UI.

## 🚀 Features

### Real-time Data (Simulated)
- Live stock prices for major Indian indices (NIFTY 50, SENSEX, BANK NIFTY)
- Sectoral indices tracking (IT, Pharma, Auto, FMCG, etc.)
- Real-time updates with simulated data
- Realistic price movements and market statistics

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
- React with hooks and modern patterns
- Framer Motion for animations
- Responsive design with CSS Grid and Flexbox
- Error handling and notifications
- Simulated data generation

## 📊 Tracked Indices

### Major Indices
- **NIFTY 50** - Benchmark index of NSE
- **SENSEX** - Benchmark index of BSE
- **NIFTY BANK** - Banking sector index
- **NIFTY IT** - IT sector index

### Sectoral Indices
- NIFTY AUTO, NIFTY FMCG, NIFTY PHARMA
- NIFTY REALTY, NIFTY METAL, NIFTY ENERGY
- NIFTY INFRA, NIFTY PSU BANK, NIFTY PVT BANK

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Hooks** - State management
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Router** - Navigation

### Development Tools
- **React Scripts** - Development server and build tools
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-stock-market-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the application**
   ```bash
   # Start the React development server
   npm start
   # or
   cd client && npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000

## 📱 Application Structure

```
indian-stock-market-tracker/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── StockCard.js
│   │   │   ├── StockGraph.js
│   │   │   └── Notification.js
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── MarketOverviewPage.js
│   │   │   ├── GraphPage.js
│   │   │   ├── MarketStatusPage.js
│   │   │   ├── StatisticsPage.js
│   │   │   └── AboutUsPage.js
│   │   ├── utils/          # Utility functions
│   │   │   └── data.js     # Simulated data generation
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   └── package.json        # Client dependencies
├── package.json            # Root package.json
└── README.md              # This file
```

## 🔄 Data Source

The application uses **simulated data** generated locally:
- Realistic stock prices and movements
- Random but plausible market statistics
- Updates every 5 seconds to simulate real-time data
- No external API dependencies required

## 🚀 Deployment

### Build for Production
```bash
cd client
npm run build
```

### Deploy to Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🎯 Usage

1. **Home Page**: Overview of major indices
2. **Market Overview**: Detailed view of all indices
3. **Graphs**: Visual representation of market data
4. **Market Status**: Current market statistics
5. **Statistics**: Detailed market analytics
6. **About Us**: Information about the application

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding Real Data
To integrate real stock data, you can:
1. Add API calls to stock data providers
2. Implement WebSocket connections for real-time updates
3. Add a backend server for data processing
4. Use external APIs like Alpha Vantage, Yahoo Finance, or Finnhub

## 📄 License

This project is licensed under the MIT License. 