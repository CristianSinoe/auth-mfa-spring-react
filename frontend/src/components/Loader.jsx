export default function Loader() {
  return (
    <div className="main-container">
      <svg className="loader" viewBox="0 0 300 140">
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#00ccff" />
            <stop offset="50%" stopColor="#ffea00" />
            <stop offset="100%" stopColor="#00ff15" />
          </linearGradient>
        </defs>
        <g fill="none">
          <rect x="20" y="20" width="260" height="100" rx="10" ry="10" className="trace-bg"/>
          <path d="M30,70 H250" className="trace-flow blue"/>
          <path d="M30,50 H220" className="trace-flow yellow"/>
          <path d="M30,90 H200" className="trace-flow green"/>
        </g>
        <text x="150" y="75" textAnchor="middle" fill="url(#grad)" style={{fontWeight:700}}>Cargando…</text>
      </svg>
    </div>
  );
}
