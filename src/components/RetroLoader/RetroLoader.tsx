import React from 'react';
import './RetroLoader.css';

interface RetroLoaderProps {
  sectionName?: string;
}

const SECTION_LABELS: Record<string, { label: string; icon: string }> = {
  home: { label: 'CONNECTING TO 1995 TIMELINE', icon: '📼' },
  menu: { label: 'COOKING RETRO DELIGHTS', icon: '🍕' },
  diary: { label: 'FETCHING POLAROID MEMORIES', icon: '📖' },
  guestbook: { label: 'TUNING COMMUNITY SIGNALS', icon: '✍️' },
  contact: { label: 'DIALING CYBER HOTLINE', icon: '📟' },
};

export const RetroLoader: React.FC<RetroLoaderProps> = ({ sectionName = 'home' }) => {
  const current = SECTION_LABELS[sectionName] || { label: 'LOADING 90s FREQUENCY', icon: '☕' };

  return (
    <div className="retro-loader-container" role="status" aria-live="polite">
      {/* Glowing CRT scanline backdrop */}
      <div className="loader-inner-card">
        {/* Animated Cassette / Vinyl Icon */}
        <div className="loader-cassette-box">
          <div className="spinning-tape-reels">
            <div className="tape-wheel left-wheel">
              <div className="wheel-center"></div>
            </div>
            <div className="tape-bridge"></div>
            <div className="tape-wheel right-wheel">
              <div className="wheel-center"></div>
            </div>
          </div>
          <span className="loader-center-icon">{current.icon}</span>
        </div>

        {/* Loading text with retro neon blink */}
        <div className="loader-text-group">
          <span className="loader-status-tag">SYSTEM BOOT • 1995</span>
          <h3 className="loader-main-text">{current.label}</h3>
        </div>

        {/* Retro Progress Bar */}
        <div className="loader-progress-track">
          <div className="loader-progress-bar"></div>
        </div>

        {/* Subtle Cyber Status */}
        <div className="loader-footer-status">
          <span className="blink-dot"></span>
          <span className="footer-code">FREQ: 95.5 MHz • STEREO CASSETTE</span>
        </div>
      </div>
    </div>
  );
};
