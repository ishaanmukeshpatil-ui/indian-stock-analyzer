import axios from 'axios'

// API Configuration
const INDIAN_API = {
  baseURL: 'https://stock.indianapi.in',
  apiKey: import.meta.env.VITE_INDIAN_API_KEY || 'sk-live-jTfnihKnGcBrx2kqwKMkwo0Lhib5d6K6pQtHMxbI'
}

const GITHUB_API = {
  baseURL: 'https://military-jobye-haiqstudios-14f59639.koyeb.app'
}

// Create axios instances
const indianApiClient = axios.create({
  baseURL: INDIAN_API.baseURL,
  headers: {
    'x-api-key': INDIAN_API.apiKey
  }
})

const githubApiClient = axios.create({
  baseURL: GITHUB_API.baseURL
})

// Dual API strategy with fallback
export async function fetchWithFallback(primaryFn, fallbackFn) {
  try {
    return await primaryFn()
  } catch (error) {
    console.warn('Primary API failed, trying fallback:', error.message)
    try {
      return await fallbackFn()
    } catch (fallbackError) {
      console.error('Both APIs failed:', fallbackError.message)
      throw fallbackError
    }
  }
}

export { indianApiClient, githubApiClient }
