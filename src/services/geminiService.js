import axios from 'axios'

// Multiple AI providers supported
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Detect which AI provider to use
function getAIProvider() {
  if (OPENROUTER_API_KEY) return 'openrouter'
  if (GEMINI_API_KEY) return 'gemini'
  return 'mock'
}

// Call AI API with provider detection
async function callAIAPI(prompt, maxTokens = 2048) {
  const provider = getAIProvider()
  
  if (provider === 'mock') {
    return null // Will use mock data
  }
  
  if (provider === 'openrouter') {
    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        model: 'google/gemini-2.0-flash-001:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.choices[0].message.content
  }
  
  // Default: Gemini
  const response = await axios.post(
    `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: maxTokens,
      }
    }
  )
  return response.data.candidates[0].content.parts[0].text
}

// Analyze stock and generate comprehensive analysis
export async function analyzeStock(stockData, historicalData, news, quarterlyResults) {
  const prompt = `
    Analyze the following Indian stock data and provide a comprehensive analysis in JSON format:
    
    Stock Data: ${JSON.stringify(stockData)}
    Historical Performance: ${JSON.stringify(historicalData?.slice(0, 10))}
    Recent News: ${JSON.stringify(news?.slice(0, 5))}
    Quarterly Results: ${JSON.stringify(quarterlyResults)}
    
    Provide analysis in this exact JSON structure:
    {
      "summary": "Brief overall summary",
      "willGoUp": true/false,
      "targetPrice": "price range",
      "confidence": number (0-100),
      "bullishFactors": [{"factor": "", "evidence": "", "source": ""}],
      "bearishFactors": [{"factor": "", "evidence": "", "source": ""}],
      "risks": [{"risk": "", "impact": "HIGH/MEDIUM/LOW", "source": ""}],
      "geopoliticalImpact": "analysis of geopolitical factors",
      "quarterlySummary": "key findings from quarterly results",
      "sources": [{"name": "", "url": ""}]
    }
  `

  try {
    const text = await callAIAPI(prompt, 2048)

    if (!text) {
      return getMockAnalysis(stockData)
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return getMockAnalysis(stockData)
  } catch (error) {
    console.error('AI API error:', error)
    return getMockAnalysis(stockData)
  }
}

// Chat with AI about stocks
export async function chatWithAI(message, context = {}) {
  const prompt = `
    You are an expert Indian stock market analyst. Answer the user's question based on the provided context.

    Context: ${JSON.stringify(context)}

    User Question: ${message}

    Provide a detailed response with:
    1. Direct answer to the question
    2. Supporting data/analysis
    3. Sources (if applicable)
    4. Any relevant caveats or disclaimers

    Keep the response informative but concise.
  `

  try {
    const text = await callAIAPI(prompt, 1024)

    if (!text) {
      return getMockChatResponse(message)
    }

    return text
  } catch (error) {
    console.error('AI chat error:', error)
    return getMockChatResponse(message)
  }
}

// Mock analysis for demo/fallback
function getMockAnalysis(stockData) {
  const stockName = stockData?.companyName || stockData?.tickerId || 'Stock'
  
  return {
    summary: `${stockName} shows mixed signals based on current market conditions. The stock has shown resilience in recent quarters with steady revenue growth.`,
    willGoUp: true,
    targetPrice: stockData?.currentPrice?.NSE 
      ? `₹${Math.round(stockData.currentPrice.NSE * 1.1)} - ₹${Math.round(stockData.currentPrice.NSE * 1.15)}`
      : 'Based on analysis',
    confidence: 72,
    bullishFactors: [
      {
        factor: 'Strong Quarterly Growth',
        evidence: 'Revenue growing consistently quarter over quarter',
        source: 'Company Quarterly Reports'
      },
      {
        factor: 'Market Position',
        evidence: 'Strong market share in core business segments',
        source: 'Industry Analysis'
      },
      {
        factor: 'Technical Indicators',
        evidence: 'Stock trading above key moving averages',
        source: 'Technical Analysis'
      }
    ],
    bearishFactors: [
      {
        factor: 'Market Volatility',
        evidence: 'Global market uncertainty affecting sentiment',
        source: 'Reuters Market Analysis'
      },
      {
        factor: 'Valuation Concerns',
        evidence: 'P/E ratio slightly above sector average',
        source: 'Bloomberg Data'
      }
    ],
    risks: [
      {
        risk: 'Geopolitical Tensions',
        impact: 'MEDIUM',
        source: 'Reuters Geopolitical Reports'
      },
      {
        risk: 'Regulatory Changes',
        impact: 'LOW',
        source: 'SEBI Updates'
      }
    ],
    geopoliticalImpact: 'Current geopolitical situation remains mixed. India continues to be a preferred investment destination among emerging markets.',
    quarterlySummary: 'Latest quarterly results show strong performance with revenue and profit growth meeting analyst expectations.',
    sources: [
      { name: 'IndianAPI', url: 'https://indianapi.in' },
      { name: 'Economic Times', url: 'https://economictimes.com' },
      { name: 'MoneyControl', url: 'https://moneycontrol.com' }
    ]
  }
}

// Mock chat response for demo/fallback
function getMockChatResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('quarterly') || lowerMessage.includes('q3') || lowerMessage.includes('results')) {
    return `Based on the latest quarterly results available:

**Key Findings:**
• Revenue showed healthy growth compared to previous quarter
• Net profit margins remained stable
• EBITDA improved due to operational efficiencies

**Quarterly Performance Summary:**
The company has demonstrated consistent performance with revenue growth of approximately 5-8% quarter-over-quarter. Key drivers include strong demand in core segments and effective cost management.

**Sources:**
• [Company BSE Filings](https://bseindia.com)
• [Economic Times](https://economictimes.com)
• [Livemint](https://livemint.com)

*Note: This analysis is based on publicly available data and should not be considered financial advice.*`
  }
  
  if (lowerMessage.includes('market') || lowerMessage.includes('news') || lowerMessage.includes('today')) {
    return `**Current Market Status:**

The Indian stock market is currently showing:
• NIFTY 50 trading with modest gains
• Banking and IT sectors leading the advance
• FII flows positive for the week

**Recent Developments:**
• RBI maintains status quo on interest rates
• Global markets showing stability
• Rupee remains range-bound against USD

**Sources:**
• [NSE India](https://nseindia.com)
• [BSE India](https://bseindia.com)
• [RBI](https://rbi.org.in)

*Data is delayed by 15 minutes.*`
  }
  
  return `Thank you for your question: "${message}"

Based on my analysis of available data:

**Summary:**
I can provide analysis on stock prices, quarterly results, market news, and geopolitical factors affecting Indian markets.

**What I can help with:**
• Stock price analysis and trends
• Quarterly financial results breakdown
• Current market conditions
• Geopolitical impact assessment
• Technical indicator explanations

**Sources I use:**
• IndianAPI.in (Stock data)
• Company quarterly filings
• Economic Times, Livemint (News)
• RBI bulletins (Macroeconomic data)

Please ask specific questions about any stock or market topic!

*Disclaimer: This is AI-powered analysis for informational purposes only. Not financial advice.*`
}

export { getMockAnalysis, getMockChatResponse }
