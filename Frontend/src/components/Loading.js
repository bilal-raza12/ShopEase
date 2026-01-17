import React from 'react';
import './Loading.css';

const Loading = ({ text = 'Loading', size = 'medium' }) => {
  return (
    <div className={`loading-container loading-${size}`}>
      <div className="loading-spinner">
        {/* Animated Circles */}
        <div className="spinner-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        {/* Center Logo Element */}
        <div className="spinner-center">
          <div className="spinner-dot"></div>
        </div>
      </div>

      <p className="loading-text">
        <span className="loading-text-content">{text}</span>
        <span className="loading-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </p>
    </div>
  );
};

export default Loading;
