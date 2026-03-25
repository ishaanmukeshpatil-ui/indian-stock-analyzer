// API Endpoints
export const API_ENDPOINTS = {
  INDIAN_API_BASE: 'https://stock.indianapi.in',
  GITHUB_API_BASE: 'https://military-jobye-haiqstudios-14f59639.koyeb.app',
  GEMINI_API: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
}

// Chart timeframes
export const TIMEFRAMES = [
  { label: '1D', value: '1d', period: '1d' },
  { label: '5D', value: '5d', period: '5d' },
  { label: '1M', value: '1m', period: '1mo' },
  { label: '3M', value: '3m', period: '3mo' },
  { label: '6M', value: '6m', period: '6mo' },
  { label: 'YTD', value: 'ytd', period: 'ytd' },
  { label: '1Y', value: '1y', period: '1yr' },
  { label: '5Y', value: '5y', period: '5yr' },
  { label: 'MAX', value: 'max', period: 'max' }
]

// Chart intervals
export const CHART_INTERVALS = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' }
]

// Technical indicators
export const INDICATORS = [
  { id: 'sma20', label: 'SMA 20', color: '#00d4ff' },
  { id: 'sma50', label: 'SMA 50', color: '#fbbf24' },
  { id: 'sma200', label: 'SMA 200', color: '#a855f7' },
  { id: 'ema20', label: 'EMA 20', color: '#00ff88' },
  { id: 'volume', label: 'Volume', color: '#8b8ba3' }
]

// Market indices
export const MARKET_INDICES = [
  { symbol: 'NIFTY', name: 'NIFTY 50', exchange: 'NSE' },
  { symbol: 'BANKNIFTY', name: 'BANKNIFTY', exchange: 'NSE' },
  { symbol: 'SENSEX', name: 'SENSEX', exchange: 'BSE' },
  { symbol: 'MIDCPNIFTY', name: 'NIFTY Midcap', exchange: 'NSE' },
  { symbol: 'SMALLCPNIFTY', name: 'NIFTY Smallcap', exchange: 'NSE' }
]

// Popular Indian stocks for suggestions
export const POPULAR_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE' },
  { symbol: 'INFY', name: 'Infosys', exchange: 'NSE' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', exchange: 'NSE' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', exchange: 'NSE' },
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', exchange: 'NSE' },
  { symbol: 'ITC', name: 'ITC Limited', exchange: 'NSE' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', exchange: 'NSE' },
  { symbol: 'LT', name: 'Larsen & Toubro', exchange: 'NSE' },
  { symbol: 'WIPRO', name: 'Wipro', exchange: 'NSE' },
  { symbol: 'AXISBANK', name: 'Axis Bank', exchange: 'NSE' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', exchange: 'NSE' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', exchange: 'NSE' }
]

// Source links for citations
export const SOURCES = {
  BSE_INDIA: { name: 'BSE India', url: 'https://www.bseindia.com' },
  NSE_INDIA: { name: 'NSE India', url: 'https://www.nseindia.com' },
  ECONOMIC_TIMES: { name: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
  LIVEMINT: { name: 'Livemint', url: 'https://www.livemint.com' },
  MONEYCONTROL: { name: 'MoneyControl', url: 'https://www.moneycontrol.com' },
  REUTERS: { name: 'Reuters', url: 'https://www.reuters.com' },
  BLOOMBERG: { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
  RBI: { name: 'RBI', url: 'https://www.rbi.org.in' },
  SEBI: { name: 'SEBI', url: 'https://www.sebi.gov.in' },
  INDIAN_API: { name: 'IndianAPI', url: 'https://indianapi.in' }
}

// Exchange suffixes
export const EXCHANGE_SUFFIX = {
  NSE: '.NS',
  BSE: '.BO'
}
