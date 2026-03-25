// Format number as Indian currency
export function formatCurrency(value, currency = 'INR') {
  if (value === null || value === undefined) return '-'
  
  const num = parseFloat(value)
  if (isNaN(num)) return '-'
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)
}

// Format large numbers (lakhs, crores)
export function formatLargeNumber(value) {
  if (value === null || value === undefined) return '-'
  
  const num = parseFloat(value)
  if (isNaN(num)) return '-'
  
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  return num.toFixed(2)
}

// Format percentage change
export function formatPercentChange(value) {
  if (value === null || value === undefined) return '-'
  
  const num = parseFloat(value)
  if (isNaN(num)) return '-'
  
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(2)}%`
}

// Format date
export function formatDate(date, format = 'short') {
  if (!date) return '-'
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return '-'
  
  if (format === 'short') {
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    })
  }
  
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Format time
export function formatTime(date) {
  if (!date) return '-'
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return '-'
  
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// Get price change class (positive/negative)
export function getPriceChangeClass(value) {
  const num = parseFloat(value)
  if (isNaN(num)) return 'text-text-secondary'
  return num >= 0 ? 'text-neon-green' : 'text-neon-red'
}

// Get background change class for price flash
export function getPriceFlashClass(value) {
  const num = parseFloat(value)
  if (isNaN(num)) return ''
  return num >= 0 ? 'flash-green' : 'flash-red'
}
