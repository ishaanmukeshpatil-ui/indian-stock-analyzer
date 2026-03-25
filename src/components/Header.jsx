import { useState, useEffect } from 'react'

const marketIndices = [
  { name: 'NIFTY 50', symbol: 'NIFTY', value: 25423.50, change: 0.37 },
  { name: 'BANKNIFTY', symbol: 'BANKNIFTY', value: 83023.50, change: 0.47 },
  { name: 'SENSEX', symbol: 'SENSEX', value: 55712.50, change: 0.47 },
  { name: 'NIFTY Midcap', symbol: 'MIDCPNIFTY', value: 12450.30, change: 0.22 },
  { name: 'NIFTY Smallcap', symbol: 'SMALLCPNIFTY', value: 15780.60, change: -0.15 },
]

export default function Header() {
  const [indices, setIndices] = useState(marketIndices)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value * (1 + (Math.random() - 0.5) * 0.001),
        change: index.change + (Math.random() - 0.5) * 0.01
      })))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-12 bg-bg-secondary border-b border-border-primary flex items-center px-4 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-semibold text-text-primary hidden sm:block">Indian Stock Analyzer</span>
      </div>

      {/* Market Indices Ticker */}
      <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {indices.map((index) => (
          <div key={index.symbol} className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-text-secondary text-sm">{index.name}</span>
            <span className="font-mono text-sm text-text-primary">
              {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-xs font-mono ${index.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
              {index.change >= 0 ? '▲' : '▼'} {Math.abs(index.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      {/* Market Status */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
        <span className="text-neon-green text-sm font-medium">OPEN</span>
      </div>
    </header>
  )
}
