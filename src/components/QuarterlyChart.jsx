import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export default function QuarterlyChart({ data, year }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return

    // Clear previous chart
    chartRef.current.innerHTML = ''

    const chart = createChart(chartRef.current, {
      layout: { 
        background: { color: '#000000' }, 
        textColor: '#999999',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      grid: { 
        vertLines: { color: 'rgba(255,255,255,0.03)' }, 
        horzLines: { color: 'rgba(255,255,255,0.03)' } 
      },
      rightPriceScale: { 
        borderColor: 'rgba(255,255,255,0.08)',
        scaleMargins: { top: 0.1, bottom: 0.1 }
      },
      timeScale: { 
        borderColor: 'rgba(255,255,255,0.08)',
        timeVisible: false
      },
      crosshair: { mode: 0 },
      width: chartRef.current.clientWidth,
      height: 200,
    })

    // Revenue line
    const revenueSeries = chart.addLineSeries({
      color: '#00ff88',
      lineWidth: 2,
      title: 'Revenue',
    })

    // Profit line
    const profitSeries = chart.addLineSeries({
      color: '#00d4ff',
      lineWidth: 2,
      title: 'Profit',
    })

    // Transform data for chart
    const revenueData = data.map((q, i) => ({
      time: i + 1,
      value: parseFloat(q.revenue?.replace(/[^\d.]/g, '') || '0') / 1000
    }))

    const profitData = data.map((q, i) => ({
      time: i + 1,
      value: parseFloat(q.profit?.replace(/[^\d.]/g, '') || '0') / 1000
    }))

    revenueSeries.setData(revenueData)
    profitSeries.setData(profitData)

    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        chart.applyOptions({ 
          width: chartRef.current.clientWidth 
        })
      }
    }
    window.addEventListener('resize', handleResize)

    chartInstance.current = chart

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstance.current) {
        chartInstance.current.remove()
      }
    }
  }, [data, year])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <span style={{ fontSize: '11px', color: '#999999', textTransform: 'uppercase' }}>
          Quarterly Performance {year}
        </span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: '#00ff88' }}></span>
            <span style={{ fontSize: '10px', color: '#999999' }}>Revenue (Cr)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: '#00d4ff' }}></span>
            <span style={{ fontSize: '10px', color: '#999999' }}>Profit (Cr)</span>
          </div>
        </div>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '200px' }}></div>
    </div>
  )
}
