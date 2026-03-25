import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Nfc } from 'lucide-react'
import CandlestickChart from '../components/CandlestickChart'
import DataWindow from '../components/DataWindow'
import Watchlist from '../components/Watchlist'
import { POPULAR_STOCKS } from '../utils/constants'

export default function CurrentSituation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStock, setSelectedStock] = useState('RELIANCE')
  const [exchange, setExchange] = useState('NSE')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [timeframe, setTimeframe] = useState('1M')
  const [indicators, setIndicators] = useState(['sma20', 'volume'])

  const filteredStocks = POPULAR_STOCKS.filter(
    stock => stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
             stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      setSelectedStock(searchQuery.toUpperCase())
    }
  }

  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search stock (RELIANCE, TCS, HDFC...)"
            className="input-field pl-10"
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery && filteredStocks.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-bg-surface border border-border-accent rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => handleStockSelect(stock.symbol)}
                  className="w-full px-4 py-2 text-left hover:bg-bg-tertiary flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="text-text-primary font-medium">{stock.symbol}</span>
                    <span className="text-text-muted text-sm ml-2">{stock.name}</span>
                  </div>
                  <span className="text-text-muted text-xs">{stock.exchange}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Exchange Selector */}
        <select
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
          className="input-field w-24 text-center"
        >
          <option value="NSE">NSE</option>
          <option value="BSE">BSE</option>
        </select>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: Chart */}
        <div className="flex-1 flex flex-col min-w-0">
          <CandlestickChart
            symbol={`${selectedStock}.${exchange}`}
            timeframe={timeframe}
            indicators={indicators}
            onTimeframeChange={setTimeframe}
            onIndicatorToggle={setIndicators}
          />
        </div>

        {/* Right: Data Window */}
        <div className="w-64 flex-shrink-0">
          <DataWindow
            stockData={{
              symbol: selectedStock,
              exchange: exchange,
              date: new Date().toLocaleDateString('en-IN', { 
                weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' 
              }),
              time: new Date().toLocaleTimeString('en-IN', { 
                hour: '2-digit', minute: '2-digit', hour12: false 
              }),
              open: 22931.80,
              high: 22961.70,
              low: 22931.30,
              close: 22958.40,
              change: 27.05,
              changePercent: 0.12,
              volume: 25126570,
              lastDayChange: 399.75,
              lastDayChangePercent: 1.78
            }}
          />
        </div>
      </div>

      {/* Bottom: Watchlist */}
      <div className="h-48 flex-shrink-0">
        <Watchlist 
          onSelectStock={handleStockSelect}
          selectedSymbol={selectedStock}
        />
      </div>
    </div>
  )
}
