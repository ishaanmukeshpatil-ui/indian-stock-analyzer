/**
 * SourceLink Component
 * Displays a clickable blue link that opens source in new tab
 */
export default function SourceLink({ name, url, className = '' }) {
  if (!url) return <span className="text-text-muted text-sm">Source unavailable</span>
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`source-link inline-flex items-center gap-1 ${className}`}
    >
      <span>📎</span>
      <span>{name}</span>
    </a>
  )
}

/**
 * SourceLinksList Component
 * Displays multiple source links
 */
export function SourceLinksList({ sources, className = '' }) {
  if (!sources || sources.length === 0) return null
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sources.map((source, index) => (
        <SourceLink
          key={index}
          name={source.name}
          url={source.url}
        />
      ))}
    </div>
  )
}

/**
 * AnalysisSources Component
 * Displays sources section for analysis results
 */
export function AnalysisSources({ sources, className = '' }) {
  if (!sources || sources.length === 0) return null
  
  return (
    <div className={`mt-4 pt-4 border-t border-border-primary ${className}`}>
      <div className="text-text-muted text-xs mb-2">Data Sources:</div>
      <SourceLinksList sources={sources} />
    </div>
  )
}
