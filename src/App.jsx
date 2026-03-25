import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CurrentSituation from './pages/CurrentSituation'
import HistoryAnalysis from './pages/HistoryAnalysis'
import AIChatbot from './pages/AIChatbot'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CurrentSituation />} />
        <Route path="history" element={<HistoryAnalysis />} />
        <Route path="chat" element={<AIChatbot />} />
      </Route>
    </Routes>
  )
}

export default App
