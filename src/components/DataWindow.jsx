import { formatCurrency, formatPercentChange, getPriceChangeClass } from '../utils/formatters'

/**
 * DataWindow Component
 * Right-side panel showing OHLC and current stock data
 */
export default function DataWindow({ stockData, className = '' }) {
  const defaultData = {
    symbol: 'NIFTY 50',
    exchange: 'NSE',
    date: new Date().toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: '2-digit' 
    }),
    time: new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    open: 22931.80,
    high: 22961.70,
    low: 22931.30,
    close: 22958.40,
    change: 27.05,
    changePercent: 0.12,
    volume: 0,
    lastDayChange: 399.75,
    lastDayChangePercent: 1.78
  }

  const data = stockData || defaultData

  return (
    <div className={`bg-bg-secondary border border-border-primary rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-primary">
        <div className="text-text-primary font-semibold text-lg">
          {data.symbol || 'Stock Data'}
        </div>
        <div className="text-text-muted text-sm">
          {data.exchange || 'NSE'}
        </div>
      </div>

      {/* Date/Time */}
      <div className="px-4 py-2 bg-bg-tertiary">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Date</span>
          <span className="text-text-primary">{data.date}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-text-secondary">Time</span>
          <span className="text-text-primary">{data.time}</span>
        </div>
      </div>

      {/* OHLC Data */}
      <div className="p-4 space-y-3">
        <DataRow label="Open" value={formatCurrency(data.open)} />
        <DataRow label="High" value={formatCurrency(data.high)} className="text-neon-green" />
        <DataRow label="Low" value={formatCurrency(data.low)} className="text-neon-red" />
        <DataRow label="Close" value={formatCurrency(data.close)} />
        
        <div className="border-t border-border-primary my-3"></div>
        
        <DataRow 
          label="Change" 
          value={`${data.change >= 0 ? '+' : ''}${data.change?.toFixed(2)} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent?.toFixed(2)}%)`}
          className={getPriceChangeClass(data.change)}
        />
        
        <DataRow 
          label="Volume" 
          value={data.volume?.toLocaleString('en-IN') || '0'} 
        />
        
        <div className="border-t border-border-primary my-3"></div>
        
        <DataRow 
          label="Last Day" 
          value={`+${data.lastDayChange?.toFixed(2)} (+${data.lastDayChangePercent?.toFixed(2)}%)`}
          className="text-neon-green"
        />
      </div>

      {/* Technical Indicators Summary */}
      <div className="px-4 py-3 bg-bg-tertiary border-t border-border-primary">
        <div className="text-text-muted text-xs mb-2">Technical Indicators</div>
        <div className="space-y-2">
          <IndicatorRow name="RSI (14)" value="58.3" status="neutral" />
          <IndicatorRow name="MACD" value="Bullish Cross" status="bullish" />
          <IndicatorRow name="50 DMA" value="22,850" status="above" />
          <IndicatorRow name="200 DMA" value="22,450" status="above" />
        </div>
      </div>
    </div>
  )
}

function DataRow({ label, value, className = '' }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-text-secondary text-sm">{label}</span>
      <span className={`font-mono text-sm ${className || 'text-neon-green'}`}>{value}</span>
    </div>
  )
}

function IndicatorRow({ name, value, status }) {
  const statusColors = {
    bullish: 'text-neon-green',
    bearish: 'text-neon-red',
    neutral: 'text-neon-yellow',
    above: 'text-neon-green',
    below: 'text-neon-red'
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-text-muted text-xs">{name}</span>
      <span className={`text-xs font-medium ${statusColors[status] || 'text-text-primary'}`}>
        {value}
      </span>
    </div>
  )
}
