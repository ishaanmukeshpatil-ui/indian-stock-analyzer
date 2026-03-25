import { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { TIMEFRAMES, INDICATORS } from '../utils/constants'

// Generate sample candlestick data for demo
function generateSampleData(days = 100) {
  const data = []
  let basePrice = 2200
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    const volatility = 0.02
    const change = (Math.random() - 0.48) * volatility * basePrice
    
    const open = basePrice
    const close = basePrice + change
    const high = Math.max(open, close) + Math.random() * 0.01 * basePrice
    const low = Math.min(open, close) - Math.random() * 0.01 * basePrice
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    })
    
    basePrice = close
  }
  
  return data
}

// Generate sample volume data
function generateVolumeData(candleData) {
  return candleData.map(d => ({
    time: d.time,
    value: Math.floor(Math.random() * 10000000) + 5000000
  }))
}

// Generate moving average data
function generateMAData(candleData, period) {
  const result = []
  for (let i = period - 1; i < candleData.length; i++) {
    let sum = 0
    for (let j = 0; j < period; j++) {
      sum += candleData[i - j].close
    }
    result.push({
      time: candleData[i].time,
      value: parseFloat((sum / period).toFixed(2))
    })
  }
  return result
}

export default function CandlestickChart({
  symbol = 'RELIANCE',
  data = null,
  timeframe = '1M',
  indicators = ['sma20', 'volume'],
  onTimeframeChange,
  onIndicatorToggle
}) {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)
  const [activeIndicators, setActiveIndicators] = useState(indicators)
  const [showIndicatorMenu, setShowIndicatorMenu] = useState(false)

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0f1019' },
        textColor: '#8b8ba3',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' }
      },
      crosshair: {
        mode: 0,
        vertLine: {
          width: 1,
          color: '#2a2a45',
          style: 2
        },
        horzLine: {
          width: 1,
          color: '#2a2a45',
          style: 2
        }
      },
      rightPriceScale: {
        borderColor: '#1f1f35',
        scaleMargins: {
          top: 0.1,
          bottom: 0.2
        }
      },
      timeScale: {
        borderColor: '#1f1f35',
        timeVisible: true,
        secondsVisible: false
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true
      },
      handleScale: {
        mouseWheel: true,
        pinch: true
      }
    })

    chartRef.current = chart

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00ff88',
      downColor: '#ff3366',
      borderUpColor: '#00ff88',
      borderDownColor: '#ff3366',
      wickUpColor: '#00ff88',
      wickDownColor: '#ff3366'
    })

    // Generate and set sample data
    const sampleData = generateSampleData(100)
    candleSeries.setData(sampleData)

    // Add volume series if enabled
    if (activeIndicators.includes('volume')) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#5a5a75',
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: 'volume',
        scaleMargins: {
          top: 0.8,
          bottom: 0
        }
      })
      
      const volumeData = generateVolumeData(sampleData)
      volumeSeries.setData(volumeData)
    }

    // Add moving averages
    if (activeIndicators.includes('sma20')) {
      const sma20 = chart.addLineSeries({
        color: '#00d4ff',
        lineWidth: 1,
        title: 'SMA 20'
      })
      sma20.setData(generateMAData(sampleData, 20))
    }

    if (activeIndicators.includes('sma50')) {
      const sma50 = chart.addLineSeries({
        color: '#fbbf24',
        lineWidth: 1,
        title: 'SMA 50'
      })
      sma50.setData(generateMAData(sampleData, 50))
    }

    if (activeIndicators.includes('sma200')) {
      const sma200 = chart.addLineSeries({
        color: '#a855f7',
        lineWidth: 1,
        title: 'SMA 200'
      })
      sma200.setData(generateMAData(sampleData, 200))
    }

    // Fit content
    chart.timeScale().fitContent()

    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [activeIndicators])

  const handleTimeframeChange = (tf) => {
    setSelectedTimeframe(tf)
    if (onTimeframeChange) onTimeframeChange(tf)
  }

  const toggleIndicator = (indicatorId) => {
    const newIndicators = activeIndicators.includes(indicatorId)
      ? activeIndicators.filter(i => i !== indicatorId)
      : [...activeIndicators, indicatorId]
    setActiveIndicators(newIndicators)
    if (onIndicatorToggle) onIndicatorToggle(newIndicators)
  }

  return (
    <div className="flex flex-col h-full bg-bg-secondary rounded-xl border border-border-primary overflow-hidden">
      {/* Chart Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-primary">
        <div className="flex items-center gap-4">
          {/* Symbol */}
          <span className="font-semibold text-text-primary">{symbol}</span>
          
          {/* Timeframe Buttons */}
          <div className="flex items-center gap-1">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.value}
                onClick={() => handleTimeframeChange(tf.value)}
                className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                  selectedTimeframe === tf.value
                    ? 'bg-neon-blue/20 text-neon-blue'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowIndicatorMenu(!showIndicatorMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded transition-all duration-200"
          >
            <span>Indicators</span>
            <span className={`transition-transform ${showIndicatorMenu ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {showIndicatorMenu && (
            <div className="absolute right-0 top-full mt-1 bg-bg-surface border border-border-accent rounded-lg shadow-xl z-50 min-w-[180px]">
              {INDICATORS.map((indicator) => (
                <label
                  key={indicator.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-bg-tertiary cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={activeIndicators.includes(indicator.id)}
                    onChange={() => toggleIndicator(indicator.id)}
                    className="rounded border-border-accent text-neon-blue focus:ring-neon-blue"
                  />
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: indicator.color }}></span>
                  <span className="text-sm text-text-primary">{indicator.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div 
        ref={chartContainerRef} 
        className="flex-1 min-h-[400px] resizable-y"
      />
    </div>
  )
}
