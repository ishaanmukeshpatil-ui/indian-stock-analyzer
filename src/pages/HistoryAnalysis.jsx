import { useState } from 'react'
import { Search } from 'lucide-react'
import DropdownItem from '../components/DropdownItem'
import QuarterlyChart from '../components/QuarterlyChart'

// Timeline events
const timelineEvents = [
  { year: 2021, month: 'Jun', title: 'Jio Platforms Investment', type: 'positive', impact: '+15%', summary: 'Google and Facebook invested $10B+ in Jio Platforms, valuing it at $65B. This validated Reliance digital strategy and provided capital for expansion. Stock rose 15% on the announcement.', source: 'Economic Times' },
  { year: 2021, month: 'Nov', title: 'O2C Restructuring', type: 'positive', impact: '+8%', summary: 'Reliance announced transfer of O2C business to a separate subsidiary, enabling potential stake sale to strategic investors like Saudi Aramco. Improved corporate structure and unlocking value.', source: 'Company Announcement' },
  { year: 2022, month: 'Mar', title: 'Retail 5000 Stores', type: 'positive', impact: '+5%', summary: 'Reliance Retail crossed 5,000 stores milestone across India. Aggressive expansion into tier-2 and tier-3 cities. Revenue grew 25% YoY driven by grocery and fashion segments.', source: 'BSE Filing' },
  { year: 2022, month: 'Oct', title: '5G Spectrum Acquisition', type: 'positive', impact: '+3%', summary: 'Jio acquired 5G spectrum worth Rs.88,078 crore in the auction. Largest spectrum acquisition by any Indian telecom operator. Positioned for 5G leadership.', source: 'DoT Records' },
  { year: 2023, month: 'Apr', title: 'Crude Oil Crash Impact', type: 'negative', impact: '-4%', summary: 'Global crude oil prices crashed below $70/barrel impacting O2C refining margins. Despite lower input costs, product inventory losses and demand uncertainty affected profitability.', source: 'Reuters' },
  { year: 2023, month: 'Sep', title: 'JioMart 50M Users', type: 'positive', impact: '+6%', summary: 'JioMart crossed 50 million monthly active users. Omnichannel integration with physical stores showing results. Grocery segment market share increased to 28%.', source: 'Company Report' },
  { year: 2024, month: 'Jan', title: 'Green Energy Push', type: 'positive', impact: '+7%', summary: 'Announced Rs.75,000 crore investment in green energy infrastructure. Plans include 100 GW solar manufacturing, green hydrogen production, and battery storage gigafactory.', source: 'Annual Report' },
  { year: 2024, month: 'Aug', title: 'Jio 5G 100 Cities', type: 'positive', impact: '+4%', summary: 'Jio 5G services launched in 100+ cities. Standalone 5G network covering 85% of urban areas. 15 million 5G subscribers added in Q3.', source: 'TRAI Data' },
  { year: 2025, month: 'Feb', title: 'Retail IPO Plans', type: 'positive', impact: '+5%', summary: 'Reports suggest Reliance Retail IPO planned for 2026. Valuation expected at $100B+. Would be largest Indian retail IPO ever.', source: 'Bloomberg' },
]

