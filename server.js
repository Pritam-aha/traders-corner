const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stock-market', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Stock Data Schema
const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  changePercent: { type: Number, required: true },
  previousClose: { type: Number, required: true },
  isPositive: { type: Boolean, required: true },
  type: { type: String, enum: ['major', 'sector'], required: true },
  logo: { type: String, required: true },
  icon: { type: String, required: true },
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.model('Stock', stockSchema);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Stock Market API is running' });
});

// Get all stocks
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ type: 1, name: 1 });
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

// Get major indexes only
app.get('/api/stocks/major', async (req, res) => {
  try {
    const stocks = await Stock.find({ type: 'major' }).sort({ name: 1 });
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching major stocks:', error);
    res.status(500).json({ error: 'Failed to fetch major stocks' });
  }
});

// Get sector indexes only
app.get('/api/stocks/sector', async (req, res) => {
  try {
    const stocks = await Stock.find({ type: 'sector' }).sort({ name: 1 });
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching sector stocks:', error);
    res.status(500).json({ error: 'Failed to fetch sector stocks' });
  }
});

// Get market statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const gainers = stocks.filter(stock => stock.isPositive).length;
    const losers = stocks.filter(stock => !stock.isPositive).length;
    const unchanged = stocks.filter(stock => stock.change === 0).length;
    
    const validChanges = stocks.filter(stock => stock.changePercent !== 0);
    const avgChange = validChanges.length > 0 
      ? validChanges.reduce((sum, stock) => sum + stock.changePercent, 0) / validChanges.length
      : 0;

    res.json({
      total: stocks.length,
      gainers,
      losers,
      unchanged,
      avgChange: avgChange.toFixed(2)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Stock data service
class StockDataService {
  constructor() {
    this.indexes = [
      { name: 'NIFTY 50', symbol: '^NSEI', type: 'major', logo: 'nifty-logo', icon: 'fas fa-chart-line' },
      { name: 'SENSEX', symbol: '^BSESN', type: 'major', logo: 'sensex-logo', icon: 'fas fa-chart-line' },
      { name: 'BANK NIFTY', symbol: '^NSEBANK', type: 'major', logo: 'bank-logo', icon: 'fas fa-university' },
      { name: 'NIFTY IT', symbol: 'NIFTYIT.NS', type: 'sector', logo: 'it-logo', icon: 'fas fa-laptop-code' },
      { name: 'NIFTY PHARMA', symbol: 'NIFTYPHARMA.NS', type: 'sector', logo: 'pharma-logo', icon: 'fas fa-pills' },
      { name: 'NIFTY AUTO', symbol: 'NIFTYAUTO.NS', type: 'sector', logo: 'auto-logo', icon: 'fas fa-car' },
      { name: 'NIFTY FMCG', symbol: 'NIFTYFMCG.NS', type: 'sector', logo: 'fmcg-logo', icon: 'fas fa-shopping-cart' },
      { name: 'NIFTY METAL', symbol: 'NIFTYMETAL.NS', type: 'sector', logo: 'metal-logo', icon: 'fas fa-industry' },
      { name: 'NIFTY REALTY', symbol: 'NIFTYREALTY.NS', type: 'sector', logo: 'realty-logo', icon: 'fas fa-building' },
      { name: 'NIFTY PSU BANK', symbol: 'NIFTYPSUBANK.NS', type: 'sector', logo: 'psu-logo', icon: 'fas fa-landmark' },
      { name: 'NIFTY PRIVATE BANK', symbol: 'NIFTYPVTBANK.NS', type: 'sector', logo: 'private-logo', icon: 'fas fa-university' },
      { name: 'NIFTY FIN SERVICE', symbol: 'NIFTYFINSERVICE.NS', type: 'sector', logo: 'fin-logo', icon: 'fas fa-chart-pie' },
      { name: 'NIFTY ENERGY', symbol: 'NIFTYENERGY.NS', type: 'sector', logo: 'energy-logo', icon: 'fas fa-bolt' },
      { name: 'NIFTY INFRA', symbol: 'NIFTYINFRA.NS', type: 'sector', logo: 'infra-logo', icon: 'fas fa-road' },
      { name: 'NIFTY CONSUMER DURABLES', symbol: 'NIFTYCONSUMERDURABLES.NS', type: 'sector', logo: 'consumer-logo', icon: 'fas fa-tv' },
      { name: 'NIFTY MEDIA', symbol: 'NIFTYMEDIA.NS', type: 'sector', logo: 'media-logo', icon: 'fas fa-film' },
      { name: 'NIFTY OIL & GAS', symbol: 'NIFTYOILGAS.NS', type: 'sector', logo: 'oil-logo', icon: 'fas fa-gas-pump' },
      { name: 'NIFTY HEALTHCARE', symbol: 'NIFTYHEALTHCARE.NS', type: 'sector', logo: 'health-logo', icon: 'fas fa-heartbeat' },
      { name: 'NIFTY COMMODITIES', symbol: 'NIFTYCOMMODITIES.NS', type: 'sector', logo: 'commodity-logo', icon: 'fas fa-coins' },
      { name: 'NIFTY MNC', symbol: 'NIFTYMNC.NS', type: 'sector', logo: 'mnc-logo', icon: 'fas fa-globe' },
      { name: 'NIFTY GROWTH SECTORS 15', symbol: 'NIFTYGROWTHSECTORS15.NS', type: 'sector', logo: 'growth-logo', icon: 'fas fa-rocket' }
    ];
  }

  async fetchStockData() {
    console.log('🔄 Fetching stock data...');
    
    try {
      // Try multiple data sources
      const sources = [
        this.tryYahooFinance.bind(this),
        this.tryAlphaVantage.bind(this),
        this.tryFinnhub.bind(this),
        this.generateSimulatedData.bind(this)
      ];

      for (const source of sources) {
        try {
          const success = await source();
          if (success) {
            console.log('✅ Stock data updated successfully');
            return true;
          }
        } catch (error) {
          console.warn('Source failed, trying next...', error.message);
          continue;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ All data sources failed:', error);
      return false;
    }
  }

  async tryYahooFinance() {
    const axios = require('axios');
    let successCount = 0;

    for (const index of this.indexes) {
      try {
        const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${index.symbol}?interval=1d&range=1d`, {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (response.data && response.data.chart && response.data.chart.result && response.data.chart.result[0]) {
          const result = response.data.chart.result[0];
          const meta = result.meta;

          if (meta && meta.regularMarketPrice && meta.previousClose) {
            const currentPrice = meta.regularMarketPrice;
            const previousClose = meta.previousClose;
            const change = currentPrice - previousClose;
            const changePercent = (change / previousClose) * 100;

            await this.updateStockData({
              symbol: index.symbol,
              name: index.name,
              type: index.type,
              logo: index.logo,
              icon: index.icon,
              price: currentPrice,
              change: change,
              changePercent: changePercent,
              previousClose: previousClose,
              isPositive: change >= 0,
              source: 'Yahoo Finance'
            });

            successCount++;
            console.log(`✅ Yahoo Finance: ${index.name} = ₹${currentPrice.toFixed(2)}`);
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch ${index.name} from Yahoo Finance:`, error.message);
      }
    }

    return successCount > 0;
  }

  async tryAlphaVantage() {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) return false;

    const axios = require('axios');
    let successCount = 0;

    for (const index of this.indexes.slice(0, 5)) { // Limit to 5 due to API rate limits
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${index.symbol}&apikey=${apiKey}`, {
          timeout: 5000
        });

        const quote = response.data['Global Quote'];
        if (quote && quote['05. price']) {
          const currentPrice = parseFloat(quote['05. price']);
          const previousClose = parseFloat(quote['08. previous close']);
          const change = parseFloat(quote['09. change']);
          const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));

          await this.updateStockData({
            symbol: index.symbol,
            name: index.name,
            type: index.type,
            logo: index.logo,
            icon: index.icon,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            previousClose: previousClose,
            isPositive: change >= 0,
            source: 'Alpha Vantage'
          });

          successCount++;
          console.log(`✅ Alpha Vantage: ${index.name} = ₹${currentPrice.toFixed(2)}`);
        }
      } catch (error) {
        console.warn(`Failed to fetch ${index.name} from Alpha Vantage:`, error.message);
      }
    }

    return successCount > 0;
  }

  async tryFinnhub() {
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) return false;

    const axios = require('axios');
    let successCount = 0;

    for (const index of this.indexes.slice(0, 5)) { // Limit to 5 due to API rate limits
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${apiKey}`, {
          timeout: 5000
        });

        if (response.data && response.data.c && response.data.pc) {
          const currentPrice = response.data.c;
          const previousClose = response.data.pc;
          const change = response.data.d;
          const changePercent = response.data.dp;

          await this.updateStockData({
            symbol: index.symbol,
            name: index.name,
            type: index.type,
            logo: index.logo,
            icon: index.icon,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            previousClose: previousClose,
            isPositive: change >= 0,
            source: 'Finnhub'
          });

          successCount++;
          console.log(`✅ Finnhub: ${index.name} = ₹${currentPrice.toFixed(2)}`);
        }
      } catch (error) {
        console.warn(`Failed to fetch ${index.name} from Finnhub:`, error.message);
      }
    }

    return successCount > 0;
  }

  async generateSimulatedData() {
    console.log('🔄 Generating simulated data...');
    
    for (const index of this.indexes) {
      const basePrices = {
        '^NSEI': 22000,
        '^BSESN': 73000,
        '^NSEBANK': 48000,
        'NIFTYIT.NS': 35000,
        'NIFTYPHARMA.NS': 18000,
        'NIFTYAUTO.NS': 20000,
        'NIFTYFMCG.NS': 28000,
        'NIFTYMETAL.NS': 8000,
        'NIFTYREALTY.NS': 500,
        'NIFTYPSUBANK.NS': 6000,
        'NIFTYPVTBANK.NS': 24000,
        'NIFTYFINSERVICE.NS': 20000,
        'NIFTYENERGY.NS': 30000,
        'NIFTYINFRA.NS': 7000,
        'NIFTYCONSUMERDURABLES.NS': 30000,
        'NIFTYMEDIA.NS': 2000,
        'NIFTYOILGAS.NS': 10000,
        'NIFTYHEALTHCARE.NS': 12000,
        'NIFTYCOMMODITIES.NS': 8000,
        'NIFTYMNC.NS': 15000,
        'NIFTYGROWTHSECTORS15.NS': 12000
      };

      const basePrice = basePrices[index.symbol] || 15000;
      const volatility = 0.02;
      const changePercent = (Math.random() - 0.5) * volatility * 2;
      const currentPrice = basePrice * (1 + changePercent);
      const previousPrice = basePrice;
      const change = currentPrice - previousPrice;

      await this.updateStockData({
        symbol: index.symbol,
        name: index.name,
        type: index.type,
        logo: index.logo,
        icon: index.icon,
        price: currentPrice,
        change: change,
        changePercent: changePercent * 100,
        previousClose: previousPrice,
        isPositive: change >= 0,
        source: 'Simulated'
      });
    }

    return true;
  }

  async updateStockData(stockData) {
    try {
      await Stock.findOneAndUpdate(
        { symbol: stockData.symbol },
        { ...stockData, timestamp: new Date() },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error(`Error updating stock data for ${stockData.symbol}:`, error);
    }
  }
}

// Initialize stock data service
const stockDataService = new StockDataService();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });

  // Send initial data to new client
  socket.emit('market-data-updated', { message: 'Connected to real-time stock data' });
});

// Schedule stock data updates
cron.schedule('*/30 * * * * *', async () => { // Every 30 seconds
  try {
    const success = await stockDataService.fetchStockData();
    if (success) {
      // Emit updated data to all connected clients
      const stocks = await Stock.find().sort({ type: 1, name: 1 });
      io.emit('market-data-updated', { stocks, timestamp: new Date() });
    }
  } catch (error) {
    console.error('Error in scheduled update:', error);
  }
});

// Initial data load
stockDataService.fetchStockData().then(() => {
  console.log('✅ Initial stock data loaded');
});

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Stock Market API: http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.IO: http://localhost:${PORT}`);
}); 