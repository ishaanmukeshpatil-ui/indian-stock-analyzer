import { useState, useEffect } from 'react'
import { Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, BarChart2, Newspaper, Globe, Twitter, Calendar } from 'lucide-react'
import SourceLink, { SourceLinksList, AnalysisSources } from '../components/SourceLink'
import { SOURCES } from '../utils/constants'

// Mock quarterly data
const mockQuarterlyData = [
  { quarter: 'Q3 FY25', revenue: 259000, netProfit: 19650, eps: 29.12, ebitdaMargin: 15.8 },
  { quarter: 'Q2 FY25', revenue: 239000, netProfit: 17544, eps: 26.05, ebitdaMargin: 14.9 },
  { quarter: 'Q1 FY25', revenue: 225000, netProfit: 16244, eps: 24.30, ebitdaMargin: 14.2 },
  { quarter: 'Q4 FY24', revenue: 213000, netProfit: 15470, eps: 23.25, ebitdaMargin: 13.8 },
]

// Mock timeline events
const mockTimelineEvents = [
  { year: 2020, event: 'COVID-19 Impact', type: 'negative', price: 875 },
  { year: 2021, event: 'Jio Platforms IPO Rumors', type: 'positive', price: 2300 },
  { year: 2022, event: 'Retail Expansion', type: 'positive', price: 2600 },
  { year: 2023, event: 'O2C Deal Scrapped', type: 'negative', price: 2200 },
  { year: 2024, event: 'JioMart 100M Users', type: 'positive', price: 2800 },
  { year: 2025, event: 'Green Energy Push', type: 'positive', price: 3100 },
]

// Mock news data
const mockNews = [
  { title: 'Reliance signs $5B deal with Saudi Aramco', source: 'Economic Times', time: '2 hours ago', url: 'https://economictimes.com' },
  { title: 'JioMart crosses 100 million active users', source: 'Livemint', time: '5 hours ago', url: 'https://livemint.com' },
  { title: 'RIL announces ₹75K Cr green energy investment', source: 'Business Standard', time: '1 day ago', url: 'https://business-standard.com' },
  { title: 'Retail segment shows 25% growth YoY', source: 'MoneyControl', time: '2 days ago', url: 'https://moneycontrol.com' },
]

