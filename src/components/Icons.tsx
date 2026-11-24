export function AionLogoMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg className="badge-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
    </svg>
  );
}

export function WorkflowPillIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="stat-pill-a" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="stat-pill-b" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
        </linearGradient>
      </defs>
      <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#stat-pill-a)" />
      <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#stat-pill-b)" />
      <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
    </svg>
  );
}

export function DownloadTileIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
      <path d="M12 7.1v7.4" stroke="#111111" strokeWidth="1.85" strokeLinecap="round" fill="none" />
      <path
        d="M8.15 12.35L12 16.2l3.85-3.85"
        stroke="#111111"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function TeamAvatarsIcon() {
  return (
    <svg className="stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
      <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
      <polygon points="6.6,9.8 7.8,6.2 9.8,8.7" fill="#f4f4f4" />
      <polygon points="13.8,9.8 12.6,6.2 10.6,8.7" fill="#f4f4f4" />
      <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
      <circle cx="8.7" cy="11.7" r="0.7" fill="#1a1a1a" />
      <circle cx="11.7" cy="11.7" r="0.7" fill="#1a1a1a" />

      <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
      <circle cx="17.7" cy="9.6" r="1.7" fill="#111111" />
      <circle cx="22.7" cy="9.6" r="1.7" fill="#111111" />
      <ellipse cx="20.2" cy="11.5" rx="1.15" ry="0.8" fill="#111111" />
      <path
        d="M17.9 13.7c1.2 1.25 3.4 1.25 4.6 0"
        stroke="#111111"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
      <text
        x="30.2"
        y="15.1"
        fill="#ffffff"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12.5"
        fontWeight="700"
        textAnchor="middle"
      >
        e
      </text>
    </svg>
  );
}
