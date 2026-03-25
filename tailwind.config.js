/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0f1019',
        'bg-tertiary': '#141420',
        'bg-surface': '#1a1a2e',
        'border-primary': '#1f1f35',
        'border-accent': '#2a2a45',
        'neon-green': '#00ff88',
        'neon-red': '#ff3366',
        'neon-blue': '#00d4ff',
        'neon-purple': '#a855f7',
        'neon-yellow': '#fbbf24',
        'neon-orange': '#f97316',
        'text-primary': '#ffffff',
        'text-secondary': '#8b8ba3',
        'text-muted': '#5a5a75',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(0, 255, 136, 0.3)',
        'glow-red': '0 0 15px rgba(255, 51, 102, 0.3)',
        'glow-blue': '0 0 15px rgba(0, 212, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
