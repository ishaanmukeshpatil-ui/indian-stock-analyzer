import { NavLink } from 'react-router-dom'
import { BarChart3, History, MessageSquare, Star, TrendingUp } from 'lucide-react'

const navItems = [
  { path: '/', icon: BarChart3, label: 'Current' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/chat', icon: MessageSquare, label: 'AI Chat' },
]

export default function Sidebar() {
  return (
    <aside className="w-16 lg:w-48 bg-bg-secondary border-r border-border-primary flex flex-col py-4 transition-all duration-300">
      {/* Logo */}
      <div className="px-4 mb-8 hidden lg:flex items-center gap-2">
        <span className="text-xl">⚡</span>
        <span className="font-semibold text-text-primary">ISA</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-neon-blue/10 border-l-2 border-neon-blue text-neon-blue'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
              }`
            }
          >
            <item.icon size={20} />
            <span className="hidden lg:block text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-2 space-y-2">
        {/* Watchlist Quick Access */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all duration-200">
          <Star size={20} />
          <span className="hidden lg:block text-sm">Watchlist</span>
        </button>

        {/* Market Status */}
        <div className="px-3 py-4 hidden lg:block">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
            <span className="text-neon-green text-xs font-medium">Market Open</span>
          </div>
          <div className="text-text-muted text-xs">
            NSE: 09:15 - 15:30 IST
          </div>
          <div className="text-text-muted text-xs">
            BSE: 09:15 - 15:30 IST
          </div>
          <div className="mt-2 text-text-secondary text-xs font-mono" id="live-clock">
            {new Date().toLocaleTimeString('en-IN', { hour12: false })}
          </div>
        </div>
      </div>
    </aside>
  )
}
