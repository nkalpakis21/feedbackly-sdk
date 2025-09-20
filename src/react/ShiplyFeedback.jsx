import React, { useState, useEffect, useRef } from 'react';
import Shiply from '../core/Shiply';

/**
 * ShiplyFeedback React Component
 * A simple React component for collecting user feedback
 */
const ShiplyFeedback = ({
  apiKey,
  websiteId,
  theme = {},
  position = {},
  size = {},
  autoShow = false,
  autoShowDelay = 5000,
  onFeedbackSubmit,
  onError,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const [shiply, setShiply] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Generate website ID if not provided
  const generateWebsiteId = () => {
    if (websiteId) return websiteId;
    
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname;
      return hostname.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }
    
    return 'website-' + Math.random().toString(36).substr(2, 9);
  };

  // Initialize Shiply
  useEffect(() => {
    if (!apiKey) {
      const errorMsg = 'ShiplyFeedback: API key is required';
      setError(errorMsg);
      if (onError) onError(new Error(errorMsg));
      return;
    }

    try {
      const finalWebsiteId = generateWebsiteId();
      
      const config = {
        apiKey,
        websiteId: finalWebsiteId,
        theme: {
          primaryColor: '#007bff',
          backgroundColor: '#ffffff',
          textColor: '#333333',
          borderColor: '#e1e5e9',
          borderRadius: '8px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px',
          ...theme,
        },
        position: {
          bottom: '20px',
          right: '20px',
          ...position,
        },
        size: {
          width: '350px',
          height: '500px',
          ...size,
        },
        text: {
          title: 'Share Your Feedback',
          ratingLabel: 'How would you rate your experience?',
          feedbackLabel: 'Tell us more (optional)',
          feedbackPlaceholder: 'Share your thoughts, report bugs, or suggest improvements...',
          categoryLabel: 'Category',
          submitButton: 'Submit Feedback',
          cancelButton: 'Cancel',
        },
        categories: [
          { value: 'bug', label: 'Bug Report' },
          { value: 'feature', label: 'Feature Request' },
          { value: 'ui', label: 'UI/UX Issue' },
          { value: 'performance', label: 'Performance Issue' },
          { value: 'general', label: 'General Feedback' },
        ],
        autoShow,
        autoShowDelay,
        zIndex: 9999,
      };

      const shiplyInstance = new Shiply();
      shiplyInstance.init(config);
      
      setShiply(shiplyInstance);
      setIsInitialized(true);
      setError(null);

      // Auto-show if enabled
      if (autoShow) {
        setTimeout(() => {
          shiplyInstance.show();
        }, autoShowDelay);
      }

    } catch (err) {
      const errorMsg = `Failed to initialize Shiply: ${err.message}`;
      setError(errorMsg);
      if (onError) onError(err);
    }
  }, [apiKey, websiteId, theme, position, size, autoShow, autoShowDelay, onError]);

  // Handle feedback submission
  const handleFeedbackSubmit = (feedbackData) => {
    if (onFeedbackSubmit) {
      onFeedbackSubmit(feedbackData);
    }
  };

  // Show feedback widget
  const showFeedback = () => {
    if (shiply && isInitialized) {
      shiply.show();
    }
  };

  // Hide feedback widget
  const hideFeedback = () => {
    if (shiply && isInitialized) {
      shiply.hide();
    }
  };

  // If there's an error, show it
  if (error) {
    return (
      <div className={`shiply-error ${className}`} style={style} {...props}>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '4px',
          color: '#c33',
          fontSize: '14px'
        }}>
          {error}
        </div>
      </div>
    );
  }

  // If not initialized yet, show loading or nothing
  if (!isInitialized) {
    return null;
  }

  // Render the trigger button or custom children
  return (
    <div 
      ref={containerRef}
      className={`shiply-feedback-container ${className}`} 
      style={style} 
      {...props}
    >
      {children ? (
        React.cloneElement(children, {
          onClick: showFeedback,
          onMouseEnter: children.props.onMouseEnter,
          onMouseLeave: children.props.onMouseLeave,
        })
      ) : (
        <button
          onClick={showFeedback}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
          }}
        >
          💬 Give Feedback
        </button>
      )}
    </div>
  );
};

export default ShiplyFeedback;
