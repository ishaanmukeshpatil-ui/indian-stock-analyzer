import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, BarChart2, Newspaper, TrendingUp, HelpCircle } from 'lucide-react'
import { chatWithAI, getMockChatResponse } from '../services/geminiService'
import SourceLink from '../components/SourceLink'
import { SOURCES } from '../utils/constants'

const quickActions = [
  { icon: BarChart2, label: 'Analyze RELIANCE', prompt: 'Analyze RELIANCE stock in detail' },
  { icon: Newspaper, label: 'Market Overview', prompt: 'Give me an overview of the Indian stock market today' },
  { icon: TrendingUp, label: 'Best Sectors', prompt: 'Which sectors are performing best right now?' },
  { icon: HelpCircle, label: 'Explain RSI', prompt: 'Explain what RSI indicator means and how to use it' },
]

const suggestedQuestions = [
  'What are the quarterly results for TCS?',
  'Compare TCS vs Infosys',
  'Explain the current market situation',
  'What is MACD indicator?',
  'Best stocks to watch this week?',
]

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm your AI-powered stock analysis assistant. 🤖

I can help you with:
• **Stock price analysis** and trends
• **Quarterly results** breakdown  
• **Geopolitical impact** assessment
• **News sentiment** analysis
• **Technical indicators** explanation
• **Risk assessment**

How can I assist you today?`,
      sources: []
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message = input) => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use mock response for demo (replace with actual Gemini API in production)
      const response = await new Promise(resolve => {
        setTimeout(() => resolve(getMockChatResponse(message)), 1000)
      })

      const assistantMessage = {
        role: 'assistant',
        content: response,
        sources: [
          { name: 'IndianAPI', url: SOURCES.INDIAN_API.url },
          { name: 'Economic Times', url: SOURCES.ECONOMIC_TIMES.url },
          { name: 'BSE India', url: SOURCES.BSE_INDIA.url }
        ]
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const handleQuickAction = (prompt) => {
    handleSend(prompt)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">AI Stock Assistant</h1>
            <p className="text-sm text-text-muted">Powered by Google Gemini</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>Sources:</span>
          <span className="px-2 py-1 bg-bg-tertiary rounded">IndianAPI</span>
          <span className="px-2 py-1 bg-bg-tertiary rounded">Economic Times</span>
          <span className="px-2 py-1 bg-bg-tertiary rounded">BSE Filings</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => handleQuickAction(action.prompt)}
            className="flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-neon-blue/50 transition-all"
            disabled={isLoading}
          >
            <action.icon size={14} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-neon-purple" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-xl p-4 ${
                message.role === 'user'
                  ? 'bg-neon-blue/10 border border-neon-blue/30'
                  : message.isError
                  ? 'bg-neon-red/10 border border-neon-red/30'
                  : 'bg-bg-secondary border border-border-primary'
              }`}
            >
              <div className="text-text-primary text-sm whitespace-pre-wrap">
                {message.content}
              </div>
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border-primary">
                  <div className="text-xs text-text-muted mb-2">Sources:</div>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((source, i) => (
                      <SourceLink key={i} name={source.name} url={source.url} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-neon-blue" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-neon-purple" />
            </div>
            <div className="bg-bg-secondary border border-border-primary rounded-xl p-4">
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-sm">Analyzing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <div className="text-xs text-text-muted mb-2">Suggested questions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 text-xs bg-bg-secondary border border-border-primary rounded-full text-text-secondary hover:text-text-primary hover:border-neon-blue/50 transition-all"
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about any stock, quarterly results, market news..."
          className="input-field flex-1"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="btn-primary flex items-center gap-2 px-6"
        >
          <Send size={16} />
          <span>Send</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 text-center text-xs text-text-muted">
        AI analysis based on publicly available data. Not financial advice. 
        Always verify information from official sources.
      </div>
    </div>
  )
}
