import React, { useRef } from 'react';
import { useShiply } from './ShiplyContext.jsx';

/**
 * ShiplyFeedback React Component
 * A simple React component for collecting user feedback
 * Must be used within a ShiplyProvider
 */
const ShiplyFeedback = ({
  children,
  className = '',
  style = {},
  ...props
}) => {
  const { shiplyInstance, isInitialized, error } = useShiply();
  const containerRef = useRef(null);

  // Show feedback widget
  const showFeedback = () => {
    if (shiplyInstance && isInitialized) {
      shiplyInstance.show();
    } else if (error) {
      console.error("Cannot show feedback: SDK not initialized or encountered an error.", error);
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