export default function HistoryAnalysis() {
  const [searchQuery, setSearchQuery] = useState('RELIANCE')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  // Generate analysis
  const generateAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis({
        summary: 'Reliance Industries has shown consistent growth over the last 4 quarters with revenue growing at an average of 7.5% QoQ. The retail segment (JioMart) turned profitable for the first time, while O2C continues to face margin pressure from crude prices.',
        willGoUp: true,
        targetPrice: '₹2,350 - ₹2,500',
        confidence: 72,
        bullishFactors: [
          { factor: 'Strong Quarterly Growth', evidence: 'Revenue growing 7.5% QoQ, net profit up 12% in Q3', source: 'Company Quarterly Reports' },
          { factor: 'Jio Profitability Turnaround', evidence: 'Jio turned profitable after years of investment', source: 'Q3 FY25 Earnings Call' },
          { factor: 'Green Energy Pivot', evidence: '$10B investment in renewable energy aligned with global trends', source: 'RIL Annual Report 2025' },
          { factor: 'Retail Expansion', evidence: 'JioMart crossing 100M users shows market dominance', source: 'Livemint, Company Announcements' },
          { factor: 'Technical Indicators', evidence: 'RSI neutral (58), MACD showing bullish crossover, Stock above 200-DMA', source: 'Technical Analysis' }
        ],
        bearishFactors: [
          { factor: 'Crude Oil Volatility', evidence: 'O2C segment contributes ~40% of revenue', impact: 'HIGH', source: 'Reuters Energy Reports' },
          { factor: 'High Debt in Retail/Jio', evidence: 'Combined debt of ₹3.5+ Lakh Crore', impact: 'MEDIUM-HIGH', source: 'Company Balance Sheet' },
          { factor: 'Telecom Competition', evidence: 'Bharti Airtel gaining market share, price war potential', impact: 'MEDIUM', source: 'TRAI Reports' },
          { factor: 'Analysis Limitations', evidence: 'Based on publicly available data only, cannot predict black swan events', impact: 'N/A', source: 'Our Analysis Framework' }
        ],
        sources: [
          { name: 'BSE India', url: SOURCES.BSE_INDIA.url },
          { name: 'Economic Times', url: SOURCES.ECONOMIC_TIMES.url },
          { name: 'Livemint', url: SOURCES.LIVEMINT.url },
          { name: 'Reuters', url: SOURCES.REUTERS.url },
          { name: 'RBI', url: SOURCES.RBI.url }
        ]
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  useEffect(() => {
    generateAnalysis()
  }, [])

  return (
    <div className="h-full overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">History & Analysis</h1>
        <form onSubmit={(e) => { e.preventDefault(); generateAnalysis(); }} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stock..."
              className="input-field pl-9 w-64"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </div>

      {/* Section 1: Previous Data & Quarterly Findings */}
      <section className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <BarChart2 className="text-neon-blue" size={20} />
          Section 1: Previous Data & Quarterly Findings
        </h2>

        {/* Historical Timeline */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Historical Timeline with Key Events</h3>
          <div className="relative bg-bg-tertiary rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[600px]">
              {mockTimelineEvents.map((event, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mb-2 ${
                    event.type === 'positive' ? 'bg-neon-green' : 'bg-neon-red'
                  }`}></div>
                  <div className="text-xs text-text-muted mb-1">{event.year}</div>
                  <div className="text-xs text-text-primary text-center max-w-[100px]">{event.event}</div>
                </div>
              ))}
            </div>
            {/* Timeline line */}
            <div className="absolute top-[38px] left-4 right-4 h-0.5 bg-border-accent -z-10"></div>
          </div>
        </div>

        {/* Quarterly Results */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-3">Quarterly Results History</h3>
            <div className="space-y-2">
              {mockQuarterlyData.map((q, i) => (
                <div key={i} className="bg-bg-tertiary rounded-lg p-3">
                  <div className="font-medium text-text-primary mb-2">{q.quarter}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-text-muted">Revenue:</span>
                      <span className="ml-2 text-neon-green">₹{(q.revenue / 1000).toFixed(1)}K Cr</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Net Profit:</span>
                      <span className="ml-2 text-neon-green">₹{q.netProfit} Cr</span>
                    </div>
                    <div>
                      <span className="text-text-muted">EPS:</span>
                      <span className="ml-2 text-neon-green">₹{q.eps}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">EBITDA:</span>
                      <span className="ml-2 text-neon-green">{q.ebitdaMargin}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings Statement */}
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-3">Key Findings Statement</h3>
            <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-lg p-4">
              <p className="text-text-primary text-sm leading-relaxed">
                {analysis?.summary || 'Loading analysis...'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-neon-green/10 text-neon-green rounded">Revenue Growth: +7.5% QoQ</span>
                <span className="text-xs px-2 py-1 bg-neon-green/10 text-neon-green rounded">Jio Profitable</span>
                <span className="text-xs px-2 py-1 bg-neon-yellow/10 text-neon-yellow rounded">O2C Pressure</span>
              </div>
              <SourceLink name="Company Reports" url={SOURCES.BSE_INDIA.url} className="mt-3 inline-block" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Current Status */}
      <section className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Globe className="text-neon-purple" size={20} />
          Section 2: Current Status
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* News Sources */}
          <div className="bg-bg-tertiary rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <Newspaper size={14} />
              News Sources
            </h3>
            <div className="space-y-3">
              {mockNews.slice(0, 3).map((news, i) => (
                <div key={i} className="border-l-2 border-neon-blue pl-3">
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-neon-blue transition-colors">
                    {news.title}
                  </a>
                  <div className="text-xs text-text-muted mt-1">
                    {news.source} • {news.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geopolitical Factors */}
          <div className="bg-bg-tertiary rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <Globe size={14} />
              Geopolitical Factors
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">India GDP</span>
                <span className="text-neon-green">6.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Crude Oil</span>
                <span className="text-neon-red">$78.50/bbl ▲</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">FII Flow</span>
                <span className="text-neon-green">+₹2,450 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">USD/INR</span>
                <span className="text-text-primary">83.15</span>
              </div>
            </div>
            <SourceLink name="RBI" url={SOURCES.RBI.url} className="mt-3 inline-block" />
          </div>

          {/* CEO Social Media */}
          <div className="bg-bg-tertiary rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <Twitter size={14} />
              CEO Updates
            </h3>
            <div className="text-sm">
              <p className="text-text-primary italic">
                "Excited about our new green energy initiative..."
              </p>
              <div className="text-xs text-text-muted mt-2">
                @Mukes_Ambani • Mar 22, 2026
              </div>
              <div className="text-xs text-text-muted">
                45.2K likes • 12.1K retweets
              </div>
            </div>
          </div>

          {/* Current Crises */}
          <div className="bg-bg-tertiary rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-neon-orange" />
              Current Crises
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-neon-red text-xs">●</span>
                <div className="text-sm">
                  <span className="text-text-primary">Middle East Tensions</span>
                  <span className="text-text-muted text-xs block">Oil prices volatile</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neon-yellow text-xs">●</span>
                <div className="text-sm">
                  <span className="text-text-primary">China Slowdown</span>
                  <span className="text-text-muted text-xs block">Reduced demand</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neon-green text-xs">●</span>
                <div className="text-sm">
                  <span className="text-text-primary">India PLI Scheme</span>
                  <span className="text-text-muted text-xs block">Manufacturing boost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Overall Summary & Prediction */}
      <section className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="text-neon-green" size={20} />
          Section 3: Overall Summary & Prediction
        </h2>

        {/* Prediction Box */}
        <div className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-neon-green">Will This Stock Go Up?</h3>
              <p className="text-text-secondary mt-1">AI-Powered Analysis Based on Multiple Data Sources</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neon-green">
                {analysis?.willGoUp ? '📈 BULLISH' : '📉 BEARISH'}
              </div>
              <div className="text-sm text-text-secondary">
                Confidence: {analysis?.confidence || 72}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-text-muted text-sm">Target Price Range</span>
              <div className="text-xl font-semibold text-text-primary">{analysis?.targetPrice || '₹2,350 - ₹2,500'}</div>
            </div>
            <div>
              <span className="text-text-muted text-sm">Timeframe</span>
              <div className="text-xl font-semibold text-text-primary">6 months</div>
            </div>
          </div>
        </div>

        {/* Bullish & Bearish Factors */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bullish */}
          <div>
            <h3 className="text-sm font-medium text-neon-green mb-3 flex items-center gap-2">
              <CheckCircle size={16} />
              Why It Could Go Up
            </h3>
            <div className="space-y-3">
              {analysis?.bullishFactors?.map((item, i) => (
                <div key={i} className="bg-bg-tertiary rounded-lg p-3">
                  <div className="font-medium text-text-primary text-sm">{i + 1}. {item.factor}</div>
                  <div className="text-text-secondary text-xs mt-1">{item.evidence}</div>
                  <SourceLink name={item.source} url="#" className="mt-2 inline-block" />
                </div>
              ))}
            </div>
          </div>

          {/* Bearish */}
          <div>
            <h3 className="text-sm font-medium text-neon-red mb-3 flex items-center gap-2">
              <XCircle size={16} />
              Why Analysis Could Be Wrong (Cons & Risks)
            </h3>
            <div className="space-y-3">
              {analysis?.bearishFactors?.map((item, i) => (
                <div key={i} className="bg-bg-tertiary rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary text-sm">{i + 1}. {item.factor}</span>
                    {item.impact && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        item.impact === 'HIGH' ? 'bg-neon-red/20 text-neon-red' :
                        item.impact === 'MEDIUM-HIGH' ? 'bg-neon-orange/20 text-neon-orange' :
                        'bg-neon-yellow/20 text-neon-yellow'
                      }`}>
                        {item.impact}
                      </span>
                    )}
                  </div>
                  <div className="text-text-secondary text-xs mt-1">{item.evidence}</div>
                  <SourceLink name={item.source} url="#" className="mt-2 inline-block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Potential Causes for Price Fall */}
        <div className="mt-6 bg-bg-tertiary rounded-lg p-4">
          <h3 className="text-sm font-medium text-neon-red mb-3">⚠️ Potential Causes for Price Fall</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Crude oil spike above $100/barrel',
              'Regulatory action against operations',
              'Global recession impacting consumption',
              'Major acquisition going wrong',
              'Leadership changes or governance issues',
              'Currency depreciation impact'
            ].map((risk, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-neon-red">•</span>
                <span className="text-text-secondary">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <AnalysisSources sources={analysis?.sources} className="mt-6" />
      </section>

      {/* Disclaimer */}
      <div className="bg-bg-tertiary border border-border-primary rounded-lg p-4 text-center">
        <p className="text-text-muted text-sm">
          ⚠️ <strong>Disclaimer:</strong> This analysis is generated by AI based on publicly available data. 
          It should not be considered as financial advice. Past performance does not guarantee future results. 
          Please consult a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  )
}
