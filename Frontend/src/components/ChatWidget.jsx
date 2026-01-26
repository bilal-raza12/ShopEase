import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import './ChatWidget.css';

const ChatWidget = ({ userId, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    startNewThread,
  } = useChat(userId);

  // Show greeting popup after 2 seconds
  useEffect(() => {
    if (!greetingDismissed && !isOpen) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [greetingDismissed, isOpen]);

  // Hide greeting when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');

    try {
      await sendMessage(message);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleGreetingClick = () => {
    setShowGreeting(false);
    setGreetingDismissed(true);
    setIsOpen(true);
  };

  const handleDismissGreeting = (e) => {
    e.stopPropagation();
    setShowGreeting(false);
    setGreetingDismissed(true);
  };

  const formatMessage = (content) => {
    return content
      .split('\n')
      .map((line, i) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.trim().startsWith('- ')) {
          return `<li key="${i}">${line.substring(2)}</li>`;
        }
        return line;
      })
      .join('<br/>');
  };

  // Modern 3D Robot Icon with animated elements
  const BotIcon = () => (
    <svg className="bot-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#e8f0fe"/>
        </linearGradient>
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="100%" stopColor="#4f46e5"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Robot Head with gradient */}
      <rect x="18" y="28" width="64" height="54" rx="14" fill="url(#headGradient)" stroke="#e0e7ff" strokeWidth="2"/>
      {/* Antenna base */}
      <rect x="45" y="20" width="10" height="14" rx="3" fill="url(#headGradient)"/>
      {/* Antenna ball with glow */}
      <circle cx="50" cy="14" r="9" fill="#22c55e" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="47" cy="11" r="3" fill="#4ade80" opacity="0.8"/>
      {/* Left Eye with blink animation */}
      <g className="bot-eye-left">
        <circle cx="35" cy="50" r="12" fill="url(#eyeGradient)"/>
        <circle cx="37" cy="48" r="5" fill="white"/>
        <circle cx="38" cy="47" r="2" fill="#c7d2fe"/>
        <ellipse cx="35" cy="50" rx="12" ry="1" fill="#4f46e5">
          <animate attributeName="ry" values="1;12;1" dur="3s" repeatCount="indefinite" keyTimes="0;0.05;1"/>
        </ellipse>
      </g>
      {/* Right Eye with blink animation */}
      <g className="bot-eye-right">
        <circle cx="65" cy="50" r="12" fill="url(#eyeGradient)"/>
        <circle cx="67" cy="48" r="5" fill="white"/>
        <circle cx="68" cy="47" r="2" fill="#c7d2fe"/>
        <ellipse cx="65" cy="50" rx="12" ry="1" fill="#4f46e5">
          <animate attributeName="ry" values="1;12;1" dur="3s" repeatCount="indefinite" keyTimes="0;0.05;1"/>
        </ellipse>
      </g>
      {/* Smile */}
      <path d="M35 68 Q50 78 65 68" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Cheeks */}
      <circle cx="25" cy="58" r="5" fill="#fecaca" opacity="0.5"/>
      <circle cx="75" cy="58" r="5" fill="#fecaca" opacity="0.5"/>
      {/* Ears with details */}
      <rect x="6" y="42" width="12" height="24" rx="4" fill="url(#headGradient)" stroke="#e0e7ff" strokeWidth="1"/>
      <rect x="82" y="42" width="12" height="24" rx="4" fill="url(#headGradient)" stroke="#e0e7ff" strokeWidth="1"/>
      <circle cx="12" cy="54" r="3" fill="#4f46e5" opacity="0.3"/>
      <circle cx="88" cy="54" r="3" fill="#4f46e5" opacity="0.3"/>
    </svg>
  );

  // Close Icon
  const CloseIcon = () => (
    <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Header Bot Icon
  const HeaderBotIcon = () => (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="30" height="25" rx="6" fill="white"/>
      <circle cx="25" cy="9" r="4" fill="#22c55e"/>
      <rect x="23" y="11" width="4" height="6" fill="white"/>
      <circle cx="18" cy="25" r="5" fill="#4f46e5"/>
      <circle cx="32" cy="25" r="5" fill="#4f46e5"/>
      <circle cx="19" cy="24" r="2" fill="white"/>
      <circle cx="33" cy="24" r="2" fill="white"/>
      <rect x="18" y="33" width="14" height="3" rx="1.5" fill="#4f46e5"/>
    </svg>
  );

  return (
    <div className="chat-widget">
      {/* Greeting Popup */}
      {showGreeting && !isOpen && (
        <div className="chat-greeting" onClick={handleGreetingClick}>
          <button
            className="chat-greeting-close"
            onClick={handleDismissGreeting}
            aria-label="Dismiss"
          >
            ×
          </button>
          <div className="chat-greeting-content">
            <div className="chat-greeting-avatar">
              <svg viewBox="0 0 40 40" fill="none">
                <rect x="8" y="12" width="24" height="20" rx="6" fill="#4f46e5"/>
                <circle cx="20" cy="7" r="4" fill="#22c55e">
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <rect x="18" y="8" width="4" height="6" fill="#4f46e5"/>
                <circle cx="14" cy="20" r="4" fill="white"/>
                <circle cx="26" cy="20" r="4" fill="white"/>
                <circle cx="15" cy="19" r="2" fill="#1e1e1e">
                  <animate attributeName="cx" values="15;16;15;14;15" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="27" cy="19" r="2" fill="#1e1e1e">
                  <animate attributeName="cx" values="27;28;27;26;27" dur="2s" repeatCount="indefinite"/>
                </circle>
                <path d="M14 26 Q20 30 26 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="chat-greeting-text">
              <strong>Hey{userName ? ` ${userName}` : ''}! 👋</strong>
              <span>I'm here to help you shop!</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGreeting(false);
          setGreetingDismissed(true);
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <CloseIcon /> : <BotIcon />}
        {!isOpen && <span className="online-badge" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <HeaderBotIcon />
              </div>
              <div className="chat-header-text">
                <h3>ShopEase AI</h3>
                <span className="chat-status">Always here to help</span>
              </div>
            </div>
            <button
              className="chat-new-btn"
              onClick={startNewThread}
              title="New conversation"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="welcome-icon">
                  <HeaderBotIcon />
                </div>
                <h4>Hey{userName ? `, ${userName}` : ''}! 👋</h4>
                <p>I'm your AI shopping assistant. Ask me anything about products, orders, or just say hi!</p>
                <div className="quick-actions">
                  <button onClick={() => sendMessage("What's trending today?")}>
                    🔥 Trending
                  </button>
                  <button onClick={() => sendMessage("Show my orders")}>
                    📦 My Orders
                  </button>
                  <button onClick={() => sendMessage("Help me find something")}>
                    🔍 Find Products
                  </button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <svg viewBox="0 0 24 24" fill="white">
                      <rect x="5" y="8" width="14" height="10" rx="3"/>
                      <circle cx="9" cy="13" r="2"/>
                      <circle cx="15" cy="13" r="2"/>
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  <div
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                  <span className="message-time">
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message assistant">
                <div className="message-avatar">
                  <svg viewBox="0 0 24 24" fill="white">
                    <rect x="5" y="8" width="14" height="10" rx="3"/>
                    <circle cx="9" cy="13" r="2"/>
                    <circle cx="15" cy="13" r="2"/>
                  </svg>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="chat-error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
