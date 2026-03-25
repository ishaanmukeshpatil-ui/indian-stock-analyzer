import { useState, useEffect } from 'react'
import { RefreshCw, Plus, Star, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercentChange, getPriceChangeClass } from '../utils/formatters'

// Sample watchlist data
const defaultWatchlist = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2195.75, change: 27.25, changePercent: 1.25, volume: 12500000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3945.20, change: 45.30, changePercent: 1.16, volume: 3200000 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.45, change: -12.50, changePercent: -0.74, volume: 8100000 },
  { symbol: 'INFY', name: 'Infosys', price: 1523.80, change: 8.90, changePercent: 0.59, volume: 5400000 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 487.35, change: 5.20, changePercent: 1.08, volume: 15200000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1125.60, change: -8.40, changePercent: -0.74, volume: 9800000 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 625.90, change: 4.15, changePercent: 0.67, volume: 18500000 },
]

export default function Watchlist({ onSelectStock, selectedSymbol }) {
  const [watchlist, setWatchlist] = useState(defaultWatchlist)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prev => prev.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.5) * 0.002),
        change: stock.change + (Math.random() - 0.5) * 0.5,
        changePercent: stock.changePercent + (Math.random() - 0.5) * 0.02
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-primary">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-neon-yellow" />
          <span className="font-semibold text-text-primary">Watchlist</span>
          <span className="text-text-muted text-xs">({watchlist.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded transition-all"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          <button className="p-1.5 text-text-secondary hover:text-neon-blue hover:bg-neon-blue/10 rounded transition-all">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-2 px-4 py-2 bg-bg-tertiary text-xs text-text-muted">
        <div className="col-span-2">Symbol</div>
        <div className="text-right">Price</div>
        <div className="text-right">Change</div>
        <div className="text-right">%Chg</div>
        <div className="text-right">Volume</div>
      </div>

      {/* Watchlist Items */}
      <div className="divide-y divide-border-primary max-h-48 overflow-y-auto">
        {watchlist.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => onSelectStock?.(stock.symbol)}
            className={`w-full grid grid-cols-6 gap-2 px-4 py-2.5 text-sm hover:bg-bg-tertiary transition-all ${
              selectedSymbol === stock.symbol ? 'bg-neon-blue/5 border-l-2 border-neon-blue' : ''
            }`}
          >
            <div className="col-span-2 text-left">
              <div className="font-medium text-text-primary">{stock.symbol}</div>
              <div className="text-xs text-text-muted truncate">{stock.name}</div>
            </div>
            <div className="text-right font-mono text-text-primary">
              {formatCurrency(stock.price).replace('₹', '')}
            </div>
            <div className={`text-right font-mono ${getPriceChangeClass(stock.change)}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
            </div>
            <div className={`text-right font-mono ${getPriceChangeClass(stock.changePercent)}`}>
              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
            <div className="text-right text-text-muted text-xs">
              {(stock.volume / 1000000).toFixed(1)}M
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
