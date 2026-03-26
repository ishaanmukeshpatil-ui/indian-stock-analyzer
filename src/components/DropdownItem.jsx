import { useState } from 'react'
import Modal from './Modal'

export default function DropdownItem({ title, content, sources, risk }) {
  const [modalOpen, setModalOpen] = useState(false)
  
  const riskColors = {
    high: '#ff3366',
    medium: '#fbbf24',
    low: '#00ff88',
    neutral: '#666666'
  }
  
  const riskColor = risk ? riskColors[risk] || riskColors.neutral : null
  
  return (
    <>
      <div className="dropdown-item" onClick={() => setModalOpen(true)}>
        <div className="dropdown-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {risk && (
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: riskColor,
                boxShadow: `0 0 6px ${riskColor}`,
                flexShrink: 0
              }}></span>
            )}
            <span>{title}</span>
          </div>
          <span style={{ color: '#666666', fontSize: '10px' }}>Click for details →</span>
        </div>
      </div>
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={title}>
        <div style={{ fontSize: '13px', lineHeight: 1.8, color: '#999999', whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
        {sources && sources.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {sources.map((s, i) => (
              <a 
                key={i} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="source-link"
              >
                [Source: {s.name}]
              </a>
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}
