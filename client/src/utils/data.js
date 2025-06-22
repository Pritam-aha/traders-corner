export const generateSimulatedData = () => {
    const majorIndexesList = [
      { name: 'NIFTY 50', symbol: 'NIFTY_50' },
      { name: 'SENSEX', symbol: 'SENSEX' },
      { name: 'NIFTY BANK', symbol: 'NIFTY_BANK' },
      { name: 'NIFTY IT', symbol: 'NIFTY_IT' },
    ];
  
    const sectorIndexesList = [
      { name: 'NIFTY AUTO', symbol: 'NIFTY_AUTO' },
      { name: 'NIFTY FMCG', symbol: 'NIFTY_FMCG' },
      { name: 'NIFTY PHARMA', symbol: 'NIFTY_PHARMA' },
      { name: 'NIFTY REALTY', symbol: 'NIFTY_REALTY' },
      { name: 'NIFTY METAL', symbol: 'NIFTY_METAL' },
      { name: 'NIFTY ENERGY', symbol: 'NIFTY_ENERGY' },
      { name: 'NIFTY INFRA', symbol: 'NIFTY_INFRA' },
      { name: 'NIFTY PSU BANK', symbol: 'NIFTY_PSU_BANK' },
      { name: 'NIFTY PVT BANK', symbol: 'NIFTY_PVT_BANK' },
    ];
  
    const generateStockData = (stockInfo, type) => {
      const price = parseFloat((Math.random() * 20000 + 1000).toFixed(2));
      const changePercent = parseFloat(((Math.random() - 0.5) * 5).toFixed(2));
      const change = parseFloat(((price * changePercent) / 100).toFixed(2));
  
      return {
        ...stockInfo,
        price,
        change,
        changePercent,
        type,
        source: 'Simulated',
      };
    };
  
    const majorIndexes = majorIndexesList.map(stock => generateStockData(stock, 'major'));
    const sectorIndexes = sectorIndexesList.map(stock => generateStockData(stock, 'sector'));
    
    const allIndexes = [...majorIndexes, ...sectorIndexes];
    const gainers = allIndexes.filter(s => s.change > 0).length;
    const losers = allIndexes.filter(s => s.change < 0).length;
    const unchanged = allIndexes.length - gainers - losers;
    const totalChange = allIndexes.reduce((acc, stock) => acc + stock.changePercent, 0);
    const avgChange = (totalChange / allIndexes.length).toFixed(2);
  
    return {
      majorIndexes,
      sectorIndexes,
      marketStats: {
        total: allIndexes.length,
        gainers,
        losers,
        unchanged,
        avgChange,
      },
      lastUpdate: new Date().toISOString(),
    };
}; 