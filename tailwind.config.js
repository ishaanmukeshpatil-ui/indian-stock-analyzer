/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#000000',
        'bg-tertiary': '#050505',
        'bg-surface': '#0a0a0a',
        'border-primary': 'rgba(255, 255, 255, 0.08)',
        'border-accent': 'rgba(255, 255, 255, 0.12)',
        'neon-green': '#00ff88',
        'neon-red': '#ff3366',
        'neon-blue': '#00d4ff',
        'neon-purple': '#a855f7',
        'neon-yellow': '#fbbf24',
        'neon-orange': '#f97316',
        'text-primary': '#ffffff',
        'text-secondary': '#999999',
        'text-muted': '#666666',
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
