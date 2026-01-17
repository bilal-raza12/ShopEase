import React from 'react';
import './Logo.css';

const Logo = ({ size = 40, showText = true, className = '', animated = true }) => {
  return (
    <div className={`logo-wrapper ${className} ${animated ? 'logo-animated' : ''}`}>
      <div className="logo-icon-container" style={{ width: size, height: size }}>
        {/* Animated background glow */}
        <div className="logo-glow"></div>

        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          <defs>
            {/* Primary gradient - Indigo to Purple to Pink */}
            <linearGradient id="logoPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1">
                <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#6366f1" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#8b5cf6">
                <animate attributeName="stop-color" values="#8b5cf6;#d946ef;#8b5cf6" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#d946ef">
                <animate attributeName="stop-color" values="#d946ef;#f472b6;#d946ef" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* Secondary gradient - Pink to Coral */}
            <linearGradient id="logoSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            {/* Accent gradient - Cyan to Teal */}
            <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>

            {/* White gradient for shine effect */}
            <linearGradient id="logoShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>

            {/* Drop shadow filter */}
            <filter id="logoShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.4"/>
            </filter>

            {/* Glow filter */}
            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background circle with gradient */}
          <circle
            cx="30"
            cy="30"
            r="28"
            fill="url(#logoPrimary)"
            filter="url(#logoShadow)"
            className="logo-bg-circle"
          />

          {/* Inner decorative ring */}
          <circle
            cx="30"
            cy="30"
            r="24"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="logo-inner-ring"
          />

          {/* Shopping bag body with shine */}
          <path
            d="M17 23L19 45C19 47.5 21.5 50 24.5 50H35.5C38.5 50 41 47.5 41 45L43 23H17Z"
            fill="white"
            fillOpacity="0.95"
            className="logo-bag"
          />

          {/* Bag shine overlay */}
          <path
            d="M17 23L19 45C19 47.5 21.5 50 24.5 50H28L23 23H17Z"
            fill="url(#logoShine)"
            fillOpacity="0.4"
          />

          {/* Bag fold line */}
          <path
            d="M19 28H41"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Bag handles with animation */}
          <path
            d="M24 23V18C24 14 26.5 11 30 11C33.5 11 36 14 36 18V23"
            stroke="url(#logoSecondary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className="logo-handle"
          />

          {/* Sparkle star - main */}
          <g className="logo-sparkle-main" filter="url(#logoGlow)">
            <path
              d="M30 32L31.8 35.5L36 36L33 39L33.8 43L30 41L26.2 43L27 39L24 36L28.2 35.5L30 32Z"
              fill="url(#logoAccent)"
            />
          </g>

          {/* Small sparkles */}
          <circle cx="22" cy="34" r="1.5" fill="url(#logoSecondary)" className="logo-dot-1" />
          <circle cx="38" cy="34" r="1.5" fill="url(#logoSecondary)" className="logo-dot-2" />
          <circle cx="30" cy="46" r="1.2" fill="url(#logoAccent)" className="logo-dot-3" />

          {/* Floating particles */}
          <circle cx="14" cy="20" r="2" fill="url(#logoAccent)" fillOpacity="0.6" className="logo-particle-1" />
          <circle cx="46" cy="22" r="1.5" fill="url(#logoSecondary)" fillOpacity="0.6" className="logo-particle-2" />
          <circle cx="12" cy="42" r="1.5" fill="url(#logoPrimary)" fillOpacity="0.5" className="logo-particle-3" />
          <circle cx="48" cy="40" r="2" fill="url(#logoAccent)" fillOpacity="0.6" className="logo-particle-4" />
        </svg>
      </div>

      {showText && (
        <div className="logo-text-container">
          <span className="logo-text">
            <span className="logo-text-shop">Shop</span>
            <span className="logo-text-ease">Ease</span>
          </span>
          <span className="logo-tagline">Premium Shopping</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