// Quarterly data by year
const quarterlyDataByYear = {
  2025: [
    { quarter: 'Q4 FY25', revenue: '2,75,000', profit: '21,200', eps: '31.5', margin: '16.2%', growth: '+6.2%' },
    { quarter: 'Q3 FY25', revenue: '2,59,000', profit: '19,650', eps: '29.1', margin: '15.8%', growth: '+8.3%' },
    { quarter: 'Q2 FY25', revenue: '2,39,000', profit: '17,544', eps: '26.0', margin: '15.2%', growth: '+6.3%' },
    { quarter: 'Q1 FY25', revenue: '2,25,000', profit: '16,244', eps: '24.1', margin: '14.8%', growth: '+5.6%' },
  ],
  2024: [
    { quarter: 'Q4 FY24', revenue: '2,13,000', profit: '15,470', eps: '23.0', margin: '14.2%', growth: '+11.5%' },
    { quarter: 'Q3 FY24', revenue: '1,91,000', profit: '13,800', eps: '20.5', margin: '13.8%', growth: '+9.8%' },
    { quarter: 'Q2 FY24', revenue: '1,74,000', profit: '12,500', eps: '18.6', margin: '13.5%', growth: '+8.2%' },
    { quarter: 'Q1 FY24', revenue: '1,60,000', profit: '11,400', eps: '17.0', margin: '13.1%', growth: '+7.5%' },
  ],
  2023: [
    { quarter: 'Q4 FY23', revenue: '1,48,000', profit: '10,500', eps: '15.6', margin: '12.8%', growth: '+12.1%' },
    { quarter: 'Q3 FY23', revenue: '1,32,000', profit: '9,200', eps: '13.7', margin: '12.4%', growth: '+10.5%' },
    { quarter: 'Q2 FY23', revenue: '1,20,000', profit: '8,100', eps: '12.0', margin: '12.0%', growth: '+9.8%' },
    { quarter: 'Q1 FY23', revenue: '1,09,000', profit: '7,300', eps: '10.8', margin: '11.5%', growth: '+8.2%' },
  ],
  2022: [
    { quarter: 'Q4 FY22', revenue: '99,000', profit: '6,700', eps: '9.9', margin: '11.2%', growth: '+22.5%' },
    { quarter: 'Q3 FY22', revenue: '81,000', profit: '5,500', eps: '8.2', margin: '10.8%', growth: '+18.2%' },
    { quarter: 'Q2 FY22', revenue: '68,000', profit: '4,600', eps: '6.8', margin: '10.4%', growth: '+15.5%' },
    { quarter: 'Q1 FY22', revenue: '57,000', profit: '3,900', eps: '5.8', margin: '10.0%', growth: '+12.8%' },
  ],
  2021: [
    { quarter: 'Q4 FY21', revenue: '50,000', profit: '3,400', eps: '5.0', margin: '9.5%', growth: '+28.5%' },
    { quarter: 'Q3 FY21', revenue: '39,000', profit: '2,600', eps: '3.9', margin: '9.0%', growth: '+22.2%' },
    { quarter: 'Q2 FY21', revenue: '32,000', profit: '2,100', eps: '3.1', margin: '8.5%', growth: '+18.5%' },
    { quarter: 'Q1 FY21', revenue: '26,000', profit: '1,700', eps: '2.5', margin: '8.0%', growth: '+15.2%' },
  ],
}

