import { indianApiClient, githubApiClient, fetchWithFallback } from './apiClient'

// Get stock details by name
export async function getStockDetails(stockName) {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/stock', {
        params: { name: stockName }
      })
      return data
    },
    async () => {
      const { data } = await githubApiClient.get('/stock', {
        params: { symbol: stockName }
      })
      return data
    }
  )
}

// Get historical data
export async function getHistoricalData(stockName, period = '1m', filter = 'default') {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/historical_data', {
        params: { stock_name: stockName, period, filter }
      })
      return data
    },
    async () => {
      // GitHub API doesn't have historical, return empty
      return []
    }
  )
}

// Get trending stocks
export async function getTrendingStocks() {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/trending')
      return data
    },
    async () => {
      // Return popular Indian stocks as fallback
      return [
        { ticker: 'RELIANCE.NS', company: 'Reliance Industries' },
        { ticker: 'TCS.NS', company: 'Tata Consultancy Services' },
        { ticker: 'HDFCBANK.NS', company: 'HDFC Bank' },
        { ticker: 'INFY.NS', company: 'Infosys' },
        { ticker: 'ICICIBANK.NS', company: 'ICICI Bank' },
      ]
    }
  )
}

// Get NSE most active stocks
export async function getNSEMostActive() {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/NSE_most_active')
      return data
    },
    async () => []
  )
}

// Get BSE most active stocks
export async function getBSEMostActive() {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/BSE_most_active')
      return data
    },
    async () => []
  )
}

// Get news
export async function getNews() {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/news')
      return data
    },
    async () => []
  )
}

// Get quarterly results
export async function getQuarterlyResults(stockName) {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/statement', {
        params: { stock_name: stockName, stats: 'quarterly' }
      })
      return data
    },
    async () => []
  )
}

// Get IPO data
export async function getIPOData() {
  return fetchWithFallback(
    async () => {
      const { data } = await indianApiClient.get('/ipo')
      return data
    },
    async () => []
  )
}
