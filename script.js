// Enhanced Indian Stock Market Data Tracker with Real APIs
class StockMarketTracker {
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
        
        this.data = {};
        this.isLoading = false;
        this.updateInterval = null;
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadMarketData();
        this.startAutoRefresh();
        this.updateCurrentTime();
        this.startTimeUpdate();
    }

    bindEvents() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadMarketData());
        }
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.filter);
            });
        });
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update displayed indexes
        this.updateIndexesGrid();
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    startTimeUpdate() {
        setInterval(() => {
            this.updateCurrentTime();
        }, 1000);
    }

    async loadMarketData() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading(true);
        
        try {
            console.log('🔄 Loading market data...');
            
            // Try to get real data first
            const realDataSuccess = await this.loadRealMarketData();
            
            if (realDataSuccess) {
                console.log('✅ Real market data loaded successfully');
                this.showSuccess('Live market data loaded!');
            } else {
                console.log('⚠️ Using simulated data - real data unavailable');
                this.showWarning('Using simulated data. Real-time data unavailable.');
                // Generate fallback data
                this.indexes.forEach(index => {
                    this.data[index.symbol] = this.generateStockData(index);
                });
            }
            
            console.log('✅ Data loaded successfully:', this.data);
            
            this.updateUI();
            this.updateLastUpdated();
            this.updateMarketStatus();
            this.updateStatistics();
            
        } catch (error) {
            console.error('❌ Error loading market data:', error);
            this.showError('Error loading data. Using simulated data.');
            // Fallback to simulated data
            this.indexes.forEach(index => {
                this.data[index.symbol] = this.generateStockData(index);
            });
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    async loadRealMarketData() {
        try {
            // Try Yahoo Finance API first (no key required)
            const success = await this.tryYahooFinanceAPI();
            if (success) return true;
            
            // If Yahoo fails, try other APIs if keys are available
            const config = window.STOCK_MARKET_CONFIG || {};
            
            if (config.ALPHA_VANTAGE_API_KEY) {
                const alphaSuccess = await this.tryAlphaVantageAPI(config.ALPHA_VANTAGE_API_KEY);
                if (alphaSuccess) return true;
            }
            
            if (config.FINNHUB_API_KEY) {
                const finnhubSuccess = await this.tryFinnhubAPI(config.FINNHUB_API_KEY);
                if (finnhubSuccess) return true;
            }
            
            return false;
        } catch (error) {
            console.error('All real data APIs failed:', error);
            return false;
        }
    }

    async tryYahooFinanceAPI() {
        try {
            console.log('🔄 Trying Yahoo Finance API...');
            
            // Try major indexes first
            const majorIndexes = this.indexes.filter(index => index.type === 'major');
            let successCount = 0;
            
            for (const index of majorIndexes) {
                try {
                    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${index.symbol}?interval=1d&range=1d`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                        }
                    });
                    
                    if (!response.ok) {
                        console.warn(`Yahoo Finance API failed for ${index.symbol}: ${response.status}`);
                        continue;
                    }
                    
                    const data = await response.json();
                    
                    if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                        console.warn(`Invalid data from Yahoo Finance for ${index.symbol}`);
                        continue;
                    }
                    
                    const result = data.chart.result[0];
                    const meta = result.meta;
                    
                    if (!meta || !meta.regularMarketPrice || !meta.previousClose) {
                        console.warn(`Missing price data from Yahoo Finance for ${index.symbol}`);
                        continue;
                    }
                    
                    const currentPrice = meta.regularMarketPrice;
                    const previousClose = meta.previousClose;
                    const change = currentPrice - previousClose;
                    const changePercent = (change / previousClose) * 100;

                    this.data[index.symbol] = {
                        symbol: index.symbol,
                        name: index.name,
                        type: index.type,
                        logo: index.logo,
                        icon: index.icon,
                        price: currentPrice.toFixed(2),
                        change: change.toFixed(2),
                        changePercent: changePercent.toFixed(2),
                        previousClose: previousClose.toFixed(2),
                        isPositive: change >= 0,
                        timestamp: new Date().toISOString(),
                        source: 'Yahoo Finance'
                    };
                    
                    successCount++;
                    console.log(`✅ Yahoo Finance: ${index.name} = ₹${currentPrice.toFixed(2)}`);
                    
                } catch (error) {
                    console.warn(`Failed to fetch ${index.name} from Yahoo Finance:`, error);
                }
            }
            
            // If we got at least one major index, try some sector indexes
            if (successCount > 0) {
                const sectorIndexes = this.indexes.filter(index => index.type === 'sector').slice(0, 5);
                
                for (const index of sectorIndexes) {
                    try {
                        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${index.symbol}?interval=1d&range=1d`);
                        
                        if (response.ok) {
                            const data = await response.json();
                            
                            if (data.chart && data.chart.result && data.chart.result[0]) {
                                const result = data.chart.result[0];
                                const meta = result.meta;
                                
                                if (meta && meta.regularMarketPrice && meta.previousClose) {
                                    const currentPrice = meta.regularMarketPrice;
                                    const previousClose = meta.previousClose;
                                    const change = currentPrice - previousClose;
                                    const changePercent = (change / previousClose) * 100;

                                    this.data[index.symbol] = {
                                        symbol: index.symbol,
                                        name: index.name,
                                        type: index.type,
                                        logo: index.logo,
                                        icon: index.icon,
                                        price: currentPrice.toFixed(2),
                                        change: change.toFixed(2),
                                        changePercent: changePercent.toFixed(2),
                                        previousClose: previousClose.toFixed(2),
                                        isPositive: change >= 0,
                                        timestamp: new Date().toISOString(),
                                        source: 'Yahoo Finance'
                                    };
                                    
                                    console.log(`✅ Yahoo Finance: ${index.name} = ₹${currentPrice.toFixed(2)}`);
                                }
                            }
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch ${index.name} from Yahoo Finance:`, error);
                    }
                }
            }
            
            return successCount > 0;
            
        } catch (error) {
            console.error('Yahoo Finance API failed:', error);
            return false;
        }
    }

    async tryAlphaVantageAPI(apiKey) {
        try {
            console.log('🔄 Trying Alpha Vantage API...');
            
            const majorIndexes = this.indexes.filter(index => index.type === 'major');
            let successCount = 0;
            
            for (const index of majorIndexes) {
                try {
                    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${index.symbol}&apikey=${apiKey}`);
                    
                    if (!response.ok) {
                        console.warn(`Alpha Vantage API failed for ${index.symbol}: ${response.status}`);
                        continue;
                    }
                    
                    const data = await response.json();
                    const quote = data['Global Quote'];
                    
                    if (!quote || !quote['05. price']) {
                        console.warn(`Invalid data from Alpha Vantage for ${index.symbol}`);
                        continue;
                    }

                    const currentPrice = parseFloat(quote['05. price']);
                    const previousClose = parseFloat(quote['08. previous close']);
                    const change = parseFloat(quote['09. change']);
                    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));

                    this.data[index.symbol] = {
                        symbol: index.symbol,
                        name: index.name,
                        type: index.type,
                        logo: index.logo,
                        icon: index.icon,
                        price: currentPrice.toFixed(2),
                        change: change.toFixed(2),
                        changePercent: changePercent.toFixed(2),
                        previousClose: previousClose.toFixed(2),
                        isPositive: change >= 0,
                        timestamp: new Date().toISOString(),
                        source: 'Alpha Vantage'
                    };
                    
                    successCount++;
                    console.log(`✅ Alpha Vantage: ${index.name} = ₹${currentPrice.toFixed(2)}`);
                    
                } catch (error) {
                    console.warn(`Failed to fetch ${index.name} from Alpha Vantage:`, error);
                }
            }
            
            return successCount > 0;
            
        } catch (error) {
            console.error('Alpha Vantage API failed:', error);
            return false;
        }
    }

    async tryFinnhubAPI(apiKey) {
        try {
            console.log('🔄 Trying Finnhub API...');
            
            const majorIndexes = this.indexes.filter(index => index.type === 'major');
            let successCount = 0;
            
            for (const index of majorIndexes) {
                try {
                    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${apiKey}`);
                    
                    if (!response.ok) {
                        console.warn(`Finnhub API failed for ${index.symbol}: ${response.status}`);
                        continue;
                    }
                    
                    const data = await response.json();
                    
                    if (!data.c || !data.pc) {
                        console.warn(`Invalid data from Finnhub for ${index.symbol}`);
                        continue;
                    }

                    const currentPrice = data.c;
                    const previousClose = data.pc;
                    const change = data.d;
                    const changePercent = data.dp;

                    this.data[index.symbol] = {
                        symbol: index.symbol,
                        name: index.name,
                        type: index.type,
                        logo: index.logo,
                        icon: index.icon,
                        price: currentPrice.toFixed(2),
                        change: change.toFixed(2),
                        changePercent: changePercent.toFixed(2),
                        previousClose: previousClose.toFixed(2),
                        isPositive: change >= 0,
                        timestamp: new Date().toISOString(),
                        source: 'Finnhub'
                    };
                    
                    successCount++;
                    console.log(`✅ Finnhub: ${index.name} = ₹${currentPrice.toFixed(2)}`);
                    
                } catch (error) {
                    console.warn(`Failed to fetch ${index.name} from Finnhub:`, error);
                }
            }
            
            return successCount > 0;
            
        } catch (error) {
            console.error('Finnhub API failed:', error);
            return false;
        }
    }

    generateStockData(index) {
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
        const volatility = 0.02; // 2% daily volatility
        const changePercent = (Math.random() - 0.5) * volatility * 2; // -2% to +2%
        const currentPrice = basePrice * (1 + changePercent);
        const previousPrice = basePrice;
        const change = currentPrice - previousPrice;
        const changePercentFormatted = (changePercent * 100).toFixed(2);

        return {
            symbol: index.symbol,
            name: index.name,
            type: index.type,
            logo: index.logo,
            icon: index.icon,
            price: currentPrice.toFixed(2),
            change: change.toFixed(2),
            changePercent: changePercentFormatted,
            previousClose: previousPrice.toFixed(2),
            isPositive: change >= 0,
            timestamp: new Date().toISOString()
        };
    }

    updateUI() {
        console.log('🔄 Updating UI...');
        this.updateOverviewCards();
        this.updateIndexesGrid();
        console.log('✅ UI updated successfully');
    }

    updateOverviewCards() {
        console.log('🔄 Updating overview cards...');
        
        const majorIndexes = ['^NSEI', '^BSESN', '^NSEBANK'];
        
        majorIndexes.forEach(symbol => {
            const data = this.data[symbol];
            if (!data) {
                console.warn(`No data found for ${symbol}`);
                return;
            }

            // Generate element IDs based on symbol
            let elementId;
            switch(symbol) {
                case '^NSEI':
                    elementId = 'nsei';
                    break;
                case '^BSESN':
                    elementId = 'bsesn';
                    break;
                case '^NSEBANK':
                    elementId = 'nsebank';
                    break;
                default:
                    elementId = symbol.toLowerCase().replace(/[^a-z0-9]/g, '');
            }

            const priceElement = document.getElementById(`${elementId}-price`);
            const changeElement = document.getElementById(`${elementId}-change`);
            
            console.log(`Looking for elements: ${elementId}-price, ${elementId}-change`);
            console.log(`Price element found:`, priceElement);
            console.log(`Change element found:`, changeElement);
            
            if (priceElement && changeElement) {
                priceElement.textContent = data.price;
                
                if (data.change !== '--') {
                    const changeText = `${data.change >= 0 ? '+' : ''}${data.change} (${data.changePercent}%)`;
                    changeElement.textContent = changeText;
                    changeElement.className = `change ${data.isPositive ? 'positive' : 'negative'}`;
                } else {
                    changeElement.textContent = '--';
                    changeElement.className = 'change neutral';
                }
                
                console.log(`✅ Updated ${symbol}: Price=${data.price}, Change=${data.change}`);
            } else {
                console.warn(`❌ Elements not found for ${symbol}: ${elementId}-price, ${elementId}-change`);
            }
        });
    }

    updateIndexesGrid() {
        const grid = document.getElementById('indexesGrid');
        if (!grid) {
            console.warn('Indexes grid not found');
            return;
        }
        
        grid.innerHTML = '';

        let filteredIndexes = this.indexes;

        // Apply filters
        switch (this.currentFilter) {
            case 'major':
                filteredIndexes = this.indexes.filter(index => index.type === 'major');
                break;
            case 'sector':
                filteredIndexes = this.indexes.filter(index => index.type === 'sector');
                break;
            case 'gainers':
                filteredIndexes = this.indexes.filter(index => {
                    const data = this.data[index.symbol];
                    return data && data.isPositive === true;
                });
                break;
            case 'losers':
                filteredIndexes = this.indexes.filter(index => {
                    const data = this.data[index.symbol];
                    return data && data.isPositive === false;
                });
                break;
        }

        filteredIndexes.forEach(index => {
            const data = this.data[index.symbol];
            if (!data) return;

            const card = this.createIndexCard(data);
            grid.appendChild(card);
        });
    }

    createIndexCard(data) {
        const card = document.createElement('div');
        card.className = 'index-card';
        
        const changeClass = data.isPositive === null ? 'neutral' : (data.isPositive ? 'positive' : 'negative');
        const changeText = data.change === '--' ? '--' : `${data.change >= 0 ? '+' : ''}${data.change} (${data.changePercent}%)`;
        
        // Add data source indicator
        const dataSource = data.source ? `<div class="data-source">${data.source}</div>` : '';
        
        card.innerHTML = `
            <div class="index-name">
                <div class="index-logo ${data.logo}">
                    <i class="${data.icon}"></i>
                </div>
                ${data.name}
            </div>
            <div class="index-price">₹${data.price}</div>
            <div class="index-change ${changeClass}">${changeText}</div>
            ${dataSource}
        `;
        
        return card;
    }

    updateStatistics() {
        const allData = Object.values(this.data);
        
        const gainers = allData.filter(item => item.isPositive === true).length;
        const losers = allData.filter(item => item.isPositive === false).length;
        const unchanged = allData.filter(item => item.isPositive === null).length;
        
        // Calculate average change
        const validChanges = allData.filter(item => item.changePercent !== '--');
        const avgChange = validChanges.length > 0 
            ? (validChanges.reduce((sum, item) => sum + parseFloat(item.changePercent), 0) / validChanges.length).toFixed(2)
            : '--';
        
        const gainersElement = document.getElementById('gainersCount');
        const losersElement = document.getElementById('losersCount');
        const unchangedElement = document.getElementById('unchangedCount');
        const avgChangeElement = document.getElementById('avgChange');
        
        if (gainersElement) gainersElement.textContent = gainers;
        if (losersElement) losersElement.textContent = losers;
        if (unchangedElement) unchangedElement.textContent = unchanged;
        if (avgChangeElement) avgChangeElement.textContent = avgChange === '--' ? '--' : `${avgChange}%`;
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const dateString = now.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = `Last Updated: ${dateString} ${timeString}`;
        }
    }

    updateMarketStatus() {
        const statusElement = document.getElementById('marketStatus');
        if (!statusElement) return;
        
        const statusDot = statusElement.querySelector('.status-dot');
        const statusText = statusElement.querySelector('.status-text');
        
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 100 + currentMinute;
        
        // Market hours: 9:15 AM to 3:30 PM (IST)
        const marketOpen = 915; // 9:15 AM
        const marketClose = 1530; // 3:30 PM
        
        if (currentTime >= marketOpen && currentTime <= marketClose) {
            if (statusDot) statusDot.className = 'status-dot open';
            if (statusText) statusText.textContent = 'Market Open';
            
            // Calculate time until close
            const closeTime = new Date();
            closeTime.setHours(15, 30, 0);
            const timeUntilClose = closeTime - now;
            const hours = Math.floor(timeUntilClose / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilClose % (1000 * 60 * 60)) / (1000 * 60));
            
            const nextSessionElement = document.getElementById('nextSession');
            if (nextSessionElement) {
                nextSessionElement.textContent = `Closes in ${hours}h ${minutes}m`;
            }
        } else {
            if (statusDot) statusDot.className = 'status-dot closed';
            if (statusText) statusText.textContent = 'Market Closed';
            
            // Calculate time until next open
            const nextOpen = new Date();
            if (currentTime > marketClose) {
                nextOpen.setDate(nextOpen.getDate() + 1);
            }
            nextOpen.setHours(9, 15, 0);
            const timeUntilOpen = nextOpen - now;
            const hours = Math.floor(timeUntilOpen / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilOpen % (1000 * 60 * 60)) / (1000 * 60));
            
            const nextSessionElement = document.getElementById('nextSession');
            if (nextSessionElement) {
                nextSessionElement.textContent = `Opens in ${hours}h ${minutes}m`;
            }
        }
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            if (show) {
                overlay.classList.remove('hidden');
            } else {
                overlay.classList.add('hidden');
            }
        }
    }

    showError(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f56565;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 5000);
    }

    showSuccess(message) {
        // Create a simple success notification
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);
    }

    showWarning(message) {
        // Create a simple warning notification
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f6e05e;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        warningDiv.textContent = message;
        
        document.body.appendChild(warningDiv);
        
        setTimeout(() => {
            warningDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                warningDiv.remove();
            }, 300);
        }, 5000);
    }

    startAutoRefresh() {
        // Refresh data every 30 seconds
        this.updateInterval = setInterval(() => {
            this.loadMarketData();
        }, 30000);
    }

    stopAutoRefresh() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Stock Market Tracker...');
    new StockMarketTracker();
});

// Add some additional utility functions
function formatNumber(num) {
    if (num === '--') return num;
    return parseFloat(num).toLocaleString('en-IN');
}

function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 