export default function HistoryAnalysis() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [expandedQuarter, setExpandedQuarter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('RELIANCE')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const years = [2025, 2024, 2023, 2022, 2021]
  const quarterlyData = quarterlyDataByYear[selectedYear] || quarterlyDataByYear[2025]

  return (
    <div style={{ overflowY: 'auto', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 className="bold-heading" style={{ fontSize: '28px', color: '#ffffff' }}>
            History & Analysis
          </h1>
          <div style={{ fontSize: '14px', color: '#00d4ff', marginTop: '4px', fontWeight: 600 }}>
            Analyzing: {searchQuery}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              placeholder="Search stock..."
              style={{
                width: '200px',
                padding: '10px 12px 10px 36px',
                background: '#050505',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '13px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Section 1: Previous Data & Quarterly Findings */}
      <section className="card" style={{ padding: '20px', marginBottom: '16px' }}>
        <h2 className="section-title bold-heading" style={{ fontSize: '16px' }}>
          I. Previous Data & Quarterly Findings
        </h2>

        {/* Timeline */}
        <div style={{ background: '#000000', borderRadius: '8px', padding: '20px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#666666', textTransform: 'uppercase' }}>Timeline (Click events for details)</span>
            <span style={{ fontSize: '11px', color: '#666666' }}>2021 - 2025</span>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              {timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className="timeline-event"
                  onClick={() => setSelectedEvent(event)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`timeline-dot ${event.type}`}></div>
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>{event.year}</div>
                    <div style={{ fontSize: '9px', color: '#666666', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quarterly Results with Year Selector and Chart */}
        <div className="grid-2">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#666666', textTransform: 'uppercase' }}>Quarterly Results</span>
            </div>

            {/* Year Selector */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {years.map(year => (
                <button
                  key={year}
                  className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                  onClick={() => { setSelectedYear(year); setExpandedQuarter(null); }}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Quarterly Data - Expandable */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {quarterlyData.map((q, i) => (
                <div key={i} className="factor-card" style={{ cursor: 'pointer' }} onClick={() => setExpandedQuarter(expandedQuarter === i ? null : i)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 500, fontSize: '13px' }}>{q.quarter}</span>
                    <span style={{ fontSize: '12px', color: '#00ff88' }}>{q.growth}</span>
                  </div>
                  {expandedQuarter === i && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
                        <div><span style={{ color: '#666666' }}>Revenue:</span> <span style={{ color: '#00ff88' }}>Rs.{q.revenue} Cr</span></div>
                        <div><span style={{ color: '#666666' }}>Profit:</span> <span style={{ color: '#00ff88' }}>Rs.{q.profit} Cr</span></div>
                        <div><span style={{ color: '#666666' }}>EPS:</span> Rs.{q.eps}</div>
                        <div><span style={{ color: '#666666' }}>Margin:</span> {q.margin}</div>
                      </div>
                      <a
                        href="https://www.bseindia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-link"
                        style={{ marginTop: '8px', display: 'inline-block' }}
                      >
                        [Source: BSE Filing]
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chart replaces Key Findings */}
          <div>
            <QuarterlyChart data={quarterlyData} year={selectedYear} />
          </div>
        </div>
      </section>

      {/* Section 2: Current Status - 3 Column Layout */}
      <section className="card" style={{ padding: '20px', marginBottom: '16px' }}>
        <h2 className="section-title bold-heading" style={{ fontSize: '16px' }}>
          II. Current Status
        </h2>

        <div className="status-columns">
          {/* Column 1: Geopolitics */}
          <div className="status-column">
            <div className="status-column-title">Geopolitics</div>
            <DropdownItem
              title="Crude Oil Volatility"
              risk="high"
              content={`CRUDE OIL PRICE ANALYSIS - HIGH RISK FACTOR

Current crude oil prices have surged to $78.50/barrel this week, representing a 2.3% increase driven by escalating Middle East tensions and disciplined OPEC+ supply management.

IMPACT ON RELIANCE INDUSTRIES:
The Oil-to-Chemicals (O2C) segment contributes approximately 40% of Reliance's total revenue, making crude prices a critical variable. Higher crude prices increase feedstock costs for the refining business, but also improve gross refining margins (GRM) as refined product prices typically rise faster than crude inputs.

Historical Correlation: 
- When crude rises 10%, Reliance's O2C EBITDA typically increases 3-5% due to GRM expansion
- However, sustained prices above $90/barrel compress margins as demand destruction kicks in
- Reliance's Jamnagar refinery (world's largest at 1.4M bpd) benefits from export-oriented model

SCENARIOS:
- Base Case ($75-85/barrel): Neutral to slightly positive for Reliance (+0.5% to +1.5%)
- Bull Case (below $70/barrel): Positive for margins (+2% to +3%)
- Bear Case (above $90/barrel): Negative impact (-2% to -4%) due to demand concerns`}
              sources={[{ name: 'Reuters', url: 'https://reuters.com' }, { name: 'Bloomberg', url: 'https://bloomberg.com' }]}
            />
            <DropdownItem
              title="RBI Interest Rate Policy"
              risk="low"
              content={`MONETARY POLICY ANALYSIS - FAVORABLE CONDITIONS

The Reserve Bank of India maintained the repo rate at 6.5% in its latest policy meeting, signaling a continued pause in the tightening cycle that began in 2022.

KEY IMPLICATIONS FOR RELIANCE:

1. DEBT SERVICING:
Reliance carries consolidated debt of approximately Rs.3.5 lakh crore. At current rates, annual interest expense stands at Rs.24,500 crore. A rate cut of 50 basis points would save approximately Rs.1,750 crore annually.

2. CAPITAL EXPANSION:
The company's ambitious capex plans (Rs.1.2 lakh crore annually for 5G, green energy, retail expansion) become more viable with stable rates.

3. FII FLOWS:
FII inflows of Rs.2,450 crore this week indicate renewed foreign interest in Indian large-caps. Reliance, being the largest company by market cap, is a primary beneficiary.

FORWARD GUIDANCE:
RBI's commentary suggests rates may remain on hold through FY25, with potential cuts in H2 if inflation stays below 4.5%.`}
              sources={[{ name: 'RBI Bulletin', url: 'https://rbi.org.in' }]}
            />
            <DropdownItem
              title="US-China Trade Tensions"
              risk="medium"
              content={`GEOPOLITICAL RISK ASSESSMENT - ELEVATED UNCERTAINTY

The ongoing trade tensions between the United States and China continue to create ripple effects across global markets.

DIRECT IMPACTS ON RELIANCE:

1. REFINING EXPORTS:
Reliance exports approximately 40% of its refined products. Tariff escalations could disrupt these flows if end-market demand weakens.

2. SUPPLY CHAIN DISRUPTIONS:
The O2C segment imports catalysts, specialty chemicals, and equipment from China. Any export controls could increase input costs by 2-3%.

INDIRECT BENEFITS - CHINA+1 STRATEGY:
India is emerging as a major beneficiary of supply chain diversification away from China. Jio's enterprise business has seen 40% growth in contracts from MNCs setting up India operations.

NET ASSESSMENT:
Short-term (0-6 months): Neutral to slightly negative due to global uncertainty
Medium-term (6-18 months): Positive due to China+1 tailwinds
Long-term (18+ months): Highly positive if India captures significant manufacturing share`}
              sources={[{ name: 'Reuters', url: 'https://reuters.com' }]}
            />
            <DropdownItem
              title="India GDP Growth Outlook"
              risk="low"
              content={`MACROECONOMIC ANALYSIS - STRONG GROWTH TRAJECTORY

India's GDP growth forecast remains robust at 6.5-7% for FY25, positioning it as the fastest-growing major economy globally.

GROWTH COMPONENTS RELEVANT TO RELIANCE:

1. CONSUMER SPENDING (40% of GDP):
Rising disposable incomes and urbanization drive retail consumption. Reliance Retail, with 18,500 stores across 7,000 cities, directly captures this growth.

2. INVESTMENT ACTIVITY (30% of GDP):
Government infrastructure spending of Rs.10 lakh crore annually creates indirect demand for petrochemicals, cement, and digital connectivity.

3. SERVICES EXPORT (25% of GDP):
IT and business services growth supports Jio's enterprise segment. Data consumption growth of 20% YoY correlates with services sector expansion.

POLICY SUPPORT:
- PLI schemes benefiting electronics manufacturing (Jio's device business)
- Semiconductor fab incentives (potential future opportunity)
- Green energy subsidies supporting Reliance's solar/hydrogen investments`}
              sources={[{ name: 'Economic Times', url: 'https://economictimes.com' }]}
            />
          </div>

          {/* Column 2: News Analysis */}
          <div className="status-column">
            <div className="status-column-title">News Analysis</div>
            <DropdownItem
              title="Green Energy Mega Investment"
              risk="low"
              content={`STRATEGIC PIVOT TO CLEAN ENERGY - LONG-TERM GROWTH CATALYST

Reliance Industries announced a massive Rs.75,000 crore ($9 billion) investment in green energy infrastructure.

INVESTMENT BREAKDOWN:
- Solar Manufacturing: Rs.30,000 crore for 100 GW solar module/cell capacity
- Green Hydrogen: Rs.25,000 crore for electrolyzer manufacturing and H2 production
- Battery Storage: Rs.15,000 crore for lithium-ion gigafactory
- Wind Energy: Rs.5,000 crore for offshore wind projects

STRATEGIC RATIONALE:
1. Energy Transition Hedge: As global demand shifts from fossil fuels, Reliance is future-proofing its energy business.
2. Government Alignment: India's 2070 net-zero target and 500 GW non-fossil capacity by 2030 create massive policy tailwinds.
3. ESG Investment Flows: Global ESG assets projected to reach $50 trillion by 2025.

FINANCIAL IMPACT:
- Capex Phase (2024-2028): Free cash flow pressure of Rs.15,000-20,000 crore annually
- Revenue Contribution by 2030: Rs.50,000-75,000 crore (10-15% of total)
- Margin Profile: 25-30% gross margins (vs 15-18% for traditional O2C)`}
              sources={[{ name: 'Economic Times', url: 'https://economictimes.com' }]}
            />
            <DropdownItem
              title="JioMart E-commerce Milestone"
              risk="medium"
              content={`DIGITAL RETAIL TRANSFORMATION - SCALING PHASE

JioMart crossed the significant milestone of 100 million monthly active users (MAUs).

KEY METRICS:
- Monthly Active Users: 100M (up from 65M a year ago, +54% YoY)
- Daily Orders: 1.5 million (up from 800K)
- Average Order Value: Rs.850 (up 15% YoY)
- Pincode Coverage: 20,000+ (up from 12,000)
- Same-Day Delivery: 4,500 cities

COMPETITIVE ADVANTAGES OVER AMAZON/FLIPKART:

1. Offline+Online Integration:
- 18,500 physical Reliance Retail stores serve as fulfillment centers
- Click-and-collect reduces last-mile costs by 40%

2. Grocery Dominance:
- JioMart is #1 in online grocery with 35% market share
- Grocery drives repeat purchases and daily engagement

3. Ecosystem Lock-in:
- JioPhone users get exclusive JioMart deals
- Integration with digital payments (JioMoney)`}
              sources={[{ name: 'Livemint', url: 'https://livemint.com' }]}
            />
            <DropdownItem
              title="Jio 5G Network Expansion"
              risk="low"
              content={`5G DEPLOYMENT PROGRESS - INFRASTRUCTURE LEADERSHIP

Jio has achieved 85% urban coverage with its standalone (SA) 5G network.

DEPLOYMENT METRICS:
- Cities Covered: 400+ (vs Airtel's 350+)
- Towers Deployed: 85,000 (target: 100,000 by March 2025)
- 5G Subscribers: 85 million (up from 70M last quarter)
- Spectrum Holdings: 24,740 MHz across 700MHz, 3.5GHz, 26GHz bands

USER BEHAVIOR INSIGHTS:
- Average Data Consumption: 28 GB/month (up from 23 GB YoY)
- 5G Users Consume 3.2x more data than 4G users
- Video Streaming: 65% of 5G traffic (vs 50% on 4G)

REVENUE MONETIZATION:

1. Consumer Segment:
- 5G plans priced 15-20% premium over 4G
- Family plans bundling multiple connections

2. Enterprise (JioBusiness):
- Private 5G networks for factories, ports, campuses
- Revenue target: Rs.10,000 crore by FY27`}
              sources={[{ name: 'Company Report', url: 'https://bseindia.com' }]}
            />
            <DropdownItem
              title="Retail Division Expansion"
              risk="medium"
              content={`RETAIL EMPIRE GROWTH - PHYSICAL + DIGITAL CONVERGENCE

Reliance Retail continues its aggressive expansion.

STORE NETWORK OVERVIEW:
- Total Stores: 18,500 (up from 15,000 a year ago)
- Cities Covered: 7,000+
- Retail Area: 50 million sq ft
- Formats: 15+ (Reliance Digital, Trends, Fresh, Sports, etc.)

KEY ACQUISITIONS:

1. Metro Cash & Carry India (Rs.4,000 crore):
- 31 wholesale stores across India
- Strong B2B relationships with 1M+ kirana stores
- Adds Rs.8,000 crore annual revenue

CATEGORY PERFORMANCE:

- Fashion (Trends): 25% growth, Rs.18,000 crore revenue
- Electronics (Digital): 18% growth, Rs.22,000 crore revenue
- Grocery (Fresh/Smart): 30% growth, Rs.45,000 crore revenue
- Pharma (Health): 20% growth, Rs.5,000 crore revenue

MARGIN IMPROVEMENT:
- Private label contribution increased from 15% to 18%
- Supply chain optimization saved Rs.800 crore annually
- Store productivity improved 12% (sales per sq ft)`}
              sources={[{ name: 'Company Announcement', url: 'https://bseindia.com' }]}
            />
          </div>

          {/* Column 3: Overall */}
          <div className="status-column">
            <div className="status-column-title">Overall</div>
            <DropdownItem
              title="Financial Health Score"
              risk="low"
              content={`COMPREHENSIVE FINANCIAL ANALYSIS - STRONG BALANCE SHEET

BALANCE SHEET METRICS:

1. LEVERAGE:
- Debt-to-Equity: 0.72 (down from 0.85 YoY)
- Net Debt: Rs.1.8 lakh crore (down from Rs.2.2 lakh crore)
- Debt/EBITDA: 2.1x (comfortable vs industry avg of 3.5x)
- Interest Coverage: 4.8x

2. LIQUIDITY:
- Cash & Equivalents: Rs.2.8 lakh crore
- Unused Credit Lines: Rs.1.5 lakh crore
- Current Ratio: 1.4x

3. PROFITABILITY:
- Return on Equity (ROE): 11.2% (up from 9.8%)
- Return on Capital Employed (ROCE): 13.5%
- Net Profit Margin: 6.8%
- EBITDA Margin: 18.2%

CASH FLOW ANALYSIS:
Operating Cash Flow: Rs.1.4 lakh crore annually
Free Cash Flow: Rs.20,000 crore (after all capex)`}
              sources={[{ name: 'BSE India', url: 'https://bseindia.com' }]}
            />
            <DropdownItem
              title="Market Position Strength"
              risk="low"
              content={`COMPETITIVE LANDSCAPE ANALYSIS - MARKET LEADERSHIP

TELECOM (Jio Platforms):
Market Position: #1
- Subscriber Market Share: 48% (450M+ subscribers)
- Revenue Market Share: 42%
- 5G Leadership: 85M subscribers, largest SA network

ORGANIZED RETAIL:
Market Position: #1
- Market Share: 12% of organized retail
- Store Count: 18,500 across 7,000 cities
- Revenue: Rs.2.6 lakh crore (largest retailer in India)

OIL-TO-CHEMICALS (O2C):
Market Position: #2 Globally (refining)
- Refining Capacity: 1.4M bpd (world's largest single location)
- Complexity Index: 21.0 (highest globally)
- Utilization: 95%

CONGLOMERATE ADVANTAGES:
1. Cross-selling: Jio users get JioMart discounts
2. Shared infrastructure: Data centers serve all businesses
3. Capital allocation: Strong businesses fund emerging ones`}
              sources={[{ name: 'Industry Reports', url: 'https://economictimes.com' }]}
            />
            <DropdownItem
              title="Analyst Consensus"
              risk="neutral"
              content={`SELL-SIDE ANALYSIS SUMMARY - BULLISH CONSENSUS

COVERAGE OVERVIEW:
- Total Analysts: 42
- Buy Recommendations: 32 (76%)
- Hold Recommendations: 7 (17%)
- Sell Recommendations: 3 (7%)
- Consensus Rating: BUY (Strong)

TARGET PRICE ANALYSIS:
- Mean Target: Rs.2,450 (11% upside)
- Median Target: Rs.2,400 (8% upside)
- High Target: Rs.2,800 (27% upside) - Bernstein
- Low Target: Rs.2,000 (-10% downside) - Jefferies

KEY ANALYST VIEWS:

BULLISH (Morgan Stanley, Bernstein, Kotak):
- "Reliance's diversified business model provides resilience"
- "Jio and Retail are undervalued as hidden assets"
- Target: Rs.2,600-2,800

NEUTRAL (Goldman Sachs, ICICI Sec):
- "Current price fairly reflects fair value"
- "Execution risk on capex remains"
- Target: Rs.2,200-2,400

BEARISH (Jefferies, CLSA):
- "Capex cycle may dilute returns"
- Target: Rs.2,000-2,100`}
              sources={[{ name: 'Bloomberg', url: 'https://bloomberg.com' }]}
            />
            <DropdownItem
              title="Risk Assessment Matrix"
              risk="medium"
              content={`COMPREHENSIVE RISK ANALYSIS - MODERATE RISK PROFILE

RISK MATRIX:

HIGH RISK FACTORS:

1. Crude Oil Volatility (Probability: 60%, Impact: HIGH)
- O2C contributes 40% of EBITDA
- Every $10 crude swing impacts EBITDA by Rs.5,000-8,000 crore

MEDIUM RISK FACTORS:

2. Debt Sustainability (Probability: 30%, Impact: MEDIUM-HIGH)
- Rs.3.5 lakh crore total debt
- Rs.1.2 lakh crore annual capex requirement

3. Competition Intensification (Probability: 50%, Impact: MEDIUM)
- Adani Group expanding aggressively
- Amazon/Flipkart investing in India

4. Regulatory Changes (Probability: 40%, Impact: MEDIUM)
- Telecom tariff floor pricing debate
- E-commerce FDI norms tightening

5. Execution Risk (Probability: 35%, Impact: MEDIUM)
- Rs.75,000 crore green energy investment
- 5G rural rollout completion

OVERALL RISK RATING: MODERATE
- Appropriate for: Long-term investors (2-3+ years)
- Position sizing: Core holding (5-8% of portfolio)
- Review frequency: Quarterly`}
              sources={[{ name: 'Risk Models', url: 'https://bseindia.com' }]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Overall Summary & Prediction */}
      <section className="card" style={{ padding: '20px', marginBottom: '16px' }}>
        <h2 className="section-title bold-heading" style={{ fontSize: '16px' }}>
          III. Overall Summary & Prediction
        </h2>

        {/* Prediction Box */}
        <div className="prediction-box" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00ff88', fontFamily: "'Inter', sans-serif" }}>
                Will This Stock Go Up?
              </h3>
              <p style={{ color: '#999999', marginTop: '4px', fontSize: '13px' }}>AI-Powered Analysis Based on Multiple Data Sources</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#00ff88' }}>BULLISH</div>
              <div style={{ color: '#999999', fontSize: '12px' }}>Confidence: 72%</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ color: '#666666', fontSize: '11px', textTransform: 'uppercase' }}>Target Price (6 months)</div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>Rs.2,350 - Rs.2,500</div>
            </div>
            <div>
              <div style={{ color: '#666666', fontSize: '11px', textTransform: 'uppercase' }}>Potential Upside</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#00ff88' }}>+7% to +14%</div>
            </div>
          </div>
        </div>

        {/* Bullish & Bearish */}
        <div className="grid-2">
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#00ff88', marginBottom: '12px', textTransform: 'uppercase' }}>
              Why It Could Go Up
            </h3>
            {[
              { factor: 'Strong Quarterly Growth', evidence: 'Revenue growing 7.5% QoQ, net profit up 12% in Q3 FY25.', source: 'Company Reports', impact: '+3-4%' },
              { factor: 'JioMart & Digital Ecosystem', evidence: '100 million monthly active users achieved. Omnichannel integration with 15,000+ physical stores.', source: 'Company Announcements', impact: '+2-3%' },
              { factor: 'Green Energy Pivot', evidence: '$10B investment in renewable energy positions company for long-term growth.', source: 'Annual Report', impact: '+2-3%' },
            ].map((item, i) => (
              <div key={i} className="factor-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 500, fontSize: '12px', color: '#ffffff' }}>{i + 1}. {item.factor}</span>
                  <span style={{ fontSize: '10px', color: '#00ff88', background: 'rgba(0,255,136,0.1)', padding: '2px 6px', borderRadius: '3px' }}>{item.impact}</span>
                </div>
                <div style={{ color: '#999999', fontSize: '11px', marginTop: '6px', lineHeight: 1.5 }}>{item.evidence}</div>
                <a href="https://bseindia.com" target="_blank" rel="noopener noreferrer" className="source-link" style={{ marginTop: '6px', display: 'inline-block' }}>
                  [Source: {item.source}]
                </a>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#ff3366', marginBottom: '12px', textTransform: 'uppercase' }}>
              Why Analysis Could Be Wrong
            </h3>
            {[
              { factor: 'Crude Oil Volatility', evidence: 'O2C segment contributes 40% of revenue. If crude exceeds $90/barrel, refining margins compress.', impact: 'HIGH', impactPercent: '-4% to -8%' },
              { factor: 'Elevated Debt Levels', evidence: 'Consolidated debt of Rs.3.5 lakh crore. Interest rate hikes could increase finance costs.', impact: 'MEDIUM', impactPercent: '-2% to -3%' },
              { factor: 'Telecom Competition', evidence: 'Bharti Airtel gaining market share. Potential price war could compress ARPU.', impact: 'MEDIUM', impactPercent: '-1% to -2%' },
              { factor: 'Global Recession Risk', evidence: 'If global demand contracts, export-oriented refining business could see 10-15% volume decline.', impact: 'MEDIUM', impactPercent: '-3% to -5%' },
            ].map((item, i) => (
              <div key={i} className="factor-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500, fontSize: '12px' }}>{i + 1}. {item.factor}</span>
                  <span style={{ 
                    fontSize: '9px', 
                    padding: '2px 6px', 
                    background: item.impact === 'HIGH' ? 'rgba(255, 51, 102, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                    color: item.impact === 'HIGH' ? '#ff3366' : '#fbbf24',
                    borderRadius: '3px'
                  }}>{item.impact}</span>
                </div>
                <div style={{ color: '#999999', fontSize: '11px', lineHeight: 1.5 }}>{item.evidence}</div>
                <div style={{ fontSize: '10px', color: '#ff3366', marginTop: '4px' }}>Potential Impact: {item.impactPercent}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Limitations */}
        <div style={{ marginTop: '16px', background: '#000000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px' }}>
          <h4 style={{ fontSize: '11px', color: '#fbbf24', marginBottom: '8px', textTransform: 'uppercase' }}>
            Analysis Limitations
          </h4>
          <p style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
            This analysis is based on publicly available data and AI algorithms. It cannot predict black swan events (pandemics, wars, regulatory shocks), insider information, or sudden leadership changes. Past performance does not guarantee future results. The confidence level of 72% indicates significant uncertainty remains. Always consult a qualified financial advisor before making investment decisions.
          </p>
        </div>

        {/* Sources */}
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', color: '#666666', marginBottom: '8px', textTransform: 'uppercase' }}>Data Sources:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { name: 'BSE India', url: 'https://bseindia.com' },
              { name: 'NSE India', url: 'https://nseindia.com' },
              { name: 'Economic Times', url: 'https://economictimes.com' },
              { name: 'Livemint', url: 'https://livemint.com' },
              { name: 'Reuters', url: 'https://reuters.com' },
              { name: 'Bloomberg', url: 'https://bloomberg.com' },
              { name: 'RBI', url: 'https://rbi.org.in' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="disclaimer">
        <strong>Disclaimer:</strong> This analysis is generated by AI based on publicly available data. It should not be considered as financial advice. Past performance does not guarantee future results. Please consult a qualified financial advisor before making investment decisions.
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{selectedEvent.title}</h2>
              <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', border: 'none', color: '#666666', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#666666' }}>{selectedEvent.year} {selectedEvent.month}</span>
              <span style={{ 
                fontSize: '11px', 
                padding: '2px 8px', 
                borderRadius: '4px',
                background: selectedEvent.type === 'positive' ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)',
                color: selectedEvent.type === 'positive' ? '#00ff88' : '#ff3366'
              }}>
                {selectedEvent.impact}
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#999999' }}>{selectedEvent.summary}</p>
            <a href="https://economictimes.com" target="_blank" rel="noopener noreferrer" className="source-link" style={{ marginTop: '16px', display: 'inline-block' }}>
              [Source: {selectedEvent.source}]
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